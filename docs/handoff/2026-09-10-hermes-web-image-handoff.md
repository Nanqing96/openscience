# Hermes / Workbench CURRENT Handoff

## 产品目标、交付差额与下一动作（2026-09-15 用户纠偏）
<a id="illustration-delivery"></a>
- 原定目标仍是通用、多风格科研配图：上游文献解析/科学分析与经审核关系 → 按用途选择艺术表达 → 服务器Chat生图 → 科学与用户审美审阅。需求依据为需求基线的“2026-09-14 图片能力推进”；不得把单篇圆图或用户认可的淡彩构图固定成通用模板。
- 本批交付及已有资产只按下表续作；水墨保留为已有艺术方向，不扩充本批范围。后续水彩f424只是额外私有候选，不能计作新增风格完成。

| 交付项 | 原任务/资产与实际用户反馈 | 当前差额 |
|---|---|---|
| 学术机制图（本场景按科学关系呈现分类图谱；TM 1） | 旧cdce被否定；新方案625119fa-5d8a-4e2a-a007-ceac51a83071使用scientific资料、科学字段与69ec一致，6Pro accepted；图c3a49716-35e9-440c-b3d9-659c2d86632c成功，已看实图 | 清晰学术候选，保持draft，待用户审美认可 |
| 编辑封面插画（TM 2） | 旧1a1d被否定；方案15a314a6-44e1-4829-a4e1-c30f78039896经6Pro仅艺术修正；图ac16631b-782f-4b2f-9fdf-fcc033b867e0成功且已看 | 仍偏教材图/满铺网点，未达到封面目标，不计合格交付；保留候选 |
| 淡彩手绘（TM 3） | aa41a018-b2ff-4ffb-9557-19ecabe104bc用户认可 | 保留原图，不默认重画 |

- 偏差已定位：前版CURRENT将“微调淡彩、暂停新增风格”写成下一步，progress/index又沿用，局部科学/执行器修复替代了原交付目标。新一轮不得继续默认重画淡彩图。
- 下一步先用已安装设计参考和既有艺术修订能力，完成学术机制图、编辑封面两类缺项；科学内容复用已审上游成果，构图/字体/材质根据用途重新设计，不只换色。审美认可属于具体成图，不等于其旧科学方案免于复核。Figma/视频/第三篇/批量继续暂缓。
- 已有69ec方案真实消费baoyu构图/水彩/文字资料，f424取回入库且实际看过，仍draft。revisionMode=art现已接入普通Hermes自然语言；本次真实对话遇到结构回复拒绝，修复及完整体验仍待实际观察。
- 2026-09-15续作：独立High定位41ae→ea436→3fa2→28197的目标漂移；现有AGENTS/docs-sync增加需求条款与未完成交付项对照、局部暂停不取消目标，根导航规则及已有Memory同步。Backstage线上需求/源码导航指向旧origin/main（缺多风格条款），候选改为交付分支；Langfuse原只看最新10条，候选加原任务ID过滤。无新管理平台/表/测试；科学内容仍复用69ec。
- 已部署Hermes接线：presentationDraft可成对携带revisionMode=art/baseAssetId，候选限同RO/version/locale与有效v2图片；原稿/版本明确绑定，指令自由改写清除art，原请求/不确定回放保留。缺少明确原稿时澄清，不按最新更新时间猜。7文件与防漂移改动已获独立High静态GO并部署，自然语言实际失败的范围见下。
- ac166暴露明确封面要求被艺术规划忽略；末审虽已收到userRequest，仅检查科学误导。已部署自有Skill v5/原planner/同一次末审补明确艺术要求符合性，继续只修composition/treatment，科学字段不变，不新增模型阶段或宣称审美通过。此前v4图库与本批两张图均保留。PNG在tmp/research-illustration-{atlas-c3a497,editorial-ac166}.png。
- Taskmaster查实仍在八月已完成的hermes-research-intelligence，未登记本批目标；现复用同一tasks.json增加multistyle-research-illustration三项稳定验收，1/2进行中、3按用户既有认可完成。资产/反馈/版本只在本表，状态是唯一同步位。旧tag保留历史；工具projectRoot必须为交付树，根main只作导航。独立High同意此最小联动。
- 06188212应用已部署，rollback6430；Catalog/telemetry同bundle06188212、Serena同源码快照（旧缓存镜像不变），安装exit0。真实Catalog已返回当前需求链接；按625119fa查询Langfuse返回2条精确关联（艺术规划+6Pro审阅），无模型造数。
- 真实页面Hermes收到艺术修订请求，guide99e4f974-985b-4f12-808a-7fa39531ce32的3次结构回复均schema拒绝，只留guide:nested_fields。任务scope/原稿资格已实读无误；未创建新图。不能猜具体错误字段，正在补既有字段诊断/原回复修复反馈，不增加重试次数或输出正文日志。

