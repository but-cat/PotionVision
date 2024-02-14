import http from 'http';
import { networkInterfaces } from "os";

/**
 * 获取本机IP
 * @return {String} 返回本机IP
 */
export function getLocalIP() {
	const ipList = networkInterfaces();
	return ipList.en0?.find(i => i.family == 'IPv4')?.address;
}

/**
 * 获取公网IP
 * @param {Function} fn 异步获取结果后的回调函数
 */
export function getPublicIP(fn: ()=>number) {
	// http.get('http://ip.taobao.com/service/getIpInfo.php?ip=myip', function (req, res) {
	// 	typeof fn === 'function' && fn(res);
	// 	console.info(res);
	// });
}

export default {
	getLocalIP,
	getPublicIP
};