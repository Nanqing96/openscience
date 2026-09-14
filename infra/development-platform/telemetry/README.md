# Gateway 审计 → Langfuse

此目录是独立基础设施适配器；不修改或部署 OpenScience 应用，不调用模型、不重放任务、不生成内容。当前仅静态实现；尚未安装依赖、构建、启动或发送实际审计。应用 release 仍以 CURRENT handoff 为准，不能用本工作树候选替换它。

## 复用来源与数据范围

- 生产者：`packages/ai-gateway/src/gateway.ts` 的 `GatewayCallLog`、`record`、`generateImage`；已有 `action='ai.gateway.call'`。
- 数据源：`infra/schema.prisma` 的 `AuditLog` → `public.audit_logs`。现有 `action` / `created_at` 索引用于限定时间读取；不新建索引、审计表、哈希或 outbox 数据库。
- 唯一授予 connector 的业务数据入口：`xgs_telemetry.gateway_calls` view。SQL 明列 `id`、`created_at` 和 `jsonb_build_object` 白名单，角色没有原表 SELECT 授权。
- 白名单：operation/provider/model/outcome、数值 token/latency/cost/retryCount、USD、已分类错误与 finishReason、已存在的两个 SHA256 值、合法 UUID request correlation。只接受受限 provider/model 标识；不合规范时保留 unknown。不会生成新的内容哈希。
- 明确不导出：原 metadata 对象、prompt/response、论文、Claim/Evidence、标题、URL、文件名、IP、actor/workspace/user 身份、完整错误消息、任意 fallback 原文。

SQL view 与 connector 分别显式重建白名单，避免将来 view 增列时自动增加上传字段。已有错误类别复用；未知失败仅记 `other_failure`。

## Langfuse v4 传输与统计含义

目标为独立 Langfuse `v4.35.0` 的 `POST /api/public/otel/v1/traces`，使用项目 Basic Auth、OTLP/HTTP JSON 与 `x-langfuse-ingestion-version: 4`。每个审计是一条完整 generation/root span，无输入输出字段。JSON 经 Node 22 原生 `fetch` 发送，不引入 Langfuse/OTEL SDK 或模型 SDK。

trace ID 复用 audit UUID 去连字符；span ID 为该值前 16 位，完整 trace ID 保留全部 audit 唯一性。原 audit ID 也放 metadata。没有生成新的 ID 哈希。原审计只有记录时刻和延迟，因此 OTEL 结束时刻取审计记录时间，开始时刻减去已记录 latency；`timingBasis` 明示这是记录时刻定位。若 latency 缺失则两个时间都取审计记录时刻，`latencyMs=unknown` 与 `timingBasis=audit_record_time_only`；此类 span 的 UI 零宽度不能当作实际零耗时。

真实 `model` 仅保留在可筛选 metadata，不填 Langfuse 的原生模型字段，避免其自动按模型价目推算原审计未知费用。明确提供的 input/output tokens 才进 usage，明确提供的 USD actualCost 才进 cost；所有 estimated 字段仅保留来源元数据。缺失值标 unknown，不猜测、不补 0。这样原生按模型统计不可用，请按 metadata.model 筛选；对于部分 token 缺失的记录，以 metadata 中的 unknown 为准，不把 UI 汇总当作完整账单。

## 增量、迟提交与失败

首次读取范围最多为启动前 24 小时至两分钟前；每分钟至多一页 50 条，逐条发送，源连接并发 1。之后保存固定扫描上界和 `(created_at,id)` 游标，完整扫描成功后才推进 `completedThrough`。下一轮回看 24 小时并按已接受 audit IDs 跳过，覆盖 created_at 早于实际事务提交的常见情况；提交迟于回看窗口的记录不能保证捕获，已有 Gateway 未记录 commit sequence，不能声称全量 exactly-once。

**v4 不可靠地去重相同 span ID。** 防止“服务器接受后连接断开→盲重试→费用/数量翻倍”的必要机制是单个持久 JSON checkpoint：仅含扫描时间、成功 audit IDs、最多一条 pending 的 audit ID/时间，没有内容副本或新数据库。

发送前同步保存 pending；确定接受后同步保存 receipt。网络错误、5xx、部分接受或重启后的 pending 先用 `GET /api/public/v2/observations?traceId=...&fields=core` 查询。找到唯一匹配才认领成功；尚未找到会退避继续只读确认，暂停新发送，不冒险重发。明确 400/401/403/404/413/415/422/429 拒绝才可再次尝试，退避最长 15 分钟。日志只含固定错误分类和行数。

如果待确认请求实际未到达 Langfuse，它不会自动补发；需要管理员结合 Langfuse 服务日志确认后，在服务停止时处理那一条 pending。UI 暂时看不到或一次空查询不构成“未接受”证明。此限制保留在状态中，不影响生产 Gateway。不能承诺在非幂等目的端与网络失联条件下同时做到自动重试、无丢失和无重复。

state 必须跨容器重建保留，不能复制给不同项目或删除后“重跑”；重启本身不清 checkpoint。正常窗口完成后才裁掉窗口之外的 receipts。超过 16 MB 时停止发送并保留原状态，不静默丢 receipts。固定 container_name 只允许一个 connector 实例，不扩容副本。

