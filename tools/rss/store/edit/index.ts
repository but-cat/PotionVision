import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from "../index";
import EditorState from "./state";
import { XMLDoc } from "./core";
import AppReady from "../../utils/appReady";


export const moduleNamespace = 'edit';

// import xmlStringRow from './test.xml?raw' assert { type: 'text' };



const state = {
	// xmlDoc: new XMLDoc(),
	xmlDocument: '',

	xmlString: "",

	document: undefined,

	// observer: new MutationObserver(callback),

	// nodeList = ref<Element[]>();

	itemList: [],

	activeItem: undefined,
	activeElement: undefined
}


const getters: GetterTree<EditorState, RootState> = {
	getCode: (state) => state.document?.documentElement.outerHTML || '',
}


const mutations: MutationTree<EditorState> = {
	initXmlDoc(state, xmlDoc: XMLDoc) {
		state.xmlDoc = xmlDoc;
	},


	parserXml(state, xmlCode: string) {
		console.log('xmlCode: ', xmlCode);
		
		state.xmlDoc.parser(xmlCode);
	},




	parser(state, xmlString: string) {
		// console.log('xmlString: ', xmlString);
		// const xmlDocument = XMLDoc.parser.parseFromString(xmlString, 'text/xml');

		const xmlDoc = state.xmlDoc;
		const xmlDocument = xmlDoc.parser(xmlString);

		// console.log('xmlDocument: ', xmlDocument);


		
		
		state.xmlString = xmlString;
		state.document = xmlDocument;
		state.nodeList = Array.from(xmlDocument.querySelectorAll('*'));

		// console.log('documentElement: ', xmlDocument.documentElement);

		state.itemList = Array.from(xmlDocument.querySelectorAll('rss > channel > item'));
		state.activeElement = state.itemList[0];
		state.activeItem = state.itemList[0];
		// console.log('itemList: ', itemList);
		// this.itemList.value = itemList;

		console.log('itemList: ', xmlDocument, state.itemList);
		

		// return this.nodeList.value;
	},

	setActiveItem(state, item: Element) {
		state.activeElement = item;
		state.activeItem = item;
	},
	setActiveElement(state, item: Element) {
		state.activeElement = item;
	},


	updateDocument(state) {
		console.log('updateDocument');
		state.xmlString = state.document?.documentElement.outerHTML || '';
		state.xmlDocument = state.xmlString;
	},
}

document.addEventListener('load', async (event) => {
	console.log('app-ready', event);
	const { store } = event as AppReady;

	const rssLink = (new URLSearchParams(location.search)).get('url');
	if (!rssLink) return;

	const res = await fetch(rssLink);
	const xmlStringRow = await res.text();

	store.commit(`${moduleNamespace}/initXmlDoc`, new XMLDoc(store));
	
	store.commit(`${moduleNamespace}/parser`, xmlStringRow);
});


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions: {
		
	},
}




// export * from "./menu";
export const routerPath = `/${moduleNamespace}`;