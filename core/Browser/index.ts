import { app, BrowserWindow, ipcMain, dialog, nativeTheme, nativeImage } from 'electron';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';

import Orbit from "../apps";
// import BrowserPage from "../Page/BrowserPage";
import packageConfig from '@root/package.json';
// import logo_ico from '@root/resources/logo.ico?asset';

// import fs from "fs";
import path, { join } from "upath";
// import upath from "upath";
import createUUID from "../utils/uuid";



// import CoreComponents from "./CoreComponents";
// import EdgeBar from "./EdgeBar";

import Session from "../Session/index";


// import logo from '@root/public/logo.png?asset';
import logo_ico from '@root/public/favicon.ico?asset';



interface dragOptions {
	file: string;
	files: string[];
	icon: string; // 图标 dataURL
}

/**
 * 
 * @param { String } page 页面路径
 * @param { Object } config 窗口配置
 */
export default class Project extends BrowserWindow {

	public readonly uuid: string = createUUID();

	public static get isMac() {
		return process.platform === 'darwin';
	}

	public static get isDev() {
		return is.dev;
	}


	static get appTitle() {
		return packageConfig.name.slice(0,1).toUpperCase() + packageConfig.name.slice(1).toLowerCase();
	}

	public readonly orbit: Orbit;


	// public readonly view: CoreComponents;

	public readonly projectPath: string;

	
	public session: Session;

	

	public readonly EffectiveAppearance = "dark";																					// 暗色模式
	public readonly MultiplePage: boolean = false;																					// 是否分屏



	public get themeSource() {
		return nativeTheme.themeSource;
	}
	public set themeSource(value) {
		if(['light', 'dark', 'system'].includes(value)) nativeTheme.themeSource = value;

		if(!Project.isMac) this.setTitleBarOverlay({
			// color: !nativeTheme.shouldUseDarkColors ? '#ffffff' : '#000000',
			symbolColor: nativeTheme.shouldUseDarkColors ? '#ffffff' : '#000000',
			color: '#00000000',
			height: 32
		});
	}



