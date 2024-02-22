import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RouteLocationNormalized } from 'vue-router';
import store, { RootState } from "../index";
import PageState from "./state";
// import { FileBucket, Folde, FileItem } from "./bucket";

import TabItem from "./tabItem";

const state = {
	tabSet: new Map<string, TabItem>(),
	tabList: [],
	activeTab: "",
}


const mutations: MutationTree<PageState> = {

	addTabItem(state, url: string) {
		const item: TabItem = new TabItem(url);
		state.tabSet.set(item.uuid, item);
		state.activeTab = item.uuid;
		state.tabList.push(item.uuid);
	},


	setTabList(state, item: string[]) {
		console.log('file: ', item);
		state.tabList = item;
	},

	setActiveTab(state, item: TabItem) {
		state.activeTab = item.uuid;
	},


	setActiveTabUUID(state, uuid: string) {
		state.activeTab = uuid;
	},



	delTabItem(state, uuid: string) {
		state.tabSet.delete(uuid);
		const index = state.tabList.indexOf(uuid);
		state.tabList.splice(index, 1);

		if (state.activeTab === uuid) {
			state.activeTab = state.tabList[0];
		}
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