import { ref, nextTick, onMounted, watch, getCurrentInstance } from 'vue';
import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RouteLocationNormalized } from 'vue-router';
import store, { RootState } from "../index";
import PageState, { PageView } from "./state";
// import { FileBucket, Folde, FileItem } from "./bucket";

// import WebView from "./webView";
import { CoreView, WebView } from "./webView/index";

const ipcRenderer = require('electron').ipcRenderer;



const state = {
	tabSet: new Map<string, PageView>(),
	tabList: [],
	activeTab: "",
}



const mutations: MutationTree<PageState> = {

	addWebView(state, url: string) {
		const reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/);
		const [domain, scheme, host, port] = url.match(reg) ?? [];

		// const item: PageView = ['http', 'https'].includes(scheme) ? new ToolsView(url);
		const item: PageView = (() => {
			switch (scheme) {
				case 'apps':
				case window.NAME:
					return new CoreView(url);
					break;

				case 'http':
				case 'https':
				default:
					return new WebView(url);
					break;
			}
		})();
		state.tabSet.set(item.uuid, item);
		state.activeTab = item.uuid;
		state.tabList.push(item.uuid);
	},

	setTabList(state, item: string[]) {
		console.log('file: ', item);
		state.tabList = item;
	},

	setActiveTab(state, item: PageView) {
		const oldPage = state.tabSet.get(state.activeTab);
		if(oldPage) oldPage.style.display = "none";
		state.activeTab = item.uuid;
	},


	setActiveTabUUID(state, uuid: string) {
		[...state.tabSet.entries()].forEach(([key, value]) => {
			if (key === uuid) {
				state.activeTab = key;
				value.style.display = "block";
			} else {
				value.style.display = "none";
			}
		});
		state.activeTab = uuid;
	},



	openDevTools(state) {
		const item = state.tabSet.get(state.activeTab);
		item?.openDevTools();
	},

	delWebView(state, uuid: string) {
		
		const page = state.tabSet.get(uuid);
		page?.close();
		state.tabSet.delete(uuid);
		const index = state.tabList.indexOf(uuid);
		
		const activeIndex = index < state.tabList.length - 1 ? index : state.tabList.length - 2;
		// const activeUUID = state.tabList[activeIndex];

		state.tabList.splice(index, 1);
		

		setTimeout(() => {
			const activeUUID = state.tabList[activeIndex];
			state.activeTab = activeUUID;
			const activePage = state.tabSet.get(activeUUID);
			if(activePage) activePage!.style.display = "block";
		})
	},



	delAllWebView(state) {
		state.activeTab = "";
		state.tabList.forEach((uuid: string) => {
			const page = state.tabSet.get(uuid);
			page?.close();
			state.tabSet.delete(uuid);
			const index = state.tabList.indexOf(uuid);
			
			state.tabList.splice(index, 1);
		});
	}
}


const getters: GetterTree<PageState, RootState> = {
	activeTab(state) {
		return state.tabSet.get(state.activeTab);
	},
}



export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions: {

	},

	create(store: any) {
		ipcRenderer.on('new-page', (event, url: string) => {
			store.commit('page/addWebView', url);
		});

		ipcRenderer.on('close-page', (event, uuid: string) => {
			store.commit('page/delWebView', uuid);
		});

		window.addEventListener('unload', () => {
			ipcRenderer.removeAllListeners('new-page');
			ipcRenderer.removeAllListeners('close-page');
			store.commit('page/delAllWebView');
		});


		


		store.commit('page/addWebView', 'https://mikanani.me/');
	},
};



