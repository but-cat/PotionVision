import { Applet, useRouter, useGet, get, usePost } from '../../../Session/utils/router/index';
import Context, { Authority } from '../../../Session/utils/context/index';
import packageConfig from '@root/package.json';
import SettingRouter from './index';
import Orbit from '../../../orbit';

import fs from 'node:fs/promises';
import { join } from 'upath';



// @useRouter
export default class template extends Applet {
	public get route() {
		return super.router as unknown as SettingRouter;
	}

	/**
	 * 创建笔记
	 * @param { string } uuid
	 * @returns
	 */
	@usePost
	public async getTemplate() {
		const { context, route } = this;
		const { session, domain, scheme } = context;
		const orbit = session.orbit as Orbit;
		const { BrowserWindow } = orbit;

		const options = await context.body.json();
		const { uuid, path } = options;


		

		const content = {
			uuid,
			path: route.projectDB,
		};

		return new Response(JSON.stringify(content), {
			headers: { 'content-type': 'text/html' },
			status: 200,
			statusText: 'OK',
		});
	}

	/**
	 * 获取当前页面正文
	 * @param { string } uuid
	 * @returns
	 */
	@useGet
	async getPageCenter() {
		const { context, router } = this;
		const { session, domain, scheme } = context;
		const orbit = session.orbit as Orbit;
		const { BrowserWindow } = orbit;

		const options = await context.body.json();
		const { uuid, path } = options;

		try {
			const res = await session.session.fetch(`${packageConfig.name}://tools.api/local/allList`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				// body: JSON.stringify({
				// 	uuid
				// }),

				// bypassCustomProtocolHandlers: true,														// 是否绕过自定义协议处理程序
			});

			console.log('res', res);

			return new Response(JSON.stringify(await res.json()), {
				headers: { 'content-type': 'text/html' },
				status: 200,
				statusText: 'OK',
			});
		} catch (error) {
			console.log('getPageCenter', error);
		}

		// .then(res => {
		// 	console.log('res', res);
		// });
	}
}
