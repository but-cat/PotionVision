// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
// import { Store } from 'vuex';
// import {  } from "../store/index";

import AppReady from "@/utils/appReady";

interface AppEventListenerOrEventListenerObject extends EventListenerOrEventListenerObject {
	(evt: AppReady): void;
}

interface GlobalEventHandlersEventMap {
    "app-ready": AppReady;
}


declare module '@vue/runtime-core' {

	// provide typings for `this.$store`
	interface ComponentCustomProperties {
		$http: any;
		$refs: any;

		// $store: Store<RootState>
		foo: string;
	}


	interface Window {

		$news: (text: string, type?: number) => void;
	}

	interface Document {
		$news: (text: string, type?: number) => void;

		addEventListener: (type: GlobalEventHandlersEventMap, listener: AppEventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
	}
}