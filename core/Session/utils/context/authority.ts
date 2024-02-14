import upath, { join } from 'upath';

export class Authority extends String {


    public readonly host: string;

	public readonly domain: string;
	public readonly scheme: string;
	public readonly port: string;
	public readonly path: string;

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

	/**
	 * @deprecated 改用 nameList
	 */
	get subName() {
		return this.partition.replace(/.[^.]+$/, '');
	}

	/**
	 * @deprecated 改用 nameList
	 */
	get appName() {
		const name = this.partition;
		return name.replace(/.+\./,"");
	}





	constructor(authority = "") {
		super(decodeURI(authority));

        const reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/);
		const [domain, scheme, host, port] = this.match(reg) ?? [];													// 域名, 协议, 应用名, 端口
		const assetsPath = this.replace(reg, '').replace(/(\?|#)[^'"]*/, '');


		this.domain = domain ?? '';
		this.scheme = scheme;
		this.host = host;
		this.port = port;


		

		// this.path = assetsPath;
		this.path = upath.join(...assetsPath.split('/'));
	}
}