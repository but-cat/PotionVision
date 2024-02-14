// export * from "./route";
export * from "./applet";
export * from "./handler";
import { is } from '@electron-toolkit/utils';

// import { Route, RouteConfigItem, Finisher } from "./route";
import { Applet, AppletRoute, AppletConfigItem, appletList } from "./applet";
import { Handler } from "./handler";
import Context from "../context";


export type RouteConfig = AppletConfigItem;

export type RouteItem = AppletRoute;

export function createRoute(config: RouteConfig): RouteItem {

	const configData = config as AppletConfigItem;
	const applet = config.finisher as typeof Applet;
	const route = new AppletRoute(config.path, applet, config.create);
	
	if(configData?.children?.length) route.useConfig(configData);
	return route;
}


export class Router extends Map<string | RegExp, typeof Applet | typeof Handler> {

	public readonly isRoot = true;



	public static get isDev() {
		return is.dev;
	}
	

	// public readonly route = new Route("/");

	private readonly __beforeEach: (request: Request, response: Response)=>void = ()=>{};



	RegExpList: RegExp[] = [];
	
	constructor(readonly AppletList = [] as Array<typeof Applet | typeof Handler>) {

		const appletList = AppletList.map((route) => [route.name, route] as [string | RegExp, typeof Applet]);
		super(appletList as [string | RegExp, typeof Applet | typeof Handler][]);

		this.RegExpList = AppletList.filter((route) => typeof route.name !== 'string').map(i=>i.name as unknown as RegExp) as RegExp[];

		// this.route.useConfig(routeDevInterface(this));
	}



	async route(pathname: string, ctx: Context) {

	}


	/**
	 * assasd?dsad=123
	 */
	async dispatch(ctx: Context) {
		const pathname = ctx.url.path;
		const pathList = pathname.split("/").filter(Boolean);

		
		const handle = this.RegExpList.find((reg) => reg.test(ctx.url as unknown as string));
		if(handle) handleBlock: {
			const handler = this.get(handle) as typeof Handler | undefined;
			if(!handler) break handleBlock;
			const route = new handler(ctx, this);
			return route.dispatch();
		}



		if(!pathList.length) return undefined;


		
		

		

		


		const applet = this.get(pathList[0]);

		// console.log('route', Object.getPrototypeOf(route?.prototype));
		// console.log('route', applet);
		
		// console.log('route', this.entries(), route, Applet.get__method_list(route));
		if(!applet) return undefined;
		const route = new applet(ctx, this);

		const config = route.get__method_list(pathList[1]);
		// console.log('route', config, route[config.name]);
		let res = await route[config.name](ctx);
		if(!(res instanceof Response)) return new Response(JSON.stringify(res), {
			headers: { 'content-type': 'application/json' },
			status: 200,
			statusText: 'OK',
		});

		return res;
	}


	notFound(ctx: Context) {
		// response.writeHead(200, { 'Content-Type': 'text/plain' });
		// response.end(`Error: \n${ "notFound" }`);
	}



	beforeEach(callback: (ctx: Context)=>void) {
		
	}
}