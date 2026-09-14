'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import type { PublicEvidence } from '../../lib/api';
import { ScientificText } from '../content/ScientificText';
import { evidenceReadingTitle, groupEvidenceBySource } from './evidence-display';
import styles from './PublicReadingProduct.module.css';
import {
  readLocalEvidenceDefaultCollapsed,
  subscribeEvidenceReadingPreference,
  writeLocalEvidenceDefaultCollapsed,
} from '../../lib/evidence-reading-preference';

export function EvidenceDisclosure({
  evidence,
  onInspect,
}: {
  evidence: PublicEvidence[];
  onInspect: (evidence: PublicEvidence) => void;
}) {
  const t = useTranslations('public.claimReader');
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    setCollapsed(readLocalEvidenceDefaultCollapsed());
    return subscribeEvidenceReadingPreference(setCollapsed);
  }, []);

  const toggle = () => {
    setCollapsed((current) => {
      const next = !current;
      writeLocalEvidenceDefaultCollapsed(next);
      return next;
    });
  };

  if (evidence.length === 0) return <p className="pub-evidence-empty">{t('noEvidence')}</p>;

  return (
    <section className={`pub-evidence-disclosure${collapsed ? ' is-collapsed' : ''}`} data-evidence-collapse-state={collapsed ? 'collapsed' : 'expanded'}>
      <div className="pub-evidence-heading">
        <h4>{t('evidenceCount', { count: evidence.length })}</h4>
        <button type="button" className="pub-text-button" aria-expanded={!collapsed} onClick={toggle}>
          {collapsed ? t('expandEvidence') : t('collapseEvidence')}
        </button>
      </div>
      <div className="pub-evidence-transcript" hidden={collapsed} data-evidence-transcript="true" data-print-evidence="true">
        {groupEvidenceBySource(evidence).map((group) => (
          <details className={styles.evidenceGroup} key={group.items[0].id}>
            <summary><span>{group.file}</span><span>{group.page === null ? t('passage') : t('page', { page: group.page })} · {t('passageCount', { count: group.items.length })}</span></summary>
            {group.items.map((item) => (
              <article className="pub-evidence-item" data-evidence-relation={item.relation} key={item.id}>
                <button type="button" className="pub-evidence-select" onClick={() => onInspect(item)}>
                  <span className="pub-evidence-relation">{t(`relation.${item.relation}`)}</span>
                  {evidenceReadingTitle(item) && <ScientificText as="strong" hideSourceMarkers>{evidenceReadingTitle(item)}</ScientificText>}
                  {item.exactQuote && <ScientificText as="q">{item.exactQuote}</ScientificText>}
                  <span className="pub-evidence-open">{t('inspectSource')}</span>
                </button>
              </article>
            ))}
          </details>
        ))}
      </div>
    </section>
  );
}
