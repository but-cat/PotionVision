import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RouteLocationNormalized } from 'vue-router';
import store, { RootState } from "../index";
import PageState from "./state";
// import { FileBucket, Folde, FileItem } from "./bucket";

import TabItem from "./tabItem";

const state = {
	tabList: new Map<string, TabItem>(),
	activeTab: "",
}


const mutations: MutationTree<PageState> = {

	addItem(state, url: string) {
		const item: TabItem = new TabItem(url);
		state.tabList.set(item.uuid, item);
		state.activeTab = item.uuid;
	},


	setTabList(state, item: TabItem) {
		console.log('file: ', item);
		state.tabList.set(item.uuid, item);
	},

	setActiveTab(state, item: TabItem) {
		state.activeTab = item.uuid;
	},



	delTabItem(state, item: TabItem) {
		state.tabList.delete(item.uuid);
	},
}



export default {
	namespaced: true,
	state,
	getters: {

	},
	mutations,
	actions: {

	},

	create(store: any) {
		
	},
};