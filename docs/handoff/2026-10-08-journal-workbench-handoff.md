# Journal workbench: first development increment

**Status: DRAFT / NOT READY TO MERGE OR DEPLOY.**

## Baseline and scope

User approval: 2026-10-08, following the journal frontend requirements confirmation.
Development branch: `codex/journal-hermes-workbench-20261008`.
Base branch: `codex/journal-onboarding`, pinned at
`96e5e0c626ac44427e2e92684e104e4e5d4b0dfd`.
This is not a claim about the currently deployed production release.
No production data, releases, credentials, model calls or deployment configuration were changed.

## Implemented in this increment

| Area | Changes |
| --- | --- |
| Public directory | Browse all journals; separate search, subject and OA filters; A-Z and explicitly platform-scoped article count sorting; minimal title/publisher/subjects cards; footer actions. |
| Metadata honesty | Missing OA remains unknown. Citation sorting is disabled without data. Existing subject tags are used; an official Clarivate taxonomy has not been imported. |
| Public journal page | Separate print/electronic ISSNs, multiple topics, validated official/original URLs, sharing of the public URL, and links only to available public interpretation releases. |
| Workbench | Draft-first views, two clickable paper-deduplicated metrics, DOI preview/import without automatic generation, preserved historical no-DOI records, delete/restore working drafts. |
| Permissions | Platform-admin capability endpoint for the review entry. Draft deletion reuses journal transactions, membership and revision checks; it rejects active tasks, submitted/approved drafts and published releases. |
| Legacy mutations | An archive preHandler blocks old source/edit/generation/review/publish paths until explicit restoration. Existing domain revision checks remain necessary for concurrent requests. Generic journal resource boundary checks are unchanged. |
| Rights form | Scope recalculation is inside the scope panel. Expiry input is removed while recorded expiry is preserved. Hermes processing consent is distinct from publication consent. Required evidence has a placeholder example. Original-figure permission uses explanatory wording. |
| Existing governance | Member and homepage operations are retained. Services/credits remain accessible through the existing service page; no new pricing or quota policy was introduced. |

Deletion is a reversible archive of a working revision, represented by an append-only
journal event plus a revision increment. It does not remove the Research Object,
original article identity, file artifacts, historical processing results or public releases.
No database migration is introduced by this increment.

## Important work NOT completed

1. **Shared paper upload, file management and Hermes ingestion are NOT connected yet.**
   `JournalArticleWorkbench` still uses the existing journal pipeline. The new consent wording
   is not evidence of a completed Hermes integration. `journal-boundary.ts` deliberately blocks
   generic writes to journal-owned resources; do not remove that guard or add a simple URL bypass.
   The next implementation must provide a journal-scoped adapter to the common artifact/ingestion
   services, with authorization, task/result association and permission revalidation.
2. Preserve the journal approval gate when adopting common six-field results. Confirmation of a
   Hermes result must not publish it. Figure cards/FAQ remain part of journal editorial work.
   In particular, common commit APIs accept complete artifact sets; an append adapter must not
   accidentally remove existing files. Matching a DOI must never grant access to another user's RO.
3. Actual OA/citation metadata providers, consistent metric provenance, hierarchical subject
   taxonomy, and directory entries independent of onboarding remain to be implemented.
4. AI journal recommendation and writing tools are not added as nonfunctional buttons.
   Single-journal automatic routing is also not implemented in the existing My Journals page.
5. Full TypeScript/build, real PostgreSQL concurrency/tenancy checks and browser accessibility,
   desktop/mobile layout and navigation tests remain required. Existing UI tests refer to old
   controls and need updating against this increment, rather than being weakened or disabled.
6. Update the root `project_index.md` with the changes listed below before merge. The original
   index has not been overwritten or truncated; this handoff currently records the index delta.

## Local verification actually performed

