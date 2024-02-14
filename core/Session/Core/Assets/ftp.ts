import { Applet, useRouter, useGet, usePost } from '../../../Session/utils/router/index';
import parse from 'body/json';
import typeis from 'type-is';

import Context, { Authority } from "../../../Session/utils/context/index";

import { sortLikeWin } from "./utils";
import upath, { join } from 'upath';
import mime from "mime";
import { fileTypeFromBuffer, fileTypeFromFile, fileTypeFromStream } from 'file-type';
const { promises: fs, statSync, readdirSync, createReadStream } = require('original-fs');

// @useRouter
export default class ftp extends Applet {





	/**
	 * 获取当前页面对象
	 * @param { string } uuid
	 * @returns
	 */
	// @useGet
	@usePost
	public async getInfo(context: Context): Promise<Response> {
		try {
			const { context } = this;
			const { session, domain, scheme } = context;

			const options = await context.body.json();
			const { url } = options;

			const authority = new Authority(url);

			// const fileList = files.filter(item => true || item.at(0) !== '.').map(async (item, index) => {
				

			const ftpClient = this.session.Assets.ftp.get(authority.nameList[3]);
			if(!ftpClient) throw new Error('Assets - FtpClient is not found');
			const item = await ftpClient.stat(authority.path);

			const [_extension, extension] = item.name.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ?? [];
			// const originPath = upath.join(folderPath, item);
			const mimeValue = mime.getType(extension ?? '') ?? 'unknown';


			const body = {
				name: item.name,
				// path: upath.join(assetsPath, item),
				path: upath.join('/', url.path, item.name),
				// assetsPath: authority.path,
				type: item.type === 'd' ? 'directory' : 'file',
				isLeaf: item.type === '-',
				isFile: item.type === '-',
				isDirectory: item.type === 'd',

				isSubNode: item.type === 'd' ? true : false,
				subNode: [],
				// originPath: upath.join(folderPath, item.name),
				originPath: '',


				size: item.size,
				modifyTime: item.modifyTime,
				accessTime: item.accessTime,
				rights: item.rights,
				mime: mimeValue,

				// url: `${url}${item}`,
				// domain,
				// scheme,


				assetsPath: `assets://${authority.nameList[3]}.ftp${upath.join('/', url.path, item.name)}`,
				url: `assets://${authority.nameList[3]}.ftp${upath.join('/', url.path, item.name)}`

				// originPath: folderPath,
			}


			return new Response(JSON.stringify(body), {
				headers: { 'content-type': 'text/html' },
				status: 200,
				statusText: 'OK',
			});
		} catch (error: any) {
			console.log('Assets', 'constructor', error);
			
			return new Response(error.message, {
				headers: { 'content-type': 'text/html' },
				status: 401,
				statusText: 'Rad Error',
			});
		}
	}


	/**
	 * 获取当前页面对象
	 * @param { string } uuid
	 * @returns
	 */
	// @useGet
	@usePost
	public async login() {
		try {
			const { context } = this;
			const { session } = context;
			const { ftp } = session.Assets;

			const options = await context.body.json();

			const token = await ftp.login({
				// host: 'butcat.com',
				// port: 22,
				// user: 'root',
				// password: 'Miku-3900',
				...options,
				isSftp: true,
			});

			const body = {
				token,
			};

			return new Response(JSON.stringify(body), {
				headers: { 'content-type': 'text/html' },
				status: 200,
				statusText: 'OK',
			});
		} catch (error: any) {
			return new Response(error.message, {
				headers: { 'content-type': 'text/html' },
				status: 401,
				statusText: 'Rad Error',
			});
		}
	}


	/**
	 * 退出登录
	 * @returns 
	 */
	@usePost
	public async logout() {
		try {
			const { context } = this;
			const { session } = context;
			const { ftp } = session.Assets;

			const options = await context.body.json();

			await ftp.logout({
				// host: 'butcat.com',
				// port: 22,
				// user: 'root',
				// password: 'Miku-3900',
				...options,
			});

			const body = {};

			return new Response(JSON.stringify(body), {
				headers: { 'content-type': 'text/html' },
				status: 200,
				statusText: 'OK',
			});
		} catch (error: any) {
			return new Response(error.message, {
				headers: { 'content-type': 'text/html' },
				status: 401,
				statusText: 'Rad Error',
			});
		}
	}




	/**
	 * 获取所有连接
	 * @returns 
	 */
	@usePost
	public async getAllConnect() {
		try {
			const { context } = this;
			const { session } = context;
			const { ftp } = session.Assets;

			// const options = await context.body.json();

			
			// ftp.delete(options.token);

			
			

			const body = [...ftp.entries()].map(([key, value]) => [key, value.options]);

			console.log(body);

			return new Response(JSON.stringify(body), {
				headers: { 'content-type': 'text/html' },
				status: 200,
				statusText: 'OK',
			});
		} catch (error: any) {
			return new Response(error.message, {
				headers: { 'content-type': 'text/html' },
				status: 401,
				statusText: 'Rad Error',
			});
		}
	}
}
