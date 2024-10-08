import { app, shell, BrowserWindow, session, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import log from 'electron-log/main';
require('@electron/remote/main').initialize(); // in the main process:
// import icon from '../resources/logo.png?asset';

import upath from 'upath';
import fs from 'node:fs/promises';

import Apps from './apps';

console.log = log.log;
console.error = log.error;

if (!app.requestSingleInstanceLock()) {
	// 限制只可以打开一个应用
	console.log('发现相同实例,已退出.');
	app.quit();
} else {
	app.commandLine.appendSwitch('disable-features', 'WidgetLayering'); // 禁用 WidgetLayering 特性

	log.initialize();

	const appInstance = new Apps();
	(app as any).AppInstance = appInstance;

	// globalThis.Orbit = Orbit;

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	app.whenReady().then(async () => {
		// if (!app.requestSingleInstanceLock()) {																		// 限制只可以打开一个应用
		// 	console.log("发现相同实例,已退出.");
		// 	app.quit();
		// 	return;
		// }

		// app.allowRendererProcessReuse = false;																			// 禁用渲染进程复用

		// Set app user model id for windows
		electronApp.setAppUserModelId('com.electron');

		// Default open or close DevTools by F12 in development
		// and ignore CommandOrControl + R in production.
		// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
		app.on('browser-window-created', (_, window) => {
			optimizer.watchWindowShortcuts(window);
		});

		app.on('second-instance', async (event, commandLine) => {
			// commandLine 是一个数组， 唤醒的链接作为数组的一个元素放在这里面
			event.preventDefault();

			const path = commandLine.pop() ?? '';
			// console.log("second-instance", path, /^[a-z|A-Z]:(\\[^\\])/.test(path));
			if (!/^[a-z|A-Z]:(\\[^\\])/.test(path)) return;

			const stat = await fs.stat(upath.normalize(path));

			if (stat.isFile()) {
				// Orbit.activeWindow(`tools://file://${upath.normalize(path)}`);
			} else if (stat.isDirectory()) {
				appInstance.createBrowserWindow(path);
			}
		});

		appInstance.init();

		// console.log('app ready');

		try {
			// app.commandLine.appendSwitch('ignore-certificate-errors');													// 忽略证书的检测
			// await installExtension(VUEJS_DEVTOOLS);
			// await installExtension({
			// 	id: 'ljjemllljcmogpfapbkkighbhhppjdbg', // vue3拓展id
			// 	electron: '>=1.2.1',
			// });
			// const extensionPath = join('/Users/butcat/Desktop/session_test/extensions/', 'JSONViewer');										// "/Users/butcat/Desktop/session_test/extensions/jsonview"
			// const defaultSession = session.defaultSession;
			// await defaultSession.loadExtension(extensionPath, { allowFileAccess: true });
		} catch (e: any) {
			console.error('Vue 开发者工具安装失败:', e.toString());
		}
	});

	// Quit when all windows are closed, except on macOS. There, it's common
	// for applications and their menu bar to stay active until the user quits
	// explicitly with Cmd + Q.

	app.on('window-all-closed', () => {
		// if (process.platform !== 'darwin') {
		// 	app.quit();
		// }
	});

	// In this file you can include the rest of your app"s specific main process
	// code. You can also put them in separate files and require them here.

	// if (!app.requestSingleInstanceLock()) {																		// 限制只可以打开一个应用
	// 	console.log("发现相同实例,已退出.");
	// 	app.quit();
}

// 捕获全局异常
process.on('uncaughtException', err => {
	console.error(`Caught exception: ${err}`);

	// 已知 node-pty 会在Windows平台抛出`read EPIPE`异常
});
