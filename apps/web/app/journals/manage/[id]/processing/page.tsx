import { redirect } from 'next/navigation';
/** Preserve bookmarks without keeping a second processing UI. */
export default function JournalProcessingPage({ params }: { params: { id: string } }) {
  redirect(`/journals/manage/${encodeURIComponent(params.id)}?view=drafts`);
}
