import { PublicShell } from '@/components/shell/PublicShell';
import SiteHeader from '@/components/landing/SiteHeader';
import { JournalDirectory } from '@/components/journals/JournalDirectory';
import { JournalDirectoryActions } from '@/components/journals/JournalDirectoryActions';
import { getServerPublicJournals } from '@/lib/public-server-api';
import type { JournalSummary } from '@/lib/journal-api';

export default async function JournalsPage() {
  let initial: JournalSummary[] = []; let nextCursor: string | null = null;
  try { const page = await getServerPublicJournals(); initial = page.items; nextCursor = page.nextCursor; }
  catch { /* The client retries and reports recoverable failures. */ }
  return <PublicShell tone="paper" skipLabel="跳到内容" navigationLabel="主导航" wrapHeaderActionsOnMobile headerActions={<SiteHeader active="journals" context="public-product" tone="paper" />}>
    <section className="mx-auto max-w-[88rem] px-5 py-10 sm:px-8">
      <header className="border-b border-os-rule-paper pb-7"><h1 className="m-0 font-reading text-4xl font-normal tracking-[-.04em] text-os-ink sm:text-5xl">Browse all journals</h1><p className="mt-4 text-os-muted-paper">浏览平台已公开收录的期刊，查找论文及经审核的解析版本。</p></header>
      <JournalDirectory initial={initial} initialNextCursor={nextCursor} />
      <JournalDirectoryActions />
    </section>
  </PublicShell>;
}
