import { getUUID } from "./utils";
import { FileItem } from "./file";

export class Folde extends Map<string, FileItem | Folde> {

	readonly uuid = getUUID();

	protected readonly EventTarget = new EventTarget();

	readonly isFolder = true;
	readonly isFile = false;

	readonly type = "folder";

	parent?: Folde; // 父级文件夹

	get path() {
		// return ""
		let path = `/${this.name}`;
		let parent = this.parent;
		while (parent!.name) {
			path = `/${parent!.name}${path}`;
			parent = parent!.parent;
		}
		return path;
	}

	readonly extension = "";

	constructor(public name: string) {
		super();
	}

	setFile(path: string, file: File) {
		this.set(path, new FileItem(file));
	}

	getFile(path: string) {
		return this.get(path);
	}

	delete(path: string): boolean {
		return super.delete(path);
	}


	hasFolder(pathName: string): boolean {
		const path = /^\//.test(pathName) ? pathName : `/${pathName}`;
		const pathNameList = path.split('/');
		// console.log('path: ', path, pathNameList, '1');

		// if (this.name !== pathNameList[0]) throw new Error('路径错误');

		pathNameList.shift();

		if (!pathNameList[0]) return true;

		if (this.has(pathNameList[0])) return (this.get(pathNameList[0]) as Folde).hasFolder(pathNameList.join('/'));
		else return false;
	}

	addFolder(path: string) {
		// const path = /^\//.test(pathName) ? pathName : `/${pathName}`;
		const pathNameList = path.split('/');
		// console.log('path: ', path, pathNameList, '1');

		if (this.name !== pathNameList[0]) throw new Error('路径错误');

		pathNameList.shift();

		if (!pathNameList[0]) return this;

		const folder = (this.get(pathNameList[0]) as Folde) ?? new Folde(pathNameList[0]);
		if (!this.has(folder.name)) this.set(folder.name, folder);
		folder.addFolder(pathNameList.join('/'));
		folder.parent = this;

		return folder;
	}

	getFolder(path: string): Folde | undefined {
		const pathNameList = path.split('/');
		// console.log('path: ', path, pathNameList, '1');

		if (this.name !== pathNameList[0]) throw new Error('路径错误');

		pathNameList.shift();

		if (!pathNameList[0]) return this;
		else if (this.has(pathNameList[0])) return (this.get(pathNameList[0]) as Folde).getFolder(pathNameList.join('/'));
		else throw new Error('路径错误');
	}
}