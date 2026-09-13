# Hermes / Workbench CURRENT Handoff

## Goal and constraints
- 用户要求复用现有及GitHub成熟能力，实际核对科学质量，不以部署或模型success结案。当前复用已审稿推进图解/发布预览，通用自动审校扩展暂缓，视频/批量暂停。
- 生产MiniMax-M3；自动生成、引导共编、人工校正分别标记，独立审核不冒称产品自动审核。
- 本机仅编辑/静态阅读/传输；无测试、预检、CI或本机构建。必要服务器build/start与实际产品生成/阅读按授权执行。

## Version and workspace
- 交付树 E:/Miscellaneous/XGS/.worktrees/onchip-video-release，branch codex/onchip-video-release；本轮文档提交前HEAD/origin d369ccc2126656fc9de1a4011602d8b154140fb0（代码落点；文档HEAD以Git为准）；应用08ed3b35，浏览器执行器单独热更，后续文档提交不是应用release。
- 当前应用release 08ed3b35113a512fbd414524ab8958ec4f87deeb / rollback df94fae0e25b109791f41d71691611bb88d78ebd；xgs-writing-source-confidence-deploy-20260913.log exit0，必要服务器build/start完成，实际页面/__release200同SHA。1e/a8为历史应用版本。
- 根目录旧dirty main不是生产基线；未合并main。unrelated dirty docs/specs/2026-09-05-integrated-research-product-design.md不得覆盖/提交。
- 网页生图base bundle d1630135 / rollback92cc416e；实际image/review runner为501da7a3、page-lifecycle为d369ccc2；image broker为b78fb94d派生bundle，均独立于应用release。video runner0df87c9b、浏览器镜像8aa21251不变；浏览器09-13 07:55:11Z自行重启一次，登录保留，旧target ID失效。
- TTS a2158409、renderer ff6042f6、模型qwen3-tts-customvoice-0c0e305复用；无新服务/依赖；本轮仅实产第二篇图解，媒体版本不能混作应用release。

## Protected private and public content
- 私有92cafb82-73bc-4937-bb9c-bf1228b23dd3《深亚周期光脉冲：六字段审校稿》：1118字符/17引用，user_edited；服务器共编后人工校正，独立High六段原文/引用复核通过，真实UI保存/重载/来源/下载一致。
- 私有入口：https://openscience.428312321.xyz/research-objects/c896802c-35dd-4b59-8db1-5f374f83a6d8/edit?hermesTask=92cafb82-73bc-4937-bb9c-bf1228b23dd3
- 原40e23948-4b41-4440-a3a1-49dd9acb8824《深亚周期光脉冲：机制与适用条件》：2696字符/41引用/57式0排版错误，人工四处校正且原文复核通过；原来源a1c0da49-d2ea-4407-b3e6-b68eadd72ceb保留。
- RO c896802c-35dd-4b59-8db1-5f374f83a6d8，草稿revision11；正式v10 f4e2dc71-1fe8-406f-8c19-e1849503d698，公开OSR-2026-000022/v/10不变。
- PDF7bb96cc1-bb6f-4d3b-b0bf-352f41971faf；已批图b19a65bd-6497-4b61-bb81-0154b264d58c、plan3a6ed136-002a-4301-8505-ca14e3dbbc53保护。
- 原确认ingestion2fdb78de-b52b-40f6-832f-faa3fdd9f4e2 / agent1e324308-fd26-4cc1-8612-8a1c269909a9保护。所有新自动产物未采用/发布。
- 本机证据 C:/Users/Mac/AppData/Local/Temp/xgs-six-field-reviewed-{download,result,reading}-20260912.*、xgs-six-field-final-core-20260912.json；旧真实UI成功不证明当前浏览器长期稳定。

## Current automatic draft: NOT scientifically accepted
- ingestion840e24f9-cf9b-471f-a38c-7331705b1003，当前agent d5c6f699-c055-4bb8-a737-8f30932bf585。1bf reviewOnly显式审校当前4b46，SourceMap/旧bridge复用，保留scientific-summary v6与review critical-thinking v2 lineage。
- 1bf复用既有scientificReviewPrompt/Guard执行真实逐字段审校；不再以重新成稿+issues[]冒充review。保留原事务授权/CAS、引用边界、原schema retry；High静态复核通过。
- 实产d5c6仍失败：接受已知错误method/limitations，反而以缺其它算例为由把正确代表结果扩成三案，混淆Gaussian比较、遗漏产额条件，repro正文夹P编号。needsMoreEvidence为空不等于科学正确。
- 历史4b46/v6仍有I→E变换、互证对象和泛化错误，未采用；不因证据导航可用放行。
- d5c6仅有final usage，调用次数未明；4b46曾两次final，不报单call。
- 证据：xgs-claim-review-result-20260913.json；服务器/jobs/hermes-claim-review-{refresh,result,ui}-20260913.json。不得再次盲跑整稿review或summary prompt补丁。

