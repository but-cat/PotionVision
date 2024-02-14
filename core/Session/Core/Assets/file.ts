import { Applet, useRouter, useGet, usePost } from '../../../Session/utils/router/index';
import packageConfig from '@root/package.json';
import parse from 'body/json';
import typeis from 'type-is';
import upath, { join } from 'upath';

import { sortLikeWin } from './utils';
import AssetsRouter from './index';
import Context, { Authority } from '../../../Session/utils/context/index';

import mime from 'mime';
import { fileTypeFromBuffer, fileTypeFromFile, fileTypeFromStream } from 'file-type';
const { promises: fs, statSync, readdirSync, createReadStream } = require('original-fs');

// @useRouter
export default class file extends Applet {
	// public get router() {
	// 	return super.router as AssetsRouter;
	// }

	async folderInfo(assetsPath: string) {
		const { session, url, body, domain, authority, scheme, host, port } = this.context;

		const options = await body.json();
		// const { path: assetsPath } = options;

		const folderPath = upath.join(session.path, assetsPath);
		// console.log('Assets', 'constructor', folderPath, assetsPath);

		const files = (await fs.readdir(folderPath)) as string[];
		const fileList = files
			.filter(item => true || item.at(0) !== '.')
			.map(async (item, index) => {
				const filePath = join(folderPath, item);
				const fileStat = await fs.stat(filePath);

				const subNode = (await fs.stat(filePath)).isDirectory() ? ((await fs.readdir(upath.join(folderPath, item))) as string[]) : [];

				let mimeValue = '';
				const [_extension, extension] = filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ?? [];
				const originPath = upath.join(folderPath, item);

				if (fileStat.isFile()) {
					// console.log('Assets', 'constructor', originPath);
					const stream = createReadStream(originPath);
					const fileType = await fileTypeFromStream(stream);
					mimeValue = fileType ? fileType.mime : mime.getType(extension) ?? 'unknown';
					// console.log('Assets', 'constructor', fileType);
				}

				return {
					name: item,
					// path: upath.join(assetsPath, item),
					path: upath.join('/', url.path, item),
					// assetsPath: authority.path,
					type: fileStat.isFile() ? 'file' : 'directory',
					isLeaf: fileStat.isFile(),
					isFile: fileStat.isFile(),
					isDirectory: fileStat.isDirectory(),

					size: fileStat.size,
					modifyTime: fileStat.mtimeMs,
					accessTime: fileStat.atimeMs,
					rights: '',

					mime: mimeValue,

					isSubNode: subNode.length > 0,
					subNode: [],
					originPath,

					// url: `${url}/${item}`,
					url: `assets://${'project'}.local${upath.join('/', url.path, item)}`,
					domain,
					scheme,

					// originPath: folderPath,
				};
			});

		const resBody = {
			projectPath: this.session.path,
			assetsPath,
			name: authority.name,
			files,
			// fileList: await Promise.all(fileList),

			children: (await Promise.all(fileList)).sort((a, b) => sortLikeWin('name', a, b)),
			// children: await Promise.all(fileList),
		};

		return new Response(JSON.stringify(resBody), {
			headers: { 'content-type': 'text/html' },
			status: 200,
			statusText: 'OK',
		});
	}

	async fileInfo(ctx: Context): Promise<Response> {
		const { url, domain, authority, scheme, host, port, path: assetsPath } = ctx;

		return new Response(JSON.stringify({}), {
			headers: { 'content-type': 'text/html' },
			status: 200,
			statusText: 'OK',
		});
	}

	/**
	 * 获取文件信息
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

			const filePath = join(this.session.path, authority.path);

			console.log('Assets', 'constructor', filePath, authority.path);
			

			const fileStat = await fs.stat(filePath);

			const subNode = (await fs.stat(filePath)).isDirectory() ? ((await fs.readdir(filePath)) as string[]) : [];

			let mimeValue = '';
			const [_extension, extension] = upath.basename(filePath).match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ?? [];
			const originPath = filePath;

			if (fileStat.isFile()) {
				// console.log('Assets', 'constructor', originPath);
				const stream = createReadStream(originPath);
				const fileType = await fileTypeFromStream(stream);
				mimeValue = fileType ? fileType.mime : mime.getType(extension) ?? 'unknown';
				// console.log('Assets', 'constructor', fileType);
			}

			const body = {
				name: upath.basename(filePath),
				// path: upath.join(assetsPath, item),
				path: upath.join('/', authority.path),
				assetsPath: authority.path,
				type: fileStat.isFile() ? 'file' : 'directory',
				isLeaf: fileStat.isFile(),
				isFile: fileStat.isFile(),
				isDirectory: fileStat.isDirectory(),

				size: fileStat.size,
				modifyTime: fileStat.mtimeMs,
				accessTime: fileStat.atimeMs,
				rights: '',

				mime: mimeValue,

				isSubNode: subNode.length > 0,
				subNode: subNode,
				originPath,

				// url: `${url}/${item}`,
				url: `assets://${'project'}.local${upath.join('/', authority.path)}`,
				domain,
				scheme,

				// originPath: folderPath,
			};

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
}
