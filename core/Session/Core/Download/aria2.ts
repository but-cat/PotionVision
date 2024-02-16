import { createClient, Torrent } from 'naria2';
import { createChildProcess } from '@naria2/node';

const client = await createClient(createChildProcess());

// 
const torrent = await client.downloadTorrent('...') as Torrent;

// 开始下载磁铁
await torrent.watch(torrent => {
	console.log(`Downloading [MEATADATA]`);
});
// 观看洪流进度
await torrent.watchFollowedBy(torrent => {
	console.log(`Downloading ${torrent.name}`);
});

// 关闭客户端
await client.shutdown();
