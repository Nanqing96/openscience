import { PresentationAssetError } from './errors';

export interface IllustrationBrief {
  schemaVersion: 1;
  message: string;
  domain: 'real-space' | 'wavevector-space' | 'time' | 'frequency' | 'parameter-space' | 'conceptual';
  subjects: Array<{ description: string; basis: { claimId: string; evidenceId: string; quote: string } }>;
  composition: string;
  treatment: string;
  labels: string[];
  constraints: string[];
}
export function parseIllustrationBrief(value: unknown, claimIds?: readonly string[]): IllustrationBrief {
  const fail = (): never => { throw new PresentationAssetError('VALIDATION_ERROR', 'illustration_brief:invalid_shape_or_length'); };
  if (!value || typeof value !== 'object' || Array.isArray(value)) return fail();
  const v = value as Record<string, unknown>;
  if (Object.keys(v).sort().join(',') !== 'composition,constraints,domain,labels,message,schemaVersion,subjects,treatment' || v.schemaVersion !== 1
    || !['real-space', 'wavevector-space', 'time', 'frequency', 'parameter-space', 'conceptual'].includes(String(v.domain))) return fail();
  const line = (input: unknown, max: number): string => {
    if (typeof input !== 'string' || !input.trim() || input.length > max || /[\u0000-\u001f]/.test(input)) return fail();
    return input.trim();
  };
  const list = (input: unknown, min: number, max: number, length: number): string[] => {
    if (!Array.isArray(input) || input.length < min || input.length > max) return fail();
    return input.map(item => line(item, length));
  };
  if (!Array.isArray(v.subjects) || v.subjects.length < 1 || v.subjects.length > 4) return fail();
  const subjects = v.subjects.map((raw) => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw) || Object.keys(raw).sort().join(',') !== 'basis,description') return fail();
    const b = raw.basis;
    if (!b || typeof b !== 'object' || Array.isArray(b) || Object.keys(b).sort().join(',') !== 'claimId,evidenceId,quote') return fail();
    const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (typeof b.claimId !== 'string' || !uuid.test(b.claimId) || (claimIds && !claimIds.includes(b.claimId))
      || typeof b.evidenceId !== 'string' || !uuid.test(b.evidenceId)
      || typeof b.quote !== 'string' || b.quote.trim().length < 12 || b.quote.length > 12000) return fail();
    return { description: line(raw.description, 100), basis: { claimId: b.claimId, evidenceId: b.evidenceId, quote: b.quote } };
  });
  return { schemaVersion: 1, message: line(v.message, 120), domain: v.domain as IllustrationBrief['domain'],
    subjects, composition: line(v.composition, 400), treatment: line(v.treatment, 240),
    labels: list(v.labels, 0, 8, 80), constraints: list(v.constraints, 1, 5, 120) };
}

/** One representation shared by plan review and image compilation. */
export function describeIllustrationBrief(brief: IllustrationBrief): string {
  return `核心关系：${brief.message}。科学域：${brief.domain}。对象：${brief.subjects.map(subject => subject.description).join('；')}。构图：${brief.composition}。视觉处理：${brief.treatment}。可见标签：${brief.labels.length ? brief.labels.join('；') : '无'}。科学限定：${brief.constraints.join('；')}。`;
}

export function requireIllustrationSourceSupport(brief: IllustrationBrief, claims: readonly {
  id: string; sourcePassages?: readonly { evidenceId: string; text: string }[];
}[]): void {
  for (const subject of brief.subjects) {
    const b = subject.basis;
    if (!claims.find(claim => claim.id === b.claimId)?.sourcePassages?.some(passage => passage.evidenceId === b.evidenceId && passage.text.includes(b.quote))) {
      throw new PresentationAssetError('SOURCE_CLAIM_INVALID', 'illustration_brief:original_passage_changed');
    }
  }
}
