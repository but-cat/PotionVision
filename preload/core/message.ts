// const { contextBridge, ipcRenderer } = require('electron/renderer');
import { contextBridge, ipcRenderer } from 'electron';



class Terminal extends EventTarget {

	readonly ProjectWindow_UUID: string;

	readonly #ToolsView_UUID: string;

	constructor() {
		super();

		const userAgent = navigator.userAgent;
		this.ProjectWindow_UUID = userAgent.split(" ").find((item) => item.startsWith("tools/"))?.replace("tools/", "") || "";
		this.#ToolsView_UUID = userAgent.split(" ").find((item) => item.startsWith("view/"))?.replace("view/", "") || "";


		ipcRenderer.send(`view-terminal-create:${this.#ToolsView_UUID}`);



		ipcRenderer.on(`view-terminal-message:${this.#ToolsView_UUID}`, (event, data) => {
			console.log('view-terminal-message', data);
			
			this.dispatchEvent(new CustomEvent('message', { detail: data }));
		});



	}
	send(data) {
		ipcRenderer.send(`view-terminal-send:${this.#ToolsView_UUID}`, data);
	}
	close() {
		ipcRenderer.send(`view-terminal-close:${this.#ToolsView_UUID}`);
	}


	resize(cols, rows) {
		ipcRenderer.send(`view-terminal-resize:${this.#ToolsView_UUID}`, { cols, rows });
	}
}







// contextBridge.exposeInMainWorld('Terminal', Terminal);
if (process.contextIsolated) {

	// contextBridge.exposeInMainWorld('Terminal', Terminal);
	contextBridge.exposeInMainWorld('terminal', new Terminal);
	console.log('Terminal init');
	
} else {
	// @ts-ignore
	window.Terminal = Terminal;
	// window.terminal = new Terminal;
}