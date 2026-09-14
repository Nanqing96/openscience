# CURRENT Progress Window

## 2026-09-14 — 实际交付底层开发能力（进行中）
- 最新用户要求优先完成已调研的工具，已授权项目级安装与独立服务；旧“本轮不新增工具”已失效。科研应用及生图继续暂停，唯一版本/进度锚点见[CURRENT](handoff/2026-09-10-hermes-web-image-handoff.md)。
- 实现了私有Backstage目录API、Langfuse与Gateway元数据适配、只读Serena MCP、标准Vercel Skills CLI；复用Portainer、dependency-cruiser及已有skill消费记录。隔离包在 `infra/development-platform/`，Codex项目配置与私有SSH转发已写入。
- 独立High已复核隔离、只读权限、依赖lock、源版本、凭据与未知成本边界。Catalog/Serena/代理兼容包正在服务器安装/构建，尚未宣称运行调用成功；无测试/预检/CI/新模型请求。
- 真实安装阻断已定位：legacy Docker builder无BuildKit，已适配并复用现有Node full编译层；Squid7.2官方Bug5520拒绝数字起始CONNECT，阻断Langfuse镜像R2下载。官方ALinux仓库暂无修复包，使用原SRPM及上游单文件修复隔离打包，保留原RPM/config回退，未替换运行代理。

## 此前已完成的静态治理（非当前安装边界）

## 2026-09-14 — 优先修能力复用与状态漂移
- 用户先要求解决“已有能力被遗忘、重复实现、效果不明”，再code-review。配图仍是后续目标；现在暂停部署/模型调用/生成，公开版本与数据保持。
- 唯一版本事实与下一步见[CURRENT handoff](handoff/2026-09-10-hermes-web-image-handoff.md)。应用保持89d05；receiver8e4已装，应用8e4构建失败。当前工作树基于8e4做静态修正，无测试/预检/CI。
- 已定向High审查：原科学skill确有调用，配图没复用；长Claim/整证据二次分析、Chat全稿重写仍有风险。BGE不能替代科学判断。
- 候选bf8db1ad接回同一个critical-thinking runtime skill并删重复原则，修decision未收窄导致的Prisma JSON类型原因；最终High静态复核完成，未再构建/部署，效果未知。
- 复用现有AGENTS、architecture-guard、docs-sync、ADR-002和能力台账，补产品目的/代码调用/实际效果索引；根main入口仅链接交付树CURRENT，不复制release。
- 官方工具调研和定向review问题/处置在[能力台账](runbooks/hermes-capability-registry.md)当前部分。没有新管理平台、依赖、MCP、自动化或重复门禁。
- 审查发现并修正BGE台账虚假调用箭头：worker建索引已接，hybrid query实现本轮未见app调用方。根main导航和跨session决策Memory已同步；既有其他dirty内容保留。
- 真实d31及旧错误方案已rejected，没有新图片。后续先修已审上游到窄视觉焦点的传递，收敛审阅再恢复交付；不执行旧tmp脚本。
