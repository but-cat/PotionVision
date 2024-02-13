import { createStore } from 'vuex';


import file from "./file";// 文件
import help from "./help";// 帮助

import menuList from "./menu";


import code, { menu as codeMenu, routerPath as codeRouterPath } from "@/page/Code/store";
import edit, { menu as editMenu, routerPath as editRouterPath } from "@/page/Items/store";

import textrue, { menu as textrueMenu, routerPath as textrueRouterPath } from "@/page/Textrue/store";


// console.log('codeRouterPath: ', editMenu);

export const menu = new menuList([

	[codeRouterPath, codeMenu],
	[editRouterPath, editMenu],
	[textrueRouterPath, textrueMenu],

]);


const storeConfig = {
	state: {
		menu,
		// focusTarget: "2333",

		// menuConfig: menu
		menuConfig: menu.getMenu(),
	},
	getters: {
		menuConfig(state: any) {
			return menu;
		}
	},
	mutations: {
		updateAppMenu(state: any, menuConfig: any) {
			state.menuConfig = menuConfig;
		}
	},
	modules: {
		// Core,
		file,
		// editStore,
		edit,

		code,
		textrue,
		// textrueStore,
		// Add,
		// view,
		help
	}
} as any,
	storeApp = createStore(storeConfig);
Object.values(storeConfig.modules).forEach((moduleItem: any) => moduleItem?.create && moduleItem?.create?.call(storeApp, storeApp));


export interface RootState {
    version: string;
}


(window as any).store = storeApp;


export default storeApp;