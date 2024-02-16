import { Router, Applet, useRouter, useGet } from '@/Session/utils/router/index';
import packageConfig from '@root/package.json';
import Prototype, { on, once } from '@/Session/utils/prototype';
import Session from '@/Session/index';

import upath from 'upath';
import { join } from 'path';
import History from './history';
import Progress from "./progress";

// @useRouter
export default class Download extends Prototype {
	get projectDownloadDB() {
		const projectPath = this.session.path;
		return upath.join(projectPath, `.${packageConfig.name}/download_db.json`);
	}

	constructor(public readonly session: Session) {
		super(session, [Progress,History]);

		// session.session.on('will-download', this.willDownload.bind(this));
	}


	@on('will-download')
	willDownload(event, item, webContents) {
		// event.preventDefault();
		console.log('willDownload: ======================');

		const page = this.getPageByUserAgent(webContents.userAgent);
		if (page) {
			const { workspace, WorkFile } = page;
			// console.log('willDownload: ======================');
			// console.log('willDownload: ', workspace);

			// const WorkFile

			if (workspace) {
				const { path } = workspace;
				console.log('willDownload: ', path);
				item.setSavePath(join(this.path, path));
			} else {
				// 无需对话框提示， 直接将文件保存到路径
				let path = item.setSaveDialogOptions({
					title: '保存文件',
					defaultPath: join(this.path, ''),
					filters: [
						{ name: 'PDF', extensions: ['pdf'] },
						{ name: 'All Files', extensions: ['*'] },
					],
				});
			}

			item.on('updated', (event, state) => {
				if (state === 'interrupted') {
					console.log('Download is interrupted but can be resumed');
				} else if (state === 'progressing') {
					if (item.isPaused()) {
						console.log('Download is paused');
					} else {
						console.log(`Received bytes: ${item.getReceivedBytes()}`);
					}
				}
			});
			item.once('done', (event, state) => {
				if (state === 'completed') {
					console.log('下载成功');
					console.log('willDownload: ', item.getSavePath());
				} else {
					console.log(`下载失败: ${state}`);
				}
			});

			return;
		} else {
			item.setSaveDialogOptions({
				title: '保存文件',
				defaultPath: join(this.session.path, ''),
				// filters: [
				// 	{ name: 'PDF', extensions: ['pdf'] },
				// 	{ name: 'All Files', extensions: ['*'] }
				// ]
			});
		}
	}
}
