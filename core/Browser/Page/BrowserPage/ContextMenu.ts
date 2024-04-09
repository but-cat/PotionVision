import { BrowserView, app, ipcMain, Menu, MenuItem, clipboard } from 'electron';
import { parse as parseUrl } from 'url';

import BrowserPage from ".";

export default class {
	menu = Menu.buildFromTemplate([
		{
			label: '在新标签页中打开链接',
			// sublabel: 'url',
			// icon: icon.settings,
			enabled: true,													// 是否点击
			click: async () => {
				// console.log('浏览器', this.linkURL);
				if(this.linkURL) this.pageView.newPage(this.linkURL);
			}
		},
		{
			label: '复制链接',
			// sublabel: 'url',
			// icon: icon.settings,
			enabled: true,													// 是否点击
			click: async () => {
				// console.log('浏览器', this.linkURL);
				if(this.linkURL) clipboard.writeText(this.linkURL);
			}
		},
		{
			label: '预览图片',
			// sublabel: 'url',
			// icon: icon.settings,
			enabled: true,													// 是否点击
			click: async () => {
				// console.log('浏览器', this.linkURL);
				
				// if(this.params.mediaType === 'image' && this.params.srcURL) {
				// 	this.pageView.newPage('explorer://'+this.params.srcURL);
				// }
			}
		},

		{
			label: '保存页面',
			// sublabel: 'url',
			// icon: icon.settings,
			enabled: true,													// 是否点击
			click: async () => {
				// console.log('浏览器', this.linkURL);
				
				this.pageView.savePage();
			}
		},

		{ type: 'separator' },
		{
			label: '剪切',
			enabled: true,													// 是否点击
			click: async () => {
				const target = this.pageView.webContents;
				target.cut();
			}
		},
		{
			label: '复制',
			enabled: true,													// 是否点击
			click: async () => {
				clipboard.writeText(this.selectionText);
			}
		},
		{
			label: '粘贴',
			enabled: true,													// 是否点击
			click: async () => {
				const target = this.pageView.webContents;
				target.paste();
			}
		},
		{
			label: '全选',
			enabled: true,													// 是否点击
			click: async () => {
				const target = this.pageView.webContents;
				target.selectAll();
			}
		},
		{ type: 'separator' },
		{
			label: '刷新',
			enabled: true,													// 是否点击
			click: async () => {
				this.pageView.reload();
			}
		},
		{
			label: '后退',
			enabled: true,													// 是否点击
			click: async () => {
				this.pageView.webContents.goBack();
			}
		},
		{
			label: '前进',
			enabled: true,													// 是否点击
			click: async () => {
				this.pageView.webContents.goForward();
			}
		},
		{ type: 'separator' },
		{
			label: '启动开发者工具',
			enabled: true,													// 是否点击
			click: async () => {
				this.pageView.openDevTools();
			}
		},
		{
			label: '关闭',
			enabled: true,													// 是否点击
			click: async () => {
				this.pageView.close();
			}
		},
	]);


	private selectionText = '';
	private linkURL = '';
	private params: any;

	// private view: BrowserPage;

	
	constructor(private pageView: BrowserPage) {
		// super();

		// this.view = view;


		this.pageView.webContents.on('context-menu', (event, params) => {
			// console.log('context-menu', params);
			this.linkURL = params.linkURL;
			this.selectionText = params.selectionText;

			this.params = params;

			// this.menu.items[0].sublabel = params.linkURL;
			this.menu.items[0].enabled = !!params.linkURL;
			this.menu.items[1].enabled = !!params.linkURL;
			this.menu.items[2].enabled = !!params.linkURL;


			

			this.menu.popup();
		});
	}
	
}