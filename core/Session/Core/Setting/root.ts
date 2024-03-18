import { Applet, useRouter, useGet, get, usePost } from '../../../Session/utils/router/index';
import Context, { Authority } from '../../../Session/utils/context/index';
import packageConfig from '@root/package.json';
import SettingRouter from './index';

import yaml from 'js-yaml';

import fs from 'node:fs/promises';
import { join } from 'upath';

import AppletPrototype from './prototype';

import SettingConfig from './welcome.yml?raw';

// @useRouter
export default class root extends AppletPrototype {
	get settingFilePath() {
		const projectPath = this.session.path;
		return join(projectPath, `.${packageConfig.name}/setting.json`);
	}

	async hasSettingFile() {
		try {
			const settingFilePath = this.settingFilePath;
			await fs.access(settingFilePath);
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * 创建笔记
	 * @param { string } uuid
	 * @returns
	 */
	@useGet
	public async getTemplate() {
		try {
			// const templateRes = await this.fetch('apps://setting.api/root/getTemplate');
			// const TemplateText = await templateRes.text();
			const TemplateText = SettingConfig;

			const FromConfigRes = await this.fetch('apps://setting.api/template/createFromConfig', {
				method: 'POST',
				body: TemplateText,
			});
			const FromConfigOption = await FromConfigRes.text();

			return new Response(FromConfigOption, {
				headers: { 'content-type': 'application/json' },
				status: 200,
				statusText: 'OK',
			});
		} catch (error: any) {
			return new Response(error.message, {
				headers: { 'content-type': 'text/html' },
				status: 404,
				statusText: 'OK',
			});
		}
	}



	async getDefaultData() {
		const { context, route } = this;
		const { session, domain, scheme } = context;

		const templateRes = await this.fetch('apps://setting.api/root/getTemplate');
		const FromConfigOption = await templateRes.json() as {
			key: string,
			name: string,
			type: string,
			value: string | number | boolean | null,
			description: string
		}[]

		// console.log("FromConfigOption", FromConfigOption);

		const dataContent = {};
		Object.entries(FromConfigOption).forEach(([key, item]) => {
			// console.log(key, item);
			
			// Object.defineProperty(dataContent, key, {
			// 	value: 'item?.value ?? null',
			// });
			if(['title'].includes(item.type)) return;
			dataContent[key] = item?.value ?? null;
		});

		return dataContent;
	}

	/**
	 * 创建笔记
	 * @param { string } uuid
	 * @returns
	 */
	@useGet
	public async getData() {
		const { context, route } = this;
		const { session, domain, scheme } = context;

		const dataContent = await this.getDefaultData();


		if (await this.hasSettingFile()) {
			const fileText = await fs.readFile(this.settingFilePath, 'utf-8');			// Do something with the file data
			const fileData = JSON.parse(fileText);
			Object.entries(dataContent).forEach(([key, item]) => {
				if(fileData[key]) dataContent[key] = fileData[key];
			});

			console.log("有文件", fileData);
			
			
		} else {
			await fs.writeFile(this.settingFilePath, JSON.stringify(dataContent));
			console.log("没文件")
		}

		return new Response(JSON.stringify(dataContent), {
			headers: { 'content-type': 'application/json' },
			status: 200,
			statusText: 'OK',
		});
	}

	/**
	 * 创建笔记
	 * @param { string } uuid
	 * @returns
	 */
	@usePost
	public async setData() {
		const { context, route } = this;
		const { session, domain, scheme } = context;
		const orbit = session.Apps;
		const options = await context.body.json();

		const dataContent = await this.getDefaultData();

		Object.entries(dataContent).forEach(([key, item]) => {
			if(options[key]) dataContent[key] = options[key];
		});

		await fs.writeFile(this.settingFilePath, JSON.stringify(dataContent));

		return new Response('OK', {
			headers: { 'content-type': 'text/html' },
			status: 200,
			statusText: 'OK',
		});
	}
}
