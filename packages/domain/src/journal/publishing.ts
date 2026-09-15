import { createHash } from 'node:crypto';
import { generatePublicId, versionPublicId } from '@openscience/identity';
import { SDF_CORE_VERSION } from '@openscience/sdf-schema';
import type { WorkspaceDeps } from '../workspace/types';
import { JournalError } from './contracts';
import { journalDigest, validateJournalDraft, type JournalMetadata, type JournalRights, type JournalSource } from './content';
import { articleReviewDigest, assertArticleRevision, journalArticleEvent, journalArticleInScope, journalJson, journalScope, journalTransaction, txReleases } from './articles';

export async function publishJournalArticle(deps: WorkspaceDeps, userId: string, journalId: string, articleId: string, input: { revision: number; requestKey: string; humanConfirmed: boolean; publicIdPrefix?: string }) {
  return journalTransaction(deps, journalId, async (tx) => {
    const { journal } = await journalScope(tx, journalId, userId, ['owner', 'maintainer'], true);
    if (!input.humanConfirmed) throw new JournalError('VALIDATION_ERROR', '请确认已逐项核验科学表述和公开许可');
    const article = await journalArticleInScope(tx, journalId, articleId);
    const replay = await tx.journalRelease.findUnique({ where: { articleId_requestKey: { articleId, requestKey: input.requestKey } } });
    if (replay) {
      if (replay.revision !== input.revision) throw new JournalError('IDEMPOTENCY_CONFLICT', '发布标识已用于其他修订');
      return (await txReleases(tx, articleId)).find((r) => r.id === replay.id)!;
    }
    const sameRevision = await tx.journalRelease.findUnique({ where: { articleId_revision: { articleId, revision: input.revision } } });
    if (sameRevision) return (await txReleases(tx, articleId)).find((r) => r.id === sameRevision.id)!;
    assertArticleRevision(article, input.revision);
    const rights = article.rights as unknown as JournalRights;
    if (!journal.homepagePublished || article.contentState !== 'active' || !rights.internalProcessing || !rights.derivativeGeneration || !rights.publicDerivative || !rights.license || !rights.evidence) throw new JournalError('FORBIDDEN', '请先公开已核验的期刊主页，并确认此解读的加工和公开许可');
    if (article.reviewState !== 'approved' || article.reviewedRevision !== article.revision || !article.reviewedBy || article.reviewedDigest !== articleReviewDigest(article)) throw new JournalError('INVALID_STATE', '当前草稿与来源必须经人工审核通过后发布');
    const reviewer = await journalScope(tx, journalId, article.reviewedBy, ['owner', 'maintainer', 'reviewer'], true);
    if (reviewer.membership.role === 'reviewer' && article.assignedReviewerId !== article.reviewedBy) throw new JournalError('INVALID_STATE', '审核分配已改变，请重新审核');
    const source = article.source as unknown as JournalSource;
    const draft = validateJournalDraft(article.draft, source);
    const metadata = article.metadata as unknown as JournalMetadata;
    const ro = await tx.researchObject.findUniqueOrThrow({ where: { id: article.researchObjectId } });
    const previous = await tx.version.findFirst({ where: { researchObjectId: ro.id }, orderBy: { versionNo: 'desc' } });
    const versionNo = (previous?.versionNo ?? 0) + 1;
    const branch = await tx.branch.upsert({ where: { researchObjectId_name: { researchObjectId: ro.id, name: 'main' } }, update: {}, create: { researchObjectId: ro.id, name: 'main', isDefault: true } });
    const commit = await tx.commit.create({ data: { researchObjectId: ro.id, branchId: branch.id, parentCommitId: branch.headCommitId, authorId: userId, message: `Journal interpretation: reviewed revision ${article.revision}`, idempotencyKey: `system:journal-publish:${articleId}:${article.revision}` } });
    await tx.branch.update({ where: { id: branch.id }, data: { headCommitId: commit.id } });
    // Same identifier namespace as existing ROs; serialize allocation across publishers.
    await tx.$executeRaw`LOCK TABLE identifiers IN SHARE ROW EXCLUSIVE MODE`;
    const publicId = ro.publicId ?? generatePublicId(input.publicIdPrefix ?? 'OSR', ro.createdAt.getUTCFullYear(), await tx.identifier.count() + 1);
    if (!ro.publicId) await tx.identifier.create({ data: { researchObjectId: ro.id, publicId, issuedAt: new Date() } });
    const publishedAt = deps.now?.() ?? new Date();
    const publicVersionId = versionPublicId(publicId, versionNo);
    const version = await tx.version.create({ data: { researchObjectId: ro.id, commitId: commit.id, versionNo, parentVersionId: previous?.id, status: 'published', publicVersionId, manifest: { create: { coreJson: { schemaVersion: SDF_CORE_VERSION, ...draft.core } } } } });
    const publicMetadata = {
      title: metadata.title,
      doi: metadata.doi,
      authors: metadata.authors,
      publishedDate: metadata.publishedDate,
      journalTitle: metadata.journalTitle,
      issns: metadata.issns,
      originalUrl: metadata.originalUrl,
    };
    const snapshot = {
      metadata: publicMetadata, draft, source: { kind: source.kind, label: source.label, url: source.url,
        textSha256: createHash('sha256').update(source.text, 'utf8').digest('hex'), revision: article.revision,
        ...(rights.publicSource ? { text: source.text } : {}) },
      license: rights.license, journal: { id: journal.id, slug: journal.slug, name: journal.nameZh ?? journal.nameEn },
      review: { method: 'editorial-human-review', revision: article.revision }, publishedAt: publishedAt.toISOString(),
      versionNo, url: `/research/${publicId}/v/${versionNo}`,
      identity: 'journal-authored-interpretation-of-published-work',
    };
    const contentDigest = journalDigest({ core: { schemaVersion: SDF_CORE_VERSION, ...draft.core }, journalPackage: snapshot });
    const release = await tx.journalRelease.create({ data: { articleId, versionId: version.id, revision: article.revision, requestKey: input.requestKey, snapshot: journalJson(snapshot), digest: contentDigest, publishedAt } });
    await tx.publication.create({ data: { versionId: version.id, publicVersionId, contentSha256: contentDigest, publishedAt, legalDisclaimer: '本页是基于已发表原文的期刊解读，由编辑核验；研究引用请优先使用原文 DOI。平台时间与版本不替代原文出版信息。' } });
    await tx.licenseAssignment.create({ data: { researchObjectId: ro.id, versionId: version.id, licenseType: 'text', licenseId: rights.license } });
    await tx.researchObject.update({ where: { id: ro.id }, data: { publicId, visibility: 'public', status: 'published', version: { increment: 1 } } });
    await tx.sdfDocument.update({ where: { researchObjectId: ro.id }, data: { coreJson: { schemaVersion: SDF_CORE_VERSION, ...draft.core } } });
    await tx.journalArticle.update({ where: { id: articleId }, data: { directoryVisible: true } });
    await journalArticleEvent(tx, journalId, userId, 'journal.article.publish', articleId, { releaseId: release.id, revision: article.revision, publicVersionId });
    return { id: release.id, revision: article.revision, versionNo, publicId, publishedAt, url: snapshot.url };
  });
}
export async function restrictJournalArticle(deps: WorkspaceDeps, userId: string, journalId: string, articleId: string, input: { state: 'restricted' | 'withdrawn'; reason: string }) {
  return journalTransaction(deps, journalId, async (tx) => {
    await journalScope(tx, journalId, userId, ['owner', 'maintainer']);
    const article = await journalArticleInScope(tx, journalId, articleId);
    if (!input.reason.trim()) throw new JournalError('VALIDATION_ERROR', '请填写限制或撤回原因');
    await tx.researchObject.update({ where: { id: article.researchObjectId }, data: { visibility: 'private', status: input.state } });
    await tx.version.updateMany({ where: { researchObjectId: article.researchObjectId }, data: { status: input.state } });
    const updated = await tx.journalArticle.update({ where: { id: articleId }, data: { contentState: input.state, reviewState: 'draft', reviewedRevision: null, reviewedDigest: null, reviewNote: input.reason, revision: { increment: 1 } } });
    await journalArticleEvent(tx, journalId, userId, `journal.article.${input.state}`, articleId, { reason: input.reason });
    return updated;
  });
}
