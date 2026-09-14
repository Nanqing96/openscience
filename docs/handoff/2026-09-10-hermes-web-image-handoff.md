# Hermes / Workbench CURRENT Handoff
## Latest user feedback and result
- 用户仅认可淡彩aa41好看，否定旧学术dc216和封面d4ff。已重做两张私有候选：学术cdce6087-7dbe-4930-aa5d-993d31c6a8ba，编辑插画1a1d716b-7a67-479e-abbe-d0c8f750a7c5；均1280×720/draft，服务器实际生成后原图与画廊截图已看。用户尚未评价新图，不能写审美已获用户认可。
- 原淡彩aa41a018-b2ff-4ffb-9557-19ecabe104bc字节未变（既有contentHash565fa04e保持），仍private/draft。旧dc216/d4ff已通过带expectedUpdatedAt的API标rejected，各200；文件/历史保留，无删除。旧误导光晕249a也维持rejected。
- 独立High：新封面非对称标题/主体、纸纹/矿物蓝暖金构图比旧图有实质改善；学术新图去除方框/散点/引线，科学表达正确，但右下留白偏大，仍比淡彩克制，只作比较候选，不追加付费重生成。二者轴跨圆界、传播/倏逝/阈值正确，无第二外圈或孔洞光晕。
- 私有画廊：https://openscience.428312321.xyz/research-objects/9067a2d5-42ad-4c06-b234-753728b71064/presentation?version=e77dc3c7-95cb-4269-ac3c-24276fea74e7 。工作台同RO/edit?stage=media&version=e77dc3c7-95cb-4269-ac3c-24276fea74e7。
- 两图已实际加载，1140CSS/scrollWidth1140；工作台4张（继承原图557c、淡彩aa41、新封面1a1d、新学术cdce）已实际切换可达。公开23/v1完整JSON与原先全等。收据tmp/art-feedback-final-reading.json、final-read.log、gallery-{academic,editorial}.png；服务器/jobs同名。
## Code and deployed versions
- 交付树E:/Miscellaneous/XGS/.worktrees/onchip-video-release，branch codex/onchip-video-release。应用dd4c935aca25c37b95a3295e05cce1ce1ecebffb / rollback a1a5f30d81e52bd88784160edbc8bd8287e60ade；HEAD从Git读取，后续docs-only提交不等于release。根目录dirty main不是生产基线。
- art-direction v4仅替换media-direction.ts两条规则：相同科学内容的风格变体须有目的地改变构图/字体/材质，不能仅换色；区分科学批准与审美认可，局部修改保留不受影响/已认可元素，明确否定设计时允许重构，不恢复已拒绝特征。共享视频规划也读取该skill，视频未生成。无API/schema/供应商/新依赖变化。
- 独立High指出最初v4会把局部修改扩大为整体重排，已采用精确限定后GO。正常deploy.sh --confirm --no-tests --skip-migrate --reuse-unchanged-capability-images及既有回滚机制，必要build/start exit0，tmp/art-feedback-v4-deploy.log；公网release由实际页面fetch读到dd4。复用发布树.worktrees/art-direction-release-41ae8902（目录名历史，HEAD现dd4）。
- 本批首轮v4方案d9d212b5/f3db6166经服务器局部修订为a99fad89/2500a8c1后批准生成：只纠正重复标签、浅色字、未定义副标题与轴停在圆界。生成cdce/1a1d各单次成功，无失败重试。tmp/art-feedback-{plans,revised-plans,images,status}.json记录实际请求与结果；不重复运行生成脚本。
- 私有草稿e77dc3c7内部versionNo8/RO revision9，源自公开72c315af恢复；Claim93416292-0dbb-42b1-8810-6bdf77804c1f/40Evidence保持。不能重跑tmp/style-batch-restore.sh或旧发布脚本。
- 交付树唯一无关dirty docs/specs/2026-09-05-integrated-research-product-design.md，不得提交/覆盖。本轮仅代码及同步文档提交，不改该spec。
## Transport and generalization limits
- ChatGPT image runner11494323补丁，science501da7a3/helperd369ccc2/brokerb78fb94d/base d163保持；本轮未改runner、浏览器、服务配置或登录。独立Codex runner09058847/base1ad54c72与受限清理f8保持。
- 历史学术8aea8fcc/8ee965ae均未提交失败，前者IMAGE_MODE_NOT_READY，后者约6秒error=Error；30秒等待不能解释后者。runner114已有安全子阶段/异常类别，具体间歇根因未定；本轮两图单次成功不证明长期稳定修复。
- 普通agent retry对presentation图像canRetry=true但复用task.id；handler只容许已保存结果恢复或受控Hermes授权重启，terminal failed spool不能重置。该合同不一致尚未修复，本轮未点击重试或清spool。未来须区分结果回收与显式新生成。
- 实际美学反馈经过本会话观察和自然语言修订输入服务器planner；这是已部署通用指导和真实产物，不是自动视觉质量评分能力。跨论文自动首稿科学与审美质量仍未确认。
## Existing skill research and protected work
- 已在首批完成后读GitHub原baoyu-article-illustrator/cover-image、K-Dense scientific-schematics/scientific-visualization、Anthropic canvas-design及许可；来源/选择见Hermes台账“图片风格批次与技能选择”。没有安装第三方skill、插件、依赖或新后端。v3结构/坐标/标签规则随v4保留。
- 现有generateClaimChartSvg只是SVG/text的Claim文字卡片，不具备数值曲线/坐标/公式排版。未来精确科学绘图先核服务器现有库/缓存、复用成熟绘图库；不能为本论文造专用圆形模板或把PNG冒称矢量。
- 两篇真实公开研究22/v1 deep-sub-cycle（ROc896802c、Versionf4e2dc71）与23/v1 Quantization（RO9067、Version72c315af），均DHL、原PDF可下载。22旧v10已行政勘误为首发v1，audit6c93436f，勿重跑勘误/发布。
- 正文/卡片公式、内部S编号与制作信息隐藏、证据整体折叠、作者/API/下载及个人空间布局已完成；原4项已授权purge已完成，共享对象保留，不重跑清理。API文档原文curl/Python已实读；特定web工具域名安全拒绝不能称已解决。
## Constraints and next action
- 无测试、预检、CI、本机构建/Docker/迁移。仅本机编辑/Git/传输；服务器必要build/start、已知故障最小诊断和真实产品生成/阅读。无授权不安装、删除、读取打印.env/Secret。
- SSH仅Git Bash显式C:/Program Files/Git/bin/bash.exe调用infra/scripts/ssh-run.sh，项目id_ed25519_xgs；页面fetch继承服务器浏览器认证/代理，不导出cookie，不用context.request绕代理。
- 当前反馈落实已完成，无活动生成或部署。新两图仍待用户审美判断；淡彩是唯一用户明确喜欢的样本。不要自动公开或继续付费风格循环。下一任务按用户反馈；稳定性合同/精确绘图缺口保留，视频/第三篇/批量仍暂停。
- Read-first：本handoff → 基线§18.2 → 精确目标代码；服务器先读server-capabilities和deployment相关条目。完整历史证据在Git和tmp/style-batch-*、art-feedback-*，不要扫描旧档案恢复旧next action。
