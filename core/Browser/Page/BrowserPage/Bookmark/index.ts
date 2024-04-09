import { Notification, dialog } from 'electron';
import packageConfig from '@root/package.json';
import BrowserPage from '../index';

// import Orbit from '../../orbit';
// import Session from '../../Session/index';

import ejs from 'ejs';

import { Readability } from '@mozilla/readability';

import { JSDOM } from 'jsdom';

import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import { join } from 'upath';

import yaml from 'js-yaml';

import articleTemplate from './articles.ejs?raw';

import logo from '@root/public/logo.png?asset';
import logo_ico from '@root/public/logo.ico?asset';

export default class Bookmark extends EventTarget {
	// public readonly orbit: Orbit;

	get path() {
		return `${this.window.session.path}/.${packageConfig.name}/Bookmark/`;
	}

	get window() {
		return this.view.window;
	}

	get session() {
		return this.view.session;
	}

	get orbit() {
		return this.window.orbit;
	}

	constructor(public readonly view: BrowserPage) {
		super();

		// this.session = window.session;
		// this.orbit = this.window.orbit;
	}

	/**
	 * 创建文章
	 * @param uuid 页面uuid
	 * @returns
	 */
	async generateArticles() {
		try {
			// const { window, session, orbit } = this;
			const { uuid } = this.view;

			// console.log('generateArticles', uuid);

			if (!uuid) return;
			const page = this.view;
			// const page = this.window.PagePool.get(uuid) as BrowserPage;
			if (!page) return;
			
			// let paths: string;
			// if(!savePath) {
			// 	const projectDirectory = await dialog.showOpenDialog({
			// 		defaultPath: this.window.session.path,
			// 		buttonLabel: '选择',
			// 		properties: ['openFile', 'openDirectory', 'createDirectory', 'promptToCreate', 'dontAddToRecent'],
			// 		filters: [
			// 			{ name: '笔记文件', extensions: ['read'] },
			// 			{ name: 'All Files', extensions: ['*'] },
			// 		],
			// 	});
			// 	if (projectDirectory.canceled) return;
			// 	paths = projectDirectory.filePaths[0];
			// } else {
			// 	paths = savePath;
			// }
			// const path = (savePath ? savePath : paths).replace(/\/[^\/]+$/, '/');
			// const pathStat = await fs.lstat(paths);
			// const fileName = pathStat.isFile() ? paths.replace(/(.*\/)*([^.]+)/gi, '$2') : null;

			try {
				var html = await page.webContents.executeJavaScript(`document.querySelector('body').innerHTML`);
			} catch (error) {
				console.log('获取页面内容失败', error);
			}
			// console.log('innerHTML: ', html);

			const title = page.webContents.getTitle();

			const doc = new JSDOM(html, {
				includeNodeLocations: true,
			});
			const imgList = doc.window.document.querySelectorAll('img');
			const linkList = doc.window.document.querySelectorAll('a');
			// console.log('imgList', imgList, doc.window.document);

			try {
				for (const img of imgList) {
					// console.log('img', img.src);
					const dataUrl = await this.view.saveOnPageImages(img.src);
					if(dataUrl) img.setAttribute('src', dataUrl);
				}

				for (const link of linkList) {
					link.setAttribute('target', '_blank');
				}
			} catch (error) {
				
			}
			
			// await Promise.all([...imgList].map(async (img) => img.src = await this.view.saveOnPageImages(img.src)));

			const article = new Readability(doc.window.document).parse();


			// console.log('innerHTML: ', article, `${this.session.path}/.${packageConfig.name}/Bookmark/${uuid}.json`);

			// console.log('innerHTML: ', `${this.window.session.path}/.${packageConfig.name}/Bookmark/${uuid}.json`);

			// const writePath = join(this.path, `${title ?? uuid}.md`);

			// const writePath = join(pathStat.isFile() ? path : paths, fileName ?? `${article?.title || title || uuid}.read`);
			// let fileNames = (article?.title || title || uuid).replace(/(?:\.(?![^.]+$)|[^\w.])+/g, "-");// 过滤路径名非法字符
			// let fileNames = (article?.title || title || uuid).replace(/[<>:"/\\|?*]+/g, '-');
			// console.log('fileNames', article?.title, title, uuid, `fileNames:${fileNames}`);
			// if(fileNames.length > 100) fileNames = fileNames.slice(0, 100);// 文件名长度限制
			// const writePath = join(pathStat.isFile() ? path : paths, fileName ?? `${fileNames}.read`);

			const url = page.webContents.getURL();

			// const content = `<a href="${url}"><h1>${article?.title || title}</h1></a>\n${article?.content ?? ''}`;

			const image = await page.capturePage();
			// const favicon = page.favicon;

			const content = ejs.render(
				articleTemplate,
				{
					url,
					title: article?.title || title,
					image,
					content: article?.content ?? '',
					favicon: page.favicon,
				},
				{},
			);

			return {
				title: article?.title || title,
				content,
			};

			// if (!existsSync(path)) await fs.mkdir(path, { recursive: true });

			// fs.writeFile(join(this.path, `${title ?? uuid}.md`), article?.textContent ?? '', 'utf8');
			// fs.writeFile(writePath, content, 'utf8');
			// // fs.writeFile(`${writePath}.htm`, content, 'utf8');
			// console.log('写入成功', writePath);

			// const notification = new Notification({
			// 	title: '笔记创建成功',
			// 	body: `请前往：${path}处查阅`,
			// 	silent: true, // 系统默认的通知声音
			// 	icon: logo_ico, // 通知图标
			// });

			// notification.show();

			// this.window.newPage(`tools://markdown.project/index.html$assets://project.local//.${packageConfig.name}/Bookmark/${uuid}.md`);
		} catch (error: unknown) {
			const { message } = error as Error;
			console.error('笔记创建失败: ', message);
		}

		// await fs.writeFile(`${this.session.path}/.${packageConfig.name}/Bookmark/${uuid}.json`, JSON.stringify(article, null, 2));
	}

	async starPage(uuid: string) {
		const page = this.view;
		if (!page) return;

		console.log('starPage', uuid, page.webContents.getTitle());

		const title = page.webContents.getTitle();
		const url = page.webContents.getURL();
		// const favicon = page.webContents.getFavicon();

		const data = yaml.dump(
			{
				url,
				title,
				// favicon,
			},
			{
				styles: {
					'!!null': 'canonical', // dump null as ~
				},
				sortKeys: true, // sort object keys
			},
		);

		fs.writeFile(join(this.path, `${title ?? uuid}.link`), data, 'utf8');

		// this.generateArticles(uuid);
	}
}
