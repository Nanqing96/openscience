# Hermes / Workbench CURRENT Handoff
## Goal and constraints
- 用户要求自有通用科研配图skill：科学认识来自每篇上游文献解析/分析，不是固定模板。Chat生图主用，Codex CLI备用，不自动回退或耗其额度。
- 禁止测试/预检/CI/本机运行检查；只做本机静态编辑与传输、必要服务器build/start、真实产品观察。不得删除资料、修改公开v1或恢复rejected方案。Figma/视频/第三篇/批量暂停。
## Version tuple
- 工作树 E:/Miscellaneous/XGS/.worktrees/onchip-video-release，branch codex/onchip-video-release，HEAD/origin b88b0fe2b0a76071aa5b300bf49cad9153e53569。
- 实际应用 release b88b0fe2b0a76071aa5b300bf49cad9153e53569 / rollback e2cccb4d75ee8980167d23d4b5c1867263caf2e8，Chat bundle e2cccb4d，cleanup b88b0fe2；新两阶段代码尚未部署。
- 干净发布树 .worktrees/art-direction-release-41ae8902 当前 b88b0fe2。唯一无关dirty docs/specs/2026-09-05-integrated-research-product-design.md不得提交或覆盖。根main不是生产基线。
## Delivered
- 项目/Codex安装自有 openscience-research-illustration 与 art-directions；保留3套原版baoyu/MIT/commit1567581c。Hermes实际读取并在provenance记录skill和章节；baoyu-image-gen只研究未安装，不切CLI。
- e2cccb4d部署了原文关联IllustrationBrief、唯一visualAction及确定性生图编译；新方案无第二次科学改写；旧无brief方案兼容。固定prompt1500不截断。
- 同版本styleReferenceAssetId贯通API/worker/Chat，原图字节/hash经权限与状态校验、原子sidecar、Chat文件附件上传就绪；没有纯文字fallback。新gateway/runner/broker已安装，实际参考上传尚未发生，不宣称可用。
- e2必要build/start与Chat/cleanup installer exit0，b88仅补视觉编码skill后再次必要build/start exit0；日志tmp/illustration-brief-deploy.log、illustration-provider-install.log、illustration-encoding-deploy.log。复用既有镜像/会话/代理，无新依赖/迁移。
## Actual quality findings and current implementation
- 两个真实plan-only f3c75142、393f050d均由Hermes一次成功保存，但科学不合格已API200 rejected，未生图。前者把波矢角谱画成实空间弧/色带；后者补造Bessel主瓣极值，重复错误远场条件。不能以succeeded/有引用称科学通过。
- 已按真实输入定位：Claim是约4k整篇人工已审笔记，40条Evidence含900–1600字符完整段；原规划一次混入全文与设计skill，又机械切400导致定义/公式/限定分离。实读tmp/illustration-upstream.json、两稿provenance.json。
- High同意改两阶段。当前新 illustration-planner.ts：science阶段仅读自有Scientific intent与完整上游，选择一个关系、单domain、1–2subjects/conditions及科学编码；art阶段只读已选科学意图与设计参考，仅输出layout/treatment；代码保留科学字段与原文不变，仍组装已有brief/API。引用上限放至12000保留完整段；不把引用文本传入生图prompt；总输入100k、prompt1500仍限。
- storyboard.ts早路由image并去旧image死分支，video保持；loader增加science阶段；skill同步本机；此diff等待/root/art_direction_review最终High，只读，不测试。
## Real research / pending
- RO9067a2d5-42ad-4c06-b234-753728b71064；private e77dc3c7-95cb-4269-ac3c-24276fea74e7；Claim93416292-0dbb-42b1-8810-6bdf77804c1f；40Evidence。
- 用户认可参考aa41a018-b2ff-4ffb-9557-19ecabe104bc/hash565fa04e0c79ab9ee797b4bfd9d3a334b6f49b88b72756f8d1533bb631e7330b；公开OSR-2026-000023/v1/version72c315af不改，所有历史图片保留。
- 下一步：完成High修正和两阶段代码提交/服务器部署，让Hermes实际产生新plan，确认科学选题和艺术映射均准确后再只生一张私有Chat参考图。若不准则拒绝，不能为完成任务而放行。
- tmp/illustration-reference-generate.sh现硬编码已rejected393f050d，绝对不能直接执行；其他plan/reject脚本都已有mutation收据，禁止重跑旧请求。新任务用新receipt/幂等key，模糊超时先查状态。
## Limits
- 现有12000原文引用只是完整性上限，不证明蕴含正确；科学与美学需实际看。输出仍1280×720；无确定性数据绘图器。
- Chat历史发送前间歇失败和通用retry终态task ID问题仍有边界，不重置spool；附件selector只只读看过页面，尚无实际上传证据。
- SSH仅项目脚本/显式Git Bash/XGS_CONFIG_ROOT，不读取凭据。后续应用回退到b88无需回退e2协议；不让旧纯文字runner处理新参考请求。
