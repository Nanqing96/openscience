'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { journalDisplayName, suggestJournalSlug, journalEnglishMetadataIssues, JOURNAL_APPLICATION_REQUIRED_FIELDS } from '@openscience/domain/journal-form-contract';
import { reviewJournalApplication, type JournalApplication } from '@/lib/journal-api';

type Decision = 'approved' | 'rejected' | 'needs_information';
type Feedback = { kind: 'error' | 'success'; message: string };

export function JournalApplicationReviewCard({ application, onReviewed, onRefresh }: {
  application: JournalApplication;
  onReviewed: (application: JournalApplication) => Promise<void>;
  onRefresh: () => Promise<void>;
}) {
  const t = useTranslations('journalApplication');
  const adminT = useTranslations('journalAdmin');
  const [slug, setSlug] = React.useState(() => suggestJournalSlug(application.nameEn));
  const [reason, setReason] = React.useState('');
  const [pending, setPending] = React.useState<Decision | null>(null);
  const [feedback, setFeedback] = React.useState<Feedback | null>(null);
  const inFlight = React.useRef(false);
  const feedbackRef = React.useRef<HTMLDivElement>(null);
  const reasonRef = React.useRef<HTMLTextAreaElement>(null);
  const fieldIssues = journalEnglishMetadataIssues(application, JOURNAL_APPLICATION_REQUIRED_FIELDS);
  const issueFields = fieldIssues.map(({ field }) => t('fields.' + field)).join(', ');
  const submitted = application.status === 'submitted';

  React.useEffect(() => {
    if (!feedback) return;
    feedbackRef.current?.focus({ preventScroll: true });
    feedbackRef.current?.scrollIntoView({ block: 'nearest' });
  }, [feedback]);

  async function decide(decision: Decision) {
    if (inFlight.current || !submitted) return;
    if (decision === 'approved' && fieldIssues.length) {
      setFeedback({ kind: 'error', message: adminT('englishRequired', { fields: issueFields }) });
      return;
    }
    if (decision !== 'approved' && !reason.trim()) {
      setFeedback({ kind: 'error', message: adminT('reasonRequired') });
      return;
    }
    if (decision === 'approved' && (slug.length < 3 || slug.length > 80 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))) {
      setFeedback({ kind: 'error', message: t('slugError') });
      return;
    }
    inFlight.current = true; setPending(decision); setFeedback(null);
    try {
      const result = await reviewJournalApplication(application.id, {
        decision, ...(reason.trim() ? { reason: reason.trim() } : {}), ...(decision === 'approved' ? { slug } : {}),
      });
      setFeedback({ kind: 'success', message: adminT('reviewCompleted', { status: t('status.' + result.application.status) }) });
      await onReviewed(result.application);
    } catch (error) {
      setFeedback({ kind: 'error', message: adminT('reviewFailed', { detail: error instanceof Error ? error.message : adminT('loadFailed') }) });
    } finally { inFlight.current = false; setPending(null); }
  }

  const buttonClass = 'min-h-11 border border-os-rule-paper px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50';
  return <article className="border-b border-os-rule-paper py-5" aria-busy={pending !== null}>
    <p className="text-sm text-os-muted-paper">{t('status.' + application.status)} · {application.applicantEmail}</p>
    <h3 className="my-2 text-lg font-normal">{journalDisplayName(application)}</h3>
    <p className="break-all text-sm">{t('applicationNumber')} {application.id}</p>
    <p className="text-sm">{t('fields.publisherName')}：{application.publisherName} · {t('fields.sponsorName')}：{application.sponsorName || '—'}</p>
    <p className="text-sm">{t('fields.subjects')}：{application.subjects?.join(', ')}</p>
    <p className="text-sm">{t('fields.applicantName')}：{application.applicantName} · {application.applicantTitle}</p>
    <p className="whitespace-pre-wrap text-sm">{t('fields.representationEvidence')}：{application.representationEvidence}</p>
    {application.reviewReason ? <p className="text-sm text-os-vermilion-ink">{adminT('previousReason', { reason: application.reviewReason })}</p> : null}
    {submitted ? <>
      <label className="mt-3 grid gap-2 text-sm">{t('slugLabel')}
        <input disabled={pending !== null} className="min-h-11 border border-os-rule-paper bg-transparent px-3" maxLength={80} value={slug} onChange={(event) => setSlug(event.target.value)} />
        <span className="text-os-muted-paper">{t('slugHelp')}</span>
      </label>
      {fieldIssues.length ? <div className="mt-4 border-l-2 border-os-vermilion-ink pl-4 text-sm">
        <p className="font-semibold">{adminT('englishNotice')}</p>
        <ul>{fieldIssues.map(({ field, reason: issueReason }) => <li key={field}>{t(issueReason === 'required' ? 'requiredError' : 'englishError', { field: t('fields.' + field) })}</li>)}</ul>
        <p>{adminT('correctionHelp')}</p>
        <button type="button" className={buttonClass} disabled={pending !== null} onClick={() => { setReason(adminT('correctionReason', { fields: issueFields })); reasonRef.current?.focus(); }}>{adminT('fillReason')}</button>
      </div> : null}
      <label className="mt-4 grid gap-2 text-sm">{adminT('reasonLabel')}
        <textarea ref={reasonRef} aria-label={`${journalDisplayName(application)} ${adminT('reasonLabel')}`} disabled={pending !== null} className="w-full border border-os-rule-paper bg-transparent p-3" maxLength={2000} rows={3} placeholder={adminT('reasonPlaceholder')} value={reason} onChange={(event) => setReason(event.target.value)} />
      </label>
    </> : null}
    {feedback ? <div ref={feedbackRef} tabIndex={-1} role={feedback.kind === 'error' ? 'alert' : 'status'} className="mt-4 border border-os-rule-paper p-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring">
      <p className="m-0">{feedback.message}</p>
      {feedback.kind === 'error' ? <button type="button" disabled={pending !== null} className={`${buttonClass} mt-3`} onClick={() => void onRefresh()}>{adminT('refreshStatus')}</button> : null}
    </div> : null}
    {submitted ? <div className="mt-3 flex flex-wrap gap-2">
      {(['approved', 'needs_information', 'rejected'] as const).map((decision) => <button type="button" key={decision} className={buttonClass} disabled={pending !== null} onClick={() => void decide(decision)}>{pending === decision ? adminT('processing') : adminT('decision.' + decision)}</button>)}
    </div> : null}
  </article>;
}
