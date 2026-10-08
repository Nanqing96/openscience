// Run from a complete checkout with dependencies installed:
// node --test scripts/test-journal-workbench.mjs
// Isolated policy/guard tests only: not a database, browser or Fastify integration suite.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = (path) => readFileSync(resolve(root, path), 'utf8');
function load(path, dependencies = {}) {
  const compiled = ts.transpileModule(source(path), { fileName: path, reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } });
  assert.equal(compiled.diagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error).length, 0, path);
  const module = { exports: {} };
  vm.runInNewContext(compiled.outputText, { module, exports: module.exports, URL, URLSearchParams, DOMException, AbortController,
    require(name) { if (Object.hasOwn(dependencies, name)) return dependencies[name]; throw new Error(`Unexpected runtime dependency: ${name}`); },
  }, { filename: path });
  return module.exports;
}
const model = load('apps/web/lib/journal-workbench-model.ts');
const policy = load('apps/api/src/routes/journal-draft-policy.ts');
const rights = load('apps/web/lib/journal-rights-form.ts');
const article = (patch = {}) => ({ id: 'a', revision: 3, contentState: 'active', reviewState: 'draft', jobs: [], releases: [], ...patch });
const journal = (id, patch = {}) => ({ id, nameZh: id, subjects: [], publicArticleCount: 0, ...patch });
const filters = (patch = {}) => ({ query: '', subject: '', access: 'all', sort: 'az', ...patch });
const ids = (rows) => rows.map((item) => item.id).join(',');

