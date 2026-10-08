'use client';
import Link from 'next/link';
import * as React from 'react';
import { listJournals, type JournalSummary } from '@/lib/journal-api';
import { collectAllPages, directoryName, selectDirectory, type AccessFilter, type DirectoryRecord, type DirectorySort } from '@/lib/journal-workbench-model';

type Filters = { query: string; subject: string; access: AccessFilter; sort: DirectorySort };
const defaults: Filters = { query: '', subject: '', access: 'all', sort: 'az' };
const emptyInitial: JournalSummary[] = [];
const pageSize = 24;
export function JournalDirectory({ initial = emptyInitial, initialNextCursor = null }: {
  initial?: JournalSummary[]; initialNextCursor?: string | null;
}) {
  const [items, setItems] = React.useState<Array<JournalSummary & DirectoryRecord>>([]);
  const [filters, setFilters] = React.useState<Filters>(defaults);
  const [term, setTerm] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [reload, setReload] = React.useState(0);
  React.useEffect(() => {
    function restore() {
      const params = new URLSearchParams(window.location.search);
      const access = params.get('access'); const sort = params.get('sort');
      const next: Filters = {
        query: params.get('q') ?? '', subject: params.get('subject') ?? '',
        access: access === 'open' || access === 'closed' || access === 'unknown' ? access : 'all',
        sort: sort === 'paper_count' || sort === 'citation_count' ? sort : 'az',
      };
      setFilters(next); setTerm(next.query); setPage(1);
    }
    restore(); window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);
  React.useEffect(() => {
    const controller = new AbortController(); setLoading(true); setError('');
    void collectAllPages<JournalSummary>((cursor) => {
      if (!cursor && reload === 0 && initial.length) return Promise.resolve({ items: initial, nextCursor: initialNextCursor });
      return listJournals({ limit: 100, cursor });
    }, { signal: controller.signal }).then((rows) => {
      if (!controller.signal.aborted) setItems(rows);
    }).catch((cause) => {
      if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : '暂时无法加载期刊目录。');
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [initial, initialNextCursor, reload]);
  function update(next: Filters) {
    setFilters(next); setPage(1);
    const url = new URL(window.location.href);
    for (const key of ['q', 'subject', 'access', 'sort']) url.searchParams.delete(key);
    if (next.query) url.searchParams.set('q', next.query);
    if (next.subject) url.searchParams.set('subject', next.subject);
    if (next.access !== 'all') url.searchParams.set('access', next.access);
    if (next.sort !== 'az') url.searchParams.set('sort', next.sort);
    window.history.pushState(null, '', url);
  }
  const subjects = React.useMemo(() => [...new Set(items.flatMap((item) => item.subjects))].sort((a, b) => a.localeCompare(b, ['en', 'zh'])), [items]);
  const hasOA = items.some((item) => typeof item.openAccess === 'boolean');
  const hasCitations = items.some((item) => typeof item.citationCount === 'number');
  const effectiveSort = filters.sort === 'citation_count' && !hasCitations ? 'az' : filters.sort;
  const result = selectDirectory(items, { ...filters, sort: effectiveSort });
  const pages = Math.max(1, Math.ceil(result.length / pageSize)); const currentPage = Math.min(page, pages);
  const control = 'min-h-11 max-w-full border border-os-rule-paper bg-transparent px-3 text-sm text-os-ink disabled:opacity-50';
  return <section className="mt-8" aria-label="期刊目录" aria-busy={loading}>
    <form className="flex flex-wrap gap-3" onSubmit={(event) => { event.preventDefault(); update({ ...filters, query: term.trim() }); }}>
      <label className="sr-only" htmlFor="journal-search">搜索期刊</label>
      <input id="journal-search" value={term} onChange={(event) => setTerm(event.target.value)} placeholder="搜索期刊名称、出版商、ISSN 或学科" className={`${control} min-w-0 flex-1`} />
      <button type="submit" disabled={loading} className="min-h-11 bg-accent-primary-strong px-5 text-sm font-semibold text-os-black-0 disabled:opacity-50">搜索</button>
    </form>
    <div className="mt-4 grid gap-4 border-b border-os-rule-paper pb-6 sm:grid-cols-3">
      <label className="grid gap-2 text-sm">Subject / 学科<select className={control} disabled={loading} value={filters.subject} onChange={(event) => update({ ...filters, subject: event.target.value })}>
        <option value="">全部学科</option>{filters.subject && !subjects.includes(filters.subject) ? <option value={filters.subject}>{filters.subject}</option> : null}{subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
      </select></label>
      <label className="grid gap-2 text-sm">Open Access / 开放获取<select className={control} disabled={loading} value={filters.access} onChange={(event) => update({ ...filters, access: event.target.value as AccessFilter })}>
        <option value="all">不限</option><option value="open">开放获取</option><option value="closed">非开放获取</option><option value="unknown">状态未核验</option>
      </select></label>
      <label className="grid gap-2 text-sm">Sort by / 排序<select className={control} disabled={loading} value={effectiveSort} onChange={(event) => update({ ...filters, sort: event.target.value as DirectorySort })}>
        <option value="az">A–Z</option><option value="paper_count">Paper count（平台收录论文数）</option><option value="citation_count" disabled={!hasCitations}>{hasCitations ? 'Citation count（来源统计被引次数）' : 'Citation count（待接入统计来源）'}</option>
      </select></label>
    </div>
    {!loading && !error && (!hasOA || !hasCitations) ? <p className="text-xs leading-6 text-os-muted-paper">{!hasOA ? '当前数据源尚未提供经核验的 OA 状态，未知不会被归为非开放获取。' : ''}{!hasCitations ? '引用量排序在统计来源接入后启用。' : ''}</p> : null}
    {loading ? <p className="py-10 text-os-muted-paper" role="status">正在加载期刊目录及筛选信息…</p> : error ? <div className="py-10" role="alert"><p>{error}</p><button className={control} onClick={() => setReload((value) => value + 1)}>重新加载</button></div> : <>
      <p className="my-5 text-sm text-os-muted-paper" role="status">找到 {result.length} 种期刊</p>
      {!result.length ? <div className="py-10"><p>暂未找到符合条件的期刊。</p><button className={control} onClick={() => { setTerm(''); update(defaults); }}>清除筛选条件</button></div> : null}
      <div className="grid gap-px bg-os-rule-paper sm:grid-cols-2 lg:grid-cols-3">{result.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((journal) => <Link href={`/journals/${encodeURIComponent(journal.slug)}`} key={journal.id} className="min-w-0 break-words bg-paper-bg p-6 no-underline transition-colors hover:bg-canvas-bg">
        <h2 className="m-0 text-xl font-normal text-os-ink">{directoryName(journal)}</h2>
        <p className="mt-4 text-sm text-os-muted-paper">{journal.publisherName || '出版商待补充'}</p>
        <p className="mt-4 text-xs leading-6 text-os-muted-paper">{journal.subjects.join(' · ') || '学科待补充'}</p>
      </Link>)}</div>
      {pages > 1 ? <nav aria-label="期刊分页" className="mt-6 flex flex-wrap items-center gap-4"><button className={control} disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>上一页</button><span className="text-sm">{currentPage} / {pages}</span><button className={control} disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}>下一页</button></nav> : null}
    </>}
  </section>;
}
