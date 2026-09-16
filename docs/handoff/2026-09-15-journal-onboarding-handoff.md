# CURRENT：期刊入驻与 AI 解读

## Goal / version tuple

- 用户要求：依据期刊 PRD 开发，并将最终代码上传 Nanqing96/openscience；本轮不部署生产。
- Branch：`codex/journal-onboarding`；基线 HEAD：`49ff4fcd8d78e33ec0d8f55ba2179f6b5511248b`。
- Code / browser acceptance HEAD：`e7e387b7738be3ca395f29dcd61c6894acb273b7`；最终交付另含本验收文档提交，以分支 Git 元数据为准。
- GitHub：[期刊开发 PR #1](https://github.com/Nanqing96/openscience/pull/1)；本轮已上传开发分支，不自动合并或部署。
- Base branch：`release/academic-identity-ror-20260902`，不等同其他仓库或当前生产。
- Production release / rollback：本轮未读取、未修改、未验收；禁止用旧文档日期替代实际生产状态。

## Done

- 免费申请与平台核验、独立期刊工作空间、ISSN 防重、主页、刊内角色及所有者移交后复核。
- DOI 预览/批量导入、无 DOI 录入、原始论文身份与个人 RO 隔离、逐篇来源/权利记录。
- 私有来源上传、扫描/解析链路、摘要或全文范围、AI 标准草稿、证据匹配、编辑对照与冲突保护。
- SQL 持久化队列、权限与租约复核、有界重试、试用/服务额度、预占/消耗/释放/过期账本。
- 审核指派、修订绑定、原子固定版本公开、原 DOI 引用优先、公开 API、限制和撤回。
- 平台服务报价/拒绝/取消、一次性开通、通知、基础统计和公开元数据白名单。
- 私密纠错工单、编辑处理与双向通知；公开站点地图按期刊分页，仅收录可访问版本。
- 通用 RO/工作空间/材料/Agent 等旧入口不得绕开期刊流程；审核员限于指派论文。
- 需求与商业方案入库，运行说明及独立 GitHub 期刊工作流齐备。

## Evidence

- 后端依赖、Domain、API、Worker 构建通过；既有编译后解析器检查 10/10。
- 完整默认回归：Domain 547、API 109 通过；默认跳过的专用数据库用例另行实际运行。
- 定向测试：Domain 20/20、API 16/16（含期刊及既有公开研究接口）、Worker 4/4、Web 5/5；真实 PostgreSQL 覆盖并发额度、上传容量、幂等、撤权、固定快照、私密纠错和公开数据隔离。
- `scripts/journals/verify-migration.mjs`：完整迁移 37、回退保留个人 RO/旧表、重应用 12 个表及 8 个 CHECK；独有临时库已清理。
- Web 正式构建及类型检查通过；文档 247 份 lint、docs-sync 8 项及结构检查通过。GitHub CI 构建顺序修复后已通过，最新分支状态以 PR Checks 为准。
- 2026-09-16 08:51–08:52（Asia/Shanghai）真实 Chromium 场景通过：6 个页面 × 桌面 1440 / 手机 375，无横向溢出；私密反馈提交/回复/登录门禁、服务申请、生成队列轮询下保留编辑、保存后提交审核、限制公开后地图移除及固定页 404 全部通过。
- 浏览器使用真实会话与 CSRF、正式作业预占/取消；隔离 API 端口 43141（本机 3001 拒绝绑定）。仅豁免既有匿名阅读偏好接口预期 401，其余浏览器错误仍作为失败。13 张成功截图位于忽略目录 `apps/web/test/visual/out/journals/`。

## Constraints / open risks

- 所有数据库及内容测试为本地合成材料；真实模型与生产 PDF/OCR sidecar 的端到端验收尚未执行，不声明已提高引用。
- 当前提供书目和平台交付/调用统计；未采集访客时返回 null，调用次数不代表 AI 引用。
- 个人对象关联/复制按 PRD 首期人工协助留存版本化授权，不自动迁移私有对象。支付、外部监测、Topic Hub、知识图谱、认证仍属后续产品范围。
- 生产启用前须按运行手册验证模型、扫描/解析、存储、会话和真实来源。新表有业务数据时优先关闭功能/回退应用，不直接执行会删除期刊数据的 SQL rollback。
- `sources/` 与其他同步项目资料只读；本次未读取 .env 或生产密钥。

## Next action / read-first

1. 代码及验收记录已上传 PR #1；部署由后续明确的部署任务负责。
2. 首批 3–5 家真实期刊进行人工身份/版权核验及试点效果评测。
3. 先读 [运行手册](../runbooks/journal-onboarding.md)，再读 [PRD](../specs/2026-09-15-journal-onboarding-design.md) 对应模块；旧生产 handoff 仅供历史背景。
