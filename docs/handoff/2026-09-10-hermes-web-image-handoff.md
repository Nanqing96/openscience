# Hermes / Workbench CURRENT Handoff
## 目标与约束
- 用户2026-09-14最新纠正：底层软件/Skill须联动定位和修复能力断点，不能靠文档代替清债。规则后续会话持续适用，非后台回调；本轮实际查工具并修任务审计接线，上游细粒度确认仍是主要未完成项。
- 禁止测试/预检/CI/本机构建；仅本机静态编辑/Git/传输，服务器执行必要安装/构建/启动及实际使用。没有新模型调用、图片生成或科研数据修改。
- Chat生图主用，Codex CLI备用；科学认识来自上游解析/分析。Figma、视频、第三篇及批量仍暂停。
## 版本事实
- 交付树 E:/Miscellaneous/XGS/.worktrees/onchip-video-release，branch codex/onchip-video-release；本轮起点HEAD/origin 054c9f3ba920e59e3ba498e997d62e85615f193a，完整本轮候选以git HEAD读取；不是应用release。
- 生产应用89d05d6dfcf432765697762864e9406ea3588ab8 / rollback b2f3cf373c0eafde1adc53d85f198588d1c23391沿用既有只读记录；本轮服务器仅查询Catalog/Serena/Langfuse，不把它们当应用版本或新生图观察。
- Catalog/Serena镜像与源83179c454b75688176060fabf9e611072d46813c；Serena所查源码89d05，快照/source和image不可混写。
- Langfuse独立bundle83179c454b75688176060fabf9e611072d46813c，official v4.35.0；telemetry镜像c2b6683e8e804d07f2928ee4df2cba8d91fb5703，view/角色已provision，持久state复用。
- Skills镜像83179（实际list/find在相同CLI代码ce02首次执行）；依赖图脚本c9d98bd70252d7ca21854ca9b05987d2d46af700，源89d05。
- Squid原生兼容包7:7.2-1.alnx4.openscience.1.x86_64；构建/原RPM/配置备份目录ce02ee5273aa7fb9de2a7e9679b480485ae46939，native-rpm.sh可回退。
- receiver bundle8e4已安装、兼容v1/v2；科研应用8e4在Prisma JSON类型构建失败，候选已静态修正但没有重新构建/部署。
- 根目录dirty main不是交付基线。无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得提交/覆盖。
## 已实际交付 / 使用证据
- 本轮实际联动：Catalog返回worker依赖；Serena定位确认bridge在Hermes/API的调用，再以候选代码核对。Langfuse 15:15 UTC读回2条已有image失败，requestCorrelation均unknown，定位到Worker有执行上下文而Gateway审计未接入。
- 新候选 index.ts 共用既有audit sink，record时取AsyncLocalStorage taskId补空requestId；旧requestId/事务/无上下文行为保留，现有view/connector直接消费。未构建部署，旧记录不回填，新任务效果未观察。
- 本轮独立High静态GO：逐调用上下文隔离、已有ID优先、tx/异常语义及UUID白名单确认；未运行。当前handler均await调用，未来若引入脱离handler的异步Gateway工作需重新审查归属。
- 本轮候选：IllustrationBrief v2独立encoding/composition；planner不再拆中文分隔符，末审只允许已有场景composition/treatment局部修正。v1保持原样读取/直接编译，v1 base修订显式要求新方案，不静默重画或改旧资产。
- 本轮静态纠错：science/review都传kind/assessment；末审保留所选Claim全文及全部Evidence，upstream通过sourceIds与原文关联。旧bridge把同字段各段均标supports，不能按basis截掉可能的限定。
- 本轮独立High静态GO：确认局部字段白名单/顺序与来源不变、v1兼容、v2解析、Claim与Evidence关联；未构建/运行，完整所选Claim上下文仍可能触及既有输入上限。
- docs-sync/AGENTS：有实际状态变化回合final前同步、重要节点先保存、下轮核Git补中断；普通问答不重写。不承诺应用关闭后的回调，不加定时任务、自动提交/部署或重复Skill。根规则同步导航，本机自有配图Skill同步v2；Hermes候选加载v2章节，未部署/未观察新消费。
- 本轮治理：交付AGENTS/17个流程Skill及引用对齐根目录既有精简规则；旧handoff/plan逐份标历史，设计注明需求适用性，根进度/旧交接只导航。无关dirty设计稿保留，不宣称所有旧设计条款已逐行复验。
- 治理独立High静态GO：机械替换误伤活规则/历史正文的问题已撤销，恢复原文并仅定向标旧release状态。142历史执行记录/67设计适用说明覆盖；未删除文件/独有工具，也未逐行复验全部历史正文。
- 代码去重：Skill usage 共用 mergeDesignSkillUsage，删除同批Evidence重复lineage遍历；来源/权限/并发重验保持。独立High静态GO；未构建/部署，不声称运行通过。发现及未解决行为债见能力台账“当前技术债与处理”。
- Backstage标准私有目录API：查询agent-worker返回owner、Gateway/parser/skills和资源依赖；匿名401。不是完整浏览器门户，不替代代码/实际运行事实。
- Serena官方MCP实际只列overview/find/references三工具；overview列AiGateway，references定位reviewScientific在extractor.ts的两处调用。无写代码、执行shell、读取Secret或生产DB权限。
- dependency-cruiser18.1.0实际产出19模块、4条worker→ai-gateway跨包边；服务器报告 /opt/openscience-development/reports/presentation-gateway-89d05-v3.json。只是选定scope模块图，不是全仓完整动态调用图。
- Vercel Skills1.5.26官方CLI list返回31项目技能，find返回科学插画候选；没有自动安装搜索结果。Source local/Agents not linked不等于Hermes或Codex没有加载技能。
- Langfuse六个独立服务启动；Gateway专用只读view导入白名单元数据，已有50回执，官方API实际抽读10成功+2已有image_provider_failed，tokens对应、未知model/费用保持unknown；未发送论文/提示词/回答。
- API读取入口：docker exec openscience-development-gateway-audit node /app/query.mjs [--errors]；24h最多10条。Portainer/Netdata仍用于资源运维，不另造面板。
- SSH访问：infra/scripts/ssh-run.sh --development-tunnel。解析固定容器内部IP，本机localhost:3130 Langfuse、3131目录API、3132/mcp Serena；项目.codex/config.toml已配置3个read工具。当前任务不会自动热加载新MCP；刷新/新session后可原生使用。
- Docker24纯internal网络未生成ports映射，已改SSH直连容器IP；本机隧道后台PID74380，日志tmp/development-tunnel-v2.stderr.log。容器重建/IP变化后须重开隧道，不增外网network。
- Langfuse账号独立于OpenScience，初始随机凭据仅在服务器owner-credentials.txt（root0600）；未完成私密交接/登录。用户截图Invalid credentials不证明代理或产品会话失效；未重置密码/打印凭据。无SMTP，恢复链接不能作为本部署恢复渠道；说明见Langfuse README。
- 已修真实安装故障：legacy builder无BuildKit、Catalog rateLimit类型、Serena空目录、depcruise官方配置/schema与scope、Squid数字开头CONNECT。各最小修复及操作入口写在原工具README。
- 首条telemetry pending早于Langfuse容器创建，停进程后完整备份checkpoint，仅恢复该确定未到达请求；后续50回执且无pending。今后先启动Langfuse，无法确认的发送不得盲重试。
- 独立High复核隔离、只读DB/Secret边界、RPM回退、报告输出路径、GET白名单和SSH转发，阻断项已修。没有以安装/Schema/服务健康代替科学质量。
## 固化入口与限制
- 复用architecture-guard、能力台账、server-capabilities、ADR-002及CURRENT；按问题选择目录/符号/图/调用/技能工具，不每轮全跑或另建任务库。
- 开发工具不会自动赋权给面向科研用户的Hermes。Hermes既有skill消费仍由runtime导入/注入与资产provenance确认。
- 目录需维护，源码快照需按所查版本更新；生产DB容器重建后需恢复telemetry内部网络，state必须保留。Langfuse未设置定时备份/自动保留期/SSO/SMTP；人工备份入口保留，未演练。
- 无工具保证绝对掌控/科学正确或全调用覆盖；快照无第三方类型，动态引用可能缺失，费用缺失不能当0。
## 后续科研工作
- 当前不存在已绑定用户确认的细粒度semanticStage；不能声称已有成品只需接线。先沿现有确认/claim-evidence-bridge链路保留语义点及限定/原文关系，再让配图选用；不用独立分析库，不拿未审stage顶替。
- 本轮表示/末审修正及之前共享critical-thinking、JSON类型收窄均为未部署候选；没有构建/模型证据。下一步处理上述确认关系，再恢复必要应用交付和真实Chat配图；不复跑旧候选/脚本。
- 自有skill/三套Baoyu有真实消费记录，但通用科学/审美质量未获确认；参考图bytes路径已部署但未实际上传生图。
- RO9067a2d5-42ad-4c06-b234-753728b71064；private e77dc3c7-95cb-4269-ac3c-24276fea74e7；Claim93416292-0dbb-42b1-8810-6bdf77804c1f；40Evidence保持。
- 喜爱图aa41a018-b2ff-4ffb-9557-19ecabe104bc保留；公开OSR-2026-000023/v1/version72c315af不改。旧图/原件/笔记不删除。
- d31/f3c/393科学错误已rejected，cdc/997 failed；旧tmp生成/部署脚本不得执行。下一session从本页→能力台账匹配行→实际代码/任务记录，不载入历史全文。
