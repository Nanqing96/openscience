# CURRENT Progress Window

## 2026-09-15 — 恢复多风格交付目标
- 用户指出重复改画已认可淡彩偏离原任务；需求基线及代码核对确认，本批目标仍为学术机制图、编辑封面插画、淡彩手绘。每项原任务/资产、用户反馈与下一步只见[CURRENT交付差额表](handoff/2026-09-10-hermes-web-image-handoff.md#产品目标交付差额与下一动作2026-09-15-用户纠偏)。
- 已纠正CURRENT、路线和索引的“新增风格暂停”指引；f424保留为额外私有候选，不计作新增风格交付。现有科学分析、设计Skill及艺术修订继续复用。
- 源码确认Backstage组件目录、Serena符号查询、Langfuse调用元数据并不包含产品交付目标与用户审美反馈联动；此前“状态治理已交付”范围过大，现按真实能力记录。此次只静态核对及同步，无测试、部署、新安装或模型调用。

## 2026-09-15 — 实际艺术能力与新图
- 已部署艺术专用修订：通过既有baseAssetId+revisionMode=art直接保留科学字段，只运行已安装设计Skill的艺术规划和末审；旧请求不变。自有Skill v4已同步Codex/Hermes，baoyu原包复用。
- 真实69ec方案实际消费baoyu构图/水彩/文字资料，科学字段与4f完全相同；末审只去掉艺术模型额外刻度。真实f424已取回并入库为draft，已实际看图：内蓝外赭金、坐标和类别清楚、文字有层级；四角纸纹偏重，审美仍待用户判断，未发布。
- 新图与证据、branch/HEAD/应用release/独立provider/rollback唯一记录于[CURRENT](handoff/2026-09-10-hermes-web-image-handoff.md)。图片tmp/research-illustration-f424.png；前图28b及用户喜欢的aa41均保留。
- 1cb8长简报后打开生图菜单触发renderer崩溃，尚未提交。已把现有runner改为先选图像模式再插字，保留原沙箱/模式/文本/参考检查；f424完整请求已真正提交一次。
- f424会话URL出现晚于原30秒窗口，已在原目标/全文/附件绑定后接回原图。新等待max120秒并保留结果恢复时间。原task executionAttempt2仅导入已完成provider结果，没有第二次生图；发送/恢复脚本不可重跑。
- 应用必要服务器build/start与独立provider安装完成，三段代码变更均High静态GO；未测试/预检/CI/本机构建，不以部署/生成成功代替科学与审美质量。

## 未完成与保护
- 当前art修订由显式API请求使用，普通Hermes自然语言快捷路由未自动选择；后续应按用户任务完善此入口，不把服务端能力冒称完整对话体验。
- 下一步及暂停范围只按CURRENT交付差额表，不在此另维护动态待办。公开Quantization v1、deep-sub-cycle v1、真实论文/40证据/笔记/原图均保持。
- 既有标签局部修订/私有checkpoint/结构化审阅issues已部署；新blocked issues消费、新正常论文上游claimSuggestions确认效果及BGE hybrid query正常调用效果仍未观察，详见CURRENT和能力台账。
- Backstage/Serena/Langfuse工程查询与调用观测已有真实证据，产品目标/审美验收尚未自动联动；版本与效果分别记录。Langfuse用户已登录，无需重复登录/密码。SMTP/SSO/备份/保留期未完成。
- 无关dirty设计spec保留，根main仅导航。唯一CURRENT和按变化同步的Skill降低漂移，不保证未来绝对零债务，也不是后台结束回调。
