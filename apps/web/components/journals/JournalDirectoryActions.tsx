'use client';
import Link from 'next/link';
import * as React from 'react';
import { getJournalAccess } from '@/lib/journal-workbench-api';
import { JournalShareButton } from './JournalShareButton';

export function JournalDirectoryActions() {
  const [canReview, setCanReview] = React.useState(false);
  React.useEffect(() => {
    let alive = true; let request = 0;
    function refresh() {
      const current = ++request; setCanReview(false);
      if (document.hidden) return;
      void getJournalAccess().then((access) => {
        if (alive && request === current) setCanReview(access.canReviewJournals === true);
      }).catch(() => { /* Fail closed for anonymous, expired or failed sessions. */ });
    }
    refresh();
    window.addEventListener('focus', refresh); window.addEventListener('storage', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      alive = false; request += 1;
      window.removeEventListener('focus', refresh); window.removeEventListener('storage', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);
  const style = 'inline-flex min-h-11 items-center border border-os-rule-paper px-4 text-sm text-os-ink no-underline';
  return <nav aria-label="期刊服务入口" className="mt-12 flex flex-wrap gap-3 border-t border-os-rule-paper pt-6">
    <Link href="/journals/apply" className={style}>申请期刊入驻</Link>
    <Link href="/journals/manage" className={style}>管理我的期刊</Link>
    <JournalShareButton path="/journals/apply" title="邀请期刊入驻 OpenScience" label="邀请期刊入驻" className={style} />
    {canReview ? <Link href="/admin/journals" prefetch={false} className={style}>审核期刊</Link> : null}
  </nav>;
}