## 服务器安装接线（由主任务集中执行）

以下是部署步骤说明，不是本轮已执行证据。安装与应用发布分开；仅构建这个目录，不运行 root workspace 的安装/构建/测试/CI。不能运行应用 deploy.sh。

1. 经项目 SSH 入口，将本目录传输到 `/opt/openscience-development/telemetry/releases/<infra-release>/`。复用已有 `node:22-bookworm`，仅当包缓存缺少时补 `postgres@3.4.7` 和 pnpm 9.15.0 所需包。postgres 无传递依赖；独立 lockfile integrity 来自 npm 官方 registry，锁文件静态整理，尚未经安装执行。
2. 管理员在既有生产 PostgreSQL 容器内执行 `provision-view.sql`，只建立专用 schema/view/NOLOGIN role，不做应用迁移或写审计数据。此脚本遇到同名对象会停止，重复安装保留已审核 view。角色 `xgs_gateway_telemetry` 不加入任何角色，之后由服务器凭据 provisioning 赋予当前数据库 CONNECT、随机密码和 LOGIN。凭据只能在服务器进程内构造并注入，不能把真实值放命令行、终端输出或仓库；不要从本机读取 `.env`。不授予原表、其他 schema 或 `pg_read_all_data`。
3. 由主任务创建两个 **internal** Docker network：`openscience-development-telemetry-db`（只接既有 production PostgreSQL 和 connector；数据库 alias `development-gateway-audit-db`）和 `openscience-development-telemetry-ingest`（只接 Langfuse web 和 connector；web alias `development-langfuse-web`）。不接生产 app/data 网络，不重建生产 PostgreSQL，不挂 Docker socket；保留 Langfuse web 原网络及 localhost:3130 映射。生产数据库容器在未来应用重建后需由同一部署管理恢复该专用网络连接，否则 connector 停止读取而不影响应用。
4. 主任务在服务器创建 `/etc/openscience-development/telemetry/runtime.env`，root:root `0600`，仅包含 `GATEWAY_AUDIT_DATABASE_URL`（专用角色、host `development-gateway-audit-db`、5432、database `openscience`，URL 编码密码）、`LANGFUSE_PUBLIC_KEY`、`LANGFUSE_SECRET_KEY`。API keys 来自此管理目的专用 Langfuse 项目；不连接公共 Cloud，不配置模型 provider/evaluator。Docker Compose env_file 注入这些值；connector 仅消费环境变量，既不读配置文件也不打印值。
5. 服务器创建 `/opt/openscience-development/telemetry/state`，owner `1000:1000`，mode `0700`。父目录 root 私有；checkpoint 创建 mode `0600`。容器 rootfs 只读、非 root、256 MiB、0.25 CPU、32 PIDs、无端口和公网网络。
6. 在本目录的服务器工作副本进行必要构建与启动：`docker build -t openscience-gateway-audit-telemetry:<infra-release> .`；将 `TELEMETRY_RELEASE=<infra-release>` 作为非敏感变量注入 `docker compose -f compose.yaml up -d --no-build`。不输出 `docker compose config`（会展开凭据），不 `cat` runtime.env，不运行测试或示例 LLM。
7. 正常产品观察限真实已授权审计：Langfuse 私有 UI 查看少量 generation、metadata、来源未知值以及 connector 固定分类日志。发送成功只证明接入接受，不能证明论文科学质量、模型正确性或全业务覆盖。不得为了填充界面触发新模型调用。

停止/回滚：停止独立 connector 容器，保留 state 与凭据，应用继续运行。切回上一基础设施 image 再启动时复用同一 state/项目。若要撤销 DB 授权，可在管理员容器会话 `ALTER ROLE xgs_gateway_telemetry NOLOGIN` 与 `REVOKE SELECT ON xgs_telemetry.gateway_calls FROM xgs_gateway_telemetry`；不要 DROP 对象/删文件/清数据。没有应用 rollback、DB 数据迁移或论文发布操作。

## 官方依据

- [v4.35.0 发布](https://github.com/langfuse/langfuse/releases/tag/v4.35.0)
- [v4 自定义 ingestion 迁移与重复 span 限制](https://langfuse.com/integrations/native/opentelemetry/migration-to-v4)
- [OTLP endpoint、JSON 与 Langfuse 属性映射](https://langfuse.com/integrations/native/opentelemetry)
- [Observations v2 的 traceId、时间范围与 core 字段](https://langfuse.com/docs/api-and-data-platform/features/observations-api)
- [Token/费用及模型自动推断](https://langfuse.com/docs/observability/features/token-and-cost-tracking)
- [Postgres.js 官方实现](https://github.com/porsager/postgres)、[所用版本 registry 元数据](https://registry.npmjs.org/postgres/3.4.7)

主任务须将此目录登记 project_index、server-capabilities、Hermes 台账及 CURRENT handoff，并统一 High 静态 review 后决定服务器执行；此 worker 不改其他目录。尚未证明实际可用，不称部署/测试通过。
