import { ref, reactive, toRefs, computed, watch, onMounted, getCurrentInstance } from 'vue';
import PrototypeView from './prototype';




export default class WebView extends PrototypeView {

	public readonly type = "web"


	// constructor(readonly url: string) {
	// 	super();
	// }

	init() {
		const remote = require('@electron/remote');
		const win: any = remote.getCurrentWindow() as any;
		// const toolsPreload = win.toolsPreload;
		// const winPreload = win.winPreload;

		// const partition = '';
		this.partition = win.session.sessionPath as string;
		console.log(this.partition, win.session);

		
		this.userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0`;

		// this.WorkFile = this.url.match(/\$assets:\/\/.*/g)?.[0] || '';
		// this.WorkFile = this.WorkFile.replace(/\$assets:\/\//g, 'assets://');
		// this.WorkFile = decodeURI(this.WorkFile);

		const webview = document.createElement('webview') as Electron.WebviewTag;
		webview.setAttribute('src', this.url);
		webview.setAttribute('partition', this.partition);
		webview.setAttribute('useragent', this.userAgent);
		webview.setAttribute('allowpopups', 'true');
		// webview.setAttribute('nodeintegration', 'true');
		// webview.setAttribute('nodeintegrationinsubframes', 'true');
		// webview.setAttribute('preload', `file://${toolsPreload}`);
		webview.style.display = 'inline-flex';
		webview.style.width = '100%';
		webview.style.height = '100%';

		super.init(webview);
	}

	
	
}

customElements.define('web-view', WebView);
