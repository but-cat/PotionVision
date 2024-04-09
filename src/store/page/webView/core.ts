import { ref, reactive, toRefs, computed, watch, onMounted, getCurrentInstance } from 'vue';
import PrototypeView from './prototype';




export default class CoreView extends PrototypeView {

	public readonly type = "core"


	// constructor(readonly url: string) {
	// 	super();
	// }

	// init() {
	// 	super.init();
	// }

	init() {
		const remote = require('@electron/remote');
		const win: any = remote.getCurrentWindow() as any;
		// const corePreload = win.toolsPreload;
		const corePreload = win.corePreload;
		// const winPreload = win.winPreload;

		// const partition = '';
		this.partition = win.session.sessionPath as string;
		console.log(this.partition, win.session);

		
		const url = /\$assets:\/\//.test(this.url) ? this.url.replace(/\$assets:\/\/.*/g, '') : this.url;
		this.userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0`;

		// this.WorkFile = this.url.match(/\$assets:\/\/.*/g)?.[0] || '';
		// this.WorkFile = this.WorkFile.replace(/\$assets:\/\//g, 'assets://');
		// this.WorkFile = decodeURI(this.WorkFile);

		const webview = document.createElement('webview') as Electron.WebviewTag;
		webview.setAttribute('src', url);
		webview.setAttribute('partition', this.partition);
		webview.setAttribute('useragent', this.userAgent);
		webview.setAttribute('allowpopups', 'true');
		webview.setAttribute('nodeintegration', 'true');
		webview.setAttribute('nodeintegrationinsubframes', 'true');
		webview.setAttribute('disablewebsecurity', 'true');
		// webview.setAttribute('disablewebsecurity', 'true');
		webview.setAttribute('preload', `file://${corePreload}`);
		webview.style.display = 'inline-flex';
		webview.style.width = '100%';
		webview.style.height = '100%';

		super.init(webview);
	}
	
}

customElements.define('core-view', CoreView);
