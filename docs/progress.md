# CURRENT Progress Window

## 2026-09-14 — 开发状态对齐与定向清债
- 用户要求先治理后开发；本轮使用已有 docs-sync、token-smart、Brooks 审查与独立 High，不安装新工具、不新建治理平台。
- 修正交付工作树规则落后于根目录的问题：AGENTS 与 17 个现有流程 Skill/引用对齐；旧计划/交接加历史适用说明，设计区分需求与运行状态，根目录保留导航，基线补录用户已确认阅读/配图原则。
- 三文件代码去重：统一 Skill usage 合并，删除同批 Evidence 的重复 lineage 遍历，原来源/权限/事务重验保留；独立 High 静态 GO。
- 文档规则经独立 High 静态复核；已修正过宽的状态替换，保留有效规则与历史正文。142份历史交接/计划、67份设计的入口说明已对齐；本轮治理收口，不等于逐行复验历史要求或消除全部科研债务。
- [能力台账](runbooks/hermes-capability-registry.md#当前技术债与处理)记录具体债务、后果和处理；未解决的全稿科学改写与 composition 表示分叉仍先于新配图功能。
- Langfuse 是内部观测台、独立账号；用户登录失败截图已解释，私密凭据交接未完成。无密码重置/读取/输出，不把登录页可达当作完成账号交付。
- 无测试/预检/CI/模型/应用部署。只读服务器 release 仍与既有记录一致、开发容器运行；精确版本及下一步见 [CURRENT handoff](handoff/2026-09-10-hermes-web-image-handoff.md)。无关 dirty 设计稿与历史文件保留。

## 2026-09-14 — 底层开发能力实际交付
- 用户要求先完成已调研基础能力，再恢复科研配图。精确 branch/HEAD/source/image/应用release/rollback 与续作入口见 [CURRENT handoff](handoff/2026-09-10-hermes-web-image-handoff.md)。
- 独立Backstage、Serena、Langfuse/Gateway元数据和Vercel Skills已安装并实际使用；复用Portainer、Netdata、dependency-cruiser及已有skill消费记录。科研应用保持89d05、rollback b2f3，未部署未完成候选。
- 真实结果：目录返回owner/deps；Serena三read工具定位reviewScientific两处调用；依赖图19模块/4跨包边；Skills list31项与find结果；Langfuse50回执，API抽读10成功+2生图失败，未知费用保持unknown。无新模型/图片/模拟数据。
- 访问经已有SSH私有隧道到localhost3130/3131/3132；项目Codex MCP配置及按问题选工具的architecture-guard已接好。容器重建后重开隧道；UI仅登录页可达，未代用户登录。
- 真实故障已修：legacy builder、Backstage rateLimit、Serena空目录、depcruise官方配置与source scope、Docker internal端口映射和Squid7.2数字起始CONNECT。原RPM/config/unit与接入初始checkpoint备份保留。
- 独立High审查覆盖新权限/凭据、源快照/报告边界、原生RPM操作、GET查询和SSH；已修阻断项。按用户要求无测试/预检/CI，本机无构建/运行检查；服务器完成必要构建、启动和真实查询。
- 能力变化同步原[能力台账](runbooks/hermes-capability-registry.md)、[服务器清单](runbooks/server-capabilities.md)、ADR-002、项目索引和工具README；不新建规格/任务库或质量评分门禁。

## 未恢复的科研主线
- 已有科学critical-thinking确在extractor使用；配图science/review重复规则的问题已静态修正，未随本轮部署科研应用。
- 仍需收敛长Claim/全部证据二次分析与Chat全稿重写，先传递上游已审窄关系，再处理艺术表达。BGE检索不能代替科学蕴含判断。
- 公开v1、真实论文/图/笔记保持；用户认可的淡彩图保留。下一步按CURRENT继续，不执行旧tmp生图或应用部署脚本。
