# Hermes / Workbench CURRENT Handoff
## Task and user decision
- 2026-09-14最新：用户否定新学术cdce6087与编辑1a1d716b，仍只认可淡彩aa41。此前仅检索/借鉴外部方法，未安装完整上游技能；本轮用户明确授权给Codex和Hermes安装相关设计技能。暂停重复出图，先接通实际技能读取。Figma只回答可用性，不更改配置。
- 根因范围：此前Hermes仅读media-direction.ts自写规则；局部换色/纸纹与锁定圆形构图没有解决审美问题。上轮High评价不代表用户接受；不再称新图好看或已达标。
## Version tuple
- 交付树E:/Miscellaneous/XGS/.worktrees/onchip-video-release；branch codex/onchip-video-release；本轮起始HEAD/origin b0d5056a7ad5820e260cfdf5bccbbe444e652b00。
- 本轮开始实读ECS release dd4c935aca25c37b95a3295e05cce1ce1ecebffb，rollback a1a5f30d81e52bd88784160edbc8bd8287e60ade。下面新代码尚待部署；不得以候选或docs提交覆盖服务器事实。
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
- 当前安装/接线代码待独立High只读审查、服务器必要build/start部署；不跑测试、预检、CI、本机构建。
- 部署后通过既有API创建一次真实私有文字方案，使用已审研究与用户审美反馈；读取其designSkills来源证明实际消费。只规划，不自动生成图片；完整收据放tmp/和服务器/jobs。
- 新技能可用于其他RO，但安装和调用成功不代表图片质量通过；下一步依据真实方案做明确构图选择，再按用户授权推进图像。
## Open operational limits
- 独立image runner11494323/science501da7a3/helperd369ccc2/brokerb78fb94d/base d163保持，Codex runner09058847/base1ad54c72保持。
- 旧8aea8fcc/8ee965ae未提交失败间歇根因未定；两张新图单次成功不证明永久稳定。普通retry复用task.id与terminal failed spool的合同不一致仍未修复。本轮不碰runner/清spool。
- 第三篇、视频、批量冷启动暂停。用户未确认当前新图质量。
## Read next
- docs/runbooks/hermes-capability-registry.md 图片技能安装段；apps/agent-worker/src/skills/installed-media-skills.ts；docs/OpenScience_Kimi_Development_Spec.md §18.2；部署前相关server-capabilities/deployment条目。
