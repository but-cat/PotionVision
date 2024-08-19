import { BrowserView, app, webContents as WebContents, ipcMain, Menu, MenuItem, clipboard, MessageChannelMain } from 'electron';
import { is } from '@electron-toolkit/utils';
import { parse as parseUrl } from 'url';

import BrowserWindow from "../index";
// import ProjectWindow from "../Project";

// import contextMenu from './contextMenu';

import Apps from "../../apps";

import {
	ERROR_PROTOCOL, NETWORK_ERROR_HOST, WEBUI_BASE_URL,
	ZOOM_FACTOR_MIN, ZOOM_FACTOR_MAX, ZOOM_FACTOR_INCREMENT,
	NEWTAB_URL, HOMEPAGE_URL,
} from './interface';

import {
	TabEvent, 
} from "./interface";



import { IAuthInfo, CreatePageOptions, PageState } from "./interface";



import createUUID from "../../utils/uuid";
import Session from '../../Session/index';

import ComponentsPool from "./index";



const getBase64Code = imgUrl => `(async function getBase64(imgUrl) { 
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("get", imgUrl, true);
		xhr.responseType = "blob";
		xhr.onload = function () {
			if (this.status == 200) {
				var blob = this.response;
				let oFileReader = new FileReader();
				oFileReader.onloadend = function (e) {
					resolve(e.target.result ?? '');
				};
				oFileReader.readAsDataURL(blob);
			}
		}
		xhr.send();
	});
})("${imgUrl}")`;



export default class CorePage {


	public static get isMac() {
		return process.platform === 'darwin';
	}

	public static get isDev() {
		return is.dev;
	}

	public zIndex = 0;


	get PageState(): PageState {
		if(this.webContents) return {
			uuid: this.uuid,
			url: this.url,
			title: this.title,
			loading: this.webContents.isLoading(),
			zoomFactor: this.webContents.getZoomFactor(),
			canGoBack: this.webContents.canGoBack(),
			canGoForward: this.webContents.canGoForward(),
			// canGoHome: this.webContents.getURL() !== this.homeUrl,
			incognito: this.incognito,
			isNewTab: this.isNewTab,
			favicon: this.favicon,
			// bookmark: this.bookmark,
			// requestedAuth: this.requestedAuth,
			requestedPermission: this.requestedPermission,
			loding: this.webContents.isLoading(),
		}
		else return {
			uuid: this.uuid,
			url: '',
			title: '',
			loading: false,
			zoomFactor: 1,
			canGoBack: false,
			canGoForward: false,
			// canGoHome: this.webContents.getURL() !== this.homeUrl,
			incognito: this.incognito,
			isNewTab: this.isNewTab,
			favicon: '',
			// bookmark: this.bookmark,
			// requestedAuth: this.requestedAuth,
			requestedPermission: this.requestedPermission,
			loding: false,
		
		}
	};

	// public readonly id: string = Math.random().toString();

	// public readonly uuid: string = createUUID();
	public readonly uuid: string;

	public isNewTab = false;
	// public homeUrl: string;
	public favicon: string = '';
	public incognito = false;

	public errorURL = '';

	protected hasError = false;

	public view?: BrowserView;
	protected readonly apps: Apps;
	private _window: BrowserWindow;
	public get window() {
		return this._window;
	}
	public set window(value: BrowserWindow) {
		// if (this._window) {
		// 	this._window.removeListener('closed', this.onWindowFocus);
		// }
		const uninstall = this.uninstall.bind(this);
		this._window.removeListener('closed', uninstall);															// 移除关闭事件
		value.on('closed', uninstall);																				// 添加关闭事件
		this._window = value;
	}
	

	/**
	 * @deprecated 页面是否已加载
	 */
	public bounds: any;

	// public bookmark: IBookmark;

	// public requestedAuth: IAuthInfo;
	public requestedPermission: any;


	/**
	 * 页面是否已加载
	 */
	protected lastUrl = '';

	public readonly session: Session;

	public readonly PagePool: ComponentsPool;

	// public userAgent: string;


	// public menu: contextMenu;


	public get url() {
		return this.webContents.getURL();
	}

	public get title() {
		return this.webContents.getTitle();
	}

	public get ContentId() {
		return this.webContents.id;
	}

	// public get webContents() {
	// 	return this.view!.webContents;
	// }
	public webContents: Electron.WebContents = undefined as unknown as Electron.WebContents;

	// public static init() {}


	public constructor(private options: CreatePageOptions) {
		this.apps = options.apps;
		// this.apps = (app as any).Orbit as Orbit;
		this._window = options.window;
		this.window = options.window;
		this.incognito = options.incognito || false;
		this.session = options?.window.session;
		this.PagePool = options.PagePool;
		// console.log(options.partition, options.session?.session);


		this.uuid = options.uuid;



		console.log("---------------------");
		
		
		
	}


	public async init() {
		const { options } = this;
	}


