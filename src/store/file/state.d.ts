import { FileBucket, FileItem, Folde } from "./bucket";

export default interface FileState {
	routePath: string;
	bucket: FileBucket;
	activeFolder?: Folde;
	activeItem?: FileItem | Folde;



	foceFile: Map<string, FileItem>;
}