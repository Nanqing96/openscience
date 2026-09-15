# Hermes / Workbench CURRENT Handoff
## 目标与约束
- 2026-09-15真实私有配图25215cd1-e37a-4155-922d-3c06ae9aaec5五次MiniMax后Chat提交前失败；两处runner修复后同原请求仅发送一次、现已自动回收blocked。6 Pro指出k_z误作矢势分量、k与k⊥混用、Bessel形状因子与k_z曲线/量纲混合，禁止该方案生图。原review job及spool均有recovered-result/response；不是成功资产。下一任务将原审阅反馈交回既有planner，不能手工替代科学分析。
- 修订任务1da6b754-0678-41b7-af4b-240d401a56d4已succeeded；真实checkpoint先保存、API仅result:{}，正常Chat发送/锚定/回收无兼容错误。6 Pro revised仅改composition：k₀分界置低波矢、f近1区，振荡过零在倏逝区，f作纵轴、k_z只作区域说明；方案已按修正保存，内部approval API200。回执tmp/illustration-revision-20260915-start.json。
- 生图2196c4bc-347f-4ad5-a75b-3e9721efe491于02:13:33 UTC API202只提交一次，parent1da6/schema2直接编译、实际styleReference aa41；job已有reference.png/attachment-ready/submitted/conversation，当前等待真实图片。回执tmp/illustration-image-20260915-start.json、服务器/jobs/research-illustration-20260915-image.json。不重发、不再prompt改写、不用Codex CLI，尚未确认最终图科学/审美。
- 用户2026-09-15确认Langfuse已登录，要求继续并说明后续任务。先收尾既有科学审阅结果复用，再沿正常研究任务恢复配图质量优化；不新增治理平台/模型阶段，新增风格、Figma、视频、第三篇和批量仍暂缓。
- 禁止测试、预检、CI、本机构建；本机仅静态读写/Git/传输。真实规划及审阅调用见上文，必要服务器构建/启动与阻塞故障取证按现有规则执行；没有新provider或公开发布。
- Chat为主要生图手段，Codex CLI保留备用。科学认识来自上游已审解析/分析，不能用未审semanticStage或参考图作为科学证据。
## 版本事实（2026-09-15）
- 交付树 E:/Miscellaneous/XGS/.worktrees/onchip-video-release；branch codex/onchip-video-release；功能HEAD 04b5f91df4b4e86c210155cee83cd741f1521ca3已推送并部署，完整当前HEAD从Git读取，文档提交不等于应用release。
- 生产release 04b5f91df4b4e86c210155cee83cd741f1521ca3，rollback 3a60503ca14eb7b190bc49049e836627403c6036。既有deploy --no-tests --skip-migrate --reuse-unchanged-capability-images exit0；必要build/start、release切换和收尾完成，产品/__release实读一致。日志tmp/storyboard-checkpoint-deploy.log，不代表科学/审美验收。
- 干净专用发布树art-direction-release-41ae8902 detached在04b5f91d；根dirty main不是交付基线。无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得提交/覆盖。
- Serena源码快照与生产同为04b5f91d；原缓存镜像复用，installer exit0，日志tmp/storyboard-checkpoint-serena-install.log。Catalog仍独立使用83179c454b75688176060fabf9e611072d46813c源码/镜像及挂载。
- Langfuse bundle83179/official v4.35.0；telemetry镜像c2b6683e8e804d07f2928ee4df2cba8d91fb5703；Skills镜像83179；依赖图报告源89d05，仅选定scope，不冒充当前全仓图。
- Chat receiver独立bundle de97707f06eb0ff7d9cb100662af5ab53d73867b：就绪等待和原文消息锚定，两次High静态GO、installer exit0；Gateway源码未变，复用8e4原dist和renderer镜像，不重建浏览器/账号/代理。日志tmp/review-hydration-install.log、review-anchor-install.log。Squid及回退见服务器清单。
## 本轮交付：既有末审结果直接进入确认
- extractor.ts沿既有model/web末审增加v5可选claimSuggestions，通常只产少量实际主张，8000字符输出提示优先保障六字段。无新模型轮次，普通未终审首稿仍无建议；旧v4恢复保留原合同/提示词/请求身份。
- materializeReviewedClaimSuggestions按本轮真实P定位映射最终evidenceSegments索引；拒绝关系冲突、合并段覆盖不足或缺有效父项的建议。Shared Domain parser校验类型、来源索引及父子关系；无效可选建议回退原六字段，不额外重审。
- Domain仅对review_received/v5且未被用户改写、未blocked的字段暴露建议，失效父项后代递归移除；Hermes原确认UI预填结论、条件、局限、父关系和引用关系，无新审核面板，不自动选中/确认。
- 编辑结论/条件/局限/关系后须重新确认引用关联；修复组件自动恢复attachSourceQuote的问题。旧API请求仍兼容；服务端原权限、快照、来源恢复、事务与并发约束保留。
- 共享12条Claim容量用于Domain/API/UI及research-run，沿用既有192条Evidence批次上限，无迁移。保存Claim级来源关系，不是每条condition的独立证据表。
- 独立High主路径及两处收尾静态GO；必要服务器构建通过。新建议、确认交互与下游科学质量尚未在正常新任务中观察，不能宣称自动质量已达标。
## 工具实际使用与持久维护
- Backstage此前实际返回agent-worker owner及Gateway/parser/skills依赖；它是维护目录，不是运行或质量事实。
- Serena在新生产快照实际定位materializeReviewedClaimSuggestions的唯一调用：extractor.ts:2566，reviewAndMaterializeCanonicalProposal共同物化路径；日志tmp/reviewed-claims-serena-references.log。
- Langfuse于2026-09-15 01:34:25 UTC经原受限查询入口读回该真实任务全部6次调用，requestCorrelation均为25215cd1：五次MiniMax成功、一次scientific_review失败。采集有120秒提交延迟、60秒轮询及分页，无需重启/重放；旧unknown不猜测回填。任务关联已实证，不代表科学质量。
- 用户已确认Langfuse登录。账号按明确要求改密，同事务密码比对成功、旧会话失效、私有凭据文件0600原子同步；文档不存密码。容器Prisma使用已安装pnpm生成客户端路径，根入口缺生成client。
- 登录入口http://localhost:3130/auth/sign-in；沿用ssh-run.sh --development-tunnel。容器重建/IP变化后重开隧道；后台采集/查询用独立服务身份，不依赖网页登录。SMTP/SSO/定时备份/自动保留期未配置。
- Vercel Skills曾实际list得到31技能、find返回候选；安装、runtime注入、实际产物provenance和质量分别记录。开发工具不自动赋权给科研用户Hermes。
- 当前浏览器桥fetch失败；Windows控制因无法可靠确定浏览器URL而终止，未代操作产品UI。用户本人登录是用户确认，不冒称工具观察。
- 与既有Chat“规划Hermes可信闭环”6aa2df58-0c20-83ea-838d-4e1129091d79讨论两轮，已纠正其旧共编/误删说法；最新回复225a4636-ca84-4eea-8a9a-5dfa30460054，回执tmp/chat-foundation-plan-20260915.json。接口不暴露模型档位，未验证6 Pro选择。
- 既有AGENTS/architecture-guard/docs-sync及17流程Skill持续适用：按产品目的查能力/真实调用/结果后补缺口，有变化回合结束前同步、关键节点保存、中断后读Git；不是应用关闭回调，也不保证绝对零债。
## 已交付的相关基础
- Worker Gateway audit sink从已有AsyncLocalStorage任务上下文补空requestId，原view/Langfuse connector直接消费；已有ID和事务行为保持。
- 配图planner/review沿用确认Claim/Evidence及parentClaimId；共享critical-thinking runtime，合并Skill usage去重，保留原权限/来源/事务重验。
- IllustrationBrief v2分开科学encoding与composition；末审只改既有场景艺术字段。v1可读/直接编译，旧v1修订显式要求新方案，不静默重画。
- 正常发布只登记rollback、写空清理意图，保留全部历史目录/镜像；明确清理才走原严格约束。Windows传输共用ssh-identity-path且IdentitiesOnly；正式上传无旧identity警告。
## 下一步与保护对象
- handler内部result.storyboardCheckpoint已部署：规划后审阅前CAS保存原document/promptHash/designSkills及现有输入身份；Domain重试保留、公开投影剔除，真实1da6已保存且API隐藏。同输入才复用已回收review，旧任务无checkpoint或来源变化阻断；High GO。科学blocked必须明确新修订任务，不用同ID重试，不假造旧25215的provenance，不改变provider恢复限制。
- 先沿下一份正常私有研究/配图任务观察“上游已审结论→用户确认→画面方案→Chat图像”的结果与任务关联，再决定是否要修上游或调艺术方向。不要重跑旧失败脚本、自动重审整篇或把上线当质量通过。
- 新确认UI、v2局部审阅与参考图bytes路径尚无正常新任务的端到端质量证据；无工具保证通用科学/审美质量或零技术债。逐条condition独立来源表不在本次实现内。
- RO9067a2d5-42ad-4c06-b234-753728b71064；private e77dc3c7-95cb-4269-ac3c-24276fea74e7；Claim93416292-0dbb-42b1-8810-6bdf77804c1f及40Evidence保留。
- 喜爱图aa41a018-b2ff-4ffb-9557-19ecabe104bc、公开OSR-2026-000023/v1/version72c315af与deep-sub-cycle公开v1均不改；本轮未删原件/历史/笔记，真实私有配图任务见上文，无清除请求。
- 下轮读本页→能力台账匹配行→实际代码/任务；无需加载历史全文或重启治理调研。
