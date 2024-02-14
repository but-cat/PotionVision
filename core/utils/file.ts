import path from 'node:path';
import { promises as fs } from 'node:fs';


/**
 * 判断文件夹是否存在，不存在则创建
 * @param reaPath 相对路径
 */
export async function exitsFolder(...reaPath: string[]) {
	const absPath = path.resolve(...reaPath);
	try {
		await fs.stat(absPath);
	} catch (e) {
		// 不存在文件夹，直接创建 {recursive: true} 这个配置项是配置自动创建多个文件夹
		await fs.mkdir(absPath, { recursive: true });
	}
};





export async function readFile(reaPath) {

}