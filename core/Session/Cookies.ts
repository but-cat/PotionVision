import { session, dialog } from 'electron';

export default class Cookies {
	// public readonly session: Electron.Session;

	constructor(public readonly session: Electron.Session) {
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
		this.session.cookies.get({ url: 'http://www.github.com' });
	}
	/**
	 * 清空缓存
	 */
	clearCookies() {
		this.session.clearStorageData({
			origin: 'http://www.github.com',
			storages: ['cookies'],
		});
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
			url: 'http://www.github.com',
			name: name,
			value: value,
			expirationDate: date,
		};
		this.session.cookies.set(cookie);
	}

	// getCookies()
}
