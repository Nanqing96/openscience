# Hermes / Workbench CURRENT Handoff

## 当前结论与下一动作（2026-09-15）
- 当前用户要求实际用已安装设计Skill改善28b。线上旧composition明确要求内外同色，导致参考蓝金失效；普通base修订仍重跑science。已部署既有请求revisionMode=art（baseAssetId、image、同locale、v2/current支持来源），复制全部科学字段，只运行既有art规划和末审；旧请求不变，无新入口/模型/表/依赖。自有Skill v4明确配色角色、标签层级、替换旧冲突及艺术复用，已同步Codex/Hermes；独立High GO，服务器build/start exit0，无测试。真实69ec3ebb-b28c-48c9-81d4-85dfc26ab5a5于05:15:43 UTC API202，直接base4f，实际sciencePreserved=true且baoyu水彩/构图/文字资料已消费，内蓝外赭金艺术方案已保存。6Pro revised只移除艺术模型额外刻度，科学字段仍完全相同；内部approval200。新图1cb8e12b-b81a-4ca6-893c-cf9800af556c于05:18:56 UTC API202，使用69ec方案+aa41原PNG，失败且未提交到Chat（image_mode_plus/not_submitted）；同长简报填入后点击菜单可复现Target crashed。容器OOM/PID事件均0，1.077/4GiB、251/1024；日志SIGILL后crash-handler SIGSYS，不据此关闭sandbox。原未发送简报先选图像模式再Control+Home插字，实见mode=true/exactText=true/no submit；runner仅改此顺序及page_crashed固定错误类别，保留最终文本/模式/参考/提交约束，High GO。独立provider e57153f3已安装exit0，复用6430未变Gateway dist和原renderer；f42405d4-efb2-43a5-a209-8f4de426eeb7于05:28:14 UTC API202，沿用69ec+aa41已通过完整简报/原生模式/参考校验且提交一次；原30秒canonical URL等待超时，实际同owned page已出现会话6aa8d7ae-4854-83ea-b15a-33dabd3a2e22和生成进度45%，不是模型失败，禁止重发。正定向复核有界120秒等待修复及该原请求URL补接，之后由既有broker回收；无重规划；tmp/illustration-art-menu-image-start.json及menu-provider-install.log保留。69ec方案和1cb8失败留存，不重规划、不公开发布；tmp/illustration-art-only-{start,observed,image-start}.json保留，发送脚本不可重跑。
- 用户已确认Langfuse登录并授权执行：先完成既有工具/Skill联动、消除重复实现，再推进真实私有配图。基础联动已上线且有真实调用证据；通用科学/审美质量尚未完成，不能以部署或task succeeded代替。
- 此前任务7d47cd45-1b07-4795-a0bb-e5ba3e70f53a于04:18:18 UTC科学blocked：新增了坐标分量、单色波数和区域名称，仍漏“k⊥是横向波矢模长”。75eac9d3-3ab3-468c-bc40-53d6f52bafa2此前也blocked；两份均无新资产/图片。原审阅正常返回，不是登录/代理/receiver故障。
- 两次实际checkpoint比较均证实：除labels及由它派生的visualAction，科学/艺术字段与原59702完全相同；新调用仅共享科学skill v2及自有skill v3，没有重跑艺术规划。证据tmp/illustration-label-meaning-observed.log。
- **反馈回传修复已部署，4f方案accepted，28b真实成图已看。下一步是艺术风格遵循与两域区分度，不再回到工具调研、整篇科学重规划或重发失败任务。当前草稿未发布，不能称审美目标全部完成。** 定向High确认两处断点：自由文本反馈无法逐项对应，首轮来源限制丢掉最新反馈。已补既有末审issues、patch逐项对应与最多两层显式修订，独立High GO，32e7929212c947d158a184800efb7f07e043ab02已部署，必要服务器build/start exit0；无新平台或自动重试循环。

