# Hermes / Workbench CURRENT Handoff
## Current task and constraints
- 用户要求固化我们自己的通用科研配图skill，避免反复手改提示词；最新强调画面认识须来自上游文献科学解析与分析，不可固定文章/构图模板。Chat生图为主，Codex CLI仅备用，不主动调用或自动回退耗额度。
- 本轮实现：从每篇已核对分析与原文派生结构化IllustrationBrief，画面对象关联Claim/证据；构图与风格分别表达；现代brief直接编译生图输入，避免第二LM改写科学含义。参考图只作style，绝非文献证据。
- 用户只认可淡彩aa41，否定学术cdce/编辑1a1d及更早两图。上次实际方案141f42d3因科学域混排/公式冲突已rejected；不能恢复或用它生图。
## Version tuple
- 交付树E:/Miscellaneous/XGS/.worktrees/onchip-video-release；branch codex/onchip-video-release；本轮起始HEAD/origin cfa45e3c0edba93bca9008426825ab4d5afc73df。
- 本轮启动实读ECS release ea43696dd6b115415712fe87fd8ff4d2a4cbdc37，rollback dd4c935aca25c37b95a3295e05cce1ce1ecebffb；当前新代码尚未部署，勿混淆candidate与production。
- 唯一无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得提交/覆盖。根目录dirty main不是生产基线。
## Implemented, awaiting deployment
- 自有.agents/skills/openscience-research-illustration/{SKILL.md,references/art-directions.md}已创建并装入C:/Users/Mac/.codex/skills同名目录。不写死论文和科学对象，选择上游关系、艺术方向、真实参考图与保留反馈均有指导。继续复用原版baoyu三包的设计参考；baoyu-image-gen未安装、不切其Codex路径。
- packages/domain/src/assets/illustration-brief.ts：独立schemaVersion1，单主域、message/subjects/composition/treatment/labels/constraints。subjects携带解引用到原文的basis；planner只返回claimId/quoteId，服务器映射到evidenceId/quote并校验其仍在当前reviewed passages。visualAction唯一派生，读回不一致拒绝；超1500直接拒绝不截断。旧无brief计划保留旧兼容路径，视频保持。
- 现有SceneImageRequest新增styleReferenceAssetId；API与worker限定同RO/version、未删除draft/approved、规范Hermes scene PNG。初读/外发前提交事务/保存前校验hash与可读状态；生成资产单独记录styleReference，不纳入Claims/evidence或公开科学依赖。
- Gateway仅Chat provider支持reference PNG；验证字节/hash，固定inbox sidecar先原子持久化，既有promptHash有ref时扩展成版本化canonical JSON身份，无ref保持旧hash。broker固定安全路径复制到私有job，runner图片模式后上传并确认单附件就绪，失败不静默纯文本/不盲重发。
- 传输层由/root/chat_reference_transport负责6文件，已完成；独立High已看全部diff，其最后指出的科学关系覆盖与单域scene规则已补入skill及planner。无测试、预检、CI、本机构建/迁移/新依赖。
## Server/browser evidence and pending operations
- 只读观察服务器自建空白Chat页：#prompt-textarea.closest(form)内唯一input#upload-files[type=file]，Send prompt/send-button，初始groups=[]。未上传演练/未发送，页已关闭。
- 新附件就绪selector复用已部署review-runner的单role=group文件名模式，仍需本次实际私有图任务观察，不能宣称已可用。
- 新应用需既有deploy.sh --confirm --no-tests --skip-migrate --reuse-unchanged-capability-images，rollback ea43696d；复用干净发布树.worktrees/art-direction-release-41ae8902。Chat provider broker/runner协议需用既有install.sh --confirm-provider从新immutable release一同安装，复用既有renderer image，不重建浏览器/登录/代理。
- review-runner源码最后变更501da7a3、page-lifecycle d369ccc2与线上一致，安装保持这些能力；Codex runner09058847/base1ad54c72保持，不调用其额度。
## Real research and next action
- Quantization RO9067a2d5-42ad-4c06-b234-753728b71064；private e77dc3c7-95cb-4269-ac3c-24276fea74e7（internal8/revision9）；Claim93416292-0dbb-42b1-8810-6bdf77804c1f/40Evidence。
- aa41a018-b2ff-4ffb-9557-19ecabe104bc是用户指定可借鉴的淡彩PNG；原contentHash565fa04e0c79ab9ee797b4bfd9d3a334b6f49b88b72756f8d1533bb631e7330b保持。公开OSR-2026-000023/v1/version72c315af不改；所有旧图/文件保留。
- 完成High问题修复、提交和服务器必要构建安装后，让Hermes基于上述上游分析生成一个新的真实私有结构化方案（不手工编科学内容），读科学依据/构图质量；科学可用后通过既有approved-plan API生成一张Chat参考图，实际看原图/页面/附件与provenance，保留draft供用户判断，不公开。
- 原tmp/design-skills-*和art-feedback-*脚本有历史mutation，禁止直接重跑。新操作保存新的tmp/及服务器/jobs收据、幂等key，超时先查状态。
## Remaining limits
- 输出仍1280×720，不新增确定性绘图/视频/任意画幅。本轮先完成结构化科学传递和Chat真实参考图；未知额度/精确字体/科学正确性不得靠安装或成功状态声称通过。
- 历史Chat发送前间歇失败、通用retry复用terminal task ID不一致仍未解决；本轮不清spool。第三篇、视频、批量冷启动与Figma暂停。
## Read next
- 当前diff、新skill、illustration-brief.ts、storyboard.ts、scene-image.ts；Chat传输6文件；server-capabilities/deployment相关条目。源上游MIT commit1567581c详情仍在hermes-capability-registry。
