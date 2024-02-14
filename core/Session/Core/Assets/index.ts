import { Router, Applet, useRouter, useGet } from '../../../Session/utils/router/index';
import packageConfig from '@root/package.json';
import Prototype, { on, once } from '../../../Session/utils/prototype';
import Session from '../../../Session/index';
import Context, { Authority } from "../../../Session/utils/context/index";

// import FTP from "./ftp";

const { promises: fs, statSync, readdirSync, createReadStream } = require('original-fs');
import upath from 'upath';
import { join } from 'path';
import { sortLikeWin } from "./utils";

import mime from "mime";
import { fileTypeFromBuffer, fileTypeFromFile, fileTypeFromStream } from 'file-type';


import FtpApplet from './ftp';
import FileApplet from './file';

export default class Assets extends Prototype {


	// public ftpClient = new FTP();

	get projectDB() {
		const projectPath = this.session.path;
		return upath.join(projectPath, `.${packageConfig.name}/download_db.json`);
	}

	constructor(public readonly session: Session) {
		super(session, [
			FtpApplet,
			FileApplet,
		]);



		// this.ftpClient.connect({
		// 	host : 'butcat.com',
		// 	port : 22,
		// 	user : 'root',
		// 	password : 'Miku-3900',
		// 	keepalive : 1000
		// });
	}


	async dispatch(context: Context): Promise<Response> {
		try {
			
			
			const { authority } = context;

			// console.log('Assets - dispatch', authority, authority.subName);
			// console.log('Assets', 'ftp', authority.nameList[3]);


			// if(!authority.subName) super.dispatch(context);
			
			
			switch (authority.nameList[2]) {
				case 'ftp':
					return this.ftp(context);
				case 'local': 
					return this.local(context);
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


	async local(ctx: Context): Promise<Response> {
		try {
			const { url, domain, authority, scheme, host, port, path: assetsPath } = ctx;


			const folderPath = upath.join(this.session.path, assetsPath);
			// console.log('Assets', 'constructor', folderPath, assetsPath);

			const files = await fs.readdir(folderPath) as string[];
			const fileList = files.filter(item => true || item.at(0) !== '.').map(async (item, index) => {

				const filePath = join(folderPath, item);
				const fileStat = await fs.stat(filePath);

				// const subNode = readdirSync(upath.join(folderPath, item)) as string[];
				// fs.readdir(upath.join(folderPath, item)).then(res => {
				// 	console.log('Assets', 'constructor', res);
				// });

				const subNode = (await fs.stat(filePath)).isDirectory() ? await fs.readdir(upath.join(folderPath, item)) as string[] : [];
				// console.log('Assets', 'constructor', subNode);

				let mimeValue = "";
				const [_extension, extension] = filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ?? [];
				const originPath = upath.join(folderPath, item);
				
				
				if(fileStat.isFile()) {
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
				}
			});


			// console.log('Assets', 'constructor', files, fileList);


			const resBody = {
				projectPath: this.session.path,
				assetsPath,
				name: authority.name,
				files,
				// fileList: await Promise.all(fileList),

				children: (await Promise.all(fileList)).sort((a, b) => sortLikeWin('name', a, b))
				// children: await Promise.all(fileList),
			}

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
			console.log("local: ", error);
			
			return new Response('', {
				headers: { 'content-type': 'text/html' },
				status: 404,
				statusText: 'Not Found',
			});
		}
	}




	async ftp(ctx: Context): Promise<Response> {
		try {
			const { url, domain, authority, scheme, host, port, path: assetsPath } = ctx;

			// const { ftp } = this.session.Assets;

			console.log('Assets', 'ftp', authority.nameList[3]);
			
			const ftpClient = this.session.Assets.ftp.get(authority.nameList[3]);
			if(!ftpClient) throw new Error('Assets - FtpClient is not found');


			
			


			const folderPath = upath.join(this.session.path, assetsPath);
			// console.log('Assets', 'constructor', folderPath, assetsPath);

			// const files = await fs.readdir(folderPath) as string[];

			
			const files = await ftpClient.list(assetsPath);
			// console.log("ftp return", files);

			const fileList = files.filter(item => item.type !== 'l').map(async (item, index) => {

				// const filePath = join(folderPath, item.name);
				// const fileStat = await fs.stat(filePath);

				// const subNode = readdirSync(upath.join(folderPath, item)) as string[];
				// fs.readdir(upath.join(folderPath, item)).then(res => {
				// 	console.log('Assets', 'constructor', res);
				// });

				// const subNode = (await fs.stat(filePath)).isDirectory() ? await fs.readdir(upath.join(folderPath, item)) as string[] : [];
				// console.log('Assets', 'constructor', item);

				const [_extension, extension] = item.name.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ?? [];
				// const originPath = upath.join(folderPath, item);
				const mimeValue = mime.getType(extension ?? '') ?? 'unknown';


				return {
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
			});

			// console.log('Assets', 'constructor', files, fileList);


			const resBody = {
				projectPath: this.session.path,
				assetsPath,
				name: authority.name,
				files,
				// fileList: await Promise.all(fileList),

				children: (await Promise.all(fileList)).sort((a, b) => {
					if (a.isDirectory && !b.isDirectory) return -1;
					if (!a.isDirectory && b.isDirectory) return 1;
					return 0;
				})
			}

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
			console.log("ftp: ", error);
			
			return new Response('', {
				headers: { 'content-type': 'text/html' },
				status: 500,
				statusText: 'Bad Error',
			});
		}
	}









	
}
