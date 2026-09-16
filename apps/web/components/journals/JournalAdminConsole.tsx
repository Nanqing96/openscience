'use client';

import * as React from 'react';
import { apiRequest } from '@/lib/api';
import {
  grantJournalCredits, listAdminJournals, listAdminServiceRequests,
  reviewAdminServiceRequest, reviewJournalApplication, setAdminJournalState,
  type JournalApplication, type JournalServiceRequest, type JournalSummary,
} from '@/lib/journal-api';

export function JournalAdminConsole() {
  const [applications, setApplications] = React.useState<JournalApplication[]>([]);
  const [journals, setJournals] = React.useState<JournalSummary[]>([]);
  const [requests, setRequests] = React.useState<JournalServiceRequest[]>([]);
  const [reasons, setReasons] = React.useState<Record<string, string>>({});
  const [grants, setGrants] = React.useState<Record<string, { amount: number; expiresAt: string; reason: string }>>({});
  const [serviceNotes, setServiceNotes] = React.useState<Record<string, string>>({});
  const [message, setMessage] = React.useState('');

  const load = React.useCallback(async () => {
    try {
      const [applicationResult, journalResult, requestResult] = await Promise.all([
        apiRequest<{ items: JournalApplication[] }>('/api/admin/journals/applications'), listAdminJournals(), listAdminServiceRequests(),
      ]);
      setApplications(applicationResult.items); setJournals(journalResult.items); setRequests(requestResult.items);
    } catch (error) { setMessage(error instanceof Error ? error.message : '无法加载期刊管理数据。'); }
  }, []);
  React.useEffect(() => { void load(); }, [load]);

  async function decide(application: JournalApplication, decision: 'approved' | 'rejected' | 'needs_information') {
    const reason = reasons[application.id]?.trim();
    if (decision !== 'approved' && !reason) { setMessage('补件或拒绝时必须填写对申请人可见的审核原因。'); return; }
    try { await reviewJournalApplication(application.id, { decision, ...(reason ? { reason } : {}), ...(decision === 'approved' ? { slug: application.nameZh?.toLowerCase().replace(/\s+/g, '-') } : {}) }); setMessage('申请状态已更新。'); await load(); }
    catch (error) { setMessage(error instanceof Error ? error.message : '审核失败'); }
  }

  async function grant(request: JournalServiceRequest & { journalId?: string }) {
    const journalId = request.journalId;
    const value = grants[request.id];
    if (!journalId || !value?.amount || !value.expiresAt || !value.reason.trim()) { setMessage('请完整填写额度、到期日和开通依据。'); return; }
    try { await grantJournalCredits(journalId, { amount: value.amount, expiresAt: new Date(`${value.expiresAt}T23:59:59Z`).toISOString(), reason: value.reason.trim(), requestKey: crypto.randomUUID(), serviceRequestId: request.id }); setMessage('额度已追加到账本并关联服务申请。'); await load(); }
    catch (error) { setMessage(error instanceof Error ? error.message : '额度开通失败'); }
  }

  async function reviewService(request: JournalServiceRequest, status: 'quoted' | 'rejected' | 'cancelled') {
    const note = serviceNotes[request.id]?.trim();
    if (!note) { setMessage('服务审核必须填写对编辑部可见的说明。'); return; }
    try { await reviewAdminServiceRequest(request.id, { status, expectedStatus: request.status, note }); setMessage('服务申请状态已更新。'); await load(); }
    catch (error) { setMessage(error instanceof Error ? error.message : '服务审核失败'); }
  }

  return <>
    <section className="mt-8"><h2 className="text-xl font-normal">入驻申请</h2>{applications.map((application) => <article className="border-b border-os-rule-paper py-5" key={application.id}><p className="text-sm text-os-muted-paper">{application.status} · {application.applicantEmail}</p><h3 className="my-2 text-lg font-normal">{application.nameZh}</h3><p className="text-sm">代表依据：{application.representationEvidence}</p>{application.reviewReason ? <p className="text-sm text-os-vermilion-ink">上次审核原因：{application.reviewReason}</p> : null}<textarea aria-label={`${application.nameZh} 审核原因`} className="mt-2 w-full border border-os-rule-paper bg-transparent p-3" placeholder="补件或拒绝原因（申请人可见）" value={reasons[application.id] ?? ''} onChange={(event) => setReasons({ ...reasons, [application.id]: event.target.value })} /><div className="mt-3 flex gap-2"><button className="border border-os-rule-paper px-3 py-2 text-sm" onClick={() => void decide(application, 'approved')}>通过</button><button className="border border-os-rule-paper px-3 py-2 text-sm" onClick={() => void decide(application, 'needs_information')}>要求补件</button><button className="border border-os-rule-paper px-3 py-2 text-sm" onClick={() => void decide(application, 'rejected')}>拒绝</button></div></article>)}</section>
    <section className="mt-8 border-t border-os-rule-paper pt-6"><h2 className="text-xl font-normal">服务申请与额度开通</h2>{requests.map((request) => { const value = grants[request.id] ?? { amount: 5, expiresAt: '', reason: '' }; return <article className="border-b border-os-rule-paper py-5" key={request.id}><p className="text-sm text-os-muted-paper">状态：{request.status} · {request.annualVolume} 篇/年 · {request.language} · {request.figureScale}</p><p>{request.services.join('、')}</p>{request.notes ? <p className="text-sm">申请说明：{request.notes}</p> : null}{request.reviewNotes ? <p className="text-sm">审核回复：{request.reviewNotes}</p> : null}<label className="grid gap-1 text-sm">审核说明<textarea className="border border-os-rule-paper bg-transparent p-2" value={serviceNotes[request.id] ?? ''} onChange={(event) => setServiceNotes({ ...serviceNotes, [request.id]: event.target.value })} /></label><div className="mt-2 flex gap-2"><button className="border border-os-rule-paper px-3 py-2 text-sm" onClick={() => void reviewService(request, 'quoted')}>发送方案</button><button className="border border-os-rule-paper px-3 py-2 text-sm" onClick={() => void reviewService(request, 'rejected')}>拒绝</button><button className="border border-os-rule-paper px-3 py-2 text-sm" onClick={() => void reviewService(request, 'cancelled')}>取消</button></div><div className="mt-4 grid gap-2 sm:grid-cols-3"><label className="grid gap-1 text-sm">开通额度<input type="number" className="min-h-10 border border-os-rule-paper bg-transparent px-3" value={value.amount} onChange={(event) => setGrants({ ...grants, [request.id]: { ...value, amount: Number(event.target.value) } })} /></label><label className="grid gap-1 text-sm">到期日<input type="date" className="min-h-10 border border-os-rule-paper bg-transparent px-3" value={value.expiresAt} onChange={(event) => setGrants({ ...grants, [request.id]: { ...value, expiresAt: event.target.value } })} /></label><label className="grid gap-1 text-sm">订单或补偿依据<input className="min-h-10 border border-os-rule-paper bg-transparent px-3" value={value.reason} onChange={(event) => setGrants({ ...grants, [request.id]: { ...value, reason: event.target.value } })} /></label></div><button disabled={!['submitted', 'quoted'].includes(request.status)} className="mt-3 border border-os-rule-paper px-3 py-2 text-sm disabled:opacity-50" onClick={() => void grant(request)}>确认开通额度</button></article>; })}</section>
    <section className="mt-8 border-t border-os-rule-paper pt-6"><h2 className="text-xl font-normal">期刊运营状态</h2>{journals.map((journal) => <div className="flex flex-wrap items-center justify-between gap-3 border-b border-os-rule-paper py-4" key={journal.id}><div><h3 className="m-0 text-lg font-normal">{journal.nameZh}</h3><p className="m-0 text-sm text-os-muted-paper">{journal.status}</p></div><div className="flex gap-2"><button className="border border-os-rule-paper px-3 py-2 text-sm" onClick={() => void setAdminJournalState(journal.id, { action: journal.status === 'paused' ? 'resume' : 'pause', reason: '平台运营处理' }).then(load)}>{journal.status === 'paused' ? '恢复' : '暂停'}</button><button className="border border-os-rule-paper px-3 py-2 text-sm" onClick={() => void setAdminJournalState(journal.id, { action: 'reverify', reason: '定期核验' }).then(load)}>重新核验</button></div></div>)}</section>
    {message ? <p role="status">{message}</p> : null}
  </>;
}
