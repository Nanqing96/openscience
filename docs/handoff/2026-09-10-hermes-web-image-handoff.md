# Hermes / Workbench CURRENT Handoff
## Task and user decision
- 2026-09-14最新：用户否定新学术cdce6087与编辑1a1d716b，仍只认可淡彩aa41。此前仅检索/借鉴外部方法，未安装完整上游技能；本轮用户明确授权给Codex和Hermes安装相关设计技能。暂停重复出图，先接通实际技能读取。Figma只回答可用性，不更改配置。
- 根因范围：此前Hermes仅读media-direction.ts自写规则；局部换色/纸纹与锁定圆形构图没有解决审美问题。上轮High评价不代表用户接受；不再称新图好看或已达标。
## Version tuple
- 交付树E:/Miscellaneous/XGS/.worktrees/onchip-video-release；branch codex/onchip-video-release；功能提交ea43696dd6b115415712fe87fd8ff4d2a4cbdc37已推送origin；最终docs-only HEAD从Git读取，不等于release。
- 当前ECS release ea43696dd6b115415712fe87fd8ff4d2a4cbdc37，rollback dd4c935aca25c37b95a3295e05cce1ce1ecebffb；部署必要build/start exit0，真实产品页面fetch /__release一致。
- 根目录dirty main不是交付基线。无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得提交/覆盖。
## Installed and implemented this turn
- 原版JimLiu/baoyu-skills commit1567581c26ec29f4216c6e6835415bf30343b0e3，MIT：baoyu-article-illustrator、baoyu-cover-image、baoyu-infographic，完整122个Markdown参考/技能文件及LICENSE，安装在项目.agents/skills和C:/Users/Mac/.codex/skills；无上游脚本执行/新后端/新二进制。
- 新installed-media-skills.ts从release只读目录按固定章节/路径白名单读取原文。现有image storyboard与scene-image planner消费设计片段；既有presentationAsset.provenance.designSkills记录实际技能ID/上游commit/文件及章节。视频规划保持原行为；恢复已有provider结果不冒充重新加载技能。
- 原科学事实、用户要求、已批方案及现有Gateway/schema/权限优先；不执行上游确认、删除、重试、CLI等工作流。未安装K-Dense确定性绘图执行器，不能宣称精确矢量/字体或自动审美保证。
- 本机Figma的figma-temp与figma-primary均enabled=false，当前无可调用Figma方法；只读确认，未启用/修改。市场网页、GitHub与官方MCP目录可访问，不等于任意MCP已连接。
## Protected production data
- RO9067a2d5-42ad-4c06-b234-753728b71064；private e77dc3c7-95cb-4269-ac3c-24276fea74e7（internal8/revision9）；Claim93416292-0dbb-42b1-8810-6bdf77804c1f/40Evidence。
- 公开OSR-2026-000023/v1/version72c315af保持；淡彩aa41a018-b2ff-4ffb-9557-19ecabe104bc保持。所有旧图/文件保留。本轮不生成/批准/发布新图片，不重复restore/旧生成脚本。
- 私有画廊：https://openscience.428312321.xyz/research-objects/9067a2d5-42ad-4c06-b234-753728b71064/presentation?version=e77dc3c7-95cb-4269-ac3c-24276fea74e7 。
## Delivery and next action
- 独立High发现多风格请求可膨胀参考输入，已按文本顺序最多2风格/1布局收紧后GO；既有deploy.sh --confirm --no-tests --skip-migrate --reuse-unchanged-capability-images完成，tmp/design-skills-deploy.log。不跑测试、预检、CI、本机构建。
- 实际私有方案141f42d3-18eb-4f5d-be63-212ddc51e9ea，API202，32秒内attempt1/retry0 succeeded；数据库provenance记录三包原文章节及watercolor/editorial参考和准确上游commit。tmp/design-skills-{plan,read}.log及design-skills-provenance.json。原版章节消费已观察，不代表图像质量。
- 该方案仍混淆一维径向k⊥/二维(kx,ky)、k空间/z空间，并有k²/k⊥²、形状因子写法及长公式/短标签矛盾；根agent和独立High一致拒绝出图。通过带expectedUpdatedAt的既有API将本轮方案标rejected，200/canGenerateSceneImage=false，tmp/design-skills-plan-rejected.log；无新图片生成/批准/发布。
- 下一步先解决方案把不同科学域混排和标签超载的问题，以单个清楚关系及用户认可的视觉参考做构图取舍；不反复加提示词后盲目出图。安装是通用接线，实际审美仍未通过；Figma不在本轮处理范围。
## Open operational limits
- 独立image runner11494323/science501da7a3/helperd369ccc2/brokerb78fb94d/base d163保持，Codex runner09058847/base1ad54c72保持。
- 旧8aea8fcc/8ee965ae未提交失败间歇根因未定；两张新图单次成功不证明永久稳定。普通retry复用task.id与terminal failed spool的合同不一致仍未修复。本轮不碰runner/清spool。
- 第三篇、视频、批量冷启动暂停。用户未确认当前新图质量。
## Read next
- docs/runbooks/hermes-capability-registry.md 图片技能安装段；apps/agent-worker/src/skills/installed-media-skills.ts；docs/OpenScience_Kimi_Development_Spec.md §18.2；部署前相关server-capabilities/deployment条目。