## Focused source reading and bounded editing
- 通用服务端基稿→精确SourceMap→M3来源指导修订保留；自动ID/quote合法不保证断言正确，既有失败不再重跑。a8意图/推理选项、1e指定稿恢复、0685数学转义保护均已部署；详细历史见Git c742f7a2。
- 第一篇方法4bed→797→867ce8b9-1e48-4412-b1bf-1800a5d64dc9：1605字符/19引用，独立High原文PASS；n(z)→n(t,θ)→I(t,θ)/I(t)，√I及继承相位→E(t,θ)/E(t)→Fourier E(ν)，保留远场/正峰同步。真实UI正文/引用等API，Markdown13420字符；未采用SDF。
- 第一篇结果63e→74→3f68d30b-5cab-44f9-9623-2f057aada7ff：1745字符/19引用，代表1.8μm单电子19as/1.9PHz及边界原文PASS。0685后26/26TeX源相等、6处薄空格恢复，Markdown20620字符与修复前相同；未采用SDF。
- 不回到无全文editorDraft反复自省；旧8ff/10799方法修订未采用。源码没有论文名硬编码，但独立科学核对与具体修订指导仍由本会话承担。

## 已复用的科学写作能力与边界
- 服务端handleScientificWriting→resolveScientificWritingSource从基稿绑定sourceTaskId，核对同用户/RO/workspace/artifact/hash/旧quote，复用完整SourceMap并重映射引用；scientific-writing v3与research-note-formatting已有，未装新依赖/供应商。
- 普通editorDraft缺全文绑定和来源回写，不再用无来源反复自省；ingestion scope字段是ingestionTaskId，不能放agentTaskId。来源绑定能力通用，但具体指导/独立科学复核仍由本会话承担，不能称Hermes内部自动审校闭环。
- 已通过稿件不重跑；第一篇科学/排版证据见上节与Git c742f7a2。
## Browser recovery
- 历史Chrome资源不足根因未定；2026-09-12三锁/空闲确认后重启一次，登录保留。旧压缩override已清理，禁止按整页关键词判断活动或循环重启；历史诊断见server-capabilities，当前修复见下节。
- 1e627修复私有92误显示最新63e，已实读1118字符/17引用；历史/jobs/hermes-restored-reading-20260913b.json。旧六字段实读不代表科学通过。
## Second paper and next action
- 602c6c09接通writingSource.ingestionTaskId：base优先，所选不可用不降级；无选择按artifact分组。真实cee71443选择已观察，多artifact分支尚无真实样本。
- Quantization RO9067a2d5-42ad-4c06-b234-753728b71064；ingestion cee71443-ae46-4ed1-b4e4-6c5b59e674ef / source agent960ffcc1-75f6-4418-b9a6-8bf413f4e18d / artifact4b94c626-1748-4c5a-934b-2bb94585bd9c。复用15页SourceMap，无新Parser/OCR。
- eda892b4、c4f3ce06均模型前超180k失败。服务器只读量测：原source JSON353628字符，含confidence连续分组208568/1079组；08ed逐片保留confidence、仅共享kind/parser后143941/70组，2201 id/text、16部分range、53954全文及完整locator保留，180k不变。证据Temp/xgs-quantization-source-budget-confidence-20260913.json，勿重复预估或盲增limit。
- 首稿e758f33f-1cd1-42f9-b4d1-bb548acf98fb（2374字符/14引用）NOT ACCEPTED：把source IDs按脚注重排、错误基底/亚1nm设定/功率与能流式/极化率算符说法。实际UI来源指导修订链 e758→918b9ca4-6fbc-4493-aae4-a83f8372c40e→b66fc123-cd68-4982-b527-24cdf7c97626→71ed6fae-21c3-49d2-bfff-e394bf307323，均精确base/source；最后仅补S2029/S2030和去裸ID说明，原38引用/其余科学内容不变。最终71独立High科学/引用PASS，无Codex正文替换；不是自动首稿质量通过。
- 最终71《深度亚波长小孔限制光学近场的量子化：Bethe偶极到Weyl角谱》：3643字符/40引用；真实UI正文/quotes逐字等API，57/57 TeX源一致/0排版错误；截图实读可用，Markdown27609字符完整。证据Temp/xgs-quantization-writing-citation-{task,result,reading,math,tail,export,download}-20260913.*及服务器/jobs/hermes-quantization-writing-citation-*。RO实读仍private/draft/version3；sourceStatus仍grounded_with_unresolved_review，外部High结论未冒充产品自动审校状态。
- 最终私有入口：https://openscience.428312321.xyz/research-objects/9067a2d5-42ad-4c06-b234-753728b71064/edit?hermesTask=71ed6fae-21c3-49d2-bfff-e394bf307323 。第一篇92/40e/867/3f68及v10/已批图保留；采用/公开仍待用户质量确认，视频/批量暂停。
- 2026-09-13用户纠偏：停止把通用引用语义核验/自动审校扩展当交付前置，复用71已通过科学/公式/实读证据，直接推进图解制作、审核与发布预览；Markdown导出是TeX源，平台57式已实渲染，不能承诺所有外部阅读器。实际制作：复用71全文和40条已核对引用，创建制作Claim848479cc-680b-4768-9eaa-5d0b143a4d43；Evidence经API创建/确认，边缘空白裁剪同步调整range，原71不改。旧SDF仍只有错误problem，不能据新图直接发布。
- 新图解version58a45cb5-758f-4d6f-9e94-533b460e8b06：一次修订后方案aa05b703-0497-4f3d-b9d1-48aa1d46a2cc已批准，Claim848479cc+40条Evidence。40d64c3b失败、无submitted；登录有效，代理失败窗口FIRSTUP_PARENT/200，当前同路径TLS+HTTP200。1049bffb在连接修复后仍提交前失败，保留未重放。具体UI兼容修复与实产见下一节。
- 长综述ROaa450f1e旧任务因163815字符超过120k理解上限模型前失败，24页完整SourceMap已定位：derived/source-maps/1bdef65fc775a9b89e71ca81fb71988c9cbaa07f71209ea3ecc581406a4222c0.json（4,661,218 bytes）。ref未挂失败任务、无普通retry；后续复用既有解析收敛续跑路线，未实现新恢复能力，勿重解析或只增limit。
- 继续前读此handoff、需求基线相关章节、server-capabilities；GitHub方法及真实调用对照见Hermes台账。当前版本看Git/服务器，不恢复旧MVP next action。
## 2026-09-13 生图稳定性修复（当前）
- 根因实证：登录和7891→Squid→7890代理有效；6个挂起旧页曾阻塞Playwright全部page初始化，人工按实际完成证据精确关闭后attach219ms恢复。443a移除批量reload；不能把代理或登录当当前根因。
- 输入修复ac113：正常键盘选全/清空/输入→Control+End→激活picture_v2工具，严格正文及模式检查保留。64b/91b中间尝试保留；40d64/1049/9c2均提交前失败，不重放。9c2错误PROMPT_CHANGED。
- 真实任务5260d693-4140-4875-9340-44d7d4fa9e26于08:10Z只提交一次，会话已生成图；旧Save弹窗不出现导致image_result TimeoutError。b78fb94d仅允许从原会话唯一主图DOM的实际同源/estuary/content取PNG，禁止redirect、限30MiB、沿既有隔离解码/规范化。download支持原deadline+1h内仅取已有结果，不改请求或提交/恢复账本；broker允许已保存结果越过旧late marker回收，且不覆盖marker。
- 08:29:23Z同task/asset已succeeded100%、draft；原图987834B/1672×941，经既有normalize得到1280×720；既有API retryCount1/executionAttempt2仅resumeFromCompletedResult，无新prompt规划/生图。原uncertain/错误/late记录保留；图片40d/1049/9c2无新发送。证据/jobs/hermes-quantization-image-{after-selection-fix,product-recovery,product-result,gallery-reading}-20260913.json及5260任务目录。
- 旧5260已实读1280×720，但不作质量候选；精确新版媒体入口见下。独立媒体页图集仍显示内部label；编辑页嵌入媒体默认优先旧已批准图，可用轮播切换，未修改该顺序。
- 旧5260保留draft；空框与连接弱已由新版86ffe改善，旧图不批准/不删除。六字段工作稿最新状态见末节。
- 501da7a3已08:47Z部署：image/science共用page-lifecycle，创建时记录browser instance+target+job；连接前仅回收同provider其他已完成或明确未提交失败/过期的自有页，未提交准备稿未过期、已提交无结果、未知旧页均保留。close有界，旧window.name清理策略已移除；安装依赖先行并持image→science→shared三锁。独立High PASS。
- 通用模块已按window.name/空composer与完成结果关闭5260自有旧页，后续target消失。首次异步关闭未写closed审计，d369部署短时确认且不重复close；事实保留/jobs/hermes-completed-image-page-cleanup-20260913.json。未新建测试页复演，不称未知Chrome卡死可自愈。
- 回滚证据/opt/openscience-chatgpt-browser/patches/<commit>/{before,deployment.json}；b78派生bundle复用d163依赖、原bundle不改；before保留service/runner，501回退两个runner、d369回退helper。timers已恢复active。稳定脚本在交付树tmp/{image-download-fix-deploy,page-lifecycle-deploy,page-close-confirm-deploy}.sh，Temp不再作唯一恢复入口；无测试/CI。