test('draft-first default, with a new working revision separate from a published release', () => {
  assert.equal(model.WORKBENCH_VIEWS[0], 'drafts');
  assert.equal(model.matchesWorkbenchView(article(), 'drafts'), true);
  assert.equal(model.matchesWorkbenchView(article({ releases: [{ revision: 3 }] }), 'drafts'), false);
  assert.equal(model.matchesWorkbenchView(article({ releases: [{ revision: 2 }] }), 'drafts'), true);
});
test('running jobs and pending approvals are excluded from the draft box', () => {
  for (const state of ['staging', 'pending', 'running']) {
    const row = article({ jobs: [{ state }] });
    assert.equal(model.matchesWorkbenchView(row, 'processing'), true);
    assert.equal(model.matchesWorkbenchView(row, 'drafts'), false);
  }
  for (const reviewState of ['submitted', 'approved']) {
    assert.equal(model.matchesWorkbenchView(article({ reviewState }), 'drafts'), false);
    assert.equal(model.matchesWorkbenchView(article({ reviewState }), 'review'), true);
  }
});
test('completed counts papers once, not jobs; completion is not public approval', () => {
  const rows = [article({ processingCompleted: true, publicInterpretation: false, jobs: [{ state: 'succeeded' }, { state: 'succeeded' }] }), article({ id: 'b', publicInterpretation: true })];
  assert.equal(rows.filter((row) => model.matchesWorkbenchView(row, 'completed')).length, 1);
  assert.equal(rows.filter((row) => model.matchesWorkbenchView(row, 'published')).length, 1);
});
test('current server publication capability takes precedence over historic releases', () => {
  assert.equal(model.matchesWorkbenchView(article({ publicInterpretation: false, releases: [{ revision: 1 }] }), 'published'), false);
});
test('archive is a reversible working-view state, not deletion of completion history', () => {
  const row = article({ draftArchived: true, processingCompleted: true });
  assert.equal(model.matchesWorkbenchView(row, 'archived'), true);
  assert.equal(model.matchesWorkbenchView(row, 'drafts'), false);
  assert.equal(model.matchesWorkbenchView(row, 'completed'), true);
});
test('only explicit editorial roles may delete an eligible draft', () => {
  for (const role of ['owner', 'admin', 'editor']) assert.equal(model.canDeleteDraft(article(), role), true);
  for (const role of ['', 'reviewer', 'platform_admin', 'unknown']) assert.equal(model.canDeleteDraft(article(), role), false);
});
test('the delete control is absent for in-flight, reviewing, restricted or released papers', () => {
  for (const patch of [{ contentState: 'restricted' }, { contentState: 'withdrawn' }, { draftArchived: true }, { reviewState: 'submitted' }, { reviewState: 'approved' }, { jobs: [{ state: 'running' }] }, { releases: [{ revision: 2 }] }]) {
    assert.equal(model.canDeleteDraft(article(patch), 'owner'), false);
  }
});
test('server deletion policy independently blocks unsafe states', () => {
  const row = { contentState: 'active', reviewState: 'draft', releaseCount: 0, activeJobCount: 0 };
  assert.equal(policy.draftDeletionBlock(row), null);
  for (const patch of [{ contentState: 'restricted' }, { contentState: 'withdrawn' }, { releaseCount: 1 }, { activeJobCount: 1 }, { reviewState: 'submitted' }, { reviewState: 'approved' }]) assert.ok(policy.draftDeletionBlock({ ...row, ...patch }));
});
test('archive events bind to an exact numeric article revision', () => {
  assert.equal(policy.archivedAtRevision({ revision: 3 }, 3), true);
  for (const after of [null, undefined, [], {}, { revision: 2 }, { revision: '3' }]) assert.equal(policy.archivedAtRevision(after, 3), false);
});
test('OA missing/null is unknown, not closed access', () => {
  const rows = [journal('open', { openAccess: true }), journal('closed', { openAccess: false }), journal('missing'), journal('null', { openAccess: null })];
  assert.equal(ids(model.selectDirectory(rows, filters({ access: 'open' }))), 'open');
  assert.equal(ids(model.selectDirectory(rows, filters({ access: 'closed' }))), 'closed');
  assert.equal(ids(model.selectDirectory(rows, filters({ access: 'unknown' }))), 'missing,null');
});
test('search uses titles, publisher, normalized ISSN and all subject labels', () => {
  const rows = [journal('one', { nameEn: 'Optics Research', publisherName: 'Publisher', pIssn: '1234-5678', subjects: ['Optics', 'Physics'] })];
  for (const query of ['optics', 'Publisher', '12345678', '1234-5678', 'physics']) assert.equal(model.selectDirectory(rows, filters({ query })).length, 1);
  assert.equal(model.selectDirectory(rows, filters({ subject: 'Physics' })).length, 1);
  assert.equal(model.selectDirectory(rows, filters({ subject: 'Medicine' })).length, 0);
});
test('sorting does not mutate source data and resolves metric ties deterministically', () => {
  const rows = [journal('z', { publicArticleCount: 2 }), journal('b', { publicArticleCount: 4 }), journal('a', { publicArticleCount: 4 })];
  assert.equal(ids(model.selectDirectory(rows, filters({ sort: 'paper_count' }))), 'a,b,z');
  assert.equal(ids(rows), 'z,b,a');
  assert.equal(ids(model.selectDirectory([journal('unknown'), journal('zero', { citationCount: 0 }), journal('ten', { citationCount: 10 })], filters({ sort: 'citation_count' }))), 'ten,zero,unknown');
});
test('all pages are collected and overlapping IDs deduplicated before filtering', async () => {
  let calls = 0;
  const rows = await model.collectAllPages(async (cursor) => { calls++; return cursor ? { items: [journal('a'), journal('c')], nextCursor: null } : { items: [journal('b'), journal('a')], nextCursor: 'next' }; });
  assert.equal(calls, 2); assert.equal(rows.length, 3);
  assert.equal(ids(model.selectDirectory(rows, filters())), 'a,b,c');
});
test('pagination cycles and excessive pages fail instead of reporting partial statistics', async () => {
  await assert.rejects(model.collectAllPages(async () => ({ items: [], nextCursor: 'same' })), /分页游标重复/);
  let count = 0;
  await assert.rejects(model.collectAllPages(async () => ({ items: [], nextCursor: String(++count) }), { maxPages: 2 }), /加载上限/);
});
test('aborted pagination stops before and after an in-flight page', async () => {
  const before = new AbortController(); before.abort(); let calls = 0;
  await assert.rejects(model.collectAllPages(async () => { calls++; return { items: [], nextCursor: null }; }, { signal: before.signal }), { name: 'AbortError' });
  assert.equal(calls, 0);
  const during = new AbortController();
  await assert.rejects(model.collectAllPages(async () => { during.abort(); return { items: [], nextCursor: 'next' }; }, { signal: during.signal }), { name: 'AbortError' });
});
test('external links reject unsafe schemes, credentials and malformed input', () => {
  for (const value of [null, '', 'javascript:alert(1)', 'data:text/html,test', 'https://u:password@example.org', '//example.org']) assert.equal(model.safePublicUrl(value), null);
  assert.equal(model.safePublicUrl('https://example.org/paper'), 'https://example.org/paper');
});
test('homepage activation is offered only for an active unpublished homepage', () => {
  assert.equal(model.shouldOfferHomepageActivation({ status: 'active', homepagePublished: false }), true);
  assert.equal(model.shouldOfferHomepageActivation({ status: 'paused', homepagePublished: false }), false);
  assert.equal(model.shouldOfferHomepageActivation({ status: 'active', homepagePublished: true }), false);
});
test('selecting a permission status never implicitly grants processing rights', () => {
  assert.equal(Object.values(rights.limitPermissions('full_public_processing_allowed', rights.emptySourcePermissions())).some(Boolean), false);
  const full = Object.fromEntries(rights.PERMISSION_KEYS.map((key) => [key, true]));
  assert.equal(Object.values(rights.limitPermissions('unknown', full)).some(Boolean), false);
});
test('Hermes consent does not authorize publication or original figure reuse', () => {
  const result = rights.setHermesConsent('full_public_processing_allowed', rights.emptySourcePermissions(), true);
  for (const key of rights.HERMES_PERMISSIONS) assert.equal(result[key], true);
  for (const key of ['publicDerivative', 'publicSource', 'figureReuse', 'derivativeIllustration']) assert.equal(result[key], false);
  assert.equal(Object.values(rights.setHermesConsent('unknown', rights.emptySourcePermissions(), true)).some(Boolean), false);
});
test('editing evidence preserves recorded expiry, never substitutes the placeholder', () => {
  const original = { statement: 'old', license: 'license', expiresAt: '2027-01-01T00:00:00Z', verifiedAt: '2026-01-01T00:00:00Z', verifiedBy: 'editor' };
  const result = rights.editSourceEvidence(original, ' new evidence ', 'license');
  assert.equal(result.statement, 'new evidence'); assert.equal(original.statement, 'old');
  for (const key of ['expiresAt', 'verifiedAt', 'verifiedBy']) assert.equal(result[key], original[key]);
  assert.throws(() => rights.editSourceEvidence(original, '  ', 'license'), /授权来源/);
});

