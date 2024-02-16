import { createServer } from 'node:net';

export async function getPort(port: number | number[] = 3000): Promise<number> {
	if (typeof port === 'number') {
		port = [port];
	}
	// 追加随机端口，0表示系统随机产生一个可用的端口
	port.push(0);
	for (const p of port) {
		const _port = await checkPort(p);
		if (_port) {
			return _port;
		} else {
			console.log(`端口 ${p} 被占用，尝试下一个...`);
		}
	}
	return Promise.reject('no port available');
}

export function checkPort(port: number) {
	return new Promise<false | number>((resolve, reject) => {
		// 启动个服务，使用指定端口
		const server = createServer();
		// 即使服务器正在监听，但它不会阻止程序退出
		server.unref();
		// 如果端口不可用，则失败
		server.on('error', e => {
			resolve(false);
		});
		// 测试端口
		server.listen(port, () => {
			const { port: _port } = server.address() as { port: number };
			server.close(err => {
				err ? resolve(false) : resolve(_port);
			});
		});
	});
}
