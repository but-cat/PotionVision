import { createStore } from 'vuex';


import file from "./file";// 文件
import page from "./page";// 页面
import help from "./help";// 帮助





// console.log('codeRouterPath: ', editMenu);



const storeConfig = {
	state: {
		// menu,
		// focusTarget: "2333",

		// menuConfig: menu
		// menuConfig: menu.getMenu(),
	},
	getters: {
		menuConfig(state: any) {
			return page;
		}
	},
	mutations: {
		updateAppMenu(state: any, menuConfig: any) {
			state.menuConfig = menuConfig;
		}
	},
	modules: {
		file,
		page,
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