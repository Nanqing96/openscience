import type { PublicEvidenceSource, PublicResearchVersion } from './api';
import type { EditorialCollectionApi } from './api';
import type { JournalPublic } from './journal-api';
import type { JournalSummary } from './journal-api';
import type { PublicJournalArticle } from './journal-api';

export class PublicServerApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}

function serverApiOrigin() {
  return (process.env.API_ORIGIN ?? 'http://127.0.0.1:3001').replace(/\/$/, '');
}

async function serverRequest<T>(path: string): Promise<T> {
  const response = await fetch(`${serverApiOrigin()}${path}`, { cache: 'no-store' });
  if (!response.ok) throw new PublicServerApiError(response.status, `Public API request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export function getServerPublicResearchVersion(publicId: string, versionNo: number) {
  return serverRequest<{ research: PublicResearchVersion }>(`/research/${encodeURIComponent(publicId)}/v/${versionNo}`);
}

export function getServerPublicEvidenceSource(publicId: string, versionNo: number, evidenceId: string) {
  return serverRequest<PublicEvidenceSource>(
    `/research/${encodeURIComponent(publicId)}/v/${versionNo}/evidence/${encodeURIComponent(evidenceId)}/source`,
  );
}

export async function getLatestPublicResearchVersion(publicId: string) {
  const overview = await serverRequest<{ research: { latestVersion: number | null } }>(`/research/${encodeURIComponent(publicId)}`);
  if (!overview.research.latestVersion) throw new PublicServerApiError(404, 'No public version');
  return getServerPublicResearchVersion(publicId, overview.research.latestVersion);
}

export function getPublicEditorialCollection(slug: string) {
  return serverRequest<{ collection: EditorialCollectionApi }>(`/editorial/collections/${encodeURIComponent(slug)}`);
}

/** Public journal routes are rendered on the server so crawlers receive the real directory content. */
export function getServerPublicJournal(slug: string) {
  return serverRequest<{ journal: JournalPublic }>(`/journals/${encodeURIComponent(slug)}`);
}
export function getServerPublicJournals(cursor?: string, limit = 20) { return serverRequest<{ items: JournalSummary[]; nextCursor: string | null }>(`/journals?limit=${limit}${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`); }
export function getServerPublicJournalArticles(id: string, cursor?: string, limit = 20) { return serverRequest<{ items: PublicJournalArticle[]; nextCursor: string | null }>(`/journals/${encodeURIComponent(id)}/articles?limit=${limit}${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`); }
