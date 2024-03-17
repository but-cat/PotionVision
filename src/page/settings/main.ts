import { createApp } from 'vue';

import '@/style/index.less';
import '@/style/tailwind.css';


import App from './index.vue';

import GlobleComponents from "@/components/index";

import Modal from './modal/index.vue';

const app = createApp(App);

console.log('app', app);

app.use(GlobleComponents);

function $xhr(url: string, options: any = {}) {
	return new Promise((resolve, reject) => {
		try {
			const oReq = new XMLHttpRequest();
			oReq.addEventListener("load", function reqListener() {
				if (this.status == 200) {
					// console.log("reqListener: ", JSON.parse(this.responseText));
					console.log("XMLHttpRequest: ", url);

					switch (options.type ?? "json") {
						case "json":
							resolve(JSON.parse(this.responseText));
							break;
						case "text":
							resolve(this.responseText);
							break;

						case "buffer":
						case "arraybuffer":
							resolve(this.response);
							break;
						default:
							resolve(this.response);
							break;
					}


				} else {
					if(this.responseText) resolve(JSON.parse(this.responseText));
				}
			});

			switch (options.type ?? "json") {
				case "json":
				case "text":
					oReq.responseType = "text";
					break;

				case "buffer":
				case "arraybuffer":
					oReq.responseType = "arraybuffer";
					break;
				default:
					
					break;
			}

			const formData = new FormData();
			formData.append("url", url);

			// oReq.open("GET", url);
			oReq.open("POST", url);
			oReq.onerror = reject;
			oReq.send(formData);
		} catch (error) {
			reject(error)
		}
	});
};

function $news(text: string, type: number = 0) {
	window.dispatchEvent(new CustomEvent('news', {
		detail: {
			text,
			type
		}
	}));
};

app.config.globalProperties.$news = $news;
(window as any).$news = $news;

app.config.globalProperties.$xhr = $xhr;
(window as any).$xhr = $xhr;




function setThemeClassWithSystem() {
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) 
		document.body.classList.add("dark");//深色主题
	else document.body.classList.remove("dark");//浅色主题
}

setTimeout(() => {
	setThemeClassWithSystem();
	
	window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', () => {
		setThemeClassWithSystem();
	});
}, 100);


// app.config.globalProperties.$http = request;
app.mount('#app');


const modal = createApp(Modal);
// modal.config.globalProperties.$ipcRenderer = ipcRenderer;
// modal.config.globalProperties.$sidebar = $sidebar;
modal.mount('#modal');