- 新真实任务4f3b3260-f552-44ef-adbf-5273495a4033已API202（04:40:15 UTC），直接引用7d最新checkpoint/完整反馈；实际只在两个区域label补k⊥模长定义，其余科学/艺术字段完全不变。新checkpoint记录reviewFormat2、科学skill消费，无art调用；6Pro已accepted、corrections/issues均空，确认全部标签/圆形分界含义，内部approval200。回执tmp/illustration-review-issues-continuation-start.json及observed.json、final-response.json。禁止重跑该发送脚本。
- 真实生图28b8b9ef-cea7-4000-b25d-57426559fed5于04:44:07 UTC API202，parent4f3b3260、style reference aa41，已succeeded并返回1672×941 PNG，资产仍draft。实际看图：kx/ky正交、k0圆形分界、内传播/外倏逝严格不等式及变量说明可见，未见前两图明显科学错误；内外同偏蓝，区分度及蓝金参考风格遵循仍可改善。实际bytes保存tmp/research-illustration-28b8.png；provenance为structured_brief/skillv3/aa41实际引用，未再语义改写。首次产品dashboard导航ERR_SSL_PROTOCOL_ERROR发生在任何写入前，已确认无receipt及公网HTTPS200后原脚本仅再执行一次成功，不是重复模型请求；TLS瞬态根因未定。回执tmp/illustration-reviewed-labels-image-start.json。
## 版本事实与工作区
- 交付树 E:/Miscellaneous/XGS/.worktrees/onchip-video-release；branch codex/onchip-video-release。代码HEAD 6430ca03ffc5367b233d108dcd43250c827dd53f；后续状态文档提交的HEAD以Git为准，文档提交不等于新应用release。
- 生产release 6430ca03ffc5367b233d108dcd43250c827dd53f；rollback 32e7929212c947d158a184800efb7f07e043ab02。既有deploy --no-tests --skip-migrate --reuse-unchanged-capability-images exit0；必要服务器build/start完成。日志tmp/illustration-art-reuse-deploy.log。
- 专用发布树art-direction-release-41ae8902 detached于同一release。根E:/Miscellaneous/XGS为dirty main，仅导航至此；不是交付源。无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得提交/覆盖。
- Serena源码快照6430ca03，installer exit0；缓存镜像23fcfab77fa1、tag04b5f91df4b4e86c210155cee83cd741f1521ca3复用，不混淆镜像版本与源码。日志tmp/illustration-art-reuse-serena.log。
- Chat receiver独立bundle e57153f30281dce93a3cd968be63059911259b22，回退e74c9396dae51b294917dc52ed84893668029806；telemetry独立abea68ef已安装，回退c2b6683e。Catalog/Skills bundle83179c454b75688176060fabf9e611072d46813c；Langfuse official4.35.0。
- Renderer保持sha256:1c47a579ceb608f244878b41888eee50bda1135ff325cb7b49de3a275ee2013d。独立工具版本不冒称应用release；旧目录/镜像仍保留。

## 已交付代码及已观察效果
- 既有科学末审v5同轮输出可选claimSuggestions，materializeReviewedClaimSuggestions将真实P定位映射最终Evidence索引；Domain共用校验进入原Hermes确认UI，不另加审阅模型。上游blocked/用户改写/无效父项不暴露建议，旧v4恢复及原六字段回退保留。12条Claim/192条Evidence共用现有限制。新正常论文的确认交互与科学效果尚未观察。
- Worker复用AsyncLocalStorage补Gateway空requestId；原Langfuse connector/view消费，不另建任务库。25215全部6次、1da6规划/审阅、2196及8d生图均真实关联；75e审阅及7d规划也已查询到。Chat两个固定model标签经SQL/connector/query精确放行，旧unknown不猜测回填。
- Chat调用日志中的succeeded表示调用正常返回，审阅结论仍可blocked。token/cost未知保持未知；订阅通道代码cost0不代表订阅总成本为0。采集有120秒提交延迟/60秒轮询/分页，不为补日志重放模型。
- IllustrationBrief v2分离科学encoding与艺术composition；既有末审仅修改艺术字段。共享critical-thinking与自有配图skill确实由science/review两阶段加载，provenance记录id/version；旧v1仍可读/直接编译，不能静默重画。
- handler规划后、Chat前保存私有storyboardCheckpoint，原Domain retry保留、公开投影隐藏；同来源/输入/原base才复用，CAS及provider前/落库时的权限和来源重验保留。真实1da6已保存且API隐藏，不假造旧任务checkpoint。
- revisionTaskId现可复用同actor/RO/version/Claims/locale/style最新failed checkpoint与反馈，最多两层、递归重建原identity；仅给已有labels加prefix/suffix。新末审issues保存在私有storyboardReview，复用既有candidate/source/request/response身份，patch按issueId逐项对应；公开隐藏。旧checkpoint无reviewFormat仍用原协议；新plan记录2。独立High GO、必要build/start通过，真实4f继承7d且非label字段保持，末审accepted。结构覆盖不等于语义完成；现代blocked issues的后续消费尚未在新真实任务中观察，旧7d本次用完整legacy反馈，不能伪称覆盖该分支。
- 自有openscience-research-illustration skill v3已同步本机Codex与Hermes：来源先于画面、标签名称/含义、科学修订与艺术修订分开；精确函数图交数据renderer，Chat用于概念插图。不把固定论文变量写成通用模板。
- 原结构化repair补固定路径/字段/长度诊断，仅完整八字段单scene允许无损包装；未知字段仍拒绝。03a9/982f/b5e旧失败无Chat/asset/checkpoint，不重跑。
- Chat receiver修复页面就绪及Markdown原文锚定；e74进一步在DOM/Copy为空时严格绑定原会话、原用户全文、可见final节点/current_node/完成状态/父链读取同源已完成回复。独立High GO，a803由原broker自动恢复blocked，无重发；接口变化失败关闭，不保证永久稳定。日志tmp/review-stored-final-install.log、review-stored-final-recovered.json。
- 正常发布只登记rollback及空清理意图，保留被独立工具挂载的历史目录；明确清理才走原约束。Windows传输共用ssh-identity-path及IdentitiesOnly，正式上传未再出现旧密钥路径警告。

