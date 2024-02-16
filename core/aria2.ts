import { app } from 'electron';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import Aria2Client from './aria2/index';
import { exec } from 'child_process';
import upath from 'upath';

// const { createClient } = require("naria2");
// const { createChildProcess } = require("@naria2/node");

// import aria2cPath from '../public/extra/darwin/arm64/engine/aria2c?asset';

// const aria2c = `/Users/butcat/Desktop/aria2_test/extra/darwin/arm64/engine/aria2c`;


// extends aria2s
export default class Asia2 extends Aria2Client {

	public static get isMac() {
		return process.platform === 'darwin';
	}


	public readonly aria2;


	videoPath = upath.normalize(app.getPath('videos') ?? '');


	constructor(port = 6851) {
		// if(Asia2.instance) return Asia2.instance;

		const aria2c_Mac = is.dev ? upath.join(__dirname, '../renderer/extra/darwin/arm64/engine/aria2c') : upath.join(__dirname, '../../../app.asar.unpacked/public/extra/darwin/arm64/engine/aria2c');
		const aria2c_Win = is.dev ? upath.join(__dirname, '../renderer/extra/win32/x64/engine/aria2c.exe') : upath.join(__dirname, '../../../app.asar.unpacked/public/extra/win32/x64/engine/aria2c.exe');

		const aria2c = Asia2.isMac ? aria2c_Mac : aria2c_Win;

		const options = `--enable-rpc --rpc-listen-all=true --rpc-allow-origin-all --rpc-listen-port=${port}`;
		exec(`${aria2c} ${options}`, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.error(`stderr: ${stderr}`);
		});

		super({
			host: 'localhost',
			port,
			secure: false,
			path: '/jsonrpc',
		});


		// this.aria2 = new Aria2Client({
		// 	host: 'localhost',
		// 	port,
		// 	secure: false,
		// 	path: '/jsonrpc',
		// })


		this.init();
	}

	async init() {

		

		try {
			console.log('hello');

			const result = await super.open();
			// const notifications = await super.listNotifications();
			
			// emitted for every message sent.
			super.on('output', m => {
				console.log('aria2 OUT', m);
			});

			// emitted for every message received.
			super.on('input', m => {
				console.log('aria2 IN', m);
			});

			super.on('onDownloadStart', ([guid]) => {
				console.log('aria2 onDownloadStart', guid);
			});
		} catch (error) {
			console.error('Error: ', error);
		}
	}

	addUri(uri: string, dir: string = ''): Promise<any> {
		return super.call('addUri', [uri], { dir: upath.join(this.videoPath, dir) });
	}


	tellActive(): Promise<any> {
		return super.call('tellActive');
	}



	// tellStatus(gid: string): Promise<any> {
	// 	return super.call('tellStatus', [gid]);
	// }
	tellStatus(): Promise<any> {
		return super.call('tellStatus');
	}
}

// 关闭客户端
// await client.shutdown();
