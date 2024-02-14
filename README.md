# youfor

An Electron application with Vue and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## Project Setup

### 安装依赖

```bash
$ yarn
```

### 启动开发服务

```bash
$ yarn dev
```

### Build

```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux
```





## 已知问题


### browserView

[窗口右侧的小间隙（窗口大于 BrowserWindow 大小）](https://github.com/electron/electron/issues/11829)

[每个显示器的 DPI 感知会导致窗口定位和大小调整问题](https://github.com/electron/electron/issues/10862)



[在 macOS 上切换 BrowserView 时白色闪烁](https://github.com/electron/electron/issues/40618)


[开发者工具更多标签页列表在devtools窗口下](https://github.com/electron/electron/issues/38790#issuecomment-1592911862)

```js
app.commandLine.appendSwitch('disable-features', 'WidgetLayering');

// 该代码导致颜色选择器无法正常工作
```

[BrowserView 设置为与 BrowserWindow 窗口大小相同，两者的渲染内容大小不同。BrowserView 呈现为与其自己的窗口相同的大小。BrowserWindow 的内容比它自己的窗口小](https://github.com/electron/electron/issues/40731)



[要求渲染器进程中的本机模块具有 NAPI 或上下文感知能力](https://github.com/electron/electron/issues/18397)

> 该问题导致无法使用 `node-ffi-napi`, `node-pty`



###

node-pty

[在 Windows 上使用 node-pty 时，Windows 上存在清理问题](https://github.com/microsoft/node-pty/issues/549)
[](https://github.com/microsoft/vscode/issues/94877)

[在 Electron 中杀死 pty 进程的正确方法是什么？](https://github.com/microsoft/node-pty/issues/382)

### 录制

[mac 自定义或隐藏屏幕录制选择器（或隐私提示按钮）](https://github.com/electron/electron/issues/40814)




### 在启用上下文隔离时无法访问 customElements 创建自定义元素

[window.customElements is undefined from preload script](https://github.com/electron/electron/issues/17316)

[内容脚本无法定义自定义元素](https://issues.chromium.org/issues/41118431)


### body-parser

[fetch-blob](https://www.npmjs.com/package/fetch-blob)

[用于解析表单数据（尤其是文件上传）的Node.js模块。](https://github.com/node-formidable/formidable)


### 文件系统

[如何在 Ubuntu/Linux 和 Windows 之间共享文件夹](https://linux.cn/article-14850-1.html)