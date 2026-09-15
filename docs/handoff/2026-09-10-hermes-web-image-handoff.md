# Hermes / Workbench CURRENT Handoff

<a id="illustration-delivery"></a>
## 产品目标与交付差额
- 原任务：通用、多风格科研配图。上游文献解析/科学分析 → 已审科学关系 → 按用途艺术规划 → 服务器Chat生图 → 科学及用户审美审阅。依据需求基线“2026-09-14 图片能力推进”，禁止以局部水彩返工替代多风格交付，禁止固定当前论文图形为模板。
- 稳定验收清单：交付树Taskmaster tag `multistyle-research-illustration`，任务1/2进行中、3仅依据用户既有认可done。这里只保存执行证据；Taskmaster不复制资产、反馈或下一步。水墨保留已有方向，本批不扩范围；Figma/视频/第三篇/批量暂缓。

| 交付 / Taskmaster ID | 实际资产、反馈与差额 |
|---|---|
| 学术机制图/分类图谱 · 1 | 旧cdce被否定；方案625119fa-5d8a-4e2a-a007-ceac51a83071经6Pro accepted；图c3a49716-35e9-440c-b3d9-659c2d86632c已生成并看图，清晰学术候选，仍draft，待用户认可。 |
| 编辑封面 · 2 | 旧1a1d被否定；方案15a314a6-44e1-4829-a4e1-c30f78039896的图ac16631b-782f-4b2f-9fdf-fcc033b867e0偏教材/满铺网点，未合格，保留draft。真实Hermes页面创建76918e55-5ff2-4467-b3a8-ab7033bd4984，6Pro revised修正暗背景线条对比，已内部批准方案。图任务7cd50e44-bbee-4631-b555-18f669399cc7失败、provider uncertain，未取得新PNG，不能称封面交付。 |
| 淡彩手绘 · 3 | aa41a018-b2ff-4ffb-9557-19ecabe104bc用户明确认可，原图保留不默认重画；额外f424只是私有候选，不能计新增风格。 |

## 已查实的断点及处理
- Git历史41ae→ea436→3fa2→28197将局部科学/执行器修复提升为“继续淡彩、暂停新风格”，progress/index又沿用。AGENTS/docs-sync现要求先对照具体需求及未完成项，局部暂停不得取消目标；根导航与已有Memory同步，无新状态平台或门禁。
- Backstage线上需求/源码链接指向缺现行要求的旧main，已改交付分支；维护链接不冒称运行快照。Taskmaster原currentTag仍为八月已完成hermes-research-intelligence，现登记本批三项并切换；旧tag保留历史。工具projectRoot必须为本交付树，根main只作导航。
- 原艺术修订只在显式API使用，现presentationDraft成对传revisionMode=art/baseAssetId贯穿Hermes解析、草稿、确认、不确定回放；候选限定同RO/version/locale、有效v2科学来源，明确原稿，不按最新时间猜。自由编辑制作指令清除art，原稿/版本错配不换稿继续。
- ac166暴露艺术规划忽略明确封面要求；已装自有Skill v5和同一次末审检查明确艺术要求符合性，保留科学字段，仅修composition/treatment，不新增模型阶段，不把accepted当审美合格。
- 页面guide99e4f974-985b-4f12-808a-7fa39531ce32三次结构回复均拒绝，旧日志只有nested_fields，具体错误字段未知；原task/版本/原稿资格实读有效。已补原字段诊断、同provider失败JSON修复，日志只固定代码/长度，不加重试/正文存储。此类guide不支持原任务retry，未强改状态。
- 后续页面guide059f85ae-0f76-43e8-a70b-ebcd3d2d6019结构成功，却扩写出Bessel曲线/零点交点/偶极子/英语标签，并把深墨色当水墨；没有确认，页面已取消待确认安排。真正重复建设断点是guide抢做已有艺术planner的工作。
- 已收紧art guide为路由：最终instruction直接使用原payload.goal，总结只提议，无附加正文修改/导航，family保持原稿；超过既有1000字符则无动作澄清、不截断。普通修改路径不变。中文水彩词出现不再肯定式覆盖结构化family；英文否定命名风格仍可能加载额外参考，不声称通用否定理解。
- 7cd又暴露原runner恢复状态复用缺陷：8aa21251的write-once recovery标记被3ee10d6e的recover-late复用时再次写入，造成EEXIST；实存07:17:41Z recovery及07:18:37Z late标记，旧诊断仅page_selection/Error。6a65dc7b已部署严格同canonical/shape/time标记读取，跳过重复reload/write，继续原观察/gallery，保留固定EEXIST/ENOENT及image_result阶段诊断。独立High GO，未重置旧标记；不能据此声称原图已生成。

