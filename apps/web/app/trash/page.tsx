'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { DashboardShell } from '@/components/shell/DashboardShell';
import { apiRequest } from '@/lib/api';
import type { TrashResourceKind } from '@/components/research/TrashActionButton';
import styles from '@/components/research/content-management.module.css';

interface Entry { id: string; kind: TrashResourceKind; title: string; deletedAt: string; purgeAfter: string | null; state?: string; retainedReason?: string | null }

export default function TrashPage() {
  const t = useTranslations('trash');
  const locale = useLocale();
  const [items, setItems] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [selected, setSelected] = useState<Entry | null>(null);
  const confirm = useRef<HTMLDialogElement>(null);
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setItems((await apiRequest<{ items: Entry[] }>('/api/trash')).items); }
    catch { setError(t('loadFailed')); }
    finally { setLoading(false); }
  }, [t]);
  useEffect(() => { void load(); }, [load]);
  async function act(entry: Entry, action: 'restore' | 'purge') {
    setBusy(entry.id); setError(''); setStatus('');
    try {
      const result = await apiRequest<{ pending?: boolean; state?: string; entry?: { state?: string; retainedReason?: string | null } }>(`/api/trash/${encodeURIComponent(entry.id)}/${action}`, { method: 'POST', body: '{}' });
      confirm.current?.close();
      const state = result.state ?? result.entry?.state;
      setStatus(t(action === 'restore' ? 'restored' : state === 'purged' ? 'removed' : result.entry?.retainedReason ? 'retained' : 'purging'));
      await load();
    } catch { setError(t('operationFailed')); }
    finally { setBusy(null); }
  }
  return <DashboardShell activeRoute="dashboard" skipLabel={t('title')}>
    <div className="mx-auto max-w-4xl">
      <Link className={styles.link} href="/dashboard">← {t('back')}</Link>
      <h1 className="mt-5 text-4xl">{t('title')}</h1>
      <p className="mt-4 leading-7 text-os-muted-paper">{t('intro')}</p>
      {status && <p className="mt-4" role="status">{status}</p>}
      {error && <p className="mt-4" role="alert">{error} <button className={styles.action} type="button" onClick={() => void load()}>{t('retry')}</button></p>}
      {loading ? <p className="mt-8" role="status">{t('loading')}</p> : items.length === 0 ? <p className="mt-8 border-y border-os-rule-paper py-8">{t('empty')}</p> : <ul className={styles.list}>
        {items.map(entry => {
          const archived = entry.kind === 'research_object' && Boolean(entry.retainedReason);
          const purging = entry.state === 'purge_pending';
          return <li className={styles.row} key={entry.id}>
            <div><strong className={styles.itemTitle}>{entry.title || t(`kind.${entry.kind}`)}</strong><small>{t(`kind.${entry.kind}`)} · {new Date(entry.deletedAt).toLocaleString(locale)}</small><small>{archived ? t('archived') : purging ? t('purging') : entry.retainedReason ? t('retained') : entry.purgeAfter ? t('expires', { date: new Date(entry.purgeAfter).toLocaleString(locale) }) : ''}</small></div>
            <div className="flex flex-wrap gap-2">
              <button className={styles.action} type="button" disabled={busy !== null || purging} onClick={() => void act(entry, 'restore')}>{t('restore')}</button>
              {!archived && <button className={styles.action} type="button" disabled={busy !== null} onClick={() => { setSelected(entry); confirm.current?.showModal(); }}>{t(purging ? 'retry' : 'purge')}</button>}
            </div>
          </li>;
        })}
      </ul>}
    </div>
    <dialog ref={confirm} className={styles.dialog} aria-label={t('purge')} onCancel={event => { if (busy) event.preventDefault(); }}>
      <h2>{t('purge')}</h2><p className={styles.itemTitle}>{selected?.title}</p><p>{t('purgeBody')}</p>
      <div className={styles.actions}><button className={styles.action} type="button" disabled={busy !== null} onClick={() => confirm.current?.close()}>{t('cancel')}</button><button className={styles.primary} type="button" disabled={busy !== null} onClick={() => { if (selected) void act(selected, 'purge'); }}>{t(busy ? 'working' : 'purge')}</button></div>
      {error && <p role="alert" className={styles.error}>{error}</p>}
    </dialog>
  </DashboardShell>;
}
