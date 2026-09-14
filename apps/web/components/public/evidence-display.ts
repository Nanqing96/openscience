import type { PublicEvidence } from '../../lib/api';
import { withoutInternalSourceMarkers } from '../content/ScientificText';

// Older reviewed-note imports included an operational preface in the claim.
// Remove only that complete, recognized preface from reading; keep the record intact.
export function claimReadingBody(statement: string) {
  return statement.replace(/^制作依据：已核对科研笔记 [0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}；以下正文原样转入，引用编号与该笔记一致。\s*/iu, '');
}

/** Only detach a single-line prose paragraph. Complex Markdown stays together. */
export function claimPreviewEnd(body: string) {
  if (body.length <= 800) return -1;
  const end = body.indexOf('\n\n');
  if (end <= 0) return -1;
  const paragraph = withoutInternalSourceMarkers(body.slice(0, end));
  if (/\n|`|^\s*(?:[#>*+|~\-]|\d+[.)])|\[|\]|\$\$|\\[()[\]]/u.test(paragraph)) return -1;
  // An unmatched inline delimiter could pair with one in the remaining text.
  const dollars = paragraph.match(/(?<!\\)\$/gu)?.length ?? 0;
  return dollars % 2 === 0 ? end : -1;
}

export function evidenceReadingTitle(evidence: PublicEvidence) {
  return /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}\s+\[?S\d{1,4}\]?$/iu.test(evidence.title.trim()) ? '' : evidence.title;
}

export function groupEvidenceBySource(evidence: PublicEvidence[]) {
  const groups = new Map<string, { file: string; page: number | null; items: PublicEvidence[] }>();
  for (const item of evidence) {
    const page = typeof item.locator.page === 'number' ? item.locator.page : null;
    const file = item.artifact.logicalPath;
    const key = JSON.stringify([file, item.artifact.contentHash, page]);
    const group = groups.get(key) ?? { file, page, items: [] };
    group.items.push(item);
    groups.set(key, group);
  }
  return [...groups.values()].sort((a, b) => a.file.localeCompare(b.file) || (a.page ?? Infinity) - (b.page ?? Infinity)).map(group => ({
    ...group,
    items: group.items.sort((a, b) => String(a.locator.blockId ?? '').localeCompare(String(b.locator.blockId ?? ''), undefined, { numeric: true })),
  }));
}
