import { DashboardShell } from '@/components/shell/DashboardShell';
import { JournalAdminConsole } from '@/components/journals/JournalAdminConsole';

export default function AdminJournalsPage() {
  return <DashboardShell activeRoute="dashboard" skipLabel="跳到内容" navigationLabel="平台管理"><header className="border-b border-os-rule-paper pb-6"><p className="text-sm text-os-muted-paper">平台管理</p><h1 className="mt-2 text-4xl font-normal">期刊核验与运营</h1></header><JournalAdminConsole /></DashboardShell>;
}
