import { Notification, dialog, webContents as WebContents } from 'electron';
import contextMenu from './ContextMenu';
// import Bookmark from './Bookmark';
import { CreatePageOptions } from '../interface';
import CorePage from '../core';



export default class BrowserPage extends CorePage {
	// public bookmark?: Bookmark;

	public menu: any;

	public readonly type = 'BrowserPage';

	public readonly isBrowserPage = true;

	constructor(options: CreatePageOptions) {
		super(options);

	}

	public async initWebView(webContentsId: number): Promise<void> {

		super.initWebView(webContentsId);

		const webContent = WebContents.fromId(webContentsId);
		const fetch = this.session.session.fetch;
		// const res = await fetch('https://mikanani.me/RSS/Bangumi?bangumiId=3320&subgroupid=615');
		const res = await fetch(webContent!.getURL());
		// const text = await res.text();


		if(/application\/xm/.test(res.headers.get('Content-Type') || '')) {
			this.window.send('new-page', `apps://core.page.api/tools/rss/index.html?url=${webContent!.getURL()}`);
			this.destroy();
			return;
		}

		console.log('initWebView: ', res.headers.get('Content-Type'));


		// super.initWebView(webContentsId);

		// this.bookmark = new Bookmark(this);
		this.menu = new contextMenu(this);
	}

	
}
