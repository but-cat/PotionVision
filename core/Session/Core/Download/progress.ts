import { Applet, useRouter, useGet, usePost } from '../../../Session/utils/router/index';

// @useRouter
export default class progress extends Applet {

	/**
	 * 调用aria2c
	 * @param { string } uuid
	 * @returns
	 */
	// @useGet
	@usePost
	public async call() {
		try {
			const { session, body } = this.context;

			const options = await body.json();
			const apps = session.Apps;
			const { asia2 } = apps;

			const data = await asia2.call(...options);

			return new Response(JSON.stringify(data), {
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


	/**
	 * 添加下载链接
	 * @param { string } uuid
	 * @returns
	 */
	// @useGet
	@usePost
	public async addUrl() {
		try {
			const { session, body } = this.context;

			const options = await body.json();
			const apps = session.Apps;
			const { asia2 } = apps;

			const data = await asia2.addUri(options.url, options.dir);

			return new Response(JSON.stringify(data), {
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

	/**
	 * 获取活动的下载
	 * @param { string } uuid
	 * @returns
	 */
	@useGet
	public async tellActive() {
		console.log('getPage');

		const { session, url, body, domain, authority, scheme, host, port } = this.context;

		const apps = session.Apps;
		const { asia2 } = apps;

		// return this.tools.getPage(uuid);

		// return {
		//     2333: 2333
		// };

		const data = await asia2.tellActive();

		return new Response(JSON.stringify(data), {
			headers: { 'content-type': 'text/html' },
			status: 200,
			statusText: 'OK',
		});
	}

	/**
	 * 获取活动的下载
	 * @param { string } uuid
	 * @returns
	 */
	@useGet
	public async tellStatus(gid: string) {
		console.log('getPage');

		const { session, url, body, domain, authority, scheme, host, port } = this.context;

		const apps = session.Apps;
		const { asia2 } = apps;

		// return this.tools.getPage(uuid);

		// return {
		//     2333: 2333
		// };

		const data = await asia2.tellStatus();

		return new Response(JSON.stringify(data), {
			headers: { 'content-type': 'text/html' },
			status: 200,
			statusText: 'OK',
		});
	}




	/**
	 * 获取活动的下载
	 * @param { string } uuid
	 * @returns
	 */
	@useGet
	reloadAria2() {
		console.log('getPage');

		const { session, url, body, domain, authority, scheme, host, port } = this.context;

		const apps = session.Apps;
		const { asia2 } = apps;


		const data = asia2.reload();

		return new Response(JSON.stringify(data), {
			headers: { 'content-type': 'text/html' },
			status: 200,
			statusText: 'OK',
		});
	}
}
