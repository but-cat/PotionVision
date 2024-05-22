export default interface EditorState {
	xmlDoc: XMLDoc,
	xmlDocument: string,



	xmlString: string,

	document: Document | undefined,

	observer: MutationObserver;

	nodeList: Element[];

	itemList: NodeItem[];

	activeItem: Element | undefined;
	activeElement: Element | undefined;
}