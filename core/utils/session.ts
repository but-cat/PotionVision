const ipcRenderer = require('electron').ipcRenderer;
// const session = require('electron').remote.session;

import { Session } from "electron";

export default class {

	session: Session;

	
	constructor(session: Session) {
		this.session = session;
	}
	/**
	 * 保存用户名和密码
	 */
	// saveNameAndPassword() {
	// 	let name = document.getElementById('name').value;
	// 	let password = document.getElementById('password').value;
	// 	setCookie('name', name);
	// 	setCookie('password', password);
	// }
	/**
	 * 获得
	 */
	getCookies() {
		this.session.defaultSession.cookies.get({ url: "http://www.github.com" }, (error: any, cookies: any) => {
			console.log(cookies);
		});
	}
	/**
	 * 清空缓存
	 */
	clearCookies() {
		this.session.defaultSession.clearStorageData({
			origin: "http://www.github.com",
			storages: ['cookies']
		}, (error: any) => {
			if (error) console.error(error);
		})
	}

	/**
	 * 保存cookie
	 * @param name  cookie名称
	 * @param value cookie值
	 */
	setCookie(name: string, value: string) {
		let Days = 30;
		let exp = new Date();
		let date = Math.round(exp.getTime() / 1000) + Days * 24 * 60 * 60;
		const cookie = {
			url: "http://www.github.com",
			name: name,
			value: value,
			expirationDate: date
		};
		this.session.defaultSession.cookies.set(cookie, (error: any) => {
			if (error) console.error(error);
		});
	}

	// getCookies()
}