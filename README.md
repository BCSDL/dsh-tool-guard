# dsh-tool-guard

通用工具指导和证据检查。注册 tool_context/tool_help，并通过 DSH 事件检查本轮真实工具结果、日期、截断、修改后重读、重复调用及旧记忆。不负责解析文件、图片评分或课程处理。没有 Python、GPU、端口、后台服务或课堂依赖。

## 独立安装与边界

- 单独的 npm 包、DSH bundle、配置入口和版本；不依赖 dsh-classroom 或其他同级插件。可分别启用、禁用、卸载。
- 用 `dsh plugin --profile web remove dsh-tool-guard` 卸载（以当前 DSH 帮助为准）；不主动删除用户数据。
- 不监听任何端口，使用 DSH 当前服务。3081 只用于隔离验收，与插件本身无关。
- 关闭其他插件时只使用实际可用的工具，不会偷偷加载文件/图片/课堂能力。纠正次数有限，不能消除模型幻觉，也无法抹去已流出的草稿。

## 发布与安装

先公开源码，再用完整固定提交 SHA 下载，检查后在隔离 DSH_HOME 安装并验收，最后才切换正式环境。

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/install-release.ps1 -Commit <40位SHA>`

不需要安装额外的本地模型。

公共工具与协议的构建时复用记录在 SHARED-SOURCES.json；发布包包含所需源码，没有跨插件相对导入、file: 依赖或安装时回指工作目录。

## 测试

`npm install --ignore-scripts` 后 `npm test`。Python 插件另运行自己的 test/*.py。自动检查不等于任意提示、全图库或长课程质量验收。