// Execute the actual preHandler using isolated auth/domain/persistence doubles.
// These tests deliberately do not claim to test transaction isolation or a live server.
const journalId = '11111111-1111-4111-8111-111111111111';
const articleId = '22222222-2222-4222-8222-222222222222';
function guardHarness(patch = {}) {
  const state = { authenticated: true, role: 'author', assignedTo: 'user', revision: 3, archiveRevision: 3, reads: 0, allowed: true, ...patch };
  let hook;
  class JournalError extends Error { constructor(code, message) { super(message); this.code = code; } }
  const deps = { prisma: { journalEvent: { async findFirst() { state.reads++; return state.archiveRevision === null ? null : { after: { revision: state.archiveRevision } }; } } } };
  const implementation = load('apps/api/src/routes/journal-draft-guard.ts', {
    './journal-draft-policy': policy,
    './session-guard': { async requireCurrentUser(_deps, _req, reply) { if (!state.authenticated) { reply.status = 401; return null; } return { userId: 'user' }; } },
    '@openscience/domain': {
      JournalError,
      async journalScope(_tx, id) { if (!state.allowed || id !== journalId) throw new JournalError('FORBIDDEN', 'forbidden'); return { membership: { role: state.role } }; },
      async journalArticleInScope(_tx, id, aid) { if (id !== journalId || aid !== articleId) throw new JournalError('JOURNAL_NOT_FOUND', 'not found'); return { revision: state.revision, assignedReviewerId: state.assignedTo }; },
    },
  });
  implementation.registerJournalDraftGuard({ addHook(name, fn) { assert.equal(name, 'preHandler'); hook = fn; } }, deps);
  return { state, async invoke(method, suffix = '', params = { id: journalId, articleId }) {
    const reply = { status: 200, header() { return this; } };
    const result = await hook({ method, params, routeOptions: { url: `/journals/:id/articles/:articleId${suffix}` } }, reply);
    return { reply, result };
  } };
}
test('archived revisions cannot use any legacy mutation path', async () => {
  const harness = guardHarness();
  for (const [method, suffix] of [['PATCH', ''], ['POST', '/source-file'], ['POST', '/ai-drafts'], ['POST', '/processing-jobs'], ['POST', '/sources'], ['POST', '/review'], ['POST', '/publish'], ['DELETE', '/draft']]) {
    await assert.rejects(harness.invoke(method, suffix), { code: 'INVALID_STATE' });
  }
});
test('reads and explicit restore remain reachable without an archive bypass flag', async () => {
  const harness = guardHarness();
  await harness.invoke('GET'); await harness.invoke('POST', '/draft/restore');
  assert.equal(harness.state.reads, 0);
});
test('legacy mutation guard stops unauthenticated callers before any archive lookup', async () => {
  const harness = guardHarness({ authenticated: false }); const result = await harness.invoke('PATCH');
  assert.equal(result.reply.status, 401); assert.equal(result.result, result.reply); assert.equal(harness.state.reads, 0);
});
test('the guard denies cross-journal and unassigned reviewer access', async () => {
  const other = guardHarness();
  await assert.rejects(other.invoke('PATCH', '', { id: articleId, articleId }), { code: 'FORBIDDEN' });
  const reviewer = guardHarness({ role: 'reviewer', assignedTo: 'someone-else' });
  await assert.rejects(reviewer.invoke('POST', '/review'), { code: 'JOURNAL_NOT_FOUND' });
  assert.equal(reviewer.state.reads, 0);
});
test('restored/new working revisions pass through to existing route-level authorization', async () => {
  await guardHarness({ archiveRevision: 2 }).invoke('PATCH');
  await guardHarness({ archiveRevision: null }).invoke('POST', '/processing-jobs');
});
test('removed controls stay out of the new queue and manual no-DOI entry is not recreated', () => {
  const text = source('apps/web/components/journals/JournalManagementWorkbench.tsx') + source('apps/web/components/journals/JournalProcessingQueue.tsx');
  for (const label of ['标记重点', '延后 7 天', '确认并入队', '无 DOI 论文']) assert.equal(text.includes(label), false);
  assert.ok(text.includes('历史无 DOI 记录'));
  const form = source('apps/web/components/journals/JournalSourceRightsMatrix.tsx');
  assert.equal(form.includes('datetime-local'), false); assert.ok(form.includes('placeholder={RIGHTS_EXAMPLE}'));
  assert.ok(form.indexOf('重新评估范围') > form.indexOf('function Scope('));
});
test('all changed UI and guard files have no TypeScript transpilation syntax errors', () => {
  const paths = [
    'apps/api/src/routes/journals.ts', 'apps/api/src/routes/journal-draft-guard.ts', 'apps/api/src/routes/journal-draft-policy.ts',
    'apps/web/lib/journal-workbench-model.ts', 'apps/web/lib/journal-rights-form.ts',
    'apps/web/components/landing/SiteHeader.tsx',
    ...readdirSync(resolve(root, 'apps/web/components/journals')).filter((name) => name.endsWith('.tsx')).map((name) => `apps/web/components/journals/${name}`),
    'apps/web/app/journals/page.tsx', 'apps/web/app/journals/[slug]/page.tsx', 'apps/web/app/journals/manage/[id]/processing/page.tsx',
  ];
  for (const path of paths) {
    const result = ts.transpileModule(source(path), { fileName: path, reportDiagnostics: true, compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } });
    assert.equal(result.diagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error).length, 0, path);
  }
});
