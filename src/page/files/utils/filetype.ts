

export class FileItem {
	uuid: string;				// 唯一标识
	path: string;				// 路径
	name: string;				// 名称
	isSubNode: boolean;			// 是否有子节点
	tabSize: number;			// 缩进
	// element: Element;
	isFolder: boolean;			// 是否是文件夹
	isFile: boolean;			// 是否是文件
	extension: string;			// 文件扩展名
	// target: Folde | FileItem;	// 对应的文件对象

	originPath: string;			// 原始路径


	size: number;				// 文件大小
	modifyTime: string;			// 
	accessTime: number;			// 
	// loading: boolean;				// 是否加载

	url: string;

	mime: string;


	constructor(current: any) {
		this.name = current?.name || 'root';
		this.path = current?.path;
		this.tabSize = current?.path.split('/').length - 2;
		// isSubNode = current?.isFolder && !!current.size,
		// isSubNode = current?.isDirectory,
		this.isSubNode = current.isSubNode;
		this.isFolder = current?.isDirectory;
		this.isFile = current?.isFile;

		const [_extension, extension] = current.path.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ?? [];
		this.extension = extension || '';
		this.uuid = current?.uuid;
		// target = current,

		this.originPath = current?.originPath;
		this.size = current?.size;
		
		this.accessTime = current?.accessTime;

		
		
		// this.mime = mime.getType(extension) || '';
		this.mime = current.mime;


		const modifyTime = new Date(current?.modifyTime);
		this.modifyTime = `${modifyTime.getFullYear()}-${modifyTime.getMonth() + 1}-${modifyTime.getDate()} ${modifyTime.getHours()}:${modifyTime.getMinutes()}:${modifyTime.getSeconds()}`;


		// loading = false,

		this.url = current?.url;
	}

}


