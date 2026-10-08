import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PublicShell } from '@/components/shell/PublicShell';
import SiteHeader from '@/components/landing/SiteHeader';
import { JournalShareButton } from '@/components/journals/JournalShareButton';
import { safePublicUrl } from '@/lib/journal-workbench-model';
import { getServerPublicJournal, getServerPublicJournalArticles, PublicServerApiError } from '@/lib/public-server-api';

export default async function JournalHome({ params, searchParams }: { params: { slug: string }; searchParams?: { cursor?: string } }) {
  let journal; let page;
  try {
    journal = (await getServerPublicJournal(params.slug)).journal;
    page = await getServerPublicJournalArticles(journal.id, searchParams?.cursor);
  } catch (error) { if (error instanceof PublicServerApiError && error.status === 404) notFound(); throw error; }
  const name = journal.nameEn || journal.nameZh; const website = safePublicUrl(journal.websiteUrl);
  const path = `/journals/${encodeURIComponent(journal.slug)}`;
  const control = 'inline-flex min-h-11 items-center border border-os-rule-paper px-4 text-sm text-os-ink no-underline';
  return <PublicShell tone="paper" skipLabel="跳到内容" navigationLabel="主导航" wrapHeaderActionsOnMobile headerActions={<SiteHeader active="journals" context="public-product" tone="paper" />}>
    <article className="mx-auto max-w-[78rem] break-words px-5 py-10 sm:px-8">
      <Link href="/journals" className="text-sm text-os-muted-paper">← 浏览所有期刊</Link>
      <header className="mt-6 border-b border-os-rule-paper pb-8">
        <p className="text-sm text-os-vermilion-ink">{journal.status === 'reverification' ? '编辑部身份复核中' : '编辑部身份已核验'}</p>
        <h1 className="font-reading text-4xl font-normal tracking-[-.04em] sm:text-5xl">{name}</h1>
        {journal.nameZh && journal.nameEn ? <p className="text-xl text-os-muted-paper">{journal.nameZh}</p> : null}
        <p className="mt-3 text-sm text-os-muted-paper">{journal.publisherName || '出版商待补充'}</p>
        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {journal.pIssn ? <div><dt className="text-os-muted-paper">ISSN（印刷版）</dt><dd className="m-0 mt-1">{journal.pIssn}</dd></div> : null}
          {journal.eIssn ? <div><dt className="text-os-muted-paper">ISSN（电子版）</dt><dd className="m-0 mt-1">{journal.eIssn}</dd></div> : null}
          {!journal.pIssn && !journal.eIssn ? <div><dt>ISSN</dt><dd className="m-0">待补充</dd></div> : null}
          <div><dt className="text-os-muted-paper">Topics</dt><dd className="m-0 mt-1">{journal.subjects.join(' · ') || '待补充'}</dd></div>
        </dl>
        {['paused', 'closed'].includes(journal.status) ? <p className="mt-4 text-sm text-os-muted-paper">该期刊已暂停新增平台服务，既有公开内容按其授权状态保留。</p> : null}
        <p className="mt-5 max-w-3xl leading-7 text-os-muted-paper">{journal.description}</p>
        <div className="mt-5 flex flex-wrap gap-3">{website ? <a href={website} target="_blank" rel="noopener noreferrer" className={control}>访问期刊官网 ↗</a> : null}<JournalShareButton path={path} title={name} className={control} /></div>
      </header>
      <section className="mt-8" aria-label="文章列表"><h2 className="text-2xl font-normal">文章列表</h2>
        {!page.items.length ? <p className="py-8 text-os-muted-paper">当前页暂无公开论文。</p> : <div className="divide-y divide-os-rule-paper">{page.items.map((article) => {
          const original = safePublicUrl(article.metadata.originalUrl);
          const release = article.contentState === 'active' ? article.releases.find((item) => item.url.startsWith('/research/')) : undefined;
          return <article className="py-5" key={article.id}>
            <p className="m-0 text-sm text-os-muted-paper">{article.metadata.publishedDate ?? '出版日期待补充'}</p><h3 className="my-2 text-xl font-normal">{article.metadata.title}</h3><p className="text-sm text-os-muted-paper">{article.metadata.authors.join('，')}</p>
            {article.contentState !== 'active' ? <p className="text-sm text-os-vermilion-ink">平台解读{article.contentState === 'withdrawn' ? '已撤回' : '已限制公开'}</p> : null}
            <div className="mt-3 flex flex-wrap items-center gap-4">{release ? <Link href={release.url} className={control}>解析版本 · v{release.versionNo}</Link> : <span className="text-sm text-os-muted-paper">暂无公开解析版本</span>}{original ? <a href={original} target="_blank" rel="noopener noreferrer" className={control}>原文链接 ↗</a> : <span className="text-sm text-os-muted-paper">原文链接待核验</span>}</div>
          </article>;
        })}</div>}
        <nav aria-label="论文分页" className="mt-6 flex flex-wrap gap-5 text-sm">{searchParams?.cursor ? <Link href={path}>返回第一页</Link> : null}{page.nextCursor ? <Link href={`${path}?cursor=${encodeURIComponent(page.nextCursor)}`}>下一页论文 →</Link> : null}</nav>
      </section>
    </article>
  </PublicShell>;
}
