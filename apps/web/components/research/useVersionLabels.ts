'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { VersionSummary } from '@/lib/api';

type LabeledVersion = Pick<VersionSummary, 'publicationNo' | 'createdAt' | 'commitMessage'>;

export function useVersionLabels() {
  const t = useTranslations('editHistory');
  const locale = useLocale();
  const date = (value: string | null | undefined) => {
    if (!value || !Number.isFinite(Date.parse(value))) return t('dateUnavailable');
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
  };
  const summary = (value: string | null | undefined) => {
    const text = value?.trim();
    return !text || /^(?:Draft revision|草稿修订)\s*\d+$/iu.test(text) ? t('savedDraft') : text;
  };
  const label = (version: LabeledVersion) => version.publicationNo != null
    ? t('publicVersion', { number: version.publicationNo })
    : `${date(version.createdAt)} · ${summary(version.commitMessage)}`;
  return { date, summary, label };
}
