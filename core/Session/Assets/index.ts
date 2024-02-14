import Electron, { app, dialog, net, Privileges } from 'electron';
import packageConfig from "@root/package.json";
import { IncomingMessage } from "http";
import { join } from 'path';
// import ejs from 'ejs';
// import extName from 'ext-name';
// import 'url-polyfill';
// import qs from 'qs';

// import { promises as fs, statSync, readdirSync, createReadStream } from 'node:fs';
const { promises: fs, statSync, readdirSync, createReadStream } = require('original-fs');
import { emptyDir } from "fs-extra";

// import JSON5 from 'json5';
// import { parse as parseUrl } from 'url';
// import path, { resolve, join } from 'path';
import upath from 'upath';

import mime from "mime";
import { fileTypeFromBuffer, fileTypeFromFile, fileTypeFromStream } from 'file-type';

// import AssetsList, { AssetsConfig } from './utils/AssetsList';

import { scheme, partition, AppAssetsPath } from './utils/config';
import Session from '../../Session/index';
import Prototype from '../../Session/utils/prototype';
// import Context from "./context/index";
import Context, {  } from "../../Session/utils/context/index";



import AssetsLocal from "./local/index";

export default class Assets extends Prototype {
	// static readonly instance: Assets = new Assets;



	static readonly scheme = scheme; // 协议名
	static readonly partition = partition; // 分区名


	// public readonly ftp: ClientSet;


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
	public get path() {
		return Assets.AppAssetsPath;
	}



	get tempPath() {
		const projectPath = this.session.path;
		return upath.join(projectPath, `.${packageConfig.name}/temp`);
	}

	constructor(public readonly session: Session) {
		super(session, [
			AssetsLocal,
			// AssetsFtp,
		]);

		// if(Assets.instance) return Assets.instance;
		// console.log(scheme, 'constructor', session);
		const { protocol } = session.session as Electron.Session;


		// this.ftp = new ClientSet(session);

		

		protocol.handle(scheme, async (require) => {
			// IncomingMessage
			const context = new Context(require, session);
			return this.navigation(context);
		});
		
		this.init();
	}



	/**
	 * 初始化
	 */
	init() {
		// const sessionPath = join(this.path, `.${packageConfig.name}`);
		fs.access(this.tempPath).catch(() => {
			fs.mkdir(this.tempPath, { recursive: true });
		});

		app.on('window-all-closed', () => {
			emptyDir(this.tempPath);
		});
	}


	navigation(context: Context) {


		try {
			const { authority } = context;
			console.log('Assets', 'authority', authority.root);
			switch (authority.root) {
				case 'local':
				case 'ftp':
					return this.dispatch(context);
				case 'remote':
					return this.remote(context);
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





	async local(context: Context): Promise<Response> {
		const { url, domain, authority, scheme, host, port, path: assetsPath } = context;
		console.log('Assets', 'constructor', join(this.session.path, assetsPath), assetsPath);
		// if(host !== 'local') throw new Error('host !== local');

		const path = upath.join(this.session.path, assetsPath)

		const [_extension, extension] = path.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ?? [];

		// const data = await fs.readFile(path);
		const stream = createReadStream(path);
		const fileType = await fileTypeFromFile(path);
		// const fileType = await fileTypeFromStream(stream);
		const mimeValue = fileType ? fileType.mime : mime.getType(extension) ?? 'text/plain';

		return new Response(
			// Buffer.from(`<h5>Response ${this.session.path}</h5>`), // 也可以是 string 或 ReadableStream.
			// data,
			stream,
			{ headers: { 'content-type': mimeValue } },
		);


		// return net.fetch(`file://${path}`)

	}



	async remote(ctx: Context): Promise<Response> {
		return new Response('', {
			headers: { 'content-type': 'text/html' },
			status: 404,
			statusText: 'Not Found',
		});
	}

}

// export { AssetsConfig };
