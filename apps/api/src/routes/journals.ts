import type { FastifyInstance } from 'fastify';
import { registerJournalRoutes as registerCoreRoutes } from './journal-core-routes';
import { registerJournalWorkbenchRoutes } from './journal-workbench';

export { fetchJournalDoiMetadata } from './journal-core-routes';

/** Keep existing authorization, job, credit and publishing routes unchanged. */
export function registerJournalRoutes(app: FastifyInstance, deps: Parameters<typeof registerCoreRoutes>[1]): void {
  registerCoreRoutes(app, deps);
  registerJournalWorkbenchRoutes(app, deps);
}
