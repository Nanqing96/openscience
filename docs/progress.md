# OpenScience 进度（CURRENT window）

> 最新同步：2026-09-15。此前日志保留在 Git history；其他产品任务和生产状态不因本次期刊开发而改变。

## 当前任务与版本

- 当前任务：按期刊入驻 PRD 开发并上传至 Nanqing96/openscience。
- Branch：`codex/journal-onboarding`；开发基线 HEAD：`49ff4fcd8d78e33ec0d8f55ba2179f6b5511248b`。
- Base branch：`release/academic-identity-ror-20260902`。
- 生产 release / rollback：本轮未读取、未修改、未验收。不要使用此前文档的生产 tuple 作为新部署事实。
- 唯一期刊交接入口：`docs/handoff/2026-09-15-journal-onboarding-handoff.md`。

## 2026-09-15 — 期刊 P0

- 完成申请/核验/主页/成员、DOI 预览与导入、来源及许可、AI 草稿、人工审核与固定版本公开。
- 完成持久作业、额度账本、重试/取消/过期、服务开通、撤回和公开数据隔离。
- 补齐私密纠错工单、编辑处理说明、双向通知以及公开期刊站点地图。
- 核心迁移增加至 37，Search 无新增迁移；回退演练保留个人 RO 与旧表数据，重应用验证通过。
- Domain 547、API 109 完整默认回归通过；期刊真实数据库、Web 构建及浏览器验收的具体证据见期刊 handoff。
- 新增独立期刊 CI，使用隔离 PostgreSQL；不执行生产部署。
- 访客/外部 AI 引用监测尚未采集，不虚构数据或引用效果。真实模型及生产解析组件需上线前验收。

## 下一步

- 上传本分支最终代码及交付文档，核对远端提交。
- 后续部署按运行手册完成真实来源、模型、解析器和公网权限检查，再开始小规模试点。
