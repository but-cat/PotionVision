import packageConfig from '@root/package.json';
import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

import "./message";

// Custom APIs for renderer
const api = {
	getUserAgent() {
		return navigator.userAgent;
	}
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('NAME', packageConfig.name);
		contextBridge.exposeInMainWorld('APP', packageConfig.name);
		contextBridge.exposeInMainWorld('BASE_APP_NAME', packageConfig.name);
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('api', api);

		contextBridge.exposeInMainWorld('BASE_URL', "WEBUI_BASE_URL");
	} catch (error) {
		console.error(error);
	}
} else {

	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
	

	window.BASE_URL = "WEBUI_BASE_URL";
}
