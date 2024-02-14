import { EventEmitter } from "events";
import { is } from '@electron-toolkit/utils';

import Context from "../context";
import { Router } from "./index";

export class Handler extends EventEmitter {


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


	static isHandler(applets: unknown): boolean {
		const applet = applets as typeof Handler | undefined;
		if(!applet || !applet?.prototype) return false;
		const appletProto = Object.getPrototypeOf(applet?.prototype);
		if(!appletProto) return false;
		if(appletProto == Handler.prototype) return true;
		else return Handler.isHandler(appletProto);
	}



	static get__method_list(applets: unknown): any {
		const applet = applets as typeof Handler | undefined;
		console.log("applet", applet);
		
		if(!applet || !applet?.prototype) return false;
		const appletProto = Object.getPrototypeOf(applet?.prototype);
		if(!appletProto) return false;
		if(appletProto.__method_list) return appletProto.__method_list;
		else return Handler.get__method_list(appletProto);
	}



	constructor(public readonly context: Context, public readonly router: Router) {
		super();
	}




	dispatch() {
		const { session, url, method } = this.context;

		console.log("Handler", "dispatch", this.context.url, this.context);

		switch (method) {
			case 'HEAD':
				return this.head();
			case 'GET':
				return this.get();
			case 'PUT':
				return this.put();
			case 'POST':
				return this.post();
			case 'DELETE':
				return this.delete();
			case 'PATCH':
				return this.patch();
			case 'TRACE':
				return this.trace();

			// 非标准方法
			
			case 'INFO':
				return this.info();
			case 'DIRECTORY':
				return this.directory();
			default:
				return undefined;
		}
	}
	



	get__method_list(pathName = '') {
		return (this as any)["__method_list"].get(pathName);
	}





	head() {}

    get() {}

    put() {}

    post() {}

    delete() {}

    patch() {}

	trace() {}



	info() {}


	directory() {}
}