## 当前真实执行
- 真实页面guide7002b77f-5b6c-4b67-b06e-79695e147960首轮成功；实际返回和页面提交instruction与保存原请求完全相等，base15a、revisionMode art、technical正确。页面“确认制作”POST202创建76918e55，无Codex代写新画面指令。证据tmp/goal-hermes-direct-{submit,confirm}.json。
- 76918e55使用自有v5/baoyu editorial/cover types/font等，与15a对比sciencePreserved=true，来源identity不变。6Pro实际revised仅将深墨背景上的分界圆/坐标轴明确为暖白细线；保留深墨负空间/少量铜橙、科学分区及五项原标签。证据tmp/goal-editorial-{plan-status,science-observed,plan-review}.json，plan-status含私有来源，不全文输出。
- 方案已通过既有PATCH内部批准，07:09:22Z既有generation接口POST202创建7cd50e44，07:09:32Z仅提交一次，无参考图。原Chat https://chatgpt.com/c/6aa8ef2d-15b8-83ea-8981-19492a1d99dd 实际只有原用户请求，未见assistant/图片/限额提示；产品任务failed，provider uncertain。不得重跑image-start；收据tmp/goal-editorial-image-start.json及服务器/jobs/research-illustration-20260915-style-editorial-final-image.json。
- 整条本次页面操作收据保存在服务器/jobs/research-illustration-20260915-editorial-hermes-ui.json，记录原目标target、原请求、旧失败、新guide及plan请求/响应。不要重跑start/resume/direct-submit等发送脚本；先查该收据及原任务，再续作。
- 当前阻塞：07:33 Library页面43条、07:39新开原canonical页162条requestfailed为net::ERR_INSUFFICIENT_RESOURCES；新页仍仅userTurn、无assistant/图片。内存1.77/4GB、pids336/1024、oom0、FD最高218/软限1073741816，未证明哪项资源耗尽。bridge日志只有其他未授权域拒绝，没有chatgpt.com拒绝，不扩大出网域/容器资源，也不猜登录失效。
- 用户最新选择“我先保存草稿，暂时保留页面”：**等待保存完成，不重启/关闭原页、不新增生成请求**。6页中两Chat各1092字符未发送、OpenScience有319/125字符及dirty输入；URL/target与活动布尔保存在/jobs/research-illustration-20260915-browser-resource-state.json，不保存密码。新开的诊断页均已关闭；原页保留。
- 下一动作：用户保存后按原runbook重新确认无草稿/活动任务，拿image/science/shared三锁后再做明确授权的恢复。7cd的late标记已消费，不删除/重置/重新recover-late。原download恢复窗口至2026-09-15T08:19:22.779Z（北京时间16:19:22）；若原会话出现唯一图片，在窗口内沿既有download接回，再用原产品task导入；超过期限不篡改期限。两风格仍in-progress，保留认可淡彩；不另写简报或盲目重发。

