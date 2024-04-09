import { Notification, dialog } from 'electron';
import contextMenu from './ContextMenu';
import Bookmark from './Bookmark';
import { CreatePageOptions } from '../interface';
import CorePage from '../core';



export default class BrowserPage extends CorePage {
	public bookmark?: Bookmark;

	public menu: any;

	public readonly type = 'BrowserPage';

	public readonly isBrowserPage = true;

	constructor(options: CreatePageOptions) {
		super(options);

	}

	public async initWebView(webContentsId: number): Promise<void> {
		super.initWebView(webContentsId);

		this.bookmark = new Bookmark(this);
		this.menu = new contextMenu(this);

		this.webContents.setWindowOpenHandler(details => {
			switch (details.disposition) {
				// case 'foreground-tab':

				// 	break;
				case 'new-window':
					return {
						action: 'allow',
					};
					break;
					
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
	}

	
}
