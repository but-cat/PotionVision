import axios from 'axios';
import { getToken } from './auth';

const TokenKey: string = import.meta.env.VITE_APP_TOKEN_KEY as string;

// 创建 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API as string, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 10000 // request timeout
});



// 请求拦截器
service.interceptors.request.use(
	(config: any) => {
		// 在发送请求之前做一些全局操作

		config.headers[TokenKey] = getToken();

		return config;
	},
	error => {
		console.log(error) // for debug
		return Promise.reject(error)
	}
)




// 响应拦截器
service.interceptors.response.use(
	/**
	 * 如果你想获取headers或者status等http信息请返回response => response
	 * Please return	response => response
	 */

	/**
	 * 通过HTTP Status Code判断状态
	 */
	response => {

		// 如果自定义代码不是200，则判断为错误。
		// if (response.data.code !== 200) {
		// 	// createMessage(response.data.message, 'error');
		// 	console.log("status", response.status);
		// 	return Promise.reject(new Error(response.data.message || 'Error'));
		// }

		return response.data;
	},
	error => {

		// console.log("%O", error);

		if (!error.response || error.response?.status == 0) {
			// createMessage('响应超时!请检查您的网络环境是否正常.', 'error');
			return Promise.reject('响应超时!请检查您的网络环境是否正常.');
		}
		const { response: { data }, response } = error;
		
		if (response.status >= 500) {
			// createMessage(data.message, 'error');
			return Promise.reject(new Error(data.message || 'Error'));
		}

		// createMessage('网络错误!请检查您的网络环境是否正常.', 'error');
		return Promise.reject(new Error(data.message || '网络错误!请检查您的网络环境是否正常.'));
	}
);


export default service as any;
