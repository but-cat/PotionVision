import { promises } from "node:fs";
import packageConfig from '@root/package.json';

import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';


import PreLoad from "../core";

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

const userAgent = navigator.userAgent;
// const ProjectWindow_UUID = userAgent.split(" ").find((item) => item.startsWith("tools/"))?.replace("tools/", "") || "";
const ToolsView_UUID = userAgent.split(" ").find((item) => item.startsWith("view/"))?.replace("view/", "") || "";



const data = new PreLoad([
	['NAME', packageConfig.name],
	['APP', packageConfig.name],
	['BASE_APP_NAME', packageConfig.name],
	['electron', electronAPI],
	['api', api],

	['BASE_URL', ipcRenderer.invoke('PagePool:getWorkFile', ToolsView_UUID)],
	['getPageState', () => ipcRenderer.invoke('PagePool:getPageState', ToolsView_UUID)],
	['PageState', ipcRenderer.invoke('PagePool:getPageState', ToolsView_UUID)],


	// ['<web-view/>', class extends HTMLElement {

	// 	aaa: string = '123';

	// 	constructor() {
	// 		super();
	// 		this.attachShadow({ mode: 'open' });
	// 		this.shadowRoot!.innerHTML = `<webview src="${this.getAttribute('src')}" style="width: 100%; height: 100%;"></webview>`;

	// 		const webview = this.shadowRoot!.querySelector('webview') as Electron.WebviewTag;
	// 	}
	// }],


	// ['@:state-update', async (setData: (key: string, value: any) => void, data: any) => {
	// 	setData('PageState', ipcRenderer.invoke('PagePool:getPageState', ToolsView_UUID));
	// }],

	// ['@:PageState', async (setData: (key: string, value: any) => void) => {
	// 	setData('PageState', await ipcRenderer.invoke('PagePool:getPageState', ToolsView_UUID));
	// 	ipcRenderer.on('state-update', () => setData('PageState', ''));
	// }],
], async (setData: (key: string, value: any) => void) => {
	setData('PageState', await ipcRenderer.invoke('PagePool:getPageState', ToolsView_UUID));
	ipcRenderer.on('state-update', () => setData('PageState', ''));
});


// const PageState = await ipcRenderer.invoke('PagePool:getPageState', ToolsView_UUID);
// ipcRenderer.on('state-update', () => {
// 	console.log('preload state-update: ');
// 	contextBridge.exposeInMainWorld('PageState', PageState);
// });