	public async initWebView(webContentsId: number) {
		// const { options } = this;

		const webContent = WebContents.fromId(webContentsId);
		this.webContents = webContent!;

		if(!webContent) throw new Error('webContent 不存在');

		


		// webContent.setWindowOpenHandler(details => {
		// 	switch (details.disposition) {
		// 		default:
		// 			console.log('new-page', details.url);
		// 			this.send('new-page', details.url);
		// 			return {
		// 				action: 'deny', // 'allow' | 'deny' | 'default'
		// 			};
		// 			break;
		// 	}
		// });

		this.webContents!.setWindowOpenHandler(details => {
			switch (details.disposition) {
				// case 'foreground-tab':

				// 	break;
				// case 'new-window':
				// 	return {
				// 		action: 'allow',
				// 	};
				// 	break;
					
				default:
					console.log('new-page', details.url);

					this.window.send('new-page', details.url);
					// this?.stateUpdate();

					return {
						action: 'deny',
					};
					break;
			}
		});


		
		this.webContents.on('page-title-updated', () => {
			this?.stateUpdate();
		});
		
		this.webContents.on('did-start-loading', () => {
			this?.stateUpdate();
		});
		this.webContents.on('did-stop-loading', () => {
			this?.stateUpdate();
		});
		this.webContents.on('did-finish-load', (event) => {
			this?.stateUpdate();
		});
		this.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL, isMainFrame, frameProcessId, frameRoutingId) => {																	// 页面加载失败
			this?.stateUpdate();

			// this.webContents.loadURL('youfo://core.page.api/tools/Error/index.html');
		});
		this.webContents.on('did-fail-provisional-load', () => {
			this?.stateUpdate();
		});
		this.webContents.on('did-frame-finish-load', () => {
			this?.stateUpdate();
		});
		this.webContents.on('did-stop-loading', () => {
			this?.stateUpdate();
		});
		this.webContents.on('did-start-navigation', () => {
			this?.stateUpdate();
		});
		// this.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
		// 	if (isMainFrame) {
		// 		this.hasError = true;
		// 		this.errorURL = validatedURL;
		// 		this.webContents.loadURL(ERROR_PROTOCOL + '://' + NETWORK_ERROR_HOST);
		// 	}
		// });
		this.webContents.on('page-favicon-updated', async (event, favicons) => {
			
			
			try {
				const faviconUrl = favicons[0];
				const favicon_base64 = await this.saveOnPageImages(faviconUrl);
				this.favicon = favicon_base64;
			} catch (error) {
				console.log('获取 favicon 失败', error);
			}
			
			this?.stateUpdate();
		});
		this.webContents.on('did-navigate', (event, url) => {
			// this.lastUrl = url;
			// this.send('url', url);
		});

		this.webContents.on('destroyed', () => {
			console.log('destroyed', this.uuid);
			this.PagePool.delete(this.uuid);
		});


		this?.stateUpdate();
	}


	setState(options) {
		this.options = options;
		if(options.webContentsId) {
			this.initWebView(options.webContentsId);
		}
	}

	public stateUpdate() {
		try {
			this?.window?.send('state-update', this.PageState);
		} catch (error) {
			console.log(error);
		}
	}


	public uninstall() {
		this.PagePool.delete(this.uuid);
		(this.webContents as any)?.destroy();

		// console.log('destroy page', this.uuid);
	}

	public updateURL = (url: string) => {
		if (this.lastUrl === url) return;
		this.emitEvent('url-updated', this.hasError ? this.errorURL : url);

		this.lastUrl = url;
		this.isNewTab = url.startsWith(NEWTAB_URL);
	};

	public send(channel: string, ...args: any[]) {
		this.webContents?.send(channel, ...args);
	}

	public get hostname() {
		return parseUrl(this.url).hostname;
	}

	public emitEvent(event: TabEvent, ...args: any[]) {
		// this.window.send('tab-event', event, this.id, args);
	}


	public get isDevToolsOpened() {
		return this.webContents?.isDevToolsOpened();
	}

	public openDevTools() {
		this.webContents?.openDevTools();
	}
	public closeDevTools() {
		this.webContents?.closeDevTools();
	}

	public loadUrl(url: string) {
		this.webContents?.loadURL(url);
	}

	public reload() {
		this.webContents?.reload();
	}
	public back() {
		this.webContents?.goBack();
	}
	public forward() {
		this.webContents?.goForward();
	}


	
	public close() {
		this.window?.send('close-page', this.uuid);
	}
	public newPage(url: string) {
		this.window?.send('new-page', url);
	}







	/**
	 * 获取页面截图
	 * @returns { Promise<string> } 返回base64格式的图片
	 */
	async capturePage(): Promise<string | undefined> {
		if(!this.webContents) throw new Error('webContents 不存在');
		try {
			const image = await this.webContents.capturePage();
			const dataURL = image.toDataURL();
			return dataURL;
		} catch (error) {
			console.log('capturePage', error);
		}
		return Promise.resolve(undefined);
	}




	/**
	 * 
	 */

	async saveOnPageImages(imgUrl, timeout = 3000): Promise<string>{
		if(!this.webContents) throw new Error('webContents 不存在');

		const awaiter = (time = 1000) => new Promise((resolve, reject) => setTimeout(resolve, time));

		return new Promise((resolve, reject) => {
			this.webContents.executeJavaScript(getBase64Code(imgUrl)).then(dataURL => {
				resolve(dataURL);
			});

			awaiter(timeout).then(() => {
				reject(new Error('超时'));
			});
		});
	}




	destroy() {
		// this.webContents.destroy();
		this.window?.send('close-page', this.uuid);
		this.PagePool.delete(this.uuid);

		// this.webContents?.executeJavaScript('(function(w) { w.close() })(window);');
	}
}
