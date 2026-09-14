# Hermes / Workbench CURRENT Handoff
## Goal and constraints
- 当前反馈已完成：f8e44815已部署；Node符号链接识别、Codex正常信号退出及清理安装等待锁修复。用户原4项purge_pending已全部purged：旧RO66已删除、两会话不存在、笔记内容清空；共享对象仍有引用而保留。整块证据默认关闭，Dashboard仅显示排队/上传/解析任务，核对建议和失败/历史保留Hermes，未伪造确认或重跑科学分析。
- 2026-09-14最新续作完成：9a36c1e0已部署，卡片科学文本、同版本结构化折叠证据、工作台作者/公开号已实读；第一篇六字段默认折叠、第二篇四原章节分层。22已行政勘误v1/DHL并允许原PDF下载，audit6c93436f-3c2e-40fe-82ad-d0c751c32f73；不是新发布，禁止重跑旧publish或按旧文档恢复v10。scope见已审infra/scripts/correct-deep-sub-cycle-publication.mjs。
- 2026-09-14最新截图反馈已完成：公开Claim复用Hermes科学Markdown，概要/完整推导/适用条件/原文证据分层；不再整篇h3直出。来源按文件/页码分10组保留40条，去重复标题、制作前言、笔记UUID、内部[S]和机器locator；原quote/source也用Markdown与公式显示，原始数据不改。
- /developers复用公开产品rp颜色/字体/共享标题；curl前置。线上原文教程实跑发现原Python默认UA被Cloudflare403/1010拒绝，显式真实客户端User-Agent后成功；不放宽防护或伪装浏览器。现在页面curl/Python均已逐字执行exit0，六字段/固定URL/下载URL与API一致。
- 两篇真实论文现均公开v1、DHL署名及原PDF允许下载；22原dataCC0/23dataCC-BY4、文字CC-BY4/代码MIT保留。本轮仅指定22行政元数据与下载授权写入，无新论文发布或模型/图像生成；视频/批量仍暂停。
- 本机只编辑/静态阅读/传输；无测试、预检、CI或本机构建。仅必要服务器build/start和用户明确要求的实际页面/教程读取。自动首稿科学质量仍不稳定，不把人工审校或展示修复称为自动正确。
## Version and workspace
- 交付树E:/Miscellaneous/XGS/.worktrees/onchip-video-release，branch codex/onchip-video-release；代码HEAD/origin f8e44815已部署，随后仅补交接文档；实际HEAD从Git读取，不等于应用release。
- 当前ECS release f8e448157480ae9972459ac1385d9e27ac71ffcf / rollback9a36c1e06931d44ddc8b750c32427e081db56bf6；/__release实读一致。clean发布树.worktrees/trash-install-release-f8e44815，tmp/trash-reader-deploy-f8e44815.log exit0；090首次build完成但在切换前清理lock忙而exit75，f8只改安装有界等待75秒后部署成功，未强停清理。
- Codex独立runner仅补09058847的runner.mjs，base bundle仍1ad54c72，source-id保留原值、runner-source-id登记090；tmp/trash-runner-install-09058847.log exit0，旧unit/heartbeat及短时Restart=no override归档于/opt/openscience-codex/trash-drain-before-0905884780c56aafb7ee507450d2c38fc70e7a2e。受限清理bundle随应用f8，其他供应商/浏览器/认证未改。不可重跑tmp/install-trash-runner-fix.sh；无新生成请求。
- 首轮59c8及补修6af均独立High静态PASS，必要服务器build/start完成，--no-tests --skip-migrate；tmp/claims-api-deploy-59c8cebf.log与claims-quotes-deploy-6af9c984-resume.log exit0。6af首试在cloud-sync准备阶段SSH reset，实读59仍healthy且无部署进程后原候选续跑成功；没有手动停服务/改生产记录。
- 根目录dirty main不是生产基线；交付树无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得覆盖/提交。应用rollback9a不撤行政v1更正，不能恢复已永久清除内容；独立runner回退须先自然排空，旧runner/清理器会重引入故障。
## Latest actual reading
- tmp/trash-final-state.log：4项purged且lastError为空、RO66不存在、两会话不存在、笔记payload/result清空；一个共享对象retained。tmp/trash-reader-actual.json/log：回收站API200空、Dashboard无等待核对/旧历史、两公开v1/DHL的core/claims/evidence/images与修改前全等；证据均DETAILS/open=false/约59px，实际展开成功；工作台同样关闭，356CSS无横溢出。
- 空回收站/Dashboard/手机及最终公共关闭/展开、工作台关闭截图均已看：tmp/trash-reader-{after-cleanup,dashboard,evidence-mobile,final-public-closed,final-public-open,final-workbench-closed}.png。首次桌面截图在字体加载前滚动导致目标出画面，仅重读目标、等字体并居中捕获，见trash-reader-visual-final.log。打开页面时清除已完成，自动刷新代码已部署但本次未观察到pending→empty动态转换；不再创建删除样本验证。
- 最终9a实读tmp/ro-feedback-final-visual.json/log：Explore双卡无裸TeX/S、均DHL/v1；22六字段均DETAILS/default closed，实际展开/收起成功，12Claim/102Evidence完整，368CSS宽度等scrollWidth。Explore/六字段/展开/手机截图均已看（tmp/ro-feedback-{explore-zh,six-fields,field-open,six-fields-mobile}.png）。本补修仅4个UI文件，独立High静态GO；复用下方未变科研/API/工作台/下载证据，不重跑整链路。
- tmp/ro-feedback-reading.json/resume.log：22/23两篇core/claims/evidence/图/发行时间与hash均等修改前；22首发v1/DHL/仅1条发布历史，PDF匿名200/3770010字节/hashbb517f00与原件一致。两端来源200；私有工作台标题DHL+公开v1，读取精确f4/72记录。22六字段12Claim/102Evidence、23四原章节1Claim/40Evidence，默认关闭、内部assessment0，23公式57/0错误，368CSS无横溢出。截图已看。首次读页脚本误把桌面来源侧栏当dialog，改正确selector后成功，非产品失败。
- tmp/claims-api-reading.json/log：匿名记录与a721深度同值，40证据/10文件页组保留，来源点击200。主张展开后内部S/制作前言/笔记UUID均0；tmp/claims-math-source-comparison.json：57/57公式与保存TeX逐字全等，0公式错误。
- tmp/claims-api-developers-{desktop,mobile}.png已看：统一冷白rp背景/36px标题，1152/380CSS视口无横溢出。tmp/api-tutorial-final.log：从线上页面逐字提取的curl/Python两者exit0；23/v1六项正文、固定URL和下载URL匹配。原失败收据api-tutorial-execute.log、api-python-error.txt保留。
- 最终6af实际阅读tmp/evidence-final-reading.json/log：来源Markdown正常呈现，段落/粗体/斜体可见、原星号消失、0公式错误，来源按钮200且机器locator不显示，380CSS窄屏无横溢出；claims-api-evidence-final{,-mobile}.png已看。主张/完整推导/窄屏截图claims-api-{claim-desktop,formulas,claim-mobile}.png已看，API和科学内容未在补修改变，复用上述有效证据。
- 滚动截图注意：服务器Chrome现有125%zoom使Playwright截图产生scrollY×0.25空白；用现有CDP Page.captureScreenshot(fromSurface:false)获取实际视口，不改网页或图片。展开后等document.fonts.ready再截图，否则未下载字体会短暂缺字。最小DOM/截图记录tmp/claims-visual-reading.{sh,log}，服务器/jobs同名。
- 本轮完成，下一步按用户实际阅读反馈继续；不自动启动第三篇/视频/批量。特定外部AI工具域名接入限制仍未证明解决，见下方历史API观察。
## Public API observation
- tmp/public-api-reading.json/log（服务器/jobs同名）：匿名/developers、OpenAPI、23/latest、23/v1、22/v10及冻结来源均200；latest除兼容latestVersion字段外与exact深度同值，固定links.self/Content-Location正确；23正文/Claim/原配图与上轮数据同值，40来源保留，下载URL授权保持。HTML中固定JSON alternate和开发者导航可发现，旧引用区技术链接0。tmp/public-api-developers.png已视觉查看。
- 公开接入：https://openscience.428312321.xyz/developers；规范/api/research-record/openapi；最新完整/api/research/OSR-2026-000023；固定/api/research/OSR-2026-000023/v/1。原PDF下载字节证据复用e7f，不重复下载。
- 客户端限制：本轮web工具对已公开API返回not safe to open(non-retryable)，未提供HTTP状态，未重试/放宽策略，不推断Cloudflare/登录/DNS根因；记录tmp/public-api-external-client.txt。服务器匿名浏览器沿既有代理读取成功，不冒称所有外部AI客户端均已兼容。
## Lifecycle delivered and observation
- 公开序号publicationNo独立于内部versionNo；发布时分配，冻结公开元数据/图谱/来源/媒体。一般旧URL保留，22旧误号现按用户指定行政勘误与临时别名处理。私有草稿权限单独判断，历史恢复创建新私有草稿并沿用冻结图文。
- 主页面分析记录收进Hermes；无公开记录不显示发布历史。更多内编辑历史按日期/摘要、可查看再恢复；个人空间和内容项删除、会话默认保留产物、30天回收站/恢复/清除、公开聚合长期归档。
- 共享存储/公开媒体保留，共同核心锁协调发布、删除及后台回写；搜索物理独立，以核心存续状态过滤且已有TrashEntry重试同步。生产spool提交也在该锁内校验并原子发布，防止清除漏掉迟到副本。
- 受限宿主清理服务/定时器已安装到/opt/openscience-private-cleanup；结果目录只读挂载、Parser隔离保持。API清除未完成返回202，Worker收到精确complete才记purged；不声称外部ChatGPT历史已被删除。
- 独立High在精确6b9f5a06上静态PASS。首次服务器构建因retained数组隐式any失败（迁移前），ef9补类型后完整构建、两项核心迁移、镜像与启动成功。无测试/预检/CI。
- 旧API/Worker停止阻塞：只读确认running AgentTask为空后仅stop两旧容器，原部署事务继续成功；未触发内容变更。根本信号处理问题未证实修复。
- 实际第二篇object/history/record/media均200，core与reader-clean-before逐字同值，private/revision6、四条历史publicationNo=null，10式/0错误、图1280×720、368CSS窄屏无横溢出；截图已看。
- 历史生命周期验收时22/v10正常，现已行政勘误v1（见上方最新实读）。Hermes来源可展开、管理内容80项、回收站空状态可读。
- 02d最后实读：编辑历史四条时间/摘要，无内部笔记UUID/机器英文；桌面/移动截图已看，窄屏dialog354/scroll354/viewport380CSS。打开冻结正文1617字符，恢复入口可用但未点击；管理80项最新在前，已知内部标题0，列表与确认/回收站共用标签。证据tmp/lifecycle-final-reading.{sh,log,json}及四截图，服务器/jobs同名。
- 历史证据tmp/lifecycle-*保留；本轮已观察用户4项提前永久清除，未重生成原图/正文。历史恢复写入、30天到期及备份轮转到期仍未实际操作，不冒称完整生命周期均已观察。
## Protected second paper and next action
- 本轮先实测0931/rollback02d，再保存DHL/完整原题/许可三个写入均200；review132699b5曾唯一阻于claim_graph_invalid。e7f去除旧机械3–7配额（符合已授权出版PRD§3.2），保留至少1core/图结构/500总量及来源验证；独立High PASS，未拆写科学内容。
- e7f实现本次发布明确允许全部附件下载，默认false；授权/安全MIME/版本限定URL冻结到已有researchRecord.dto.manifest。匿名端严格匹配公开Version/Publication/唯一冻结附件/活Artifact/workspace/blobSha，NO-DOWNLOAD冲突同事务拒绝。旧版不追溯开放；独立High PASS，无新表/hash/测试。
- 实际发布：review132699b5变passed、under_review/approved各200、publish201，版本72c315af→OSR-2026-000023-v1，publicationNo=1（内部6），公开时间2026-09-13T17:17:14.002Z，contentSha d0b6c47953f71209d69d405ff004895c332eaa0d8a3f5515c4ffb28e463b9699。收据/jobs/quantization-publish-selected-version.json及本地同名.log。已完成，不得重跑该写入脚本。
- 匿名实际阅读：页面/API200，DHL、完整题名及CC-BY-4.0/MIT/CC-BY-4.0一致，core保留、1Claim/40Evidence/1图，原图hash保持/1280×720，公式错误0、内部S标记0。PDF匿名200/application/pdf/568765字节，SHA24d11cc8与上传原件相同；下载链接DOM可见且名称正常。tmp/quantization-public-reading-download.json、*-via-browser.log、quantization-public-download-view.log；identity/image截图已看，下载局部截图受既有浏览器缩放裁切影响，不作视觉证据。
- 读页脚本首次APIRequestContext直连绕过Chrome代理导致EAI_AGAIN，产品页面本身成功；改用同一匿名页面fetch沿用Chrome代理后API/下载均200。不要将此误报产品登录/代理故障，也不要再用context.request做服务器公网阅读。没有重启浏览器或重复发布。
- 真实整理操作：保留4b的来源引用，当前附件列表合一并以文件名展示，不删除任何文件；POST commits(version6)返回500 req-n7，Prisma在carryVersionMedia.create拒绝researchObjectId。随后GET实测revision6、core/history/record/media与此前全等，事务已回滚。收据/jobs/quantization-attachment-deduplicate-20260914.json（原幂等键保留），本地tmp/quantization-draft-save-error.log（很大，只解析err结尾）、quantization-draft-failure-state.log。不得盲重发或改DB绕过保存。
- 根因/修复：Prisma嵌套CreateWithoutPresentationAssetInput仅接受claimId；093改为同一tx内asset.create→presentationAssetClaim.createMany四个范围字段→原requireValidVersionHistoryCopy，权限/来源/批准判定不变。独立High静态PASS，服务器build/start完成，未测试/迁移；原幂等键续保存返回201，commitd74979fb-9440-416f-8692-df2e829f5e47，没有重复草稿。
- Quantization RO9067a2d5-42ad-4c06-b234-753728b71064；RO visibility public、工作revision8；Version72c315af-cd76-452a-8bbb-6e1284612114已published且冻结，禁止原地改写。完整题名Quantization of a Deep-Subwavelength-Aperture-Confined Optical Near Field。旧已审快照4266e4ed-9a89-45d8-8c0e-c6393bbc503d保留。
- 实际72读取：core逐字等已审稿、Claim正文不变、40Evidence内容/locator/核对状态保留；只有新证据/Claim ID与版本来源URL改变，抽取新旧来源接口均200且响应相同。manifest仅4b94c626、正常PDF文件名；新继承图a6f51e93-4ce0-4438-b18f-bbe82ed00bfa approved、原hash4ee0df4c/1280×720。0公式错误，预览/工作台截图已看。证据tmp/quantization-deduplicate-{reading,source-reading}.log/json、preview/edit.png，服务器/jobs同名；原始reading.evidenceUnchanged=false因新ID/URL，已用后续逐字段比较解释，不能误报来源丢失。
- 当前公开入口：https://openscience.428312321.xyz/research/OSR-2026-000023/v/1；工作台/research-objects/9067a2d5-42ad-4c06-b234-753728b71064/edit?hermesTask=f34d8ee2-5120-4ca1-a22b-a98f3473117a；后续正文变更须新私有草稿/再次公开产生v2。
- 六项笔记f34d8ee2-5120-4ca1-a22b-a98f3473117a：1523字符/23引用、user_edited、独立High科学/来源PASS；六字段111/251/364/325/210/175字符、10式。人工纠正后经既有无模型save与SDF写入，不能冒称自动正确。
- 长笔记71ed6fae-21c3-49d2-bfff-e394bf307323：3643字符/40引用/57式；来源指导服务器e758→918→b66→71后独立High PASS，原文/导出实读一致。自动初稿及后续60d/4c45六字段稿仍未通过，均保留。
- 来源ingestioncee71443-ae46-4ed1-b4e4-6c5b59e674ef、source agent960ffcc1-75f6-4418-b9a6-8bf413f4e18d、artifact4b94c626-1748-4c5a-934b-2bb94585bd9c；15页SourceMap已完整，不重解析。08ed仅压缩重复来源元数据，2201片段/53954全文完整。
- 正确快照Claim18bbfa21-4099-49be-9f55-21e0fda960ef/40Evidence；已批图56e58572-705b-4182-b064-a9df30f1060f，原字节652786B/hash4ee0df4c、原图1672×941/产品1280×720。
- 图56经admin_reviewed_import复用原图86ffe202-928e-49fd-8877-7ec0787b69f6；原generator/version与importRun来源保留，非重生成。旧version58a45cb5-758f-4d6f-9e94-533b460e8b06科学正文有误，绝不发布；stagingc8e625c4-39cb-4a6c-a0d1-3129c48558f8冻结内容有历史差异，恢复只用冻结记录。
- 本轮任务完成：许可选择/署名/下载/第二篇发布已落实。下一步由用户在公开页或Hermes提出具体质量反馈，再决定第三篇/视频；先保留2篇真实交付，不自动启动批量。自动首稿科学质量仍未稳定，不把人工审校及本轮发布审核冒充通用自动审校通过。
## Protected first paper
- ROc896802c-35dd-4b59-8db1-5f374f83a6d8、草稿revision11；f4e2dc71-1fe8-406f-8c19-e1849503d698内部10保留，公开现为OSR-2026-000022/v/1（用户2026-09-14行政更正已执行）。DHL署名非通讯作者；原发布时间2026-09-11T14:39:38.371Z与收据e0a8bd97保持。原PDF7bb96cc1公开授权，原图b19a65bd保持；许可textCC-BY4/codeMIT/dataCC0不改。旧v10仅307/no-store临时兼容，未来真实v10优先；规范链接v1。
- 保护已审92cafb82-73bc-4937-bb9c-bf1228b23dd3（1118字/17引用）、40e23948-4b41-4440-a3a1-49dd9acb8824（2696字/41引用/57式）、方法867ce8b9-1e48-4412-b1bf-1800a5d64dc9（1605字/19引用）、结果3f68d30b-5cab-44f9-9623-2f057aada7ff（1745字/19引用）。均独立原文PASS/真实页面与下载一致；后两稿未采用SDF。
- ingestion2fdb78de-b52b-40f6-832f-faa3fdd9f4e2/agent1e324308-fd26-4cc1-8612-8a1c269909a9保护；1bf自动review仍误批d5c6f699，4b46/63e/10799未采用。旧失败不能覆盖上述已审稿。
## Existing execution and scientific boundaries
- 应用与浏览器执行器版本分开：browser base d1630135/rollback92cc416e；image/review runner501da7a3、helperd369ccc2、brokerb78fb94d；video0df87c9b/browser image8aa21251。TTSa2158409/rendererff6042f6/qwen3-tts-customvoice-0c0e305保留，无新媒体任务。
- 生图已修键盘输入/picture_v2、唯一主图同源原图下载、late completed结果恢复、自有target清理及三锁安装；未知归属页受保护，不保证任意Chrome卡死自动恢复。5260已回收；86ffe于09-13单次生成成功（attempt1/retry0），真实图质量已独立看图。
- 7891→Squid→7890代理/登录此前实读有效；浏览器09-13自行重启后保留登录，旧target失效。不得按整页关键词误判活动、重复重启或因本机浏览器桥失败断言服务器Chat不可用。
- 科学写作handleScientificWriting→resolveScientificWritingSource绑定基稿/全文SourceMap与原quote，writingSource选择已实传；普通editorDraft缺全文来源，不走无来源自省循环。源码通用，但具体指导与High核对仍由本会话承担，未形成产品自动科学审校闭环。
- TeX保护/渲染与隐藏[S数字]仅阅读层处理，原文、后台引用和数学源保留；平台实渲染不保证外部Markdown阅读器。历史证据在Git及tmp/reader-clean-*、quantization-version-*，不重跑已验证流程。
- 长综述ROaa450f1e旧任务163815字符超120k失败，24页完整SourceMap已在服务器；未实现新续跑能力，勿重解析或仅增limit。
## Read first
- 本文 → docs/OpenScience_Kimi_Development_Spec.md §2.2/相关章节 → docs/specs/2026-09-13-draft-publication-trash-design.md、ADR-014 → docs/runbooks/server-capabilities.md及deployment.md相关条目。
- project_index只定向检索；已有GitHub方法与真实调用对照见hermes-capability-registry。无新第三方安装；历史日志由Git保留，不恢复旧MVP next action。
