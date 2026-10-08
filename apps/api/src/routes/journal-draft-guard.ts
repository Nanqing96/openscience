import type { FastifyInstance } from 'fastify';
import {
  JournalError, journalScope, journalArticleInScope,
} from '@openscience/domain';
import { requireCurrentUser } from './session-guard';
import { archivedAtRevision } from './journal-draft-policy';
import type { registerJournalRoutes } from './journal-core-routes';

/** Keep legacy source/job/review endpoints from mutating an archived working revision.
 * Their existing transactional revision checks also reject requests overtaken by deletion.
 * Generic RO, artifact and agent endpoints keep their existing journal boundary guard.
 */
export function registerJournalDraftGuard(app: FastifyInstance, deps: Parameters<typeof registerJournalRoutes>[1]): void {
  app.addHook('preHandler', async (req, reply) => {
    const route = req.routeOptions.url;
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) ||
        !route.startsWith('/journals/:id/articles/:articleId') || route.endsWith('/draft/restore')) return;
    reply.header('Cache-Control', 'no-store');
    const user = await requireCurrentUser(deps, req, reply);
    if (!user) return reply;
    const { id, articleId } = req.params as { id: string; articleId: string };
    // Invalid path identifiers are handled by the route's existing request validator.
    const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuid.test(id) || !uuid.test(articleId)) return;
    const access = await journalScope(deps.prisma, id, user.userId);
    const article = await journalArticleInScope(deps.prisma, id, articleId);
    if (access.membership.role === 'reviewer' && article.assignedReviewerId !== user.userId) {
      throw new JournalError('JOURNAL_NOT_FOUND', '未分配此论文的审核权限');
    }
    const archive = await deps.prisma.journalEvent.findFirst({
      where: { journalId: id, targetType: 'article', targetId: articleId, action: 'journal.draft.archive' },
      orderBy: { createdAt: 'desc' },
    });
    if (archivedAtRevision(archive?.after, article.revision)) {
      throw new JournalError('INVALID_STATE', '草稿已删除，请先从“已删除草稿”恢复后再编辑或加工。');
    }
  });
}
