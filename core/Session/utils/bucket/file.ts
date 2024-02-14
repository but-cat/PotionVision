import { getUUID } from "./utils";
import { Folde } from "./folde";

export class FileItem {
	static reader = new FileReader();

	readonly uuid = getUUID();

	private readonly EventTarget = new EventTarget();

	readonly isFolder = false;
	readonly isFile = true;

	data?: string; // 文件内容
	name: string; // 文件名
	url: string; // 文件路径
	type: string; // 文件类型



	parent?: Folde; // 父级文件夹




	// target = content.replace(/^assets:\/\//, '');// 去除协议头 assets://s3al.local/file/README.tools.md => s3al.local/file/README.tools.md
	// extension = /\./.test(target) ? target.replace(/.+\./, "") : '';// 文件扩展名  assets://s3al.local/file/README.tools.md => md
	// resourcePath = content.replace(/^(\w+)?:\/\/(.*?)\//, ""); // 资源路径 assets://s3al.local/file/README.tools.md => file/README.tools.md
	// extFull = resourcePath.replace(/.+?\./, ""); // 完整扩展名  assets://s3al.local/file/README.tools.md => tools.md
	// mime = extension ? extName(target)[0].mime : 'text/plain';
	// name = target.replace(/(.*\/)*([^.]+).*/ig, "$2");// 文件名  assets://s3al.local/file/README.tools.md => README

	get path() {
		// return this.url.replace(/(.*\/)*([^.]+).*/ig, "$1");

		let path = `/${this.name}`;
		let parent = this.parent;
		while (parent!.name) {
			path = `/${parent!.name}${path}`;
			parent = parent!.parent;
		}
		return path;
	}

	get extension() {
		return this.name.replace(/.+\./, "")
	}

	constructor(file: File) {
		// this.data = data;
		// this.name = name;
		// this.url = url;
		// this.type = type;

		this.name = file.name;
		this.url = URL.createObjectURL(file);
		this.type = file.type;
		if(!this.type) {
			if(this.extension == 'yml') this.type = 'text/yaml';
		}
		// FileItem.reader.onload = (e) => {
		// 	this.data = e.target?.result as string;
		// };
		// FileItem.reader.readAsText(file);
	}
}