## Git、应用及独立能力版本
- 交付树E:/Miscellaneous/XGS/.worktrees/onchip-video-release，branch codex/onchip-video-release，代码6a65dc7be5a83258887d9b193630dc1a2a3698f1，后续文档HEAD以Git为准；origin/main初始fetch为1b974dd6旧交付。根dirty main只作导航。
- 应用production c63a02b63f61f7d40bc42a5efdc99cc5b41ef427，rollback d1f61d015bb63f022a97153740bfe87a15b51cec；再前061882123d14be00b868c1971c9d56de21d83b6e/6430ca03。三次既有deploy --no-tests --skip-migrate --reuse-unchanged-capability-images均exit0、必要服务器build/start完成，日志tmp/goal-{art-route,guide-repair,art-direct}-deploy.log。发布树art-direction-release-41ae8902已detached6a用于独立provider，不是新应用release。
- Chat provider独立bundle6a65dc7be5a83258887d9b193630dc1a2a3698f1已安装，rollback bundle2e434fdee3d99b7798bf66a24c23b7fd869743e4保留，再前e57153f30281dce93a3cd968be63059911259b22；必要服务器Gateway构建/installer exit0，tmp/goal-recovery-provider-install.log。没有重启Chrome/profile。先选模式后插原文/canonical120秒已用于首批两候选成功；本次7cd仍uncertain。
- Serena源码快照6a65dc7b，缓存image23fcfab77fa1/tag04b5f91df4b4e86c210155cee83cd741f1521ca3不变，installer exit0，tmp/goal-recovery-serena-install.log；Catalog/telemetry bundle061882123d14be00b868c1971c9d56de21d83b6e（rollback83179c45/abea68ef）。Skills CLI bundle83179c454b75688176060fabf9e611072d46813c，Langfuse官方4.35.0，均复用。
- Renderer保持sha256:1c47a579ceb608f244878b41888eee50bda1135ff325cb7b49de3a275ee2013d。无新依赖/表/迁移。自有Skill v5已同步C:/Users/Mac/.codex/skills，docs-sync和根导航规则已同步。
- 无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不提交/覆盖；其余历史文件、图、任务、工作树均保留。未运行测试/CI/本机构建；审阅代理误跑一次只读git diff --check，仅行尾提示，已停止。每段生产代码均独立High静态GO，构建/工具读回/实际图片分别证明其范围。

## 已观察能力、保护及边界
- 实际Backstage读回当前需求链接及owner/deps；Serena定位既有planner源码；Langfuse新--task UUID在24h/最多10条范围读回625119fa、76918e55各2条规划/审阅及99e4的3条失败guide调用（模型返回成功≠业务成功），采集有120秒/60秒延迟。769的MiniMax 6131/197 tokens、6Pro用量未知，不把记录cost=0解释成免费；无模型造数、无正文外传。
- 7cd的Langfuse实际image调用failed，554426ms、retry0、tokens/cost均unknown；原任务关联有效。Library现在由/images的“Open Library”指向/library?tab=images，旧精确chat链接fallback尚未适配；新Library页本次资源错误无法加载，不按最新缩略图猜结果。新canonical观察收据/jobs/research-illustration-20260915-original-new-page.json。
- 只读High另发现page-lifecycle终态回收未判断后来输入的草稿；本次两Chat草稿没有job ownership记录、未触发回收。不得为资源整理直接启动beforeAttach或定向杀NetworkService；三锁不保护人工草稿。此边界保留能力台账，不能宣称浏览器稳定性收口。
- RO9067a2d5-42ad-4c06-b234-753728b71064，私有versione77dc3c7-95cb-4269-ac3c-24276fea74e7，Claim93416292-0dbb-42b1-8810-6bdf77804c1f；40证据identity dbec53fff80645ec6698eea26720e4157b74a72561e7d4ee6283ad5c70374e13。base15a继承已审69ec/4f科学内容；没有重跑全文提取/科学解析。
- 用户认可aa41 hash565fa04e0c79ab9ee797b4bfd9d3a334b6f49b88b72756f8d1533bb631e7330b保持。公开Quantization OSR-2026-000023/v1与deep-sub-cycle/v1、原论文/笔记/草稿不变。真实PNG：tmp/research-illustration-atlas-c3a497.png、editorial-ac166.png、f424.png，已看图；不从生成成功推导审美认可。
- f42405d4-efb2-43a5-a209-8f4de426eeb7旧provideruncertain已通过原target/原全文/原参考校验接回原Chat结果，只重试原产品task导入、没有重发，仍draft；旧2196/8d科学错误已拒绝，其他失败谱系、收据和恢复细节保留Git历史及tmp/illustration-*，不得重跑一次性恢复脚本。
- 新正常论文上游claimSuggestions确认、BGE hybrid query正常应用效果、现代blocked issues续作消费仍未观察；NRP20/第三篇及批量不在本批。保留这些差额，不能以工具安装或本图完成抹除。
- Langfuse用户已登录及改密，不重问/记录凭据；SMTP/SSO/定时备份/保留期未完成。CUA本机政策初始化恢复已耗尽，不重试；服务器执行器/CDP为本轮入口。已有Chat规划讨论已纳入，不另开治理模型。
- docs-sync按有变化回合/关键节点同步，不是关闭应用回调。Taskmaster保存验收条件，CURRENT保存执行事实；Backstage/Serena/Langfuse用于定位/观察，不是自动产品或审美评判，也不能保证绝对零技术债。
