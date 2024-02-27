# PotionVision

基于 aria2 与 NPlayer 播放器应用,简化追番的日常操作
使用 vue, electron, tailwindcss, vite, typescript, 以及其他一些库构建的视频播放器应用




## 目标

- [*] 通过 aria2 下载视频

- [*] 通过 NPlayer 播放视频与弹幕

- [ ] 开发RSS订阅功能

- [ ] 开发定时任务功能

- [*] 开发文件浏览器

- [ ] 开发内置浏览器

## 开发与构建

```bash
## install 
yarn

# run
yarn dev

# build mac
yarn build:mac
# build win
yarn build:win
```






## 技术

### `NPlayer`

[NPlayer](https://nplayer.js.org/)
可定制、插件化、响应式（支持移动、平板等多种设备）的弹幕视频播放器

[NPlayer 支持任何流媒体和 B 站弹幕体验的视频播放器](https://zhuanlan.zhihu.com/p/366871209)

[弹幕播放器](https://nplayer.js.org/docs/ecosystem/danmaku)



### `aria2`

[项目地址](https://github.com/yjl9903/naria2)

[aria构建一个易用的 aria2 客户端包和 CLI 应用2](https://blog.onekuma.cn/build-a-convenient-aria2-cli?locale=en)

[node 进程退出](https://blog.onekuma.cn/death-of-a-node-process)


[aria2 方法](https://aria2.github.io/manual/en/html/aria2c.html#aria2.unpause)

[aria2 启动](https://aria2.github.io/manual/en/html/aria2c.html#parameterized-uri-support)

### `tailwind`

[tailwindcss](https://tailwindcss.com/docs/overflow)

[overflow](https://tailwindcss.com/docs/overflow)

[components](https://tailwindui.com/components/marketing/sections/feature-sections)



### fluent icon

[fluent icon](https://github.com/microsoft/fluentui-system-icons)