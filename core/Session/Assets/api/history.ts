import { Applet, useRouter, useGet, usePost } from '../../../Session/utils/router/index';
import AssetsLocal from '../local/index';
import ApiRouter from './index';

// @useRouter
export default class mark extends Applet {
	public get route() {
		return this.router as unknown as ApiRouter;
	}

	static hashCode(data: string) {
		let hash = 0;
		let i;
		let chr;

		if (data.length === 0) return hash;
		for (i = 0; i < data.length; i++) {
			chr = data.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return (hash <= 0 ? 'F' : '') + Math.abs(hash).toString(16);
	}

	/**
	 * 获取所有的资源列表
	 * @param { string } uuid
	 * @returns
	 */
	@useGet
	public async allList() {
		console.log('getPage');

		const { context, session, route } = this;

        // console.log('getPage', this.router.assets);

		const AssetsLocalList: typeof AssetsLocal[] = [];
		[...route.assets.entries()].forEach((_args) => {
            const [key, value] = _args as [key: string, value: typeof AssetsLocal];
			if (value.name instanceof RegExp) AssetsLocalList.push(value);
		});

		// return this.tools.getPage(uuid);

		// return {
		//     2333: 2333
		// };

		const body = {
            AssetsLocalList: AssetsLocalList.map((item) => {
                // return item.name.toString();
                return item.baseUrl;
            }),
		};

		return new Response(JSON.stringify(body.AssetsLocalList), {
			headers: { 'content-type': 'text/html' },
			status: 200,
			statusText: 'OK',
		});
	}


    /**
	 * 添加资源标记
	 * @param { string } uuid
	 * @returns
	 */
    @usePost
	public async addMark() {
		try {
			const { context, session, route } = this;
			

			const { domain, scheme } = context;

			const options = await context.body.json();
			const { basePath } = options;


            console.log('addMark', basePath);
            
            route.addBasePath(basePath);

			// const body = JSON.stringify({
			// 	2333: 2333,
			// });

			return new Response("OK", {
				headers: { 'content-type': 'text/html' },
				status: 200,
				statusText: 'OK',
			});
		} catch (error: any) {
			return new Response(error.message, {
				headers: { 'content-type': 'text/html' },
				status: 401,
				statusText: 'Rad Error',
			});
		}
	}
}
