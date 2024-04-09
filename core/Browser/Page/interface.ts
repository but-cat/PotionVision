import BrowserWindow from "../index";

export interface IAuthInfo {
	url: string;
}

export interface CreatePageOptions {

	readonly webContentsId: number,

	url: string,
	window: BrowserWindow,
	incognito?: boolean,
	isNewTab?: boolean,
	windowId?: number,

	sandbox?: boolean,// 是否启用沙箱



	plugins?: boolean,//是否启用插件
	enableRemoteModule?: boolean,// 是否启用远程模块
	nodeIntegration?: boolean,// 是否启用node集成
	webSecurity?: boolean,// 是否启用web安全
	allowRunningInsecureContent?: boolean,// 是否允许运行不安全的内容
	
	preload?: string,// 预加载脚本
	webviewTag?: boolean,// 是否启用webview标签
	enableWebSQL?: boolean,// 是否启用webSQL
	enableBlinkFeatures?: string,// 是否启用blink特性

	pty?: boolean,// 是否启用pty

	/**
	 * 是否启用上下文隔离
	 * 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本. 
	 * Electron API 仅在 preload 脚本中有效，而不是加载的页面。 在加载可能不受信任的远程内容时, 应使用此选项, 以确保加载的内容不能篡改 preload 脚本和使用的 Electron APIs。
	 * preload脚本的运行环境仍然可以访问document 和 window全局变量，但它将使用自己内置的函数 (如Array, Object, JSON等)，并且将被加载的页面与对全局环境所做的任何更改隔离开来. 
	 */
	 contextIsolation?: boolean,// 是否启用上下文隔离

	[key: string]: any,




	
}



export interface PageState {
	readonly uuid: string;														// 页面uuid
	url: string;																// 页面链接
	title: string;																// 页面标题
	loading: boolean;															// 页面是否正在加载
	zoomFactor: number;															// 页面缩放比例
	canGoBack: boolean;															// 页面是否可以后退
	canGoForward: boolean;														// 页面是否可以前进
	// canGoHome: boolean;															// 页面是否可以回到主页
	incognito: boolean;															// 页面是否为隐身模式
	isNewTab: boolean;															// 页面是否为新标签页
	favicon: string;															// 页面图标
	// bookmark: IBookmark;														// 页面书签
	// requestedAuth: IAuthInfo;													// 页面请求的身份验证
	requestedPermission: any;													// 页面请求的权限
	loding: boolean;															// 页面是否正在加载
}



export const ERROR_PROTOCOL = "";
export const NETWORK_ERROR_HOST = "network-error";
export const WEBUI_BASE_URL = "app://./";

export const ZOOM_FACTOR_MIN = 0.2;
export const ZOOM_FACTOR_MAX = 5;
export const ZOOM_FACTOR_INCREMENT = 0.2;

export const NEWTAB_URL = 'app://./newtab.html';
export const HOMEPAGE_URL = 'app://./homepage.html';


export interface TabEvent {
	readonly type: string;
	readonly tabId: number;
	readonly windowId: number;
}