<template>
	<div class="border-t border-slate-400/20 px-3 py-3">
		<div @click="reload" class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white cursor-pointer">
			<img src="~@icon/reload.svg" reload onload="SVGInject(this)" class="mr-2 h-5 w-5 flex-none text-slate-400" />
			刷新页面
		</div>
		<div @click="goForward" class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white cursor-pointer">
			<img src="~@icon/forward.svg" key="forward" onload="SVGInject(this)" class="mr-2 h-5 w-5 flex-none text-slate-400" />
			前进
		</div>
		<div @click="goBack" class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white cursor-pointer">
			<img src="~@icon/back.svg" key="back" onload="SVGInject(this)" class="mr-2 h-5 w-5 flex-none text-slate-400" />
			后退
		</div>
		<div @click="openDevTools" class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white cursor-pointer">
			<img src="~@icon/devtools.svg" key="back" onload="SVGInject(this)" class="mr-2 h-5 w-5 flex-none text-slate-400" />
			打开开发者工具
		</div>

		<div @click="closePage" class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white cursor-pointer">
			<img src="~@icon/dismiss.svg" key="back" onload="SVGInject(this)" class="mr-2 h-5 w-5 flex-none text-slate-400" />
			关闭页面
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, toRefs } from 'vue';
import { PageView as Page } from "@/store/page/webView/index";

import { useStore } from 'vuex';
const store = useStore();

const emit = defineEmits(['close']);

const props = defineProps<{
	page: Page;
}>();
const { page } = toRefs(props);


function reload() {
	page.value!.webview!.reload();
	emit('close');
}

function goForward() {
	page.value!.webview!.goForward();
	emit('close');
}

function goBack() {
	page.value!.webview!.goBack();
	emit('close');
}

function openDevTools() {
	// window.dispatchEvent(new CustomEvent('open-devTools'));
	page.value!.webview!.openDevTools();
	emit('close');
}

function closePage() {
	store.commit('page/delWebView', page.value.uuid);
	emit('close');
}
</script>
