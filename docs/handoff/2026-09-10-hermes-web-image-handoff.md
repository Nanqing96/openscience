# Hermes / Workbench CURRENT Handoff
## Goal and constraints
- 2026-09-14公开文章标准API已交付：latest/exact共用原公开读取，最新返回完整JSON；统一OpenAPI3.1含8个真实GET、/developers中英文档与导航、HTML JSON alternate、Link/Content-Location/links.self。借鉴Crossref/OpenAlex/OpenAPI；无新服务/依赖/迁移/科研写入，独立High静态PASS。下一步用户实际接入其外部AI客户端；本轮无待部署代码。
- 2026-09-14第二篇已真实发布OSR-2026-000023/v/1，作者DHL、完整原题、文字/数据CC-BY-4.0、代码MIT，原PDF允许匿名下载。用户确认原创/昵称/下载并委托选许可；两篇真实论文已公开，等待用户对产品质量反馈，视频/批量暂停。
- 本机只编辑/静态阅读/传输；无测试、预检、CI或本机构建。必要服务器build/migrate/start与真实页面阅读已执行，不通过删除/发布受保护论文验证功能。
- 服务器MiniMax-M3。自动生成、引导共编、人工校正分别记录；独立High审核不能冒称产品自动审校。
## Version and workspace
- 交付树E:/Miscellaneous/XGS/.worktrees/onchip-video-release；branch codex/onchip-video-release；代码HEAD/origina7214fc9bff7c2837ec562fc923ae23a6c4e8d6e，随后仅文档补记；实际文档HEAD从Git读取，不等于应用release。
- 当前ECS releasea7214fc9bff7c2837ec562fc923ae23a6c4e8d6e / rollbacke7f95180643a852951cfcfb4f7cc8dd65fac58d5。tmp/public-api-deploy-a7214fc9.log及exec98387 exit0：--no-tests --skip-migrate，服务器完整build/start、精确release切换与journal收尾完成，无手动stop。clean树.worktrees/public-api-release-a7214fc9；e7f回滚保留前次发布/下载，但撤销本次API入口升级。c0bc及以前仍禁回退。
- clean发布树.worktrees/public-download-release-e7f95180；先前各发布树保留。根目录dirty main不是生产基线，未合并main；无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得覆盖/提交。
## Public API observation
- tmp/public-api-reading.json/log（服务器/jobs同名）：匿名/developers、OpenAPI、23/latest、23/v1、22/v10及冻结来源均200；latest除兼容latestVersion字段外与exact深度同值，固定links.self/Content-Location正确；23正文/Claim/原配图与上轮数据同值，40来源保留，下载URL授权保持。HTML中固定JSON alternate和开发者导航可发现，旧引用区技术链接0。tmp/public-api-developers.png已视觉查看。
- 公开接入：https://openscience.428312321.xyz/developers；规范/api/research-record/openapi；最新完整/api/research/OSR-2026-000023；固定/api/research/OSR-2026-000023/v/1。原PDF下载字节证据复用e7f，不重复下载。
- 客户端限制：本轮web工具对已公开API返回not safe to open(non-retryable)，未提供HTTP状态，未重试/放宽策略，不推断Cloudflare/登录/DNS根因；记录tmp/public-api-external-client.txt。服务器匿名浏览器沿既有代理读取成功，不冒称所有外部AI客户端均已兼容。
## Lifecycle delivered and observation
- 公开序号publicationNo独立于内部versionNo；发布时分配，旧公开v10/URL保留；冻结公开元数据/图谱/来源/媒体。私有草稿权限单独判断，历史恢复创建新私有草稿并沿用冻结图文。
- 主页面分析记录收进Hermes；无公开记录不显示发布历史。更多内编辑历史按日期/摘要、可查看再恢复；个人空间和内容项删除、会话默认保留产物、30天回收站/恢复/清除、公开聚合长期归档。
- 共享存储/公开媒体保留，共同核心锁协调发布、删除及后台回写；搜索物理独立，以核心存续状态过滤且已有TrashEntry重试同步。生产spool提交也在该锁内校验并原子发布，防止清除漏掉迟到副本。
- 受限宿主清理服务/定时器已安装到/opt/openscience-private-cleanup；结果目录只读挂载、Parser隔离保持。API清除未完成返回202，Worker收到精确complete才记purged；不声称外部ChatGPT历史已被删除。
- 独立High在精确6b9f5a06上静态PASS。首次服务器构建因retained数组隐式any失败（迁移前），ef9补类型后完整构建、两项核心迁移、镜像与启动成功。无测试/预检/CI。
- 旧API/Worker停止阻塞：只读确认running AgentTask为空后仅stop两旧容器，原部署事务继续成功；未触发内容变更。根本信号处理问题未证实修复。
- 实际第二篇object/history/record/media均200，core与reader-clean-before逐字同值，private/revision6、四条历史publicationNo=null，10式/0错误、图1280×720、368CSS窄屏无横溢出；截图已看。
- 第一篇公开OSR-2026-000022/v/10正常，publicVersionId保留OSR-2026-000022-v10、published/1图。Hermes来源可展开、管理内容80项、回收站空状态可读。
- 02d最后实读：编辑历史四条时间/摘要，无内部笔记UUID/机器英文；桌面/移动截图已看，窄屏dialog354/scroll354/viewport380CSS。打开冻结正文1617字符，恢复入口可用但未点击；管理80项最新在前，已知内部标题0，列表与确认/回收站共用标签。证据tmp/lifecycle-final-reading.{sh,log,json}及四截图，服务器/jobs同名。
- 证据：本地tmp/lifecycle-{reading,management-reading}.sh/log/json与截图，服务器/jobs同名json/png；原图/正文未重生成。首发v1已在第二篇真实发布观察；真实清除、历史恢复写入和30天到期仍未实际操作，不冒称完整运行验收。
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
- ROc896802c-35dd-4b59-8db1-5f374f83a6d8、草稿revision11；正式v10 f4e2dc71-1fe8-406f-8c19-e1849503d698、公开OSR-2026-000022/v/10保留。PDF7bb96cc1-bb6f-4d3b-b0bf-352f41971faf与已批图b19a65bd-6497-4b61-bb81-0154b264d58c保护。
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
