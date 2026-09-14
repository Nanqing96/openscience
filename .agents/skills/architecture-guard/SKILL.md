---
name: architecture-guard
description: "Use before modifying code that touches module boundaries, AI/Provider SDK calls, or the monorepo layout. Do NOT use for pure content/documentation edits that don't change code structure."
---

# Architecture Guard — 架构边界守卫

改代码前核对模块边界与系统架构约束，防止边界腐蚀。架构事实来源：Spec §14（系统架构）、§9.3（AI 路由）。

## 何时使用 / 何时不使用

- **使用**：新增/移动模块；新增对外部服务（AI 模型、存储、队列）的调用；改变 apps/ 与 packages/ 之间依赖方向；写任何调用模型 Provider 的代码。
- **不使用**：纯文档、文案、样式微调等不触碰模块边界的修改。

## 先查已有能力，再改边界

复用本项目 `docs/runbooks/hermes-capability-registry.md` 的当前能力索引；服务器资源查 `docs/runbooks/server-capabilities.md`。它们是定位入口，代码和指定 release 的实际任务记录才是证据。不要全文读取历史表或再建一个能力库。

针对当前产品目标，用已有任务说明记录四点即可：

1. **意图**：用户要得到什么结果，需求基线哪一节约束它；近期用户纠正优先。
2. **已有实现**：定向读取入口符号、实际调用方和输入/输出；模型、skill、工具分开。安装位置不证明调用，调用不证明结果正确。
3. **实际效果**：复用同版本或未变实现的任务 ID、产物/审阅记录；列出失败与未观察范围。不能从容器健康、Schema通过或台账状态推导质量，也不为填表重跑模型。
4. **本次差异**：选择直接复用、补接断点或替换，并说明现有能力不能满足的具体输入/权限/行为。先核上游结果是否已经完成该工作，再加模型阶段、提示词、协议或依赖。

共享科学规则引用现有 runtime skill；不同下游仅补自身输出含义和边界。阅读了本机 skill 不代表 Hermes 消费了它，需定位服务端加载/注入点。发现重复失败先修本条调用链，不新增通用管理服务或重复门禁。记录随功能修改原地更新，不复制到多份进度日志。

## 检查清单

### Monorepo 边界（Spec §14.1）

1. **应用归位**：可运行服务放 `apps/`（web、api、agent-worker、science-worker、sandbox-controller）；可复用领域逻辑放 `packages/`（domain、database、auth、sdf-schema、versioning、storage、ai-gateway、search、ui、config、observability）；基础设施放 `infra/`（compose、nginx、sandbox、scripts、migrations）。
2. **依赖方向**：`apps/` 可依赖 `packages/`，`packages/` 之间按领域分层依赖；禁止 app 之间互相 import 内部实现。
3. **不为目录示例搬动稳定代码**：Spec §14.1 的目录树是参考示例，"具体目录必须在现有代码审计后调整；禁止为了匹配此示例而无理由搬动稳定代码"（Spec §14.1 末段）。调整目录结构前必须先有代码审计结论（配合 repo-map skill）。

### AI 调用边界（Spec §9.3）

4. **统一 AI Gateway**：所有模型调用必须经统一 AI Gateway（packages/ai-gateway）；主模型为 MiniMax-M3，回退/兜底策略在 Gateway 内配置实现，不在业务代码写死。
5. **Provider SDK 不得散落业务代码**：业务代码中不得直接 import 模型 Provider SDK 或直接持有 Provider API Key 调用；发现散落的 SDK 调用必须标记并收口到 Gateway（Spec §9.3）。
6. **长任务异步**：AI 长任务必须异步执行（任务 ID + 进度通道），不得用同步 HTTP 请求硬等（Spec §9.3；API 形态见 §16）。
7. **输出校验**：模型 JSON 输出必须经 Schema 校验，失败时有限重试（Spec §9.3）。

### 通用约束

8. **重大架构决定写 ADR**：每个重大架构决定写入 `docs/adr/`（Spec §20.1-8；本项目 ADR 放 `docs/decisions/`，命名 `ADR-NNN-<主题>.md`，见 AGENTS.md 分类规范）。
9. **修改前列风险**：修改前列出受影响文件和风险（Spec §20.1-5）。
