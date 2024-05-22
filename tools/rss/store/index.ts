import { createStore } from 'vuex';

import edit from "./edit";// 编辑



const storeConfig = {
	state: {
		// focusTarget: "2333",

		// menuConfig: menu
	},
	// getters: {
	// 	menuConfig(state: any) {
	// 		return menu;
	// 	}
	// },
	modules: {
		edit
	}
} as any,
	storeApp: any = createStore(storeConfig);
Object.values(storeConfig.modules).forEach((moduleItem: any) => moduleItem?.create && moduleItem?.create?.call(storeApp, storeApp));


export interface RootState {
    version: string;
}


(window as any).store = storeApp;


export default storeApp;