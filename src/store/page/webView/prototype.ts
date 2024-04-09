import { ref, reactive, toRefs, computed, watch, onMounted, getCurrentInstance } from 'vue';

const hostStyle = `:host { 
	display: block;
	width: 100%;
	height: 100%;
	position: relative;
} 
::slotted(*) { 
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%; 
	opacity: 0; 
	display: block; 
	z-index: 1000; 
} 
::slotted(*) * { 
	display: none 
}

webview { 
	display: block;
	width: 100%;
	height: 100%;
	position: relative;
} 
`;

/**
 * 获取图片的 base64 编码
 * @param imgUrl
 * @returns
 */
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

export interface PageState {
	readonly uuid: string; // 页面uuid
	url: string; // 页面链接
	title: string; // 页面标题
	loading: boolean; // 页面是否正在加载
	zoomFactor: number; // 页面缩放比例
	canGoBack: boolean; // 页面是否可以后退
	canGoForward: boolean; // 页面是否可以前进
	canGoHome: boolean; // 页面是否可以回到主页
	// incognito: boolean; // 页面是否为隐身模式
	// isNewTab: boolean;															// 页面是否为新标签页
	favicon: string; // 页面图标
	// bookmark: IBookmark;														// 页面书签
	// requestedAuth: IAuthInfo; // 页面请求的身份验证
	// requestedPermission: any; // 页面请求的权限
	loding: boolean; // 页面是否正在加载
}

export default abstract class WebView extends HTMLElement {

