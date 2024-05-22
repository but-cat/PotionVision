import { app, screen, protocol, ipcMain } from "electron";
import packageConfig from '@root/package.json';
import path from "path";

import BrowserPage from "./BrowserPage";

import ProjectWindow from "../index";

import { CreatePageOptions } from "./interface";


export default class ComponentsPool extends Map<string, BrowserPage> {

	
	public createBrowserComponents(options: CreatePageOptions) {
		const page = new BrowserPage(options);
		this.set(page.uuid, page);
		return page;
	}



	constructor(readonly window: ProjectWindow) {
		super();

		this.init();
	}


	init() {
		// 预加载脚本 - 获取页面状态
		ipcMain.handle(`PagePool-${this.window.uuid}:getPageState`, (event, uuid: string) => {
			const page = this.get(uuid);
			if(!page) return;
			return page.PageState;
		});


		ipcMain.handle(`PagePool-${this.window.uuid}:getSessionPartition`, (event, uuid: string) => {
			const page = this.get(uuid);
			if(!page) return;

			return page.session.sessionPath;
		});
	}


	public setDefaultProtocol() {
		const agreement = 'orbit' // 自定义协议名
		let isSet = false // 是否注册成功

		app.removeAsDefaultProtocolClient(agreement) // 每次运行都删除自定义协议 然后再重新注册
		// 开发模式下在window运行需要做兼容
		if (process.env.NODE_ENV === 'development' && process.platform === 'win32') {
			// 设置electron.exe 和 app的路径
			isSet = app.setAsDefaultProtocolClient(agreement, process.execPath, [
				path.resolve(process.argv[1]),
			])
		} else {
			isSet = app.setAsDefaultProtocolClient(agreement)
		}
		console.log('是否注册成功', isSet)
	}





	public createPage(options: CreatePageOptions) {
		const { url } = options;
		// const url = "orbit://dsds.local:233/touch/index.html?game=AB01";
		const reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/);
		const [domain, scheme, host, port] = url.match(reg) ?? [];													// 域名, 协议, 主机/应用名, 端口

		console.log('PagePool', 'createPage', url, scheme, host, port);
		

		switch (scheme) {
			case 'http':
			case 'https':
			default:
				return this.createBrowserComponents(options);
				break;
			
				// return this.createBrowserComponents(options);
				// break;
		}
	}



	setPageState(options: CreatePageOptions) {
		if(this.has(options.uuid)) {
			const page = this.get(options.uuid)!;
			page.setState(options);
		} else {
			return this.createPage(options);
		}
	}


	// delete(uuid: string) {
	// 	const page = this.get(uuid);
	// 	if(page) {
	// 		// page.destroy();
	// 		return super.delete(uuid);
	// 	} else {
	// 		return false;
	// 	}
	// }



	uninstall() {
		[...this.entries()].forEach(([uuid, page]) => {

			page.destroy();
			this.delete(uuid);
		
		});
	}
}


export * from "./BrowserPage";

export {
	BrowserPage,																								// 浏览器页面,用于访问常规(http | https)网页
}