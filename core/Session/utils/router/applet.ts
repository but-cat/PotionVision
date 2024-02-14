import { EventEmitter } from "events";
import { is } from '@electron-toolkit/utils';
// import sha256 from "crypto-js/sha256";

import upath from "upath";
import { Request, Response, RouteProto, RouteConfigItem_Proto } from "./types";

// import {  } from "../context/index";
import { RouteConfig, createRoute } from "./index";

import { Router } from "./index";


interface eventTarget {
	// [key: string]: any;
	name: string;
	path: string;
	// method: "get" | "post" | "put" | "delete" | "all";
	method: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS"
	unless: boolean;
	finisher?: any;
}

import Context from "../context";


export const appletList = new Map<string, typeof Applet>();


/**
 * @param constructor 路由装饰器
 * @returns 
 */
export function useRouter<T extends { new(...args: any[]): {} }>(constructor: T) {


	/**
	 * @description: 重写构造函数
	 * @param {type}
	 * @return: 
	 */
	class Page extends constructor {
		newProperty = "new property";
		hello = "override";

		// static readonly emitter = emitter;
		// static readonly router = router;

		constructor(...args: any[]) {
			super(...args);

			const defaultPath = (Page as any).defaultPath ?? "";

			console.log("defaultPath", (this as any)["__method_list"]);
			

			// (this as any)["__method_list"].forEach((value: eventTarget, key: string) => {

			// });
		}
	}
	return Page;
}




/**
 * 
 */
export class AppletRoute extends RouteProto {

	static name?: string;

	readonly path: string;

	applet: typeof Applet;

	// readonly MethodList = new WeakMap();
	readonly method =  ["GET", "POST", "PUT", "DELETE", "OPTIONS"];

	readonly isAppletRoute = true;


	get children() {
		return [...this.values()] ?? [];
	}


	// readonly bucket?: Map<string, any>;
	readonly bucket = new Map<string, any>();


	// children: Route[] = [];

	constructor(path: string, finisher: typeof Applet, Applet_create = Applet.create) {
		super();
		this.path = path;
		// this.finisher = finisher;
		this.applet = finisher;

		const { bucket } = this;


		const methodList = (finisher as any).prototype.__method_list as Map<string, any>;
		// console.log(methodList);
		
		
		if(methodList) {
			const children = [...methodList.entries()].map(([method, finisherItem]: [string, any]) => ({
				path: finisherItem.name,
				method: finisherItem.method.toLocaleUpperCase(),
				async finisher(request: Request, response: Response) {
					const applet = Applet_create(request, bucket);
					await finisherItem.finisher.call(applet, request, response);
				}
			}));

			this.useConfig({
				path: this.path,
				children
			});
		}
	}





	defaultRoute(path: string, finisher: typeof Applet) {

		const route = new AppletRoute(path, finisher);
		this.set(path, route);
	}


	__useConfig(config: AppletConfigItem, path?: string) {

		const rootRoute = path ? this.nav(path) : this;
		if(!rootRoute) throw new Error("route not found");

		if(config?.children && config?.children?.length) config.children.forEach((child: any) => {
			const route = createRoute(child);
			rootRoute.set(child.path, route!);

			if(child.method) {
				route.method.length = 0;
				if(typeof child.method == "string") route.method.push(child.method);
				else route.method.push(...child.method);
			}
		});
	}

	/**
	 * 
	 * @param { AppletConfigItem } config 
	 * @param { string } path 
	 */
	useConfig(config: RouteConfig, path?: string) {

		const rootRoute = path ? this.nav(path) : this;
		if(!rootRoute) throw new Error("route not found");

		// console.log("config", config, (config.finisher as any).prototype.__method_list);
		

		if(config?.children && config?.children?.length) config.children.forEach((child: any) => {
			const route = createRoute(child);
			rootRoute.set(child.path, route!);

			if(child.method) {
				route.method.length = 0;
				if(typeof child.method == "string") route.method.push(child.method);
				else route.method.push(...child.method);
			}
		});
	}


	useApplet(config: AppletConfigItem) {
		// console.log("config", config);
		const applet = config.finisher as typeof Applet;
		const create = config.create ? config.create : Applet.create;

		// const applets = new applet();
		// console.log("applet", applet, (applets as any).prototype.__method_list);
	}

	toString() {
		return JSON.stringify(this, ["path", "finisher", "children"], 4);
	}




	/**
	 * 路径导航
	 * @param pathname
	 * @returns
	 * @description
	 * 	根据路径导航到指定的路由
	 * 	如果路径中包含 * 则返回当前路由
	 * 	如果路径中包含 * 且为最后一个路径则返回当前路由
	 * 	如果路径中包含 * 且不为最后一个路径则返回 undefined
	 */
	nav(pathname: string) {
		const pathList = pathname.split("/").filter(Boolean);
		return this.__nav(pathList);
	}

