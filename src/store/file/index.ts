import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RouteLocationNormalized } from 'vue-router';
import store, { RootState } from "../index";
import FileState from "./state";
import { FileBucket, Folde, FileItem } from "./bucket";

import AppReady from "@/utils/appReady";


const state = {
	baseUrl: 'assets://project.local/',
	routePath: '',
	bucket: new FileBucket(),
	activeFolder: undefined,
	activeItem: undefined,



	foceFile: new Map<string, FileItem>(),
}


const mutations: MutationTree<FileState> = {

	setBaseUrl(state, url: string) {
		state.baseUrl = url;
	},


	addFile(state, file: File, path?: string) {
		console.log('file: ', file);
		
		state.bucket.setFile(path ?? `/${file.name}`, file);

		// if(file.type == "text/xml") {
		// 	const reader = new FileReader();
		// 	reader.onload = (e) => store.commit("edit/parser", e.target!.result as string);
		// 	reader.readAsText(file);
		// }
	},


	readFileList(state, fileList: Map<string, File>) {
		
		fileList.forEach((file, path) => {
			console.log('readFileList: ', file);
			state.bucket.setFile(path ?? `/${file.name}`, file);
		});
	},


	setActiveFile(state, item: Folde | FileItem) {
		state.activeItem = item;
		// state.activeFolder = undefined;
	},



	routePath(state, path: string) {
		state.routePath = path;
		const item = state.bucket.get(path);
	},

	foceFile(state, item: Folde) {
		// router.getRoutes
		// state.foceFile.set(item.path, item);
	},
	saveFile(state, file: File) {
		// state.bucket.setFile(state.activeItem!.path, file);
	}
}

document.addEventListener('app-ready', (event) => {
	const { store, router } = event as AppReady;

	router.afterEach((to: RouteLocationNormalized) => {
		const path = /^\/([^\/]+)/.exec(to.path);
		store.commit(`file/routePath`, path ? path[1] : "");
	});
});


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

(window as any).fb = state.bucket;