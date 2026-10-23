> Windows installer fix 0.1.1: PowerShell scripts include an explicit UTF-8 BOM for Windows PowerShell 5.1 and PowerShell 7. Plugin runtime behavior is unchanged.

# dsh-tool-guard

通用工具指导和证据检查。注册 tool_context/tool_help，并通过 DSH 事件检查本轮真实工具结果、日期、截断、修改后重读、重复调用及旧记忆。不负责解析文件、图片评分或课程处理。没有 Python、GPU、端口、后台服务或课堂依赖。

## 独立安装与边界

- 单独的 npm 包、DSH bundle、配置入口和版本；不依赖 dsh-classroom 或其他同级插件。可分别启用、禁用、卸载。
- 用 `dsh plugin --profile web remove dsh-tool-guard` 卸载（以当前 DSH 帮助为准）；不主动删除用户数据。
- 不监听任何端口，使用 DSH 当前服务。3081 只用于隔离验收，与插件本身无关。
- 关闭其他插件时只使用实际可用的工具，不会偷偷加载文件/图片/课堂能力。纠正次数有限，不能消除模型幻觉，也无法抹去已流出的草稿。

## 旧课堂版本迁移

若 profile 安装了 0.7.1 之前的课堂插件，先升级到课堂解耦版，再安装独立工具。旧版本仍注册通用工具/钩子，会造成重复；安装器会在修改前拒绝这种组合。没有课堂插件时可以直接独立安装。

## 发布与安装

先公开源码，再用完整固定提交 SHA 下载，检查后在隔离 DSH_HOME 安装并验收，最后才切换正式环境。

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/install-release.ps1 -Commit <40位SHA>`

不需要安装额外的本地模型。

公共工具与协议的构建时复用记录在 SHARED-SOURCES.json；发布包包含所需源码，没有跨插件相对导入、file: 依赖或安装时回指工作目录。

## 测试

`npm install --ignore-scripts` 后 `npm test`。Python 插件另运行自己的 test/*.py。自动检查不等于任意提示、全图库或长课程质量验收。
