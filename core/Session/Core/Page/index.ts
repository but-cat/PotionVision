// import { Router, Applet, useRouter, useGet } from '@/Session/utils/router/index';
import packageConfig from '@root/package.json';
import Prototype, { on, once } from '@/Session/utils/prototype';
import Session from '@/Session/index';
import Context, {  } from "@/Session/utils/context/index";

import qs from "qs";
import upath, { join } from 'upath';
import mime from "mime";
import { fileTypeFromBuffer, fileTypeFromFile } from 'file-type';
import { promises as fs } from 'node:fs';

// import Content from './content';


export default class Page extends Prototype {


	get path() {
		return `${this.session.path}/.${packageConfig.name}/Bookmark/`;
	}

	get projectDB() {
		const projectPath = this.session.path;
		return upath.join(projectPath, `.${packageConfig.name}/download_db.json`);
	}

	constructor(public readonly session: Session) {
		super(session, [
			// Content
		]);
	}





	async dispatch(context: Context): Promise<Response> {
		try {
			
			
			const { authority } = context;

			// console.log('Assets - dispatch', authority, authority.subName);
			// console.log('Assets', 'ftp', authority.nameList[3]);


			// if(!authority.subName) super.dispatch(context);
			
			
			switch (authority.nameList[2]) {
				case 'core':
					return this.core(context);
				case undefined:
					return super.dispatch(context);
					// return this.ftp(context);
				default:
					throw new Error('Assets - dispatch - Error');
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


	/**
	 * 解析 tools://*.pre/ 请求 ‘*’ 为应用名
	 * 返回应用预安装的应用资源
	 * @param context 
	 * @returns 
	 */
	async core(context: Context): Promise<Response> {
		const { url, domain, authority, scheme, host, port, path: assetsPath } = context;
			
		const folderPath = (Prototype.isDev && process.env['ELECTRON_RENDERER_URL']) ? `${process.env['ELECTRON_RENDERER_URL']}/` : join(__dirname, '../renderer/');																// 预装应用路径

		const path = upath.join(folderPath, assetsPath);
		const [_extension, extension] = path.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ?? [];


		if(Prototype.isDev && process.env['ELECTRON_RENDERER_URL']) {

			// console.log('path: ', url.replace(new RegExp(`${domain}/`), `${process.env['ELECTRON_RENDERER_URL']}/`) );
			
			const LocationUrl = url.replace(new RegExp(`${domain}/`), `${process.env['ELECTRON_RENDERER_URL']}/`);

			console.log('path: ', LocationUrl );
			
			return new Response('', {
				headers: { 
					'content-type': 'text/html',
					'Access-Control-Allow-Origin': '*',
					"Location": encodeURI(LocationUrl),
				},
				status: 301,
				statusText: 'Not Found',
			});
		} else {
			const fileType = await fileTypeFromFile(path);
			const mimeValue = fileType ? fileType.mime : mime.getType(extension) ?? 'text/plain';
			const data = await fs.readFile(path);

			return new Response(
				// Buffer.from(`<h5>Response ${this.session.path}</h5>`), // 也可以是 string 或 ReadableStream.
				data,
				{ headers: { 'content-type': mimeValue } },
			);
		}

	}
}
