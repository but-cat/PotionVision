import { Applet, useRouter, useGet } from "@/Session/utils/router/index";


import logo_ico from '@root/public/logo.ico?asset';

import { Notification } from 'electron';

import BrowserWindow from '../index';

import Orbit from "@/orbit";
import BrowserPage from '@/Page/BrowserPage';
import Session from '@/Session/index';

import { Readability } from '@mozilla/readability';

import { JSDOM } from 'jsdom';

import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import { join } from "upath";

import yaml from "js-yaml";

import RouterPage from "./index";

export default class project extends Applet {


	public get route() {
		return super.router as RouterPage;
	}



    /**
     * 获取当前页面正文
     * @param { string } uuid 
     * @returns 
     */
    @useGet
	async getPageCenter(uuid: string) {

		const router = this.router as RouterPage;

		if(!uuid) return;
		const page = router.getPage(uuid);
		if(!page) return;
		const html = await page.webContents.executeJavaScript(`document.querySelector('body').innerHTML`);

	}



	/**
	 * 创建文章
	 * @param uuid 页面uuid
	 * @returns 
	 */
	async generateArticles(uuid: string) {
		try {
			// const { window, session, orbit } = this;

			// console.log('generateArticles', uuid);

			const router = this.router as RouterPage;
			

			if(!uuid) return;
			const page = router.getPage(uuid);
			if(!page) return;

			const html = await page.webContents.executeJavaScript(`document.querySelector('body').innerHTML`);
			// console.log('innerHTML: ', html);

			const title = page.webContents.getTitle();

			const doc = new JSDOM(html);
			const article = new Readability(doc.window.document).parse();

			// console.log('innerHTML: ', article, `${this.session.path}/.${packageConfig.name}/Bookmark/${uuid}.json`);

			// console.log('innerHTML: ', `${this.window.session.path}/.${packageConfig.name}/Bookmark/${uuid}.json`);


			// textContent

			// const writePath = join(this.path, `${title ?? uuid}.md`);
			const writePath = join(this.route.path, `${uuid}.md`);


			const content = `<h1>${article?.title || title}</h1>\n${article?.content ?? ''}`;


			if (!existsSync(this.route.path)) await fs.mkdir(this.route.path, { recursive: true});
			// fs.writeFile(join(this.path, `${title ?? uuid}.md`), article?.textContent ?? '', 'utf8');
			fs.writeFile(writePath, content, 'utf8');
			console.log('写入成功', writePath);




			const notification = new Notification({
				title: '笔记创建成功',
				body: `请前往：${this.route.path}处查阅`,
				silent: true, // 系统默认的通知声音
				icon: logo_ico, // 通知图标
			});
			// notification.on('click', () => {  });
			// notification.on('show', () => {  });
			// notification.on('close', () => {  });
			notification.show();



			// this.window.newPage(`tools://markdown.project/index.html$assets://project.local//.${packageConfig.name}/Bookmark/${uuid}.md`);


		} catch (error: unknown) {
			const { message } = error as Error;
			console.error('笔记创建失败: ', message);
			
		}


		// await fs.writeFile(`${this.session.path}/.${packageConfig.name}/Bookmark/${uuid}.json`, JSON.stringify(article, null, 2));




		
	}

}