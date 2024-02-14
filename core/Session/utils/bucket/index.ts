// import store, { RootState } from '../../index';

import { FileItem } from "./file";
import { Folde } from "./folde";




export class FileBucket extends Folde {

	protected readonly EventTarget = new EventTarget();

	readonly name = '';

	constructor() {
		super('');
	}

	setFile(path: string, file: File) {
		// this.set(path, new FileItem(file));
		const fileName = path.replace(/(.*\/)*([^.]+).*/gi, '$2');
		const pathName = path.replace(/\/[^\/]+$/, '/');

		// console.log('setFile: ', pathName, fileName);
		
		const fileObject = new FileItem(file);
		const folder = this.hasFolder(pathName) ? this.getFolder(pathName)! : this.addFolder(pathName);
		folder.set(fileName, fileObject);
		fileObject.parent = folder;
	}

	getFile(path: string) {
		const fileName = path.replace(/(.*\/)*([^.]+).*/gi, '$2');
		const pathName = path.replace(/\/[^\/]+$/, '/');
		const folder = this.getFolder(pathName);
		if (folder) return folder.get(fileName);
		else return undefined;
		// return this.get(path);
	}

	delete(path: string): boolean {
		const fileName = path.replace(/(.*\/)*([^.]+).*/gi, '$2');
		const pathName = path.replace(/\/[^\/]+$/, '/');
		if (pathName == '/') return super.delete(fileName);
		else return this.getFolder(pathName)?.delete(fileName) ?? false;

		return super.delete(path);
	}



	hasFolder(pathName: string): boolean {
		if (pathName == '/') return true;
		const path = /^\//.test(pathName) ? pathName : `/${pathName}`;
		const pathNameList = path.split('/');
		pathNameList.shift();


		console.log('hasFolder: ', path, pathNameList, '1');

		let folder: Folde = this;
		for (let index = 0; index < pathNameList.length; index++) {
			const pathName = pathNameList[index];
			// folder = folder.getFolder(pathName)!;
			console.log('hasFolder loop: ', pathName, index, folder);
			
			if (!folder.has(pathName)) return false;
			else if(folder.get(pathName)?.isFile && index == (pathNameList.length - 1)) return true;
			else if(folder.get(pathName)?.isFolder && index == (pathNameList.length - 1)) return true;
			else if (folder.has(pathName) && index !== (pathNameList.length - 1) && folder.get(pathName)?.isFolder) {
				folder = folder.get(pathName) as Folde;
				continue;
			}
			else return false;
			
		}

		// if (this.name !== pathNameList[0]) throw new Error('路径错误');

		// 

		// if (!pathNameList[0]) return true;
		// else if (this.has(pathNameList[0])) return (this.get(pathNameList[0]) as Folde).hasFolder(pathNameList.join('/'));
		// else return false;

		return false;
	}

	addFolder(pathName: string): Folde {
		const path = /^\//.test(pathName) ? pathName : `/${pathName}`;
		const pathNameList = path.split('/');
		// console.log('path: ', path, pathNameList, '1');

		if (this.name !== pathNameList[0]) throw new Error('路径错误');

		pathNameList.shift();

		const folder = (this.get(pathNameList[0]) as Folde) ?? new Folde(pathNameList[0]);
		if (!this.has(folder.name)) this.set(folder.name, folder);
		folder.addFolder(pathNameList.join('/'));
		folder.parent = this;

		return this.getFolder(path)!;
	}

	getFolder(pathName: string): Folde | undefined {
		if (pathName == '/') return this;
		const path = /^\//.test(pathName) ? pathName : `/${pathName}`;
		const pathNameList = path.split('/');

		if (this.name !== pathNameList[0]) throw new Error('路径错误');

		pathNameList.shift();

		if (!pathNameList[0]) return this;
		else if (this.has(pathNameList[0])) return (this.get(pathNameList[0]) as Folde).getFolder(pathNameList.join('/'));
		else return undefined;
	}














	addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void {
		this.EventTarget.addEventListener(type, listener, options);
	}
	removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void {
		this.EventTarget.removeEventListener(type, callback, options);
	}

	dispatchEvent(event: Event | string): boolean {
		if (typeof event == 'string') event = new Event(event);
		return this.EventTarget.dispatchEvent(event);
	}
}

// (window as any).fileBucket = new FileBucket();



export * from './file';
export * from './folde';