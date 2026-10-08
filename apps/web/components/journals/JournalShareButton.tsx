'use client';
import * as React from 'react';

export function JournalShareButton({ path, title, label = '分享', className = '' }: {
  path: string; title: string; label?: string; className?: string;
}) {
  const [message, setMessage] = React.useState('');
  const [fallback, setFallback] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  async function share() {
    if (busy || !path.startsWith('/') || path.startsWith('//')) return;
    setBusy(true); setMessage(''); setFallback('');
    const url = new URL(path, window.location.origin).href;
    try {
      if (navigator.share) {
        try { await navigator.share({ title, url }); return; }
        catch (error) { if (error instanceof Error && error.name === 'AbortError') return; }
      }
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url); setMessage('链接已复制');
    } catch { setFallback(url); setMessage('请复制下方链接'); }
    finally { setBusy(false); }
  }
  return <span className="inline-flex flex-wrap items-center gap-2">
    <button type="button" className={className} disabled={busy} onClick={() => void share()}>{label}</button>
    <span role="status" className="text-xs text-os-muted-paper">{message}</span>
    {fallback ? <input aria-label="分享链接" className="min-h-10 max-w-full border border-os-rule-paper bg-transparent px-2 text-sm" value={fallback} readOnly onFocus={(event) => event.currentTarget.select()} /> : null}
  </span>;
}