## 2026-09-13 新版图解（用户审阅候选）
- 2026-09-13图解质量推进：同一已审71正文/40引用/Claim848，方案aa05→2a1（未批）→606b99fc（已批）；真实新版图片86ffe202-928e-49fd-8877-7ec0787b69f6于09:05:56Z→09:07:13Z单次自动succeeded100%/draft，retry0、attempt1，无人工恢复或新部署。原图1672×941，产品1280×720完整可见且不横向溢出；独立看图PASS为用户审阅候选，无必要修正，未批准/公开。上轮生图稳定性修复在本次真实任务生效。
- 实图已补传播波纹与沿远离屏面方向的倏逝衰减，共用源框连接孔中心，基底/耦合/相干态/角谱链连通。保留a≪λ₀、k⊥与k₀分界和概念示意免责声明；无新数值结果。2a1多余“投影/无量纲”标签已通过606来源绑定修订移除，无Codex手工作图。独立审阅候选PASS不是产品自动科学审校或发布批准。
- 新图独立入口：https://openscience.428312321.xyz/research-objects/9067a2d5-42ad-4c06-b234-753728b71064/presentation?version=58a45cb5-758f-4d6f-9e94-533b460e8b06&task=86ffe202-928e-49fd-8877-7ec0787b69f6 。/jobs/hermes-quantization-{plan-expression-final-state,expression-image-request,expression-image-state,expression-gallery-reading}-20260913.json；本地tmp/quantization-86ffe-original.png。页面会去掉task参数，不以旧receipt URL假定当前tab；最新实际URL见末节。

