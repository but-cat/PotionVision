import { createApp } from 'vue';

import '@/style/index.less';
import '@/style/tailwind.css';

import App from './index.vue';

import GlobleViewComponents from "../../src/view/index";
import GlobleComponents from "../../src/components/index";

function $xhr(url: string, options: any = {}) {
	return new Promise((resolve, reject) => {
		try {
			const oReq = new XMLHttpRequest();
			oReq.addEventListener("load", function reqListener() {
				if (this.status == 200) resolve(this.responseText);
			});
			oReq.open("GET", url);
			oReq.onerror = err => reject(err);
			oReq.send();
		} catch (error: any) {
			reject(error.message)
		}
	});
};

const app = createApp(App);


app.config.globalProperties.$xhr = $xhr;
(window as any).$xhr = $xhr;

app.use(GlobleViewComponents);
app.use(GlobleComponents);

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