import { reactive, ref, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
const _fetch = window.fetch;

import Session from '../index';

export interface FetchOptions {
	mode: "cors" | "no-cors" | "same-origin";															// 请求的模式
	cache: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";			// 缓存模式
	credentials: "omit" | "same-origin" | "include";													// 凭证模式
	redirect: "follow" | "error" | "manual";															// 重定向模式
	referrer: "no-referrer" | "client";																	// referrer
	integrity: string;																					// 完整性校验
	keepalive: boolean;																					// 保持连接
	signal: AbortSignal;																				// 中止信号
}

export class Fetch {





	constructor(private readonly session: Session) {
		// super();
	}



	async get(url: string, options: any = {}) {

		const res = await this.session.session.fetch(url, {
			...options,
			method: "GET",
			
		});

		return await res.json();
	}



	async post(url: string, formData?: any, options: any = {}) {

		const res = await this.session.session.fetch(url, {
			...options,
			method: "POST",
			body: formData ?? JSON.stringify(formData),
		});
		return await res.json();
	}



	async put(url: string, formData: any, options: any = {}) {

		const res = await this.session.session.fetch(url, {
			...options,
			method: "PUT",
			body: JSON.stringify(formData),
		});
		return await res.json();
	}



	async delete(url: string, formData: any, options: any = {}) {

		const res = await this.session.session.fetch(url, {
			...options,
			method: "DELETE",
			body: JSON.stringify(formData),
		});
		return await res.json();
	}
}