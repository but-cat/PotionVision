import { app, shell, Menu, Tray, nativeImage, screen, clipboard, dialog } from 'electron';
import fs from "node:fs/promises";
import path, { join, resolve } from "node:path";
import upath from "upath";
import EventTarget from "events";


import logo from '@root/public/logo.png?asset';
import logo_ico from '@root/public/favicon.ico?asset';


import BrowserWindow from "./Browser/index";																						// 浏览器窗口
import Session, {  } from "./Session/index";


process.env.DIST_ELECTRON = path.join(__dirname, '..') as string;
process.env.DIST = path.join(process.env.DIST_ELECTRON, '../') as string;
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST_ELECTRON, '../public') as string;

export default class Apps extends EventTarget {

	static readonly instance = new Apps;																						// 单例

	public session?: Session;

	public mainWindow: any;
	// public articleWindow: any;
	public ReviewWindow: any;
	public EditorWindow: any;
	public SettingsWindow: any;

	public GeometryEditorWindow: any;


	public readonly SessionMap: Map<string, Session> = new Map([
		// ['', Session.defaultSession]
	]);

	public static readonly AppDataPath = upath.normalize(app.isPackaged ? join(app.getPath('appData'), app.name) : resolve(app.getAppPath()));

	

	public activeBrowserWindow?: BrowserWindow;
	public readonly BrowserWindow: Map<string, BrowserWindow> = new Map;
	
	public get pageListUUID() {
		// return [...this.BrowserPage].map(([uuid, page]) => page.uuid);
		return [];
	}

	private tray?: Tray;

	public get isMac() {
		return process.platform === 'darwin';
	}

	public get userPath() {
		return app.getPath('userData').replace(/\\/g, '/');												// 用户目录
	}

	public get ToolsPath() {
		return upath.join(app.getPath('appData'), app.name, 'tools');
	}

	private contextMenu: any = [

		{
			label: '新建独立浏览器窗口',
			// icon: icon.settings,
			enabled: true,													// 是否点击
			click: async () => {
				const projectDirectory = await dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory', 'promptToCreate', 'dontAddToRecent'] });
				if (projectDirectory.canceled) return;
				const path = projectDirectory.filePaths[0];

				console.log("新建项目窗口", path);
				
				this.createBrowserWindow(path);
			}
		},


		{
			label: '打开工具目录',
			// icon: icon.settings,
			enabled: true,													// 是否点击
			click: async () => {
				const toolsPath = path.normalize(path.join(app.getPath('appData'), app.name, 'tools'));
				// const toolsPath = path.normalize(path.join(app.getPath('appData'), app.name));
				// console.log("toolsPath", toolsPath, app.getGlobal("name"));
				shell.showItemInFolder(toolsPath);
			}
		},
	];

	constructor() {
		if(Apps.instance) return Apps.instance;
		super();


	}


	createMainWindow() {
		return;
	}


	public init() {
		try {
			if (this.isMac) this.MacInit();
			else this.WindowsInit();


			const videoPath = upath.normalize(app.getPath('videos') ?? '');
			const path = upath.normalize(videoPath);
			this.session = new Session(path, this);


			this.toolsInit();

			this.createBrowserWindow();

		} catch (e: any) {
			dialog.showMessageBox({
				type: 'warning',
				title: '错误',
				message: e.message,
				buttons: ['确定'],
			}).then(() => {
				app.exit();
			});
		}
	}


	/**
	 * 初始化工具目录
	 */
	async toolsInit() {
		try {
			await fs.access(this.ToolsPath);
		} catch (error) {
			await fs.mkdir(this.ToolsPath, { recursive: true });
		}
	}

	private async MacInit() {
		// app.dock.setBadge("1");

		app.dock.setIcon(logo);
		const menu = Menu.buildFromTemplate(this.contextMenu);
		app.dock.setMenu(menu);

		app.on('activate', this.createMainWindow.bind(this));															// 在macOS上，通常会在单击停靠图标且没有其他窗口打开时在应用程序中重新创建一个窗口。


		app.on('open-file', async (event: any, path: any) => {																	// 当用户想要在应用中打开一个文件时发出。 open-file 事件通常在应用已经打开，并且系统要再次使用该应用打开文件时发出。 open-file也会在一个文件被拖到 dock 并且还没有运行的时候发出。
			console.log('open-file', event, path);

		});



		// logo

	}

	private async WindowsInit() {
		const image = nativeImage.createFromPath(logo_ico);

		const name = app.name;
		this.tray = new Tray(image);

		this.tray.setToolTip(name);
		const menu = Menu.buildFromTemplate([
			...this.contextMenu,
			{ type: 'separator' },
			{
				label: "退出 ",
				// icon: icon.close,
				role: "quit"
			}
		]);
		this.tray.setContextMenu(menu);

		this.tray.on('click', this.createMainWindow.bind(this));
	}


	createBrowserWindow(pathStr: string = '') {

		
		// const path = upath.normalize(pathStr);
		// const session = this.SessionMap.has(path) ? this.SessionMap.get(path) : new Session(path, this);
		// if(!this.SessionMap.has(path)) this.SessionMap.set(path, session!);

		// return;
		
		const window = new BrowserWindow(this, {
			width: 1680,
			minWidth: 950,
			height: 920,
			minHeight: 750,
			frame: false,
			fullscreen: false,

			show: true,
			skip: true,																		// 是否在任务栏中显示

			// meta: arg

			// session: path ? new Session(path) : Session.defaultSession,
			session: this.session!,
		});

		this.BrowserWindow.set(window.uuid, window);
		return window.uuid;
	}



}