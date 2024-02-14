// import upath, { join } from 'upath';

export class Authority extends String {


    public readonly host: string;

	public readonly domain: string;
	public readonly scheme: string;
	public readonly port: string;
	public readonly path: string;


	public options: any;

	get root() {
		return this.host.replace(/.+\./,"");
	}

	get partition() {
		const partition = this.host.replace(/\.\w+$/,'');
		return partition !== this.root ? partition : '';
	}

	get name() {
		const name = this.partition;
		return name.replace(/.+\./,"");
	}

	get nameList() {
		return this.host.split('.').reverse();
	}




	constructor(authority = "") {
		super(decodeURI(authority));

        const reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/);
		const [domain, scheme, host, port] = this.match(reg) ?? [];													// 域名, 协议, 应用名, 端口
		this.path = this.replace(reg, '').replace(/(\?|#)[^'"]*/, '');


		this.domain = domain ?? '';
		this.scheme = scheme;
		this.host = host;
		this.port = port;

	}
}