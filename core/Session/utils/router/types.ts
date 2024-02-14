import http from "http";
import { URL } from "url";
import { EventEmitter } from "events";

import { Applet } from "./applet";

export class Request {


	readonly OriginRequest: http.IncomingMessage;

	url: URL;
	urlStr: string;
	method: string;

	origin: string;

	// [key: string]: any;


	constructor(request: http.IncomingMessage) {
		this.OriginRequest = request;

		this.urlStr = request.url!;
		this.method = request.method!;

		
		this.origin = request.headers.referer!;

		// console.log("host", request.headers);
		this.url = new URL(this.urlStr, this.origin);
	}
}


export class Response {

	readonly OriginResponse: http.ServerResponse;
	
	get body(): string | any {
		return this.body;
	}
	set body(value) {
		this.body = value;
	}


	get code(): number {
		return this.OriginResponse.statusCode;
	}
	set code(value) {
		this.OriginResponse.statusCode = value;
	}

	constructor(response: http.ServerResponse) {
		this.OriginResponse = response;
	}



	end(data?: any) {
		this.OriginResponse.end(data);
	}

	writeHead(statusCode: number, headers?: http.OutgoingHttpHeaders) {
		this.OriginResponse.writeHead(statusCode, headers);
	}
}


// export type Finisher = typeof DefaultRouterProto | DefaultRouterProto | ((request: Request, response: Response) => Promise<any>) | typeof Applet;


export abstract class DefaultRouterProto extends EventEmitter {

	static path: string;

	readonly name: string;


	
	// get?: (req: Request) => Promise<Response>;

	// post?: (req: Request) => Promise<Response>;

	// put?: (req: Request) => Promise<Response>;

	// delete?: (req: Request) => Promise<Response>;

	// options?: (req: Request) => Promise<Response>;



	constructor() {
		super();

		this.name = DefaultRouterProto.name;

		// DefaultRouterProto.path = path;
	}


	/**
	 * 
	 * @param middleware 
	 * @param path 
	 */
	// abstract use(middleware: Finisher, path?: string): void;


	// abstract dispatch(request: Request, response: Response): void;
}




export abstract class RouteProto extends Map<string, RouteProto> {

	abstract readonly path: string;

	// readonly name: string;
	


	// abstract use(middleware: Finisher, path?: string): void;

	// abstract dispatch(request: Request, response: Response): void;

	// finisher, method, children, bucket

	abstract __nav(pathList: string[]): RouteProto | undefined;

	abstract toString(): string;

	abstract useConfig(config: RouteConfigItem_Proto): void;

	abstract nav(pathname: string): RouteProto | undefined;

	
}


export interface RouteConfigItem_Proto {

	/**
	 * 路由路径名
	 * @type { string }
	 * @description 
	 */
	path: string;


	/**
	 * 路由处理函数
	 * @type { unknown }
	 * @description 
	 */
	finisher?: unknown;


	/**
	 * 子路由
	 * @type { RouteConfigItem[] | undefined }
	 * @default []
	 * @description 
	 */
	children?: RouteConfigItem_Proto[];

	/**
	 * 请求方法
	 * @type { ["GET", "POST", "PUT", "DELETE", "OPTIONS"] | "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" }
	 * @description GET | POST | PUT | DELETE | OPTIONS
	 */
	method?: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] | "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";							// GET | POST | PUT | DELETE | OPTIONS




	create?: (request: Request, bucket: Map<string, any>) => Applet;
}