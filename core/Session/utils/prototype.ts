import { electronApp, optimizer, is } from '@electron-toolkit/utils';

import { ToolsPage } from '@/Page/index';
import Orbit from '@/apps';
import Session from '../index';

import upath from 'upath';

import { Router, Applet, Handler } from "./router/index";

import { Fetch } from "./fetch";


type SessionType = 'will-download' | 'extension-loaded' | 'extension-unloaded';

export interface EventListenerConfig {
	listener: string;
	type: SessionType;
	once: boolean;
}


export default class Prototype extends Router {
	
	public static get isMac() {
		return process.platform === 'darwin';
	}

	public static get isDev() {
		return is.dev;
	}

	private __listener_list?: Map<SessionType, EventListenerConfig>;


	public readonly app: Orbit;
	public readonly fetch: Fetch;
	

	public get path() {
		// return Download.AppAssetsPath;
		const projectPath = this.session.path;
		return upath.join(projectPath);
	}

	constructor(public readonly session: Session, appletList?: Array<typeof Applet | typeof Handler>) {
		super(appletList);

		this.app = session.orbit;

		this.fetch = new Fetch(session);



		

		// console.log('Prototype', this.__listener_list);
		
		if(this.__listener_list) this.__listener_list.forEach((config, type) => {
			if(!this[config.listener] && typeof this[config.listener] == 'function') return;

			if(config.once) return this.session.session.once(config.type, this[config.listener].bind(this));
			else session.session.on(config.type, this[config.listener].bind(this));
		});
	}

	public getPage(uuid: string) {
		return this.app.PagePool.get(uuid);
	}
	



	/**
	 * 使用 userAgent 获取当前页面对象
	 * @param { string } userAgent 
	 * @returns 
	 */
	public getPageByUserAgent(userAgent: string) {
		if(!userAgent) return;
		// const ProjectWindow_UUID = userAgent.split(" ").find((item) => item.startsWith("tools/"))?.replace("tools/", "") || "";
		const ToolsView_UUID = userAgent.split(" ").find((item) => item.startsWith("view/"))?.replace("view/", "") || "";
		
		return this.app.PagePool.get(ToolsView_UUID) as ToolsPage;
	}
}



export function on(value: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

		// console.log("__listener_list = useGet", target, propertyKey, descriptor);
		
		if (!target["__listener_list"]) target["__listener_list"] = new Map();

		target["__listener_list"].set(propertyKey, {
			listener: propertyKey,
			type: value,
			once: false,
		} as EventListenerConfig);

		return descriptor;
	};
}


export function once(value: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

		// console.log("__listener_list = useGet", target, propertyKey, descriptor);
		
		if (!target["__listener_list"]) target["__listener_list"] = new Map();

		target["__listener_list"].set(propertyKey, {
			listener: propertyKey,
			type: value,
			once: true,
		} as EventListenerConfig);

		return descriptor;
	};
}