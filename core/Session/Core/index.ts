import Electron, { app, dialog, net, Privileges } from 'electron';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import packageConfig from "@root/package.json";

import upath from 'upath';

import { scheme, partition, AppAssetsPath } from './utils/config';
import Session from '../../Session/index';
import Prototype from '../../Session/utils/prototype';
import Context, {  } from "../../Session/utils/context/index";

import Page from "./Page/index";
import Assets from "./Assets/index";
import Download from "./Download/index";
import Setting from "./Setting/index";


export default class Core extends Prototype {

	public static get isDev() {
		return is.dev;
	}


	static readonly scheme = scheme; // 协议名
	static readonly partition = partition; // 分区名


	static readonly privileges: Privileges = {
		bypassCSP: true,																		// 是否绕过 Content-Security-Policy 的限制 默认为false
		standard: true,																			// 是否标准	默认为false
		secure: true,																			// 是否安全 默认为false
		supportFetchAPI: true,																	// 是否支持fetch api, 如果您想将fetch与此协议一起使用，请添加此项  默认为false
		

		allowServiceWorkers: true,																// 是否允许 Service Workers 默认为false
		corsEnabled: true,																		// 是否允许跨域, 如果需要为此协议启用cors，请添加此项 默认为false
		stream: true,																			// 是否流式传输, 即在视频/音频html标签中，请添加此项 默认为false
	};

	public static readonly AppAssetsPath = AppAssetsPath;

	get projectDownloadDB() {
		const projectPath = this.session.path;
		return upath.join(projectPath, `.${packageConfig.name}/download_db.json`);
	}


	public readonly Page: Page;
	public readonly Assets: Assets;
	public readonly Download: Download;
	public readonly Setting: Setting;


	

	constructor(public readonly session: Session) {
		super(session, [
			// TestApplet,
		]);

		
		const { protocol } = session.session;


		this.Page = new Page(session);
		this.Assets = new Assets(session);
		this.Download = new Download(session);
		this.Setting = new Setting(session);
		

		protocol.handle(scheme, async require => {
			// require.body = await require.buffer();
			// console.log('protocol.handle', require);
			const context = new Context(require, session);
			return this.navigation(context);
		});


		
	}


	navigation(context: Context) {


		try {
			const { authority } = context;
			// console.log('Assets', 'authority', authority.root);
			switch (authority.root) {
				case 'api':
					return this.api(context);
				default:
					return new Response('', {
						headers: { 'content-type': 'text/html' },
						status: 400,
						statusText: 'Invalid Hostname',
					});
					break;
			}
		} catch (error: any) {
			console.log('Assets', 'constructor', error.message);

			return new Response('', {
				headers: { 'content-type': 'text/html' },
				status: 404,
				statusText: 'Not Found',
			});
		}

	}




	async api(context: Context): Promise<Response> {
		try {

			const { authority } = context;
			switch (authority.name) {
				case 'page':
					return this.Page.dispatch(context);
				case 'assets':
					return this.Assets.dispatch(context);
				case 'download':
					return this.Download.dispatch(context);
				case 'setting':
					return this.Setting.dispatch(context);
				default:
					return new Response('', {
						headers: { 'content-type': 'text/html' },
						status: 400,
						statusText: 'Invalid Hostname',
					});
					break;
			}


		} catch (error) {
			// return new Response('', {
			// 	headers: { 'content-type': 'text/html' },
			// 	status: 500,
			// 	statusText: 'Rad Error',
			// });
			return new Response('', {
				headers: { 'content-type': 'text/html' },
				status: 404,
				statusText: 'Not Found',
			});
		}
	}

}

// export { AssetsConfig };