	static generateUUID() {
		let d = new Date().getTime();
		if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
			d += performance.now(); //use high-precision timer if available
		}
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
		});
	}

	readonly uuid: string = WebView.generateUUID();


	public readonly abstract type: string;

	name: string;

	state = reactive({
		title: '',
		favicon: '',
		playing: false,
		loading: false,
		ended: false,
		controls: true,
		volume: 1,
		muted: false,
		playbackRate: 1,
		seeking: false,
		seekable: 0,
		duration: 0,
		currentTime: 0,
		readyState: 0,
		networkState: 0,
		videoWidth: 0,
		videoHeight: 0,
		autoplay: false,
		loop: false,
		poster: '',
		src: '',
	});

	favicon = '';

	userAgent = '';

	WorkFile = '';

	partition = '';

	readonly #root: ShadowRoot;
	#webview?: Electron.WebviewTag;

	#slot: HTMLSlotElement;

	get webview() {
		return this.#webview;
	}

	get webContentsId() {
		try {
			return this.#webview?.getWebContentsId();
		} catch (error) {
			return null;
		}
	}

	get PageState(): PageState {
		const webview = this.#webview;
		return {
			uuid: this.uuid,
			url: webview?.getURL() || '',
			title: webview?.getTitle() || '',
			loading: webview?.isLoading() || false,
			zoomFactor: webview?.getZoomFactor() || 1,
			canGoBack: webview?.canGoBack() || false,
			canGoForward: webview?.canGoForward() || false,
			canGoHome: webview?.canGoToOffset(0) || false,
			// incognito: webview?.getWebPreferences().partition === 'partition' || false,
			// isNewTab: webview?.getWebPreferences().isNewTab || false,
			favicon: this.favicon ?? '',
			// bookmark: this.bookmark,
			// requestedAuth: this.requestedAuth,
			// requestedPermission: this.requestedPermission,
			loding: webview?.isLoading() || false,
		};
	}

	constructor(readonly url: string) {
		super();

		this.#root = this.attachShadow({ mode: 'closed' });

		const style = document.createElement('style');
		style.innerText = hostStyle;
		this.#root.appendChild(style);

		this.#slot = document.createElement('slot');
		this.#slot.setAttribute('name', 'Controls');
		this.#root.appendChild(this.#slot);

		const remote = require('@electron/remote');
		const win: any = remote.getCurrentWindow() as any;
		const toolsPreload = win.toolsPreload;
		const winPreload = win.winPreload;

		// const partition = '';
		this.partition = win.session.sessionPath as string;

		


		this.name = url.replace(/(.*\/)*([^.]+).*/gi, '$2');
		this.state.title = this.name;
	}

	init(webviewTag?: Electron.WebviewTag) {

		if(webviewTag) {
			this.#init(webviewTag);
			this.#webview = webviewTag;
			return;
		}

		const remote = require('@electron/remote');
		const win: any = remote.getCurrentWindow() as any;
		const toolsPreload = win.toolsPreload;
		const winPreload = win.winPreload;

		// const partition = '';
		this.partition = win.session.sessionPath as string;
		console.log(this.partition, win.session);

		const url = /\$assets:\/\//.test(this.url) ? this.url.replace(/\$assets:\/\/.*/g, '') : this.url;
		this.userAgent = `${window.NAME}/${window.VERSION} tools/${win.uuid} view/${this.uuid}`;

		this.WorkFile = this.url.match(/\$assets:\/\/.*/g)?.[0] || '';
		this.WorkFile = this.WorkFile.replace(/\$assets:\/\//g, 'assets://');
		this.WorkFile = decodeURI(this.WorkFile);

		const webview = document.createElement('webview') as Electron.WebviewTag;
		this.#webview = webview;
		webview.setAttribute('src', url);
		webview.setAttribute('partition', this.partition);
		webview.setAttribute('useragent', this.userAgent);
		webview.setAttribute('nodeintegration', 'true');
		// webview.setAttribute('nodeintegrationinsubframes', 'true');
		webview.setAttribute('preload', `file://${toolsPreload}`);
		webview.style.display = 'inline-flex';
		webview.style.width = '100%';
		webview.style.height = '100%';


		this.#init(webview);
	}

	#init(webview) {

		this.#slot.appendChild(webview);

		this.pageStateUpdate();

		webview.addEventListener('dom-ready', () => {
			webview!.executeJavaScript(`window.BASE_URL = "${this.WorkFile}"`);

			this.pageStateUpdate();

			// webview.setAttribute('src', url);
			// webview.loadURL(this.url);
		});

		webview.addEventListener('page-title-updated', () => {
			this?.stateUpdate();
		});

		webview.addEventListener('did-start-loading', () => {
			this?.stateUpdate();
		});
		webview.addEventListener('did-stop-loading', () => {
			this?.stateUpdate();
		});
		webview.addEventListener('did-finish-load', () => {
			this?.stateUpdate();
		});
		webview.addEventListener('did-fail-load', event => {
			// 页面加载失败
			this?.stateUpdate();

			// webview.loadURL('note://core.page.api/tools/Error/index.html');
		});
		webview.addEventListener('did-fail-provisional-load', () => {
			this?.stateUpdate();
		});
		webview.addEventListener('did-frame-finish-load', () => {
			this?.stateUpdate();
		});
		webview.addEventListener('did-stop-loading', () => {
			this?.stateUpdate();
		});
		webview.addEventListener('did-start-navigation', () => {
			this?.stateUpdate();
		});

		webview.addEventListener('page-favicon-updated', async event => {
			try {
				const faviconUrl = event.favicons[0];
				const favicon_base64 = await this.saveOnPageImages(faviconUrl);
				this.favicon = favicon_base64;
			} catch (error) {
				console.log('获取 favicon 失败', error, event.favicons, event);
			}

			this?.stateUpdate();
		});
	}

	private pageStateUpdate() {
		const remote = require('@electron/remote');
		const win: any = remote.getCurrentWindow() as any;
		const webview = this.#webview;

		win.setPageState({
			uuid: this.uuid,
			webContentsId: this.webContentsId,
			url: this.url,
			// WorkFile: WorkFile,
			partition: this.partition,
			// session: win.session,
			userAgent: this.userAgent,
		});
	}

	public stateUpdate() {
		this.state.src = this.#webview?.getURL() || '';
		this.state.title = this.#webview?.getTitle() || '';
		this.state.favicon = this.favicon;
		this.state.loading = this.#webview?.isLoading() || false;

		this.dispatchEvent(new CustomEvent('stateUpdate', { detail: this.state }));
	}

	public openDevTools() {
		this.#webview?.openDevTools();
	}
	public closeDevTools() {
		this.#webview?.closeDevTools();
	}

	/**
	 *
	 */

	async saveOnPageImages(imgUrl, timeout = 3000): Promise<string> {
		const awaiter = (time = 1000) => new Promise((resolve, reject) => setTimeout(resolve, time));

		return new Promise((resolve, reject) => {
			this.#webview!.executeJavaScript(getBase64Code(imgUrl)).then(dataURL => {
				resolve(dataURL);
			});

			awaiter(timeout).then(() => {
				reject(new Error('超时'));
			});
		});
	}


	/**
	 * 获取页面的 URL
	 * @returns {string}
	 */
	public getURL() {
		return this.#webview?.getURL() || '';
	}


	/**
	 * 关闭页面
	 * @returns {void}
	 */
	public close() {
		this.closeDevTools();
		this.#webview?.remove();
		this.remove();
	}
}