## 2026-09-13 六字段接入（当前审阅入口）
- 复用71来源由服务器生成60d52e03（2283字符；α漏负号/碎词引用，未采用）→4c45b381（仍有符号丢失/未落实删除，未采用）。停止重生成，13项明确人工校正后经现成无模型save保存f34d8ee2-5120-4ca1-a22b-a98f3473117a：1523字符/23引用，kind=note、sourceStatus=user_edited、base71/source960不变；独立High科学/来源PASS。不是自动科学审核能力通过。
- PUT /api/sdf经既有版本锁将六项原样拆分写入私有工作草稿；RO revision3→4、private/draft，六字段字符111/251/364/325/210/175。71原稿和两次未采用稿均保留；已提交媒体version2/58a45与Claim848/40Evidence未改，图片86ffe仍draft，未正式定稿/公开。
- 真实页面六字段逐字等API、10/10 TeX源保留且0渲染错误、23条引文逐字等API；同一编辑页轮播第3/3张显示86ffe1280×720。默认仍优先旧已批准图eb48809b，未改默认顺序。截图已实际看图，平台渲染不等于外部Markdown阅读器保证。
- 当前入口：https://openscience.428312321.xyz/research-objects/9067a2d5-42ad-4c06-b234-753728b71064/edit?hermesTask=f34d8ee2-5120-4ca1-a22b-a98f3473117a 。/jobs/hermes-quantization-sdf-{before,condense-request,condense-state,final-request,final-state,edited-request,edited-state,stage,reading,reading-complete}-20260913.json；reading-complete初始quoteCount0来自折叠稿卡，sourceReading实际展开23/23。本地tmp/quantization-sdf-*.sh、human-edits.json、edited-review.json及两张reading截图。
- 下一步：用户确认此版图文质量后，将工作稿与已审图正确绑定到新的待发布快照，再按既有发布流程推进；不能发布仍含旧SDF的version2。当前应用08ed/rollbackdf94及浏览器执行器版本不变，本轮无代码部署/测试/预检/CI。