## 真实画面结果与失败谱系（不得重跑收据脚本）
- 25215cd1-e37a-4155-922d-3c06ae9aaec5：五次MiniMax后接收故障，修复后原请求仅发送一次；审阅blocked变量/物理量/坐标混用。旧任务无checkpoint，无图。
- 1da6b754-0678-41b7-af4b-240d401a56d4修订方案revised、内部approved；2196c4bc-347f-4ad5-a75b-3e9721efe491用aa41实际PNG生成1672×941图，错把k0分界放首次过零点，已rejected。tmp/research-illustration-2196.png保留。
- a38aa258-029a-4404-889d-54048b1085ec局部方案accepted、内部approved；8d6798b4-0865-4b58-8940-c7947f641bad生成1672×941图，分界纠正但漏坐标/阈值且函数形状不可靠，已rejected。tmp/research-illustration-8d6798.png保留。
- a803553c-831d-41d8-8173-c3e632867966有checkpoint，审阅恢复blocked二维/一维及跨域映射错误；59702f05-be92-4dca-aad0-6d17416d3c83更换科学焦点、无base，二维分类方案blocked缺可见区域名称；34ce4da4-f55a-461e-afb0-0a77f54206d9全量再规划补名称却丢kx/ky，blocked。
- 75eac/7d47均引用59702原checkpoint而非串联修订；原公式/构图保持，模型仍遗漏定义。完整API回执及审阅分别在tmp/illustration-scoped-clarification-*、illustration-complete-label-meaning-*、illustration-label-meaning-observed.log；服务器/jobs/research-illustration-20260915-*.json保留幂等收据。

## 工具联动、登录及持续维护
- Backstage标准私有目录实际返回agent-worker owner与Gateway/parser/skills依赖；Serena实际查询科学末审调用方及materializeReviewedClaimSuggestions唯一共同物化路径；Langfuse实际读回上述任务。目录/代码引用/调用与产物质量分别判断，详见能力台账匹配行。
- 用户确认Langfuse已登录，账号按指定改密，原服务API身份不变；文档不记密码。入口http://localhost:3130/auth/sign-in，沿ssh-run.sh --development-tunnel；容器IP变更需重开隧道。后台采集不依赖网页登录；SMTP/SSO/定时备份/自动保留期未配置。
- 既有Chat讨论“规划Hermes可信闭环”6aa2df58-0c20-83ea-838d-4e1129091d79两轮已纳入实现；回执tmp/chat-foundation-plan-20260915.json，接口未验证模型档位。当前本机浏览器桥恢复失败，不重复重启；服务器既有CDP仍用于实际产品任务。
- AGENTS/architecture-guard/docs-sync及17流程Skill在交付树持续适用；有实际变化的回合final前同步，关键节点保存，中断后核Git。不是应用关闭回调、自动提交或绝对零技术债保证；无需重启工具市场调研。
- BGE建索引存在，hybrid query应用调用/实际效果尚未观察；不能为了用上模型强塞进配图。逐condition独立证据表不在本轮实现内。

## 约束、保护对象与读入顺序
- 禁止测试/预检/CI/本机构建；本机仅静态编辑/Git/传输。服务器必要build/start及真实产品结果观察已执行，无Codex生图、公开发布或清除请求。
- Chat生图优先，Codex CLI仅保留；科学认识必须由原始文献及已审结果产生，参考图只用于美术。新风格扩展/Figma/视频/第三篇/批量暂缓，先改善现有真实图的风格遵循并由用户判断审美。
- RO9067a2d5-42ad-4c06-b234-753728b71064，private version e77dc3c7-95cb-4269-ac3c-24276fea74e7，Claim93416292-0dbb-42b1-8810-6bdf77804c1f及40Evidence保留，identity dbec53fff80645ec6698eea26720e4157b74a72561e7d4ee6283ad5c70374e13。
- 喜爱图aa41a018-b2ff-4ffb-9557-19ecabe104bc、公开OSR-2026-000023/v1/version72c315af及deep-sub-cycle公开v1均不改。失败草稿/原图/原件/笔记仍保留。
- 下一轮：本页→能力台账相关行→实际代码/任务；Git历史保留详细过程，不加载全部历史或复跑失败任务。当前文档压缩不代表旧事实被撤销。反馈修复已提交32e79292；当前仅本任务状态文档及保留的无关spec可能dirty。
