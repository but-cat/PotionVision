import { createApp } from 'vue';

import '@/style/index.less';
import '@/style/tailwind.css';

import App from './index.vue';

import GlobleViewComponents from "../../src/view/index";
import GlobleComponents from "../../src/components/index";

const app = createApp(App);

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

app.use(GlobleViewComponents);
app.use(GlobleComponents);

// app.config.globalProperties.$http = request;
app.mount('#app');