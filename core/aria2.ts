import { app } from 'electron';
import Aria2Client from './aria2/index';
import { exec } from 'child_process';
import upath from 'upath';

// const { createClient } = require("naria2");
// const { createChildProcess } = require("@naria2/node");

// import aria2cPath from '../public/extra/darwin/arm64/engine/aria2c?asset';

// const aria2c = `/Users/butcat/Desktop/aria2_test/extra/darwin/arm64/engine/aria2c`;
const aria2c = upath.join(__dirname, '../renderer/extra/darwin/arm64/engine/aria2c')

const magnet = 'magnet:?xt=urn:btih:eb7fe92b884497ad9422d40b323a15e51e7f7d6b&tr=http%3a%2f%2ft.nyaatracker.com%2fannounce&tr=http%3a%2f%2ftracker.kamigami.org%3a2710%2fannounce&tr=http%3a%2f%2fshare.camoe.cn%3a8080%2fannounce&tr=http%3a%2f%2fopentracker.acgnx.se%2fannounce&tr=http%3a%2f%2fanidex.moe%3a6969%2fannounce&tr=http%3a%2f%2ft.acg.rip%3a6699%2fannounce&tr=https%3a%2f%2ftr.bangumi.moe%3a9696%2fannounce&tr=udp%3a%2f%2ftr.bangumi.moe%3a6969%2fannounce&tr=http%3a%2f%2fopen.acgtracker.com%3a1096%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce';
// const link = 'https://www.bilibili.com/video/BV1Zy4y1r7ZB';
// const link = 'https://dl240.filemate13.shop/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0p0ZkZ4MUJnaUJhUmI3WnNteE8ydkxZSkdJcXNhM29PdEgrRUZwV2FJWWZhakFrR0Vwc3hnUkhxTjh1a3R1Q3ZIcnN0eWY5QitRd0x0bWVQbXhCZDdtVk93TFA3T1VPcHdhVnh2clVKVThoYWsxTnpyNkVXZzQyMkxqMy9OWVRSZTlEd09NcWo0MnRsTnpYbkNmZkx3MnAwQThIZklzc0laaXFuTTQxaXcwTHNrdllFaENoY2pJOEVLaTl6bXlhM0lweEk9';
const link = 'https://www.youtube.com/watch?v=cIGv9kqIeBQ';
// extends aria2s
export default class Asia2 extends Aria2Client {

	public readonly aria2;


	videoPath = upath.normalize(app.getPath('videos') ?? '');


	constructor(port = 6851) {
		// if(Asia2.instance) return Asia2.instance;

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
