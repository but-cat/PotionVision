import { promises } from "node:fs";
import packageConfig from '@root/package.json';

import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';


// Custom APIs for renderer
const api = {
	getUserAgent() {
		return navigator.userAgent;
	},

    getSessionPath() {
        // console.log('getSessionPath', app.Orbit);
        
		return navigator.userAgent;
	},


    getPagePing() {
		const userAgent = navigator.userAgent;
		const ProjectWindow_UUID = userAgent.split(" ").find((item) => item.startsWith("tools/"))?.replace("tools/", "") || "";
		const ToolsView_UUID = userAgent.split(" ").find((item) => item.startsWith("view/"))?.replace("view/", "") || "";

        return ipcRenderer.invoke('PagePool:getWorkFile', ToolsView_UUID);
    },


	getWorkFile() {
		const userAgent = navigator.userAgent;
		// const ProjectWindow_UUID = userAgent.split(" ").find((item) => item.startsWith("tools/"))?.replace("tools/", "") || "";
		const ToolsView_UUID = userAgent.split(" ").find((item) => item.startsWith("view/"))?.replace("view/", "") || "";

        return ipcRenderer.invoke('PagePool:getWorkFile', ToolsView_UUID);
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



		(async () => {
			const userAgent = navigator.userAgent;
			// const ProjectWindow_UUID = userAgent.split(" ").find((item) => item.startsWith("tools/"))?.replace("tools/", "") || "";
			const ToolsView_UUID = userAgent.split(" ").find((item) => item.startsWith("view/"))?.replace("view/", "") || "";
			const BASE_URL = await ipcRenderer.invoke('PagePool:getWorkFile', ToolsView_UUID);

			contextBridge.exposeInMainWorld('BASE_URL', BASE_URL);


			contextBridge.exposeInMainWorld('getPageState', () => ipcRenderer.invoke('PagePool:getPageState', ToolsView_UUID));
			const PageState = await ipcRenderer.invoke('PagePool:getPageState', ToolsView_UUID);
			contextBridge.exposeInMainWorld('PageState', PageState);
			ipcRenderer.on('state-update', () => {
				console.log('preload state-update: ');
				contextBridge.exposeInMainWorld('PageState', PageState);
			});
		})();
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