## 版本与工作区
- 交付树 E:/Miscellaneous/XGS/.worktrees/onchip-video-release，branch codex/onchip-video-release；代码061882123d14be00b868c1971c9d56de21d83b6e，后续提交HEAD以Git为准。根dirty main只作导航，不作为部署源。
- 应用production061882123d14be00b868c1971c9d56de21d83b6e；rollback6430ca03ffc5367b233d108dcd43250c827dd53f。既有deploy --no-tests --skip-migrate --reuse-unchanged-capability-images exit0，必要服务器build/start完成。日志tmp/goal-art-route-deploy.log。发布树art-direction-release-41ae8902 detached06188212。
- Chat provider独立bundle2e434fdee3d99b7798bf66a24c23b7fd869743e4；回退e57153f30281dce93a3cd968be63059911259b22（菜单顺序已修，canonical仍30秒）；再前e74c9396dae51b294917dc52ed84893668029806。两次installer exit0，复用未变6430 Gateway dist和原renderer，无浏览器重启/登录切换/沙箱放宽。日志tmp/illustration-{menu,canonical}-provider-{transfer,install}.log。
- Serena source快照06188212（应用源码；不冒称含独立provider运行状态），缓存image23fcfab77fa1/tag04b5f91df4b4e86c210155cee83cd741f1521ca3；installer exit0，tmp/illustration-art-reuse-serena.log。Catalog/telemetry bundle061882123d14be00b868c1971c9d56de21d83b6e（rollback分别83179c45/abea68ef）；Skills CLI bundle83179c454b75688176060fabf9e611072d46813c不变；Langfuse official4.35.0。
- Renderer保持sha256:1c47a579ceb608f244878b41888eee50bda1135ff325cb7b49de3a275ee2013d。无新依赖/表/迁移；未测试/CI/本机构建。本轮审阅代理误执行一次只读git diff --check，仅报行尾提示，已停止后续预检。3段代码变更均独立High静态GO；日志/构建/实际图分别证明各自范围。
- 无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得提交/覆盖；其他历史文件、任务、图、工作树均保留。

## 本轮实际链路与文件
- 旧28b图的composition明确写“圆内/外同色淡彩”，参考蓝金因此被旧指令抵消；普通base修订还重跑science。已在既有StoryboardRequest/API新增可选revisionMode=art，要求image+baseAssetId、无revisionTaskId、同locale、v2及当前支持原文；worker逐字段复制科学内容，只调用既有art和末审，保持原来源/权限/CAS。旧请求行为不变。
- 自有openscience-research-illustration Skill v5已进入生产并同步C:/Users/Mac/.codex/skills：明确艺术修订入口、替换被否定的旧指令、按既有视觉角色分配颜色、主文字/释义层级。baoyu原包未改；用户这张图的蓝金偏好留在具体请求，不写成通用模板。相关实现/引用见project_index与能力台账。
- 69ec3ebb-b28c-48c9-81d4-85dfc26ab5a5于05:15:43 UTC API202，以已审4f3b3260-f552-44ef-adbf-5273495a4033为base。checkpoint和最终doc实际比较sciencePreserved=true；usage含自有v4及baoyu-article-illustrator/prompt-construction/watercolor、cover与infographic设计章节，无科学重规划调用。6Pro revised只删艺术模型新增“刻度”；科学字段仍完全一致，内部approval200。证据tmp/illustration-art-only-{start,observed}.json。
- 1cb8e12b-b81a-4ca6-893c-cf9800af556c第一次生图在image_mode_plus/not_submitted失败，无图、无Chat提交。实际原简报填入后点击菜单复现locator.click: Target crashed；容器1.077/4GiB、251/1024，OOM/PID事件0。Chrome SIGILL后crash-handler SIGSYS，不足以证明引擎底层根因。原未发送简报先选生图模式再Control+Home插字，mode=true/exactText=true；runner改此顺序与page_crashed固定诊断，保持最终文本/模式/附件/提交记录校验。
- f42405d4-efb2-43a5-a209-8f4de426eeb7于05:28:14 UTC API202，以69ec+aa41实际PNG生图。完整wrapped prompt/native mode/reference均通过，submitted.json只一次；canonical URL晚于旧30秒出现，观察器转uncertain，但同owned page实际在生成。新bundle等待至max120秒且保留105秒结果恢复时间，无自动重发。
- 已对f424原page/target、原request/submitted id+promptHash、唯一user完整wrapped文本及reference回执严格核对，独占写回正常conversation.json。Chat用户正文中的Create image为独立SPAN badge，Show more为外层控件；只提取直接文本节点，仍要求完整文本相等。回执tmp/illustration-bind-original-image.json，resubmitted=false。该一次性恢复脚本不可再跑。
- 既有broker回收f424原图且spool/result=succeeded。原任务因此前uncertain已failed，随后仅用原/agent/tasks/:id/retry消费已完成provider结果，API200、executionAttempt2成功，不是第二次生图。产品asset f424为draft、hash880c598fc95d1fc2802c5287ecee93d2d71fc2ddbf48389fc77f3145e74228f5、structured_brief/skill4/parent69ec/referenceaa41。证据tmp/illustration-art-{menu-image-start,result-import,final-result}.json。
- 实际1672×941 PNG：tmp/research-illustration-f424.png（1721329bytes）；已view_image，看见冷暖分类、主次标签、kx/ky和k0说明，纸纹仍偏重。旧28b同尺寸图保留tmp/research-illustration-28b8.png。f424未approved/rejected或公开，当前仅私有候选。

