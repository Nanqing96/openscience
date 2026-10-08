'use client';
import { JournalManagementWorkbench } from './JournalManagementWorkbench';
/** Legacy entry shares the draft-first workbench; no second priority queue. */
export function JournalProcessingQueue({ journalId }: { journalId: string }) {
  return <JournalManagementWorkbench journalId={journalId} />;
}
