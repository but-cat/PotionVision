
type bodys = Blob | BufferSource | FormData | ReadableStream<Uint8Array> | string | URLSearchParams | null;
// BufferSource
// FormData
// ReadableStream
// URLSearchParams
// USVString


type initoption = {
    headers: Headers;
    status: number;
    statusText: string;
}

export default class res implements Response {
	readonly headers: Headers;
	// headers: {
	// 	[key: string]: string;
	// };
	ok: boolean;
	redirected: boolean;
	status: number;
	statusText: string;
	type: ResponseType;
	url: string;

	body: ReadableStream<Uint8Array> | null;
	bodyUsed: boolean;

	constructor(body: bodys, options: initoption) {
		// this.res = new Response(res.body, res);

        this.headers = options.headers;
        this.status = options.status;
        this.statusText = options.statusText;

        this.body = body as ReadableStream<Uint8Array>;
        this.bodyUsed = false;
		
        this.ok = this.status >= 200 && this.status < 300;

        this.redirected = false;
        this.type = 'basic';
        this.url = '';
        
	}

	clone(): Response {
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