	/**
	 * 路径导航
	 * @param pathList 
	 * @returns 
	 */
	__nav(pathList: string[]): RouteProto | undefined {
		

		// if(!pathList.length) return this;															// 如果路径列表为空则返回当前路由
		// const path = pathList.shift();																// 取出第一个路径
		// if(path == "*") return this;																// 如果路径为 * 则返回当前路由
		// const route = this.get(path ?? "");															// 根据路径取出路由
		// if(!route || !pathList.length) return undefined;											// 如果路由不存在或者路径列表为空则返回 undefined
		// return route.__nav(pathList);																// 递归调用


		if(!pathList.length) return this;

		const path = pathList.shift();

		if(path == "*") return this;

		const route = this.get(path!);

		if(!route && !pathList.length) return undefined;

		return route!.__nav(pathList);
	}

}


export class Applet extends EventEmitter {


	// private __method_list = new Map<string, eventTarget>();

	// public readonly __method_list = new Map<string, eventTarget>();


	// static create(request: Request, bucket: Map<string, any>) {
	// 	return new Applet();
	// }


	public static get isDev() {
		return is.dev;
	}



	public get session() {
		return this.context.session;
	}


	static isApplet(applets: unknown): boolean {
		const applet = applets as typeof Applet | undefined;
		if(!applet || !applet?.prototype) return false;
		const appletProto = Object.getPrototypeOf(applet?.prototype);
		if(!appletProto) return false;
		if(appletProto == Applet.prototype) return true;
		else return Applet.isApplet(appletProto);
	}



	static get__method_list(applets: unknown): any {
		const applet = applets as typeof Applet | undefined;
		console.log("applet", applet);
		
		if(!applet || !applet?.prototype) return false;
		const appletProto = Object.getPrototypeOf(applet?.prototype);
		if(!appletProto) return false;
		if(appletProto.__method_list) return appletProto.__method_list;
		else return Applet.get__method_list(appletProto);
	}



	constructor(public readonly context: Context, public readonly router: Router) {
		super();




	}




	get__method_list(pathName = '') {
		return (this as any)["__method_list"].get(pathName);
	}
}


export function get(value: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

		// console.log("__method_list = useGet", target, propertyKey, descriptor);
		
		if (!target["__method_list"]) target["__method_list"] = new Map();

		target["__method_list"].set(propertyKey, {
			name: propertyKey,
			path: value,
			method: "GET"
		} as eventTarget);
	};
}

export function useGet(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

	
	
		
	if (!target["__method_list"]) target["__method_list"] = new Map();
	

	appletList.set(target, {
		name: propertyKey,
		// path: value,
		method: "GET"
	} as any);

	// console.log('useGet: ', target);
	

	target["__method_list"].set(propertyKey, {
		name: propertyKey,
		path: propertyKey,
		method: "GET"
	} as eventTarget);

	// console.log("__method_list = useGet", target["__method_list"], target, propertyKey, descriptor);

	return descriptor;
};



// export function useGet(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

// 	console.log("__method_list = useGet", target, propertyKey, descriptor);
	
		
// 	if (!target["__method_list"]) target["__method_list"] = new Map();
	
// 	target["__method_list"].set(propertyKey, {
// 		name: propertyKey,
// 		path: propertyKey,
// 		method: "GET",
// 		finisher: descriptor.value
// 	} as eventTarget);
	
// };



export function usePost(target: Applet, propertyKey: string, descriptor: PropertyDescriptor) {

	if (!target["__method_list"]) target["__method_list"] = new Map();

	target["__method_list"].set(propertyKey, {
		name: propertyKey,
		path: propertyKey,
		method: "POST",
		finisher: descriptor.value
	} as eventTarget);

	return descriptor;
};



export function usePut(target: Applet, propertyKey: string, descriptor: PropertyDescriptor) {
	
	if (!target["__method_list"]) target["__method_list"] = new Map();

	target["__method_list"].set(propertyKey, {
		name: propertyKey,
		path: propertyKey,
		method: "PUT"
	} as eventTarget);

	return descriptor;
};

export function useDel(target: Applet, propertyKey: string, descriptor: PropertyDescriptor) {

	if (!target["__method_list"]) target["__method_list"] = new Map();

	target["__method_list"].set(propertyKey, {
		name: propertyKey,
		path: propertyKey,
		method: "DELETE"
	} as eventTarget);

	return descriptor;
};



export function useMeta(value: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

		if (!target["__meta_list"]) target["__meta_list"] = new Map();

		target["__meta_list"].set(propertyKey, {
			name: propertyKey,
			path: value,
		} as eventTarget);
	};
}



export interface AppletConfigItem extends RouteConfigItem_Proto {

	/**
	 * 路由路径名
	 * @type { string }
	 * @description 
	 */
	path: string;


	/**
	 * 路由处理函数
	 * @type { Finisher | null }
	 * @description 
	 */
	finisher?: typeof Applet | null;


	/**
	 * 子路由
	 * @type { RouteConfigItem[] | undefined }
	 * @default []
	 * @description 
	 */
	children?: RouteConfig[];

	/**
	 * 请求方法
	 * @type { ["GET", "POST", "PUT", "DELETE", "OPTIONS"] | "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" }
	 * @description GET | POST | PUT | DELETE | OPTIONS
	 */
	method?: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] | "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";							// GET | POST | PUT | DELETE | OPTIONS




	create?: (request: Request, bucket: Map<string, any>) => Applet;
}