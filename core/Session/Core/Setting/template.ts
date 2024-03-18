import { Applet, useRouter, useGet, get, usePost } from '../../../Session/utils/router/index';
import Context, { Authority } from '../../../Session/utils/context/index';
import packageConfig from '@root/package.json';
import SettingRouter from './index';
// import Orbit from '../../../orbit';
import yaml from "js-yaml";

import fs from 'node:fs/promises';
import { join } from 'upath';

import AppletPrototype from './prototype';

// @useRouter
export default class template extends AppletPrototype {

	/**
	 * 创建笔记
	 * @param { string } uuid
	 * @returns
	 */
	@usePost
	public async getTemplate() {
		const { context, route } = this;
		const { session, domain, scheme } = context;
		const orbit = session.Apps;
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
		const orbit = session.Apps;
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

	/**
	 * 创建笔记
	 * @param { string } uuid
	 * @returns
	 */
	@usePost
	public async createFromConfig() {
		const { context, route } = this;
		const { session, domain, scheme } = context;
		const orbit = session.Apps;
		const { BrowserWindow } = orbit;

		const ymlText = await context.body.text();


		function configStringify(data: any) {
			const interfaceList: any[] = Object.entries(data);
			return interfaceList.reduce((prev, [keys, config]) => {
		
		
				let params: any = {};
		
				if (/\[/.test(keys)) params = typeof config === "object" ? config : {
					key: keys.replace(/(.*\/)*([^\[]+).*/ig, "$2"),
					type: /\[/.test(keys) ? keys.replace(/(.*\[)*([^\]]+).*/ig, "$2") : 'string',
					value: /\=/.test(keys) ? keys.replace(/.+\=/, "") : null,
					description: config
				};// [type]
				else params = typeof config === "object" ? config : {
					key: keys,
					type: 'string',
					value: config,
					description: config
				};// string
		
				const { type, value, description = '', item = '', key = keys } = params;
		
				switch (type) {
					case 'array':
						let def = {
							"type": "array",
							"description": `${description} 数组`,
							"items": {
								"type": item,
								"description": description,
							},
						}
						if (typeof item === "string") prev[key] = ({
							string: def,
							number: def,
							boolean: def,
						} as any)[item as any];
		
						if (!Array.isArray(item) && typeof item === "object") prev[key] = {
							"type": "object",
							"value": typeof item,
							"properties": configStringify(item),													// 对象
						};
		
		
						break;
		
					case 'object':
						prev[key] = {
							"type": "object",
							"title": `${description} 对象`,
							"properties": configStringify(value),											// 对象
							"required": Object.keys(value),												// 必填项
						}
						break;
		
					case 'title':
		
					case 'input':
					case 'textarea':
					case 'number':
					case 'range':
					case 'switch':
					case 'color':
					case 'image':
					case 'radio':
						prev[key] = { key, name: key, type, value, description };
						break;
		
					default:
						prev[key] = { key, name: key, type: 'text', value: undefined, description };
						break;
				}
		
		
				// if(Array.isArray()) 
				return prev;
			}, {} as any);
		
		
			// interfaceReq.reduce((prev, { key, type, value, description }) => {
			// 	// console.log(key, type, value, description);
		
			// 	prev[key] = { key, type, value, description };
			// 	return prev;
			// }, {} as any),
		}

		try {
			const ymlConfig = yaml.load(ymlText);
			const content = configStringify(ymlConfig);

			return new Response(JSON.stringify(content), {
				headers: { 'content-type': 'text/html' },
				status: 200,
				statusText: 'OK',
			});
		} catch (error: any) {
			console.log('getPageCenter', error);
			return new Response(error.message, {
				headers: { 'content-type': 'text/html' },
				status: 400,
				statusText: 'OK',
			});
		}
	}
}
