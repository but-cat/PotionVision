<template>
	<div class="border-t border-slate-400/20 px-3 py-3">

		<div v-if="isHttpLink" @click="emit('close')" class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white cursor-pointer">
			<img src="~@icon/qr_code.svg" key="back" onload="SVGInject(this)" class="mr-2 h-5 w-5 flex-none text-slate-400" />
			生成二维码
		</div>


		<div @click="generateMarks" class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white cursor-pointer">
			<img src="~@icon/start.svg" key="back" onload="SVGInject(this)" class="mr-2 h-5 w-5 flex-none text-slate-400" />
			收藏该页面
		</div>

		<div v-if="isHttpLink" @click="generateArticles" class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white cursor-pointer">
			<img src="~@icon/book_letter.svg" key="back" onload="SVGInject(this)" class="mr-2 h-5 w-5 flex-none text-slate-400" />
			创建笔记
		</div>

		<div v-if="isHttpLink" @click="openLink" class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white cursor-pointer">
			<img src="~@icon/globe_search.svg" key="back" onload="SVGInject(this)" class="mr-2 h-5 w-5 flex-none text-slate-400" />
			使用默认浏览器打开
		</div>
		<div v-else-if="isToolsLink" @click="openLink" class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white cursor-pointer">
			<img src="~@icon/desktop.svg" key="back" onload="SVGInject(this)" class="mr-2 h-5 w-5 flex-none text-slate-400" />
			使用桌面程序打开
		</div>
		
	</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, toRefs, computed } from 'vue';
import { PageView as Page } from "@/store/page/webView/index";

const { shell } = require('electron');
const remote = require("@electron/remote");
const ipcRenderer = require('electron').ipcRenderer;
const win = remote.getCurrentWindow() as any;

const props = defineProps<{
	page: Page;
}>();
const { page } = toRefs(props);

const emit = defineEmits(['close']);

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties!;
const $edgebar = globalProperties.$edgebar;

// const httpRegex =
// 	'^((https|http)://)?' + //(https或http或ftp):// 可有可无
// 	"(([\\w_!~*'()\\.&=+$%-]+: )?[\\w_!~*'()\\.&=+$%-]+@)?" + //ftp的user@  可有可无
// 	'(([0-9]{1,3}\\.){3}[0-9]{1,3}' + // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
// 	'|' + // 允许IP和DOMAIN（域名）
// 	'(localhost|test)|' + //匹配localhost
// 	"([\\w_!~*'()-]+\\.)*" + // 域名- 至少一个[英文或数字_!~*\'()-]加上.
// 	'\\w+\\.' + // 一级域名 -英文或数字  加上.
// 	'[a-zA-Z]{1,9})' + // 顶级域名- 1-6位英文
// 	'(:[0-9]{1,5})?' + // 端口- :80 ,1-5位数字
// 	'((/?)|' + // url无参数结尾 - 斜杆或这没有
// 	"(/[\\w_!~*'()\\.;?:@&=+$,%#-]+)+/?)$"; //请求参数结尾- 英文或数字和[]内的各种字符

const httpRegex = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
const isHttpLink = computed(() => new RegExp(httpRegex, 'i').test(page.value.url ?? ''));

const toolsRegex =
	'^((tools|assets)://)?' + //(https或http或ftp):// 可有可无
	"(([\\w_!~*'()\\.&=+$%-]+: )?[\\w_!~*'()\\.&=+$%-]+@)?" + //ftp的user@  可有可无
	'(([0-9]{1,3}\\.){3}[0-9]{1,3}' + // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
	'|' + // 允许IP和DOMAIN（域名）
	'(localhost|test)|' + //匹配localhost
	"([\\w_!~*'()-]+\\.)*" + // 域名- 至少一个[英文或数字_!~*\'()-]加上.
	'\\w+\\.' + // 一级域名 -英文或数字  加上.
	'[a-zA-Z]{1,9})' + // 顶级域名- 1-6位英文
	'(:[0-9]{1,5})?' + // 端口- :80 ,1-5位数字
	'((/?)|' + // url无参数结尾 - 斜杆或这没有
	"(/[\\w_!~*'()\\.;?:@&=+$,%#-]+)+/?)$"; //请求参数结尾- 英文或数字和[]内的各种字符

const isToolsLink = computed(() => new RegExp(toolsRegex, 'i').test(page.value.url ?? ''));





function starPage() {
	win.bookmark.starPage(page.value.uuid);
	emit('close');
}

function generateArticles() {
	win.bookmark.generateArticles(page.value.uuid);
	emit('close');
}


function openLink() {
	shell.openExternal(page.value.url);
	emit('close');
}



async function generateMarks() {
	emit('close');

	const item_res = await fetch("assets://project.local/", {
			method: 'INFO',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	const item = await item_res.json();

	const res = await fetch(`${NAME}://bookmark.api/mark/generateMarks`, {
		method: 'POST',
		body: JSON.stringify({
			uuid: page.value.uuid,
			path: item.originPath,
		}),
	});


	fetch(item.url + '/', {
		method: 'UPDATE',
	});
	
	
	window.$news(`书签创建成功,请前往：'${item.originPath}' 处查阅`); // 通知更新
}
</script>
