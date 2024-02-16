import Youfo from "@/apps";

import { Authority } from "./authority";
import _Request from "./request";
import _Response from "./response";

import Session from '../../index';
import ToolsPage from "@/Page/ToolsPage/index";
function getOrbit() {
	return Youfo.instance;
}


import Body from "./body";

export default class context {


	readonly request: _Request;
	readonly response: Response;


	/**
	 * 资源路径
	 */
	url: Authority;
	// url: string;

	/**
	 * 域名
	 */
	domain: string;
	authority: Authority;


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
	path: string;




	body: Body;


	readonly method: string;

	constructor(req: Request, public readonly session: Session, ) {
		this.request = new _Request(req);

		this.method = req.method;

		this.body = new Body(req);


		this.response = new Response('', {
			headers: new Headers,
			status: 200,
			statusText: 'OK',
		});


		// this.url = decodeURI(req.url);
		this.url = new Authority(req.url);


		const reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/);
		const [domain, scheme, host, port] = this.url.match(reg) ?? [];													// 域名, 协议, 应用名, 端口
		const assetsPath = this.url.replace(reg, '').replace(/(\?|#)[^'"]*/, '') as string;


		this.domain = domain!;
		this.authority = new Authority(req.url);
		this.scheme = scheme!;
		this.host = host!;
		this.port = port!;

		this.path = assetsPath!;





		const userAgent = req.headers["User-Agent"]!;
		
		if(userAgent) {
			const orbit = getOrbit();
			const ToolsPage_UUID = userAgent.split(" ").find((item) => item.startsWith("view/"))?.replace("view/", "") || "";
			const ToolsPage = orbit.PagePool.get(ToolsPage_UUID)! as ToolsPage;

			console.log(ToolsPage_UUID);
			

			// this.ToolsPage_UUID = ToolsPage_UUID;
			// this.ToolsPage = ToolsPage;
		}
	}

}

export { _Request as Request, _Response as Response, Authority };