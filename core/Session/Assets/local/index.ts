import { Handler, useRouter, useGet, usePost } from '../../../Session/utils/router/index';
import packageConfig from "@root/package.json";
// import parse from 'body/json';
// import typeis from 'type-is';

// import { sortLikeWin } from "./utils";
import upath, { join } from 'upath';
import mime from 'mime';
import { Readable } from 'node:stream';
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream';
import { fileTypeFromBuffer, fileTypeFromFile, fileTypeFromStream } from 'file-type';
const { promises: fs, statSync, readdirSync } = require('original-fs');
import { createReadStream, createWriteStream } from 'fs';
import { sortLikeWin } from '../../../Session/utils/dir';

import { createResponse } from "./range";

// @useRouter
export default class AssetsLocal extends Handler {
	static name = /^assets:\/\/([0-9a-z]+).local/;

	async get() {
		const { url, domain, authority, scheme, host, port, path: assetsPath } = this.context;
		console.log('Assets - handler', 'constructor', join(this.session.path, assetsPath), assetsPath);
		// if(host !== 'local') throw new Error('host !== local');

		const path = upath.join(this.session.path, assetsPath);
		const res = await createResponse(this.context.request, path);

		return res
	}

	async info() {
		try {
			const { context } = this;
			const { session, domain, scheme, path: assetsPath, host } = context;

			const filePath = join(this.session.path, assetsPath);

			// console.log('Assets', 'constructor', filePath, assetsPath);

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
				path: upath.join('/', assetsPath),
				assetsPath: assetsPath,
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

				
				// url: `assets://${'project'}.local${upath.join('/', assetsPath)}`,
				url: `assets://${host}${upath.join('/', assetsPath)}`,
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

	async directory() {
		try {
			const { url, domain, authority, scheme, host, port, path: assetsPath } = this.context;

			const folderPath = upath.join(this.session.path, assetsPath);
			// console.log('Assets', 'constructor', folderPath, assetsPath);

			const files = (await fs.readdir(folderPath)) as string[];

			const filterRole = (name) => [
				!true,
				name.at(0) !== '.',
				!['.DS_Store', `.${packageConfig.name}`].includes(name),
			].find(Boolean);

			const fileList = files
				.filter(filterRole)
				.map(async (item, index) => {
					const filePath = join(folderPath, item);
					const fileStat = await fs.stat(filePath);

					// const subNode = readdirSync(upath.join(folderPath, item)) as string[];
					// fs.readdir(upath.join(folderPath, item)).then(res => {
					// 	console.log('Assets', 'constructor', res);
					// });

					const subNode = (await fs.stat(filePath)).isDirectory() ? ((await fs.readdir(upath.join(folderPath, item))) as string[]) : [];
					// console.log('Assets', 'constructor', subNode);

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

						// url: `assets://${'project'}.local${upath.join('/', url.path, item)}`,
						url: `assets://${host}${upath.join('/', url.path, item)}`,
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
		} catch (error) {
			// return new Response('', {
			// 	headers: { 'content-type': 'text/html' },
			// 	status: 500,
			// 	statusText: 'Rad Error',
			// });
			console.log('local: ', error);

			return new Response('', {
				headers: { 'content-type': 'text/html' },
				status: 404,
				statusText: 'Not Found',
			});
		}
	}

	async post() {
		throw new Error('Method not implemented.');
	}

	async put() {
		try {
			const { context } = this;
			const { session, domain, scheme, path: assetsPath, request } = context;
			const filePath = join(this.session.path, assetsPath);

			const fileStat = await fs.stat(filePath);
			if (!fileStat.isFile()) throw new Error('is not file');

			const readableWebStream = request.body;
			console.log('readableWebStream: ', request.body);

			if (!readableWebStream) return {};
			const nodeStream = (await new ReadableWebToNodeStream(readableWebStream!)) as unknown as Readable;

			// await fs.writeFile(filePath, nodeStream);
			// await fs.writeFile(filePath, '9090');

			let mimeValue = '';
			const [_extension, extension] = upath.basename(filePath).match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ?? [];
			const originPath = filePath;

			const stream = createReadStream(originPath);
			const fileType = await fileTypeFromStream(stream);
			mimeValue = fileType ? fileType.mime : mime.getType(extension) ?? 'unknown';

			const ws = createWriteStream(filePath, {
				flags: 'w', // 文件的操作, 'w'写入文件，不存在则创建
				mode: 0o666,
				autoClose: true,
				highWaterMark: 3, // 默认写是16*1024
				// encoding: 'utf8'
			});
			ws.on('finish', () => {
				console.log('finish');
			});
			ws.on('error', err => {
				console.log('error', err);
			});

			// ws.write(nodeStream);

			nodeStream.pipe(ws);

			// const readableStream = this.request.body;

			return new Response(undefined, {
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

	async delete() {
		try {
			const { context } = this;
			const { session, domain, scheme, path: assetsPath } = context;
			const filePath = join(this.session.path, assetsPath);

			await fs.unlink(filePath);
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
