import { Applet, useRouter, useGet, usePost } from '../../../Session/utils/router/index';
import parse from 'body/json';
import typeis from 'type-is';

import Context, { Authority } from "../../../Session/utils/context/index";

import { sortLikeWin } from "./utils";
import upath, { join } from 'upath';
import mime from "mime";
import { fileTypeFromBuffer, fileTypeFromFile, fileTypeFromStream } from 'file-type';
import { exec } from 'child_process';
const { promises: fs, statSync, readdirSync, createReadStream } = require('original-fs');








// @useRouter
export default class ftp extends Applet {






	/**
	 * 退出登录
	 * @returns 
	 */
	@usePost
	public async logout() {
		try {
			const { context } = this;
			const { session } = context;
			// const { ftp } = session.Assets;

			const options = await context.body.json();

            const videoPath = '05.mkv';
            const vttPath = '05.vtt';

            const res = await new Promise((resolve, reject) => {
                exec(`ffmpeg -i ${videoPath} -map 0:s:0 ${vttPath}`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        reject(error);
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        reject(stderr);
                    }
                    console.log(`stdout: ${stdout}`);
                    resolve(stdout);
                });
            });

			// const body = {};

			return new Response(JSON.stringify(res), {
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


