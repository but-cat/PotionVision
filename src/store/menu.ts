import { watch } from "vue";
import store from "./index";
import router from "../router";

import file from "./file/menu";// 文件
import help from "./help/menu";// 帮助






export default class appMenu extends Map {

	readonly defaultMenu = [
		file,
		"*",
		help
	]


	constructor(readonly menuConfig: Array<[string, any]> = []) {
		super();

		menuConfig.forEach(([key, item]) => this.set(key, item));


		document.addEventListener('app-ready', () => {
			watch(() => router.currentRoute.value.path, this.routerUpdate.bind(this));
		}, { once: true });
	}



	routerUpdate(path: string) {
		const pathName = /^\/([^\/]+)/.exec(path)?.[1];
		const menu = this.getMenu(`/${pathName}`);
		store.commit('updateAppMenu', menu);
	}

	getMenu(path: string = "/") {
		const menuList = this.defaultMenu.map(item => item == "*" ? this.get(path) : [item]).filter(item => item).flat();
		return menuList;
	}
};

// export default [
// 	file,
// 	// ...codeMenu,
// 	// add,
// 	// view,
// 	help
// ];
