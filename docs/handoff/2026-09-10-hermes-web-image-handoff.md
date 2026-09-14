# Hermes / Workbench CURRENT Handoff
## 目标与约束
- 用户要求先完成工具/Skill联动与科研链路复用，并交接Langfuse登录；不承诺零技术债。新增配图风格/生成、Figma、视频、第三篇与批量暂停。
- 禁止测试、预检、CI、本机构建；本机仅静态读写/Git/传输。服务器必要构建/启动已执行，未新增模型调用、生图、论文确认或公开发布。
- Chat为主要生图手段，Codex CLI保留备用；科学认识必须来自上游已审解析/分析。
## 版本事实（2026-09-15）
- 交付树 E:/Miscellaneous/XGS/.worktrees/onchip-video-release；branch codex/onchip-video-release。功能提交784bfd8d9d0166032b4aae84b7d7ee87df152875已推送；完整HEAD以Git读取，后续状态文档提交不等于新应用release。
- 生产release 784bfd8d9d0166032b4aae84b7d7ee87df152875，rollback 89d05d6dfcf432765697762864e9406ea3588ab8。正常deploy --no-tests --skip-migrate --reuse-unchanged-capability-images exit0，服务启动、公网release及收尾成功；日志tmp/foundation-linkage-deploy.log。
- 前次9c30构建/启动通过，但Catalog挂载83179旧源码使清理规划拒绝；自动回滚89d05/b2f3完成，未执行历史删除。故障日志tmp/source-bindings-deploy.log保留，勿重跑旧部署。
- 干净专用发布树art-direction-release-41ae8902 detached在784bfd8d。根目录dirty main不是交付基线；交付树无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得提交/覆盖。
- Serena只读快照与生产同为784bfd8d；镜像缓存23fcfab77fa1，install exit0。Catalog仍使用独立83179c454b75688176060fabf9e611072d46813c源码/镜像及挂载。
- Langfuse独立bundle83179、official v4.35.0；telemetry镜像c2b6683e8e804d07f2928ee4df2cba8d91fb5703；Skills镜像83179；依赖图报告源89d05，不冒充当前全仓图。
- Chat receiver bundle8e4已安装且兼容v1/v2；本轮未更换provider/账号/代理。Squid原生兼容包7:7.2-1.alnx4.openscience.1.x86_64，原RPM及回退入口见服务器清单。
## 已交付的联动修复
- Gateway复用同一个audit sink，在record时读取现有AsyncLocalStorage taskId补空requestId；已有ID/事务/无上下文行为保留。原view与Langfuse connector直接消费，不建追踪库、不猜测回填历史。
- 现有Hermes确认可拆分多条Claim，以sourceBindings选择当前快照sourceIndex及supports/qualifies/contradicts/context；服务器恢复原文/locator，客户端不能自填。旧省略bindings请求仍整字段supports。
- 两确认API共用Zod定义；web复用Domain selection类型及原192条批次容量。来源默认折叠，split独立复制关系；Hermes选择须有supports。保存的是Claim级来源关系，不是每条condition的独立映射。
- 配图planner/review沿用已确认Claim/Evidence，并接parentClaimId；原并发比较覆盖父关系。共享critical-thinking直接来自既有runtime skill，Skill usage合并去重，删除同批Evidence的重复内存遍历，原权限/来源/事务重验保留。
- IllustrationBrief v2分开科学encoding与composition；末审仅可局部修正既有场景composition/treatment，不再重写科学字段/来源/顺序。v1原样读取/直接编译，旧v1修订显式要求新方案，不静默重画。
- 正常发布只登记rollback并写空v2清理意图，保留全部历史目录/镜像；另行明确授权的prepare --prune-unused 1才使用原严格挂载/引用及精确意图约束。完成发布没有删除工具运行输入。
- 两个既有传输脚本共用ssh-identity-path转换Windows原生OpenSSH无法读取的/c/...路径，并启用IdentitiesOnly。784bfd8d正式上传exit0、无原identity警告；未改凭据或重建密钥。
- 上述边界、并发、旧请求兼容、容量及发布/传输修复经独立High静态GO；必要服务器构建/启动成功不等于科学或审美质量通过。
## 工具实际使用与效果边界
- Backstage实际返回agent-worker的owner、Gateway/parser/skills及资源依赖；它是维护目录，不是运行事实，也未搭完整门户。
- Serena现版本references科学审阅prompt，实际定位extractor.ts中modelScientificReviewCanonicalProposal与webScientificReviewCanonicalProposal两条已有调用。日志tmp/serena-foundation-references.log；下一步应沿这两入口扩展，避免再建审阅阶段。
- Langfuse已有50回执；曾实际抽读10成功和2生图失败。最新16:05 UTC读取仍返回2条历史image_provider_failed，requestCorrelation/费用未知保持unknown，日志tmp/langfuse-foundation-errors.log。新任务ID接线已上线，但尚无正常新任务证明关联效果；不为填证据制造模型调用。
- Vercel Skills实际list得到31项目技能、find找到科学插画候选；不自动安装/更新。Hermes消费要看runtime导入/注入和资产provenance，安装登记不证明使用。开发管理工具不自动赋权给科研用户Hermes。
- dependency-cruiser既有报告19模块、4条worker→Gateway跨包边；仅选定scope，非全仓动态调用图。Portainer/Netdata继续承担容器与资源观察。
- 本机浏览器桥inventory返回nodeRepl.fetch request failed；没有实际检查新版确认UI或代登录，不能解释为账号/代理故障。未触发只适用于request-header-policy错误的reset恢复。
## Langfuse登录与持久维护
- 浏览器入口 http://localhost:3130/auth/sign-in，经已有infra/scripts/ssh-run.sh --development-tunnel。容器重建/IP变化后重开隧道；当前任务用容器内标准只读MCP/API入口完成查询。
- 独立owner账号，不使用OpenScience/ChatGPT密码。用户本人在私有终端查看/etc/openscience-development/langfuse/owner-credentials.txt，准确命令见infra/development-platform/langfuse/README.md#login-handoff。未读取/打印/重置凭据；用户登录尚未确认。
- 后台采集/受限查询用服务密钥，无须用户网页登录。SMTP/SSO/定时备份/自动保留期未配置；密码改过则初始文件不代表当前密码。人工备份入口保留，未演练。
- 目录随能力变化维护，Serena快照按所查commit更新；PG容器重建后要恢复telemetry专用内部网络且保留state。正常发布保留历史会占磁盘，沿用现有监控，清理单独授权，不自动删目录/镜像/卷。
- AGENTS、architecture-guard、docs-sync及17个流程Skill已进入交付分支：按目的查能力→调用→已有结果→补缺口；有状态变化回合final前同步，关键节点先保存，中断后核Git。后续会话持续适用，不是应用关闭后的可靠回调，不增定时任务/自动提交/自动部署。
## 下一步与保护对象
- 尚缺最终科学审阅输出的source-bound atomic suggestions以及逐条condition/limitation来源绑定。目前末审仍六字段摘要；未审semanticStage不能当事实。扩展现有两条末审调用的共同输出并沿原确认入口采用，不增加模型阶段/分析数据库。
- 新确认UI、v2审阅和参考图bytes路径尚未在正常新研究任务中观察；旧喜欢图不重做。无工具能保证通用科学/审美质量或绝对零债。
- RO9067a2d5-42ad-4c06-b234-753728b71064；private e77dc3c7-95cb-4269-ac3c-24276fea74e7；Claim93416292-0dbb-42b1-8810-6bdf77804c1f及40Evidence保留。
- 喜爱图aa41a018-b2ff-4ffb-9557-19ecabe104bc、公开OSR-2026-000023/v1/version72c315af与deep-sub-cycle公开v1均不改。本轮未删除原件/历史/笔记，未新建生成或清除请求。
- 下一session读本页→能力台账匹配行→实际代码/任务；不要加载历史全文或重跑tmp中旧失败/生成脚本。
