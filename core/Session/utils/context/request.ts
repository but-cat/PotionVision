

export default class req implements Request {
	credentials: RequestCredentials;
	destination: RequestDestination;
	headers: Headers;
	integrity: string;
	keepalive: boolean;
	method: string;
	mode: RequestMode;
	redirect: RequestRedirect;
	referrer: string;
	referrerPolicy: ReferrerPolicy;
	signal: AbortSignal;
	url: string;

	body: ReadableStream<Uint8Array> | null;
	bodyUsed: boolean;

	cache: RequestCache;



	// headers: {
	// 	[key: string]: string;
	// };


	/**
	 * 域名
	 */
	domain: string;


	/**
	 * 协议
	 */
	scheme: string;



	/**
	 * 应用名
	 */
	host: string;


	/**
	 * 端口
	 * @default :80
	 * @default :443
	 */
	port: string;




	/**
	 * 资源路径
	 */
	assetsPath: string;

	constructor(req: Request) {

		this.credentials = req.credentials;
		this.destination = req.destination;
		this.headers = req.headers as any;
		this.integrity = req.integrity;
		this.keepalive = req.keepalive;
		this.method = req.method;
		this.mode = req.mode;
		this.redirect = req.redirect;
		this.referrer = req.referrer;
		this.referrerPolicy = req.referrerPolicy;
		this.signal = req.signal;
		this.url = req.url;

		this.body = req.body;
		this.bodyUsed = req.bodyUsed;

		this.cache = req.cache;






		const reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/);
		const [domain, scheme, host, port] = this.url.match(reg) ?? [];													// 域名, 协议, 应用名, 端口
		const assetsPath = this.url.replace(/(\w+):\/\/([^/:]+)(:\d*)?/, '') as string;


		this.domain = domain!;
		this.scheme = scheme!;
		this.host = host!;
		this.port = port!;

		this.assetsPath = assetsPath!;
	}

	clone(): Request {
		throw new Error('Method not implemented.');
	}

	arrayBuffer(): Promise<ArrayBuffer> {
		throw new Error('Method not implemented.');
	}
	blob(): Promise<Blob> {
		throw new Error('Method not implemented.');
	}
	formData(): Promise<FormData> {
		throw new Error('Method not implemented.');
	}
	json(): Promise<any> {
		throw new Error('Method not implemented.');
	}
	text(): Promise<string> {
		throw new Error('Method not implemented.');
	}
}
