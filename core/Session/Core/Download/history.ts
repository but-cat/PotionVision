import { Applet, useRouter, useGet } from "@/Session/utils/router/index";

// @useRouter
export default class history extends Applet {

    // static readonly name123 = 'api';

    // static readonly instance: Assets = new Assets;

    // public readonly session: Session;

    // public readonly fs: FileSystem;

    // public readonly db: Lowdb;

    // public readonly tools: Tools;

    // public readonly core: Core;

    // public readonly download: Download;

    // constructor() {
    //     super();

    //     // this.session = tools.session;
    //     // this.fs = tools.fs;
    //     // this.db = tools.db;
    //     // this.tools = tools;
    //     // this.core = tools.session.Core;
    //     // this.download = tools.session.Download;
    // }

    /**
     * 获取当前页面对象
     * @param { string } uuid 
     * @returns 
     */
    @useGet
    public async allList() {
        console.log('getPage');

		const { context, session } = this;
        
        // return this.tools.getPage(uuid);

        // return {
        //     2333: 2333
        // };



		const body = {
			2333: 2333
		};


		return new Response(JSON.stringify(body), {
			headers: { 'content-type': 'text/html' },
			status: 200,
			statusText: 'OK',
		});
    }


}