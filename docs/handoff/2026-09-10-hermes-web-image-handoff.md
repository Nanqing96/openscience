# Hermes / Workbench CURRENT Handoff
## Current task and result
- 用户顺序：先同一已审论文的学术图、封面、淡彩三张私有候选；落实后检索现有生图/绘图/构图skill。三张已实际生成、独立看图接受、画廊与工作台轮播均可达；尚未公开或在产品审批为approved。水墨指导已配置但本批不生第四张。
- 学术图dc216a9f-2683-47d5-8aec-eef55b88aa2a；封面d4ffa9d0-2ad6-417e-9593-6b437a91f269；淡彩aa41a018-b2ff-4ffb-9557-19ecabe104bc。均1280×720/draft，来源同一reviewed Claim93416292/40Evidence。旧误导光晕封面249a5536标rejected并保留文件；旧成功资产未删除。
- 研究RO9067a2d5-42ad-4c06-b234-753728b71064；本轮通过restore API从已审72c315af恢复私有草稿e77dc3c7-95cb-4269-ac3c-24276fea74e7，内部versionNo8/RO revision9。正文core全等、40证据继承。不能再次运行tmp/style-batch-restore.sh。
- 工作台：https://openscience.428312321.xyz/research-objects/9067a2d5-42ad-4c06-b234-753728b71064/edit?stage=media&version=e77dc3c7-95cb-4269-ac3c-24276fea74e7 。独立画廊同RO/presentation?version=e77dc3c7-95cb-4269-ac3c-24276fea74e7。
- 公开23/v1完整JSON与本轮修改前深度全等，发行信息/原图/正文/来源未变；工作台轮播含原继承approved图557c3db6和新3图，4张均实际点击可达；1140CSS无横溢出，三画廊截图已看。收据tmp/style-batch-final-reading.json/final-read.log及gallery-{academic,editorial,watercolor}.png。
## Versions and deployment
- 交付树E:/Miscellaneous/XGS/.worktrees/onchip-video-release，branch codex/onchip-video-release。应用a1a5f30d81e52bd88784160edbc8bd8287e60ade / rollback41ae8902c245e191e34e09969d6d57d81a64fdd6，/__release实读200一致；HEAD后续仅文档提交，从Git读取，不能等同于应用release。
- 应用a1a5f30d：art-direction v3信息结构/坐标域/可见标签计数与冗余编码规则，High GO、必要服务器build/start exit0；复用clean发布树.worktrees/art-direction-release-41ae8902（目录名为历史，现HEAD a1a5），tmp/art-direction-v3-deploy.log与style-batch-release-read.log。三图实际在41ae/v2及具体修订指导下生成，不冒称v3跨论文已验证；无需重生成。
- ChatGPT image runner当前11494323文件补丁（完整SHA从Git读取），science review仍501da7a3、helperd369ccc2、brokerb78fb94d/base d163。安装记录tmp/style-mode-{install,diagnostic-install}.log exit0；按image→science→shared三锁、cmp完整基线、备份、同目录root:11040/0440原子替换；无浏览器/服务重启。
- runner备份及source-id：/opt/openscience-chatgpt-browser/mode-ready-<source SHA>/。最初3dc98140从41ae原runner安装，最终11494323从3dc安装；ddb054b0未安装。回退同三锁原子恢复before.cjs，不覆盖漂移、不重发旧任务。
- 独立Codex仍runner09058847/base1ad54c72，受限清理代码f8，未因本批更改。根目录dirty main非生产基线；交付树无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得覆盖/提交。
## Scientific and transport limits
- 初次三份方案科学复核未过（实空间与波矢域混合、固定偶极方向、互斥z区等），通过服务器来源指导修订为058d/4528/854a后才生成；封面4528实际图有光晕，再修订4be676be并重新生成。不能把人工指导后的结果称为自动首稿正确。
- 学术前两任务8aea8fcc与8ee965ae均在发送前失败，无submitted/conversation/output；前者IMAGE_MODE_NOT_READY，后者约6秒即error=Error。30秒等待不足以解释第二次故障。相同prompt的最小控件观察可用，未发送模型请求；间歇根因未定。114增加安全子阶段/异常类别，后续dc/d4真实生成与下载成功，仅证明这两次链路可用。
- 原普通agent retry API对presentation图像显示canRetry=true但复用task.id；handler禁止无completed-result的第二次image执行，既有terminal failed spool也不可作为pre-submission重置。静态确认契约不一致，未为验证点击；本批用既有generation API的新task/幂等key续作，旧失败保留。下一稳定性修复应区分保存结果恢复与显式新生成，不能清spool或盲重发。
- 三图可作私有候选，非期刊发表审核；学术/封面有限画幅色块仍有被过读为谱截止的小风险，未标第二阈值，核心分类正确；淡彩底部次要字较淡。v3部署后的跨论文首稿效果未观察。
## Skill research after this batch
- 已通过GitHub原仓库读取baoyu-article-illustrator/cover-image、K-Dense scientific-schematics/scientific-visualization，及Anthropic canvas-design和许可；选择与链接记录在docs/runbooks/hermes-capability-registry.md“图片风格批次与技能选择”。未安装任何第三方skill、插件、依赖或新后端。
- 优先吸收信息结构×风格×配色、内容焦点、可见标签/坐标语义和冗余编码；科学数值图应走有数据与可编辑图元的确定性绘图，现有生图PNG不能承诺矢量/精确字体。原生图方案保留服务器ChatGPT路径，不能以本机imagegen替代。
- 不照搬上游自动评分分数作为科学验收、默认批量重试/新OpenRouter依赖；本地旧Gemini skill示例λ<100fs量纲错误，不能作科学可信来源。现有generateClaimChartSvg仅用SVG/text手工排Claim卡片，没有坐标/数据图或数学排版；不能误报现有成熟科学绘图能力。后续先核对服务器已有库/缓存，复用成熟绘图库补精确图元，不为本篇写专用圆形模板；新绘图后端与第三方安装未实施。
## Protected previous delivery
- 两篇真实公开研究：22/v1 deep-sub-cycle（ROc896802c，Versionf4e2dc71）与23/v1 Quantization（RO9067，Version72c315af），均DHL署名、原PDF允许下载；22数据CC0/23数据CC-BY4、文字CC-BY4、代码MIT保持。
- 22旧v10已按用户指定行政勘误为首次v1，audit6c93436f；不能恢复误号/重跑correct-deep-sub-cycle-publication或旧publish脚本。公开API支持固定及最新版本，/developers原文curl/Python已实跑；特定web工具域名安全拒绝未证明解决。
- 已完成正文/卡片公式、S内部引用与制作信息隐藏、同版本结构化证据整块折叠、作者/公开号、个人空间布局。6504首行双卡等高/后续整行，桌面与窄屏实际看过；本轮复用不重做。
- 用户此前4项purge已完成：旧RO66、两会话、笔记；共享对象保留。不得重跑tmp/install-trash-runner-fix.sh或旧purge脚本，不新增删除样本。无当前待清理任务。
## Execution constraints and next action
- 无测试、预检、CI、本机构建/Docker/迁移。仅本机静态编辑/Git/传输；服务器必要build/start及当前具体故障最小诊断/实际产品阅读。禁止无授权安装、删除、读取打印.env/Secret。
- SSH只用Git Bash显式C:/Program Files/Git/bin/bash.exe调用项目ssh-run.sh及id_ed25519_xgs；页面fetch继承服务器浏览器认证/代理，context.request曾绕代理EAI_AGAIN，不当作登录失效。
- 浏览器截图：Chrome125%zoom，使用CDP Page.captureScreenshot(fromSurface:false)，等待fonts后居中。关闭自建page，不动其它用户页面。导出结果仅自身研究scope，不导出Cookie。
- 本批及随后skill检索/通用规则部署已完成。下一步按用户实际反馈提升构图/精确绘图，优先修复上述重试契约与观测到的具体故障。视频、第三篇与批量冷启动仍暂停，不自动公开。
- Read-first：本handoff → docs/OpenScience_Kimi_Development_Spec.md §18.2 → 精确目标代码；服务器先读server-capabilities和deployment相关条目。历史完整证据在Git history及tmp/style-batch-*与服务器/jobs同名；不要扫描旧档案恢复过期next action。
