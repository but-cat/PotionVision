import { SingleNode } from '@/core/node';

export default abstract class {

	abstract compile(): {
		NodeList: SingleNode[];
		connectedList: any;
	};
	


	abstract save(): string;

	abstract load(data: string): void;
}



export interface XMLDocumentNode {

	/**
	 * 节点类型
	 */
	name: string;




	/**
	 * 节点属性
	 */
	// attributes: {

	/**
	 * 节点值
	 */
	value: string;
}


export interface XMLDocumentNode extends Element {
	
}