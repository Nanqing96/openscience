import { createHash } from 'node:crypto';
import { SCIENCE_REVIEW_MAX_PROMPT_CHARS, type AiGateway, type ScienceReviewInput } from '@openscience/ai-gateway';
import { describeIllustrationBrief, parseIllustrationBrief, parseStoryboardDocument, requireIllustrationSourceSupport, type StoryboardDocument, type StoryboardRequest } from '@openscience/domain';
import type { PresentationClaim } from './chart-generator';
import { compileIllustrationImagePrompt } from './scene-image';
import { loadInstalledMediaSkills } from '../skills/installed-media-skills';

type ReviewContext = Pick<ScienceReviewInput, 'authorizationContext' | 'illustrationContext'> & {
  researchObjectId: string; versionId: string; sourceEvidenceIdentity: string;
};
const object = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('[blocked] Invalid illustration review object');
  return value as Record<string, unknown>;
};
const keys = (value: Record<string, unknown>, expected: string[]) => {
  if (Object.keys(value).sort().join(',') !== expected.sort().join(',')) throw new Error('[blocked] Invalid illustration review fields');
};

/** Review the final scientific meaning, including meanings introduced by artistic layout. */
export async function reviewIllustrationStoryboard(
  gateway: Pick<AiGateway, 'reviewScientific'>,
  claims: readonly PresentationClaim[], settings: StoryboardRequest, candidate: StoryboardDocument, context: ReviewContext,
) {
  // Imported evidence is field-scoped and often all marked supports. Keep the
  // selected Claims' whole source context: unused passages can carry qualifiers.
  const selectedClaimIds = new Set(candidate.scenes.flatMap(scene => scene.sourceClaimIds));
  const selectedClaims = claims.filter(claim => selectedClaimIds.has(claim.id));
  const sources = selectedClaims.flatMap(claim => (claim.sourcePassages ?? [])
    .map(passage => ({ ...passage, claimId: claim.id })));
  const sourceIds = new Map(sources.map((source, index) => [`${source.claimId}:${source.evidenceId}`, `s${index}`]));
  const candidateView = { title: candidate.title, scenes: candidate.scenes.map(scene => {
    if (scene.illustration?.schemaVersion !== 2) throw new Error('[blocked] Illustration review requires separate science and layout');
    requireIllustrationSourceSupport(scene.illustration, claims);
    if (scene.illustration.subjects.some(subject => !sources.some(source => source.claimId === subject.basis.claimId
      && source.evidenceId === subject.basis.evidenceId && source.relation === 'supports'))) {
      throw new Error('[blocked] Illustration subject lacks supporting evidence');
    }
    const { schemaVersion: _schemaVersion, ...brief } = scene.illustration;
    return { title: scene.title, narration: scene.narration, ...brief,
      subjects: brief.subjects.map(subject => ({ description: subject.description, basis: {
        sourceId: sourceIds.get(`${subject.basis.claimId}:${subject.basis.evidenceId}`),
      } })) };
  }) };
  const candidateHash = createHash('sha256').update(JSON.stringify(candidate)).digest('hex');
  const reviewSkills = loadInstalledMediaSkills(settings.style, settings.instruction, 'review');
  const prompt = `Apply the shared scientific-critical-thinking skill below to the FINAL proposed research illustration. Use only the supplied analysis and original evidence; do not browse or operate tools. The image-specific task is to check what every axis, distance, color, region, arrow and curve communicates, including meaning introduced by composition and treatment. Decorative placement must not invent quantitative behavior or physical relationships.
Choose accepted only if the complete picture faithfully explains the supplied selected relationship. Science is carried in message/domain/subjects/encoding/labels/constraints plus title/narration; it is not yours to rewrite or replace. If any of those fields needs correction, or a different focus or source is necessary, return blocked and identify the exact scene, field, source and problem for upstream correction. Do not invent missing evidence or use a style reference as scientific authority.
If only artistic placement or treatment introduced a misleading meaning, return revised with a minimal correction to that scene's composition or treatment. Preserve scene order/count, all scientific fields and unaffected artwork. Composition chooses placement, focal scale, reading path and spacing; treatment chooses material, palette, edges and typography. Neither may add a new scientific mark, label, relationship or condition. Refer to existing subjects, encoding and labels. Do not reselect a topic, rewrite a complete storyboard or add another review stage.
Return ONLY JSON with EXACT keys {decision,summary,corrections}. decision is accepted|revised|blocked; summary is a concise explanation in the requested locale. For accepted or blocked, corrections MUST be []. For revised, corrections is a nonempty list of {sceneIndex,composition?,treatment?}; each existing zero-based sceneIndex appears once, with at least one changed field and no other keys. composition:nonempty single-line string<=200; treatment:nonempty single-line string<=220. No HTML or code. Keep corrections concise and in the requested locale. The final drawing instructions including unchanged scientific fields must fit 1500 characters; never shorten science to fit art. SourceIds and review notes are internal and are not drawn. Perform this focused audit yourself.
${reviewSkills.instructions}
${JSON.stringify({ locale: settings.locale, userRequest: settings.instruction, style: settings.style,
    upstream: selectedClaims.map(claim => ({ claimId: claim.id, parentClaimId: claim.parentClaimId ?? null, kind: claim.kind, assessment: claim.assessment, analysis: claim.statement,
      conditions: claim.conditions, limitations: claim.limitations,
      sourceIds: (claim.sourcePassages ?? []).map(passage => sourceIds.get(`${claim.id}:${passage.evidenceId}`)) })),
    sources: sources.map((source, index) => ({ sourceId: `s${index}`, text: source.text, relation: source.relation })), candidate: candidateView })}`;
  if (prompt.length > SCIENCE_REVIEW_MAX_PROMPT_CHARS) throw new Error('[blocked] Illustration review sources exceed the Chat input limit; select fewer Claims');
  const response = await gateway.reviewScientific({ requestId: context.authorizationContext.taskId,
    authorizationContext: context.authorizationContext, illustrationContext: context.illustrationContext,
    source: { kind: 'illustration-plan', researchObjectId: context.researchObjectId, versionId: context.versionId,
      sourceEvidenceIdentity: context.sourceEvidenceIdentity, candidateHash }, prompt });
  const review = object(JSON.parse(response.text.trim().replace(/^```(?:json)?\s*/u, '').replace(/\s*```$/u, '')));
  keys(review, ['decision', 'summary', 'corrections']);
  const decision = review.decision;
  if ((decision !== 'accepted' && decision !== 'revised' && decision !== 'blocked')
    || typeof review.summary !== 'string' || !review.summary.trim() || review.summary.length > 6000) {
    throw new Error('[blocked] Invalid scientific review decision');
  }
  if (!Array.isArray(review.corrections) || review.corrections.length > candidate.scenes.length
    || (decision !== 'revised' && review.corrections.length !== 0)) throw new Error('[blocked] Invalid scientific review corrections');
  if (decision === 'blocked') throw new Error('[blocked] Illustration needs upstream scientific revision: ' + review.summary.slice(0, 300));
  let document = candidate;
  if (decision === 'revised') {
    if (!review.corrections.length) throw new Error('[blocked] Revised review requires an actual correction');
    const scenes = [...candidate.scenes];
    const patched = new Set<number>();
    for (const raw of review.corrections) {
      const correction = object(raw);
      const index = correction.sceneIndex;
      if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index >= scenes.length || patched.has(index)
        || Object.keys(correction).some(key => !['sceneIndex', 'composition', 'treatment'].includes(key))
        || (!('composition' in correction) && !('treatment' in correction))) throw new Error('[blocked] Invalid scene correction');
      const scene = scenes[index]!;
      const illustration = parseIllustrationBrief({ ...scene.illustration!,
        ...('composition' in correction ? { composition: correction.composition } : {}),
        ...('treatment' in correction ? { treatment: correction.treatment } : {}) }, scene.sourceClaimIds);
      if (illustration.treatment.length > 220 || (illustration.composition === scene.illustration!.composition
        && illustration.treatment === scene.illustration!.treatment)) throw new Error('[blocked] Invalid or unchanged art correction');
      scenes[index] = { ...scene, illustration, visualAction: describeIllustrationBrief(illustration) };
      patched.add(index);
    }
    document = parseStoryboardDocument({ ...candidate, scenes }, claims.map(claim => claim.id), 'image');
  }
  for (const scene of document.scenes) {
    requireIllustrationSourceSupport(scene.illustration!, claims);
    compileIllustrationImagePrompt(scene.illustration!);
  }
  return { document, designSkills: reviewSkills.usage, provenance: { stage: 'final-brief', requestId: context.authorizationContext.taskId,
    decision, summary: review.summary, candidateHash, sourceEvidenceIdentity: context.sourceEvidenceIdentity,
    promptHash: response.promptHash, responseHash: response.responseHash, provider: 'chatgpt-web-science-review' } };
}