	BrowserPosition = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	}



	constructor(orbit: Orbit, config: any = {}) {
		// console.log('BrowserWindow', 'constructor', config.session);

		const titleBar = Project.isMac ? {
			titleBarStyle: "hiddenInset"
		} : {
			titleBarStyle: 'hidden',
			titleBarOverlay: {
				// color: nativeTheme.shouldUseDarkColors ? '#ffffff' : '#000000',
				symbolColor: nativeTheme.shouldUseDarkColors ? '#ffffff' : '#000000',
				color: '#00000000',
				height: 32
			},
		} as any;
		
		super({
			x: config.x,																						// 
			y: config.y,																						// 
			width: config.width || 800,																			// 
			height: config.height || 600,
			minWidth: config.minWidth || 0,
			minHeight: config.minHeight || 0,
			maxWidth: config.maxWidth || 0,
			maxHeight: config.maxHeight || 0,

			show: config?.show ?? true,																			// 开启时是否显示
			frame: Project.isMac,																				// 窗口边框
			// fullscreen: config?.fullscreen ?? false,															// 窗口是否全屏
			// fullscreenable: config.fullscreen ?? false,															// 窗口是否可以进入全屏状态.
			// maximizable: config?.fullscreen ?? true,															// 窗口是否可最大化。
			transparent: config?.transparent ?? false,															// 窗口是否透明
			thickFrame: config?.thickFrame ?? true,																// 对 Windows 上的无框窗口使用WS_THICKFRAME 样式，会增加标准窗口框架。 设置为 false 时将移除窗口的阴影和动画. 
			// icon: appIcon,
			// titleBarStyle: "hiddenInset",
			...titleBar,

			autoHideMenuBar: true,

			title: config.title || Project.appTitle,

			webPreferences: {
				plugins: true,																					// 是否应启用插件
				webSecurity: false,																				// 网络安全 是否启用同源策略 (通常用来测试网站)
				nodeIntegration: true,																			// 启动 node 模块
				// nodeIntegrationInSubFrames: true,																// 是否在子框架中启用了 Node 集成
				// partition: "persist:orbit",
				// nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
				// Use pluginOptions.nodeIntegration, leave this alone See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
				// enableRemoteModule: true,																		// 启用远程模块
				// offscreen: true,																				// 是否启用离屏渲染

				/* 功能 */
				// devTools: !app.isPackaged,																		// 控制台
				devTools: true,																					// 控制台
				webviewTag: true,																				// 	启动 webview 内置元素


				/* 安全性 */

				/**
				 * 安全性
				 * 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本. 
				 * Electron API 仅在 preload 脚本中有效，而不是加载的页面。 在加载可能不受信任的远程内容时, 应使用此选项, 以确保加载的内容不能篡改 preload 脚本和使用的 Electron APIs。
				 * preload脚本的运行环境仍然可以访问document 和 window全局变量，但它将使用自己内置的函数 (如Array, Object, JSON等)，并且将被加载的页面与对全局环境所做的任何更改隔离开来. 
				 */
				contextIsolation: false,
				// preload: path.join(__static, 'preload/preload.js')




				/* 沙盒 */
				session: config.session.session,
			},

			// vibrancy: '#222222aa',
		});

		require('@electron/remote/main').enable(this.webContents);													// 启用远程模块

		const { webContents } = this;




		const setTitleBarOverlay = () => {
			this.setTitleBarOverlay({
				// color: !nativeTheme.shouldUseDarkColors ? '#ffffff' : '#000000',
				symbolColor: nativeTheme.shouldUseDarkColors ? '#ffffff' : '#000000',
				color: '#00000000',
				height: 32
			});
		}
		if(!Project.isMac) nativeTheme.on('updated', setTitleBarOverlay);
		this.on('close', () => {
			nativeTheme.removeListener('updated', setTitleBarOverlay);
		});

		
		


		// 创建主窗口.
		if (Project.isDev && process.env['ELECTRON_RENDERER_URL']) {
			webContents.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/src/index.html`, {
				httpReferrer: '',
			});
			webContents.openDevTools();
		} else {
			webContents.loadFile(join(__dirname, '../renderer/src/index.html'));
		}

		if(!Project.isMac) this.setIcon(logo_ico);



		this.session = config.session;


		this.orbit = orbit;
		this.projectPath = config.projectPath;

		
		webContents.setWindowOpenHandler(details => {
			switch (details.disposition) {
				// case 'foreground-tab':
				// 	break;

				// case 'new-window':
				// 	return {
				// 		action: 'allow'							// 'allow' | 'deny' | 'default'
				// 	};
				// 	break;

				// case 'background-tab':
				// 	break;

				default:
					// event.preventDefault();
					console.log('new-page', details.url);

					this.send('new-page', details.url);

					return {
						action: 'deny', // 'allow' | 'deny' | 'default'
					};
					break;
			}
		});

	}



	public fixDragging() {
		const bounds = this.getBounds();
		this.setBounds({ height: this.BrowserPosition.height + 1, });
		this.setBounds(bounds);
	}

	/**
	 * 向页面中发送消息
	 * @param channel 
	 * @param args 
	 */
	public send(channel: string, ...args: any[]) {
		try {
			this.webContents?.send(channel, ...args);
		} catch (error: any) {
			console.error('Project.send 窗口发送消息失败',  error.message, args);
		}
	}

	


	public dragstart(options: dragOptions) {
		// console.log("dragstart", logo, options);

		if (!options.icon || !options.file) return;
		const icon = nativeImage.createFromDataURL(options.icon);

		this.webContents.startDrag({
			file: options.file,
			icon,
		});
	}
	
}

type Filter = {
	name: string;
	extensions: string[];
};

export const BrowserWindowInstance = undefined;