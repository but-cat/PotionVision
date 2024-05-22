<template>
	<div v-if="isWeb" class="border-t border-slate-400/20 px-3 py-3">

		<div v-if="isWeb" @click="generateArticles" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<!-- <svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg> -->
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
			</svg>
			创建笔记
		</div>

		<div v-if="isWeb" @click="generateMarks" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<!-- <svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg> -->
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z">
				</path>
			</svg>
			创建书签
		</div>

		<!-- <div @click="openView" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg>
			显示书签视图
		</div> -->

		<!-- <div @click="2c -->
		
	</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, toRefs, computed } from 'vue';
import { FileItem } from '../utils/filetype';
import { PageView as Page } from "@/store/page/webView/index";
import { useStore } from 'vuex';
const store = useStore();

const remote = require('@electron/remote');
const win = remote.getCurrentWindow() as any;


const { shell } = require('electron');
const upath = require("upath");
const nodePath = require("node:path");

const emit = defineEmits(['close']);
const props = defineProps<{
	root: string;
	path: string;
	item: FileItem;
}>();
const { item, path, root } = toRefs(props);

const active = computed(() => store.state.page.activeTab as string);
const page = computed(() => store.state.page.tabSet.get(active.value)! as Page);
const isWeb = computed(() => page.value?.type === "web");

function openView() {
	window.open(`${window.NAME}://core.page.api/view/Bookmark/index.html$${item.value.url}`);
	emit('close');
}

async function generateArticles() {
	const win = remote.getCurrentWindow() as any;
	// console.log("generateArticles", item.value);
	win.bookmark.generateArticles(page.value.uuid, item.value.originPath);
	emit('close');

	const res = await fetch(`${window.NAME}://bookmark.api/read/generateArticles`, {
		method: 'POST',
		body: JSON.stringify({
			uuid: page.value.uuid,
			path: item.value.originPath,
		}),
	});
	fetch(item.value.url + '/', {
		method: 'UPDATE',
	});
	
	window.$news(`笔记创建成功,请前往：'${item.value.originPath}' 处查阅`); // 通知更新
}

async function generateMarks() {
	emit('close');

	const res = await fetch(`${window.NAME}://bookmark.api/mark/generateMarks`, {
		method: 'POST',
		body: JSON.stringify({
			uuid: page.value.uuid,
			path: item.value.originPath,
		}),
	});


	fetch(item.value.url + '/', {
		method: 'UPDATE',
	});
	
	
	window.$news(`书签创建成功,请前往：'${item.value.originPath}' 处查阅`); // 通知更新
}
</script>
