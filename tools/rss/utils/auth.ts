// import Cookies from 'js-cookie'
import service from "./request";

const localStorage = {
	Storage: new Map<string, string>(),
	getItem(key: string) {
		return this.Storage.get(key);
	},
	setItem(key: string, value: string) {
		this.Storage.set(key, value);
	},
	removeItem(key: string) {
		this.Storage.delete(key);
	}
}

const TokenKey: string = import.meta.env.VITE_APP_TOKEN_KEY as string;

export function getToken() {
	const token = localStorage.getItem(TokenKey);
	if (token) {
		service.defaults.headers[TokenKey] = token;
		return `Bearer ${token}`;
	} else return `Bearer ${'null'}`;
}

export function setToken(token: string) {
	service.defaults.headers[TokenKey] = token;
	return localStorage.setItem(TokenKey, String(token));
}

export function removeToken() {
	service.defaults.headers[TokenKey] = "";
	return localStorage.removeItem(TokenKey);
}


// (window as any).getToken = getToken;