- Node 22.16.0 / TypeScript 5.8.3.
- `node --test scripts/test-journal-workbench.mjs`: **27 passed, 0 failed**.
  These are pure policy tests, actual archive-guard execution with isolated dependencies,
  and TypeScript transpilation syntax checks. They are NOT live HTTP/DB/browser tests.
- Strict TypeScript check of `journal-workbench-model.ts` and `journal-draft-policy.ts`: passed.
- A full checkout/dependency installation was not available in the coding runtime: direct Git
  transport failed DNS resolution. Repository reads and development-branch writes used the
  connected GitHub API. Full application builds were not represented as passing.

In a complete checkout, run the new tests and the existing journal workflow. Keep the PR as a
DRAFT until the shared-processing implementation and the full acceptance checks are complete.
The existing journal workflow is a test workflow, not permission to deploy production.

## File-index delta

| Path | Role |
| --- | --- |
| `apps/api/src/routes/journal-core-routes.ts` | Exact original `journals.ts` contents retained, without changing existing rights/jobs/publication routes. |
| `apps/api/src/routes/journals.ts` | Registers the archive guard, existing core routes and new workbench endpoints. |
| `apps/api/src/routes/journal-workbench.ts` | Admin-entry capability, paginated workbench records, transactional draft archive/restore. |
| `apps/api/src/routes/journal-draft-policy.ts` | Pure deletion-state and revision-bound archive rules. |
| `apps/api/src/routes/journal-draft-guard.ts` | Blocks archived revisions through legacy mutation routes. |
| `apps/web/lib/journal-workbench-model.ts` | Pure views/filter/sort/count/loading/link rules. |
| `apps/web/lib/journal-workbench-api.ts` | Workbench and archive/restore API client. |
| `apps/web/lib/journal-rights-form.ts` | Explicit consent projection and historical-evidence preservation. |
| `apps/web/components/landing/SiteHeader.tsx` | Journal as the last business navigation item. |
| `apps/web/components/journals/JournalDirectory.tsx` | Public directory search/filter/sort/card view. |
| `apps/web/components/journals/JournalDirectoryActions.tsx` | Footer links and fail-closed admin visibility. |
| `apps/web/components/journals/JournalShareButton.tsx` | Native share, clipboard and selectable-link fallback. |
| `apps/web/components/journals/JournalManagementWorkbench.tsx` | Draft-first workbench and clickable count views. |
| `apps/web/components/journals/JournalDoiImport.tsx` | Preview-before-import and retryable DOI failures. |
| `apps/web/components/journals/JournalGovernance.tsx` | Preserved member/homepage management. |
| `apps/web/components/journals/JournalProcessingQueue.tsx` | Compatibility entry into the common workbench UI. |
| `apps/web/components/journals/JournalSourceRightsMatrix.tsx` | Simplified consent/evidence/scope interface. |
| `apps/web/app/journals/page.tsx` | Public journal directory shell. |
| `apps/web/app/journals/[slug]/page.tsx` | Public journal homepage and article links. |
| `apps/web/app/journals/manage/[id]/processing/page.tsx` | Old bookmark redirect to the draft box. |
| `scripts/test-journal-workbench.mjs` | Isolated policy/guard/syntax tests. |
| `docs/handoff/2026-10-08-journal-workbench-handoff.md` | This implementation record, limitations and index delta. |

## Acceptance gates before merge

Verify anonymous/member/admin review-entry visibility and direct-endpoint rejection; reviewer
assignment and cross-journal isolation; active-task deletion races; archive/restore versus stale
revision submissions; old generic RO/file/agent bypass protection; immutable public releases;
expired/revoked rights; import idempotency; deduplicated counts against the actual linked lists;
sharing without private URLs; and existing materials surviving common-file integration.

Directory/workbench loading currently collects a bounded complete result before client-side
filtering. It fails explicitly at its limit rather than inventing partial totals. Server-side
filter/sort/pagination and lightweight list projections are required before scaling this approach.
