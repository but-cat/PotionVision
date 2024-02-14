import packageConfig from '@root/package.json';
import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';



export default class PreLoad extends Map<string, any> {


	/**
	 * 项目窗口 UUID
	 * @type { string }
	 * @description 用于区分不同项目窗口
	 * @example tools/uuid
	 */
	protected readonly ProjectWindow_UUID: string;

	/**
	 * 工具视图 UUID
	 * @type { string }
	 * @description 用于区分不同工具视图
	 * @example view/uuid
	 */
	protected readonly ToolsView_UUID: string;


	constructor(list: [string, any][], updata?: (key: (key: string, value: any) => void) => void){

		super(list);

		const userAgent = navigator.userAgent;
		this.ProjectWindow_UUID = userAgent.split(" ").find((item) => item.startsWith("tools/"))?.replace("tools/", "") || "";
		this.ToolsView_UUID = userAgent.split(" ").find((item) => item.startsWith("view/"))?.replace("view/", "") || "";


		
		// try {
		list.forEach(([key, value]) => {
		
			// const eventName = `${key.replace(/^@/, '')}:${this.ToolsView_UUID}`;
			

			// 如果是一个元素，表示是一个自定义元素
			// 预加载脚本在启用上下文隔离时无法使用 customElements.define
			// https://github.com/electron/electron/issues/17316
			if(/<([a-z]+?\-[a-z]+?)[^>]*>/gi.test(key)) {
				// const tagName = key.match(/<([a-z]+?\-[a-z]+?)[^>]*>/i)![1] as string;
				const tagName = key.replace(/[<|\/>]/g, "");
				const plugin: typeof HTMLElement = value;
				console.log('customElements.define', value);
				this.#defineElements(tagName, plugin);
			}

			// 如果带有 @: 前缀，表示是一个事件监听
			else if(/^@\:/.test(key) && typeof value === 'function') {
				const keyName = `${key.replace(/^@\:/, '')}`;

				ipcRenderer.on(keyName, () => {
					value( this.#setGlobal.bind(this) );
				});

				

				// await ipcRenderer.invoke('PagePool:getPageState', ToolsView_UUID)
			}
			
			// 如果带有 @ 前缀，表示是一个事件监听
			else if(/^@/.test(key)) {
				const eventName = `${key.replace(/^@/, '')}`;
				ipcRenderer.on(eventName, (event, data) => {
					// console.log('view-terminal-message', data);
					if(typeof data === 'function') data();
					if(typeof data === 'string') window.dispatchEvent(new CustomEvent(value, { detail: data }));
					else if(data instanceof EventTarget) data.dispatchEvent(new CustomEvent(eventName, { detail: data }));
					else window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
				});
			}
			
			else if(!/[@#%^&*\+\=\:\;\"\'\`]/.test(key)) this.#setGlobal(key, value);
		});
		// } catch (error) {
		// 	console.error(error);
		// }



		updata?.(this.#setGlobal.bind(this));

	}


	/**
	 * 设置全局变量
	 * @param { string } key 
	 * @param { any } value 
	 */
	async #setGlobal(key: string, value: any) {
		if(/[@#%^&*+]/.test(key)) throw new Error(`key: ${key} is not allowed`);
		if (process.contextIsolated) contextBridge.exposeInMainWorld(key, await value);
		else window[key] = await value;
	}



	async #defineElements(tagName: string, plugin: typeof HTMLElement) {
		if (process.contextIsolated) {
			this.#setGlobal('tagName', plugin);
			window.addEventListener('load', () => {
				console.log('customElements.define', tagName);
				console.log('customElements', document, window[`${tagName}`]);

				eval(`console.log('customElements - eval', customElements, window['${tagName}']);`);


				// const script = document.createElement('script');
				// // script.textContent = `console.log('customElements - script', customElements, window['${tagName}']);`;
				// script.textContent = `customElements.define('web-view', window['${tagName}']);`;
				// document.head.appendChild(script);


				
				
				// customElements.define(tagName, plugin);
			}, { once: true });
		} else {
			customElements.define(tagName, plugin);
		}
	}



	send(data) {
		ipcRenderer.send(`view-terminal-send:${this.ToolsView_UUID}`, data);
	}
}