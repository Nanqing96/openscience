# Hermes / Workbench CURRENT Handoff
## 目标与约束
- 用户2026-09-14要求先实际完成已调研底层能力，避免遗忘已有实现/重复造轮子，再恢复配图主线；授权项目级工具和独立服务器服务。
- 禁止测试/预检/CI/本机构建；仅本机静态编辑/Git/传输，服务器执行必要安装/构建/启动及实际使用。没有新模型调用、图片生成或科研数据修改。
- Chat生图主用，Codex CLI备用；科学认识来自上游解析/分析。Figma、视频、第三篇及批量仍暂停。
## 版本事实
- 交付工作树 E:/Miscellaneous/XGS/.worktrees/onchip-video-release，branch codex/onchip-video-release；基础设施代码截至c2b6683e，之后访问接线/文档提交用git HEAD读取；均不是应用release。
- 生产应用89d05d6dfcf432765697762864e9406ea3588ab8；rollback b2f3cf373c0eafde1adc53d85f198588d1c23391。本轮未部署应用。
- Catalog/Serena镜像与源83179c454b75688176060fabf9e611072d46813c；Serena所查源码89d05，快照/source和image不可混写。
- Langfuse独立bundle83179c454b75688176060fabf9e611072d46813c，official v4.35.0；telemetry镜像c2b6683e8e804d07f2928ee4df2cba8d91fb5703，view/角色已provision，持久state复用。
- Skills镜像83179（实际list/find在相同CLI代码ce02首次执行）；依赖图脚本c9d98bd70252d7ca21854ca9b05987d2d46af700，源89d05。
- Squid原生兼容包7:7.2-1.alnx4.openscience.1.x86_64；构建/原RPM/配置备份目录ce02ee5273aa7fb9de2a7e9679b480485ae46939，native-rpm.sh可回退。
- receiver bundle8e4已安装、兼容v1/v2；科研应用8e4在Prisma JSON类型构建失败，候选已静态修正但没有重新构建/部署。
- 根目录dirty main不是交付基线。无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得提交/覆盖。
## 已实际交付 / 使用证据
- Backstage标准私有目录API：查询agent-worker返回owner、Gateway/parser/skills和资源依赖；匿名401。不是完整浏览器门户，不替代代码/实际运行事实。
- Serena官方MCP实际只列overview/find/references三工具；overview列AiGateway，references定位reviewScientific在extractor.ts的两处调用。无写代码、执行shell、读取Secret或生产DB权限。
- dependency-cruiser18.1.0实际产出19模块、4条worker→ai-gateway跨包边；服务器报告 /opt/openscience-development/reports/presentation-gateway-89d05-v3.json。只是选定scope模块图，不是全仓完整动态调用图。
- Vercel Skills1.5.26官方CLI list返回31项目技能，find返回科学插画候选；没有自动安装搜索结果。Source local/Agents not linked不等于Hermes或Codex没有加载技能。
- Langfuse六个独立服务启动；Gateway专用只读view导入白名单元数据，已有50回执，官方API实际抽读10成功+2已有image_provider_failed，tokens对应、未知model/费用保持unknown；未发送论文/提示词/回答。
- API读取入口：docker exec openscience-development-gateway-audit node /app/query.mjs [--errors]；24h最多10条。Portainer/Netdata仍用于资源运维，不另造面板。
- SSH访问：infra/scripts/ssh-run.sh --development-tunnel。解析固定容器内部IP，本机localhost:3130 Langfuse、3131目录API、3132/mcp Serena；项目.codex/config.toml已配置3个read工具。当前任务不会自动热加载新MCP；刷新/新session后可原生使用。
- Docker24纯internal网络未生成ports映射，已改SSH直连容器IP；本机隧道后台PID74380，日志tmp/development-tunnel-v2.stderr.log。容器重建/IP变化后须重开隧道，不增外网network。
- Langfuse登录信息只在服务器 /etc/openscience-development/langfuse/owner-credentials.txt（root0600）；未输出。已通过本机SSH隧道在Codex浏览器实际看到Sign in、Email和Password，保留为交付tab；未代用户登录。
- 已修真实安装故障：legacy builder无BuildKit、Catalog rateLimit类型、Serena空目录、depcruise官方配置/schema与scope、Squid数字开头CONNECT。各最小修复及操作入口写在原工具README。
- 首条telemetry pending早于Langfuse容器创建，停进程后完整备份checkpoint，仅恢复该确定未到达请求；后续50回执且无pending。今后先启动Langfuse，无法确认的发送不得盲重试。
- 独立High复核隔离、只读DB/Secret边界、RPM回退、报告输出路径、GET白名单和SSH转发，阻断项已修。没有以安装/Schema/服务健康代替科学质量。
## 固化入口与限制
- 复用architecture-guard、能力台账、server-capabilities、ADR-002及CURRENT；按问题选择目录/符号/图/调用/技能工具，不每轮全跑或另建任务库。
- 开发工具不会自动赋权给面向科研用户的Hermes。Hermes既有skill消费仍由runtime导入/注入与资产provenance确认。
- 目录需维护，源码快照需按所查版本更新；生产DB容器重建后需恢复telemetry内部网络，state必须保留。Langfuse未设置定时备份/自动保留期/SSO/SMTP；人工备份入口保留，未演练。
- 无工具保证绝对掌控/科学正确或全调用覆盖；快照无第三方类型，动态引用可能缺失，费用缺失不能当0。
## 后续科研工作（本轮未执行）
- 先沿用已审上游语义/原文限定向配图传一个窄视觉焦点，艺术阶段只负责表达；不能再把长Claim+全部Evidence重新混合分析。
- 收敛8e4候选Chat最终审阅的全稿重写；修过的共享critical-thinking与类型收窄仍需随以后必要应用交付，不能称已上线。
- 自有skill/三套Baoyu有真实消费记录，但通用科学/审美质量未获确认；参考图bytes路径已部署但未实际上传生图。
- RO9067a2d5-42ad-4c06-b234-753728b71064；private e77dc3c7-95cb-4269-ac3c-24276fea74e7；Claim93416292-0dbb-42b1-8810-6bdf77804c1f；40Evidence保持。
- 喜爱图aa41a018-b2ff-4ffb-9557-19ecabe104bc保留；公开OSR-2026-000023/v1/version72c315af不改。旧图/原件/笔记不删除。
- d31/f3c/393科学错误已rejected，cdc/997 failed；旧tmp生成/部署脚本不得执行。下一session从本页→能力台账匹配行→实际代码/任务记录，不载入历史全文。
