# OpenScience 进度（CURRENT window）

> 最新同步：2026-09-22。历史记录保留在 Git history；其他产品任务和生产状态不因本次期刊增强而改变。

## 当前任务与版本

- 当前任务：期刊来源版权矩阵、AI 加工优先级、服务包额度页面。
- Branch：`codex/journal-onboarding`；增量基线：`261a38fa9fa5e97a099c59a082447ed87b43de05`。
- 验收代码：`6fd90237ebda4094eefb6b947a797e4fdcecc6ae`；交付另含验收文档提交。
- Base branch：`release/academic-identity-ror-20260902`；沿用 [PR #1](https://github.com/Nanqing96/openscience/pull/1)。
- Production release / rollback：未读取、未修改、未验收；本地结果不代表部署。
- 唯一期刊交接入口：`docs/handoff/2026-09-15-journal-onboarding-handoff.md`。

## 2026-09-22 — 第一批增强

- 新增多来源逐项授权、实际内容绑定、保守加工能力、到期/撤回及授权变更历史。
- 新文件先暂存，核验自身权限后解析；修复旧授权继承、上传幂等和终态重新上传问题。
- 公开固定内容和通用读取入口同步检查当前授权；保留原论文书目身份。
- 新增可解释加工顺序、重点/延期与人工确认入队；新增服务意向、有效额度/批次/月用量/账本/存储页面。
- 无新迁移；仍按成功草稿 1 篇结算。Topic Hub 和机器访问分析未纳入第一批。
- 最终本地回归：Domain 574、API 117、Web 471 + Node 5、Worker 4；真实浏览器 2 场景通过。
- 9 个页面的桌面和 375px 手机检查、来源修改后重新绑定、入队/取消额度以及既有审核/公开/纠错流程通过。
- 后端/Web 构建及类型检查、改动文件 lint、247 份文档 lint、docs-sync 8 项及索引检查通过。
- GitHub CI 状态以当前提交的 Checks 为准；本轮不自动合并或部署。

## 下一步

- 审阅开发分支，在真实来源、扫描解析器和模型环境验证后开展少量期刊试点。
- 确定服务报价与周期规则；随后开发 Topic Hub 和机器访问分析。
- 当前统计不等同 AI 引用；不得以合成测试推断传播或引用增长。