## 保护范围及既有科学能力
- RO9067a2d5-42ad-4c06-b234-753728b71064，私有versione77dc3c7-95cb-4269-ac3c-24276fea74e7，Claim93416292-0dbb-42b1-8810-6bdf77804c1f；40条Evidence identity dbec53fff80645ec6698eea26720e4157b74a72561e7d4ee6283ad5c70374e13。
- 用户喜欢的aa41a018-b2ff-4ffb-9557-19ecabe104bc保持原样，style hash565fa04e0c79ab9ee797b4bfd9d3a334b6f49b88b72756f8d1533bb631e7330b。旧参考父方案854ae2dc为legacy，仅参考风格，不绕过科学审核。公开Quantization OSR-2026-000023/v1与deep-sub-cycle/v1、原文件/笔记/草稿不改。
- 原4f已通过6Pro，继承7d47cd45最新失败稿，仅补两个label的k⊥模长定义；其余science/art字段保持。28b在04:44:07 UTC直接编译4f+aa41实际生成，科学标签可见但艺术未达目标。旧59702/34ce/75e/7d标签失败谱系保留Git历史与tmp/illustration-*，不重发。
- 原末审issues保存在私有storyboardReview，复用既有candidate/source/request/response身份，patch按issueId对应；revisionTaskId最多两层显式来源，公开隐藏checkpoint/review。旧checkpoint保留原协议，新plan记录reviewFormat2。结构覆盖不等于语义完成；现代blocked issues后续消费尚未在正常任务观察，4f继承的是7d完整legacy反馈。
- 原2196及8d两张图存在函数/轴科学问题，已rejected并保留；a803原Chat final曾DOM/Copy为空，e74 receiver严格绑定原会话/原文/可见节点恢复，无重发。恢复不回写旧遥测outcome；接口变化仍可能失败，不能声称永久稳定。

## 底层能力与持续状态
- Backstage已实际查询职责/依赖；Serena已实际查符号/引用；Langfuse真实按task关联规划/科学审阅/生图。当前源码catalog是维护的组件目录，Serena仅三个只读符号工具，telemetry导出调用元数据；本次复用Taskmaster补三风格稳定验收，与CURRENT任务ID对应，未建立自动审美判断。工程定位/观测已接通，不得标作防止产品目标漂移已完成，具体缺口见台账。
- Worker AsyncLocalStorage补既有Gateway requestId；Chat两个固定model标签在view/connector/query精确放行。调用succeeded不等于科学accepted；未知token/cost不补零，代码cost0不等于订阅免费。采集120秒延迟/60秒轮询，不为补日志造任务。
- 上游既有科学末审v5可同轮产出claimSuggestions，映射真实P→Evidence、复用原Hermes确认UI；旧v4恢复和六字段回退保留。新正常论文的确认效果未观察。BGE索引存在，hybrid query的正常应用效果未观察，勿强接到配图。
- 用户已登录Langfuse并完成指定改密，服务身份不变；不记录/重问凭据。入口localhost:3130，经既有SSH私有转发；后台采集不依赖网页登录。SMTP/SSO/定时备份/保留期未配置。
- 既有Chat讨论“规划Hermes可信闭环”两轮已纳入；普通直接Chat接口可用与本机CUA桥分别判断。CUA政策初始化恢复此前失败，不再重复重启；本轮只复用服务器CDP。
- docs-sync按关键节点/回合末同步唯一CURRENT、progress、索引、台账；不是后台关闭回调，不保证绝对无漂移。当前代码/独立provider/应用release分别记录，不扩展第二套治理平台。
