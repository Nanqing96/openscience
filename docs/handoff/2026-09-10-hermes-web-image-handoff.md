# Hermes / Workbench CURRENT Handoff
## Goal / constraints
- 自有通用科研配图skill，科学认识来自每篇上游解析/分析。Chat生图主用；Codex CLI仅备用，不自动切换。实际看图后才能判断审美。
- 禁止测试/预检/CI/本机运行检查；只静态编辑、传输、必要服务器build/start和真实私有产品操作。保留旧资料/图片/公开v1。Figma、视频、第三篇、批量暂停。
## Version tuple
- 工作树 E:/Miscellaneous/XGS/.worktrees/onchip-video-release；branch codex/onchip-video-release；HEAD/origin 89d05d6dfcf432765697762864e9406ea3588ab8，新增Chat最终语义审阅为未提交候选。
- 实际应用 release89d05d6dfcf432765697762864e9406ea3588ab8 / rollback b2f3cf373c0eafde1adc53d85f198588d1c23391；Chat bundle e2cccb4d75ee8980167d23d4b5c1867263caf2e8。必要服务器build/start已exit0，未有新图片。
- 干净发布树 .worktrees/art-direction-release-41ae8902 当前89d05。无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得提交/覆盖；根main不是部署基线。
## Implemented and actual evidence
- 自有skill安装到项目和Codex；3套原版Baoyu/MIT/commit1567581c保留。Hermes确实消费Scientific intent、Planning和设计参考，记入provenance。baoyu-image-gen只研究未安装。
- 两阶段MiniMax：完整上游原文/短sourceId选择科学意图；艺术阶段只做布局/处理；代码保留科学字段、原文引用和最终1500字符编译边界，无截断。结构成功不等于科学正确。
- 原图参考接口/真实bytes传递、同RO/version权限、hash、附件就绪、唯一发送已部署e2；实际新图片/附件上传尚未发生，不能称已稳定。
- f3c75142、393f050d科学域/极值/来源错误，API200 rejected；cdc212ed和9977dcab已各用一次retry后failed，不再retry。
- 最新d31e7ccc-95d0-4ce6-9264-27e425bc612d保存成功，但来源不支持描述、把复数积分核画成连续实曲线、艺术阶段补造峰值；已API200 rejected（2026-09-14T11:49:08Z）。tmp/illustration-locale-provenance.json与服务器/jobs/illustration-locale-plan-rejected.json保留。
- 根因不只提示词/格式：Claim是约4k人工已审整篇笔记，40 Evidence含完整段与旧80字符片段；引用相等不证明语义蕴含。当前停止继续堆提示词，接已有Chat独立科学审阅。
## Current candidate
- 新presentation/illustration-review.ts：两阶段仅产候选；Chat一次审完整上游与最终构图，accepted保留/revised完整修正/blocked停止。sourceId重新解引用后直接compile/保存，不再LM改写，不自动生图/发布。
- 新review request v2明确illustration-plan+真实RO/version/evidenceIdentity/candidateHash；requestId父task.id，一任务一次；v1 ingestion/OCR保持。独立policy与submission锁中复核实际task/attempt、scope、权限、Claim/Evidence/原文件/base。已有prompt/responseHash复用，不伪装artifact。
- skill新增Scientific review章节，Hermes按阶段读取并记录实际usage；Codex本机已同步。High静态审阅中；尚未构建/部署/观察新Chat调用。
## Next
- 完成集中High静态复核，单次应用部署及Chat receiver bundle更新（v1/v2兼容），再用真实私有任务产一份方案。Chat修正科学通过后才批准方案并生一张参考图，实际检查返回图片和产品尺寸。
- 部署：显式Git Bash+infra/scripts/ssh-run.sh/deploy.sh；no-tests/skip-migrate/reuse既有镜像；复用Chat浏览器会话/代理，不读.env/凭据。receiver支持v2后才提交新任务；旧runner不能接新v2。
## Protected scope / cautions
- RO9067a2d5-42ad-4c06-b234-753728b71064；private e77dc3c7-95cb-4269-ac3c-24276fea74e7；Claim93416292-0dbb-42b1-8810-6bdf77804c1f；40 Evidence。
- 喜爱参考aa41a018-b2ff-4ffb-9557-19ecabe104bc，hash565fa04e0c79ab9ee797b4bfd9d3a334b6f49b88b72756f8d1533bb631e7330b。公开OSR-2026-000023/v1/version72c315af不改。
- tmp下所有旧*-generate.sh都硬编码失败/被拒方案，不得执行；旧plan/reject脚本已有写入收据，不重跑。新任务用新幂等key并先保存receipt，模糊超时先查状态。
- 没有任何新image请求；原图/候选保留。输出仍1280×720，数据绘图器未接；科学与审美的通用质量均尚未证实。
