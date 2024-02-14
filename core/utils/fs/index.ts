import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { promises as fs, statSync, readdirSync, constants } from 'node:fs';
import upath from 'upath';

export type AccessMode = typeof constants.R_OK | typeof constants.W_OK | typeof constants.X_OK | typeof constants.F_OK;

export type FileData = string | NodeJS.ArrayBufferView | ArrayBuffer | NodeJS.TypedArray | DataView | null;

/**
 * @class Assets
 */
export default class FileSystem extends EventTarget {
	// static readonly instance: Assets = new Assets;

	public static get isDev() {
		return is.dev;
	}

	public get isMac() {
		return process.platform === 'darwin';
	}

	asar = new Set<string>(); // asar 文件列表

	constructor(public readonly root: string) {
		super();
	}

	private resolve(paths: string) {
		const path = upath.normalize(paths);
		return upath.join(this.root, path);
	}

	/**
	 *
	 * @param { string } path
	 * @returns
	 */
	private async readDir(path: string) {
		const fullPath = this.resolve(path);
		const stat = await fs.stat(fullPath);

		if (!stat.isDirectory()) {
			throw new Error(`Cannot read file "${path}"`);
		}

		const files = await fs.readdir(fullPath);

		return files.map((file) => ({
			name: file,
			path: upath.join(path, file),
			stat: statSync(upath.join(fullPath, file)),
		}));
	}

	/**
	 * 测试用户对 path 指定的文件或目录的权限。
	 * mode 参数是可选的整数，指定要执行的可访问性检查。
	 * mode 应该是值 fs.constants.F_OK 或由 fs.constants.R_OK、fs.constants.W_OK 和 fs.constants.X_OK 中的任何一个（例如 fs.constants.W_OK | fs.constants.R_OK）的按位或组成的掩码。
	 * 查看文件访问的常量以获取可能的 mode 值。
	 * @param paths
	 * @returns
	 */
	public async access(paths: string, mode?: AccessMode) {
		const path = this.resolve(paths);
		try {
			await fs.access(path, mode);
			// console.log('can access');
		} catch {
			// console.error('cannot access');
		}
	}

	/**
	 *
	 * @param { string } paths
	 */
	public async appendFile(paths: string, data: FileData, options?: { encoding?: string | null; mode?: number | string; flag?: string }) {
		const path = this.resolve(paths);
		try {
            return await fs.appendFile(path, data, options);
		} catch {
            throw new Error(`Cannot append file "${path}"`);
        }
	}





	/**
	 * 读取文件
	 * @param { string } paths
	 * @returns
	 * @memberof Assets
	 * @example
	 */
	readFile(path: string, options?: { encoding?: null; flag?: string } | null): Promise<Buffer> {
		// const path = this.resolve(paths);
		return fs.readFile(path, options);
	}


	/**
	 * 读取文件或文件夹
	 * @param { string } path 路径
	 * @returns
	 */
	public async readdir(paths: string) {
		const path = this.resolve(paths);
		const fullPath = this.resolve(path);
		const stat = await fs.stat(fullPath);

		if (stat.isDirectory()) {
			return this.readDir(fullPath);
		} else {
			return this.readFile(fullPath);
		}
	}

	// public async readFile(paths: string) {
	// 	const path = this.resolve(paths);
	// 	const fullPath = this.resolve(path);
	// 	const stat = await fs.stat(fullPath);

	// 	if (stat.isDirectory()) {
	// 		throw new Error(`Cannot read directory "${path}"`);
	// 	}

	// 	return fs.readFile(fullPath);
	// }
}
