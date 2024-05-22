<template>
	<div class="border-t border-slate-400/20 px-3 py-3">



		<div @click="showItemInFolder" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="15 14 20 9 15 4"></polyline>
				<path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
			</svg>
			在资源管理器中显示
		</div>
		

		<div @click="createFile" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<!-- <svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg> -->
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
				<line x1="12" y1="11" x2="12" y2="17"></line>
				<line x1="9" y1="14" x2="15" y2="14"></line>
			</svg>
			创建文件
		</div>

		<template v-if="!isRoot">
			<div @click="rename" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
				<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
				</svg>
				重命名
			</div>

			<div @click="deleteItem" class="flex items-center rounded-md p-1 hover:bg-red-400 text-red-400 hover:text-white cursor-pointer">
				<svg class="mr-2 h-5 w-5 flex-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="3 6 5 6 21 6"></polyline>
					<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
					<line x1="10" y1="11" x2="10" y2="17"></line>
					<line x1="14" y1="11" x2="14" y2="17"></line>
				</svg>
				删除
			</div>
		</template>

		<!-- {{ String(isRoot) }}

		{{ item.path }}

		{{ root }} -->
		
	</div>

	
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, toRefs, computed } from 'vue';
import { FileItem } from '../utils/filetype';
import { PageView as Page } from "@/store/page/webView/index";
import { useStore } from 'vuex';
// import AddUrl from './addUrl.vue';
const store = useStore();

const remote = require('@electron/remote');
const win = remote.getCurrentWindow() as any;



const { shell } = require('electron');
const upath = require("upath");
const nodePath = require("node:path");

const emit = defineEmits(['close', 'create', 'rename']);
const props = defineProps<{
	root: string;
	path: string;
	item: FileItem;
}>();
const { item, path, root } = toRefs(props);

const active = computed(() => store.state.page.activeTab as string);
const page = computed(() => store.state.page.tabSet.get(active.value)! as Page);
const isWeb = computed(() => page.value?.type === "web");
const isRoot = computed(() => item.value.path === `/`);


function openFIle() {
	console.log("openFolder", upath.join(win.session.path, path.value));
	const filepath = upath.join(win.session.path, path.value);
	shell.openExternal(nodePath.normalize(filepath));
	emit('close');
}


function showItemInFolder() {
	console.log("openFolder", upath.join(win.session.path, path.value));
	const filepath = upath.join(win.session.path, path.value);
	shell.showItemInFolder(nodePath.normalize(filepath));
	emit('close');
}


function trashItem() {
	console.log("openFolder", upath.join(win.session.path, path.value));
	const filepath = nodePath. upath.join(win.session.path, path.value);
	shell.trashItem(nodePath.normalize(filepath));
	emit('close');
}


async function deleteItem() {
	emit('close');

	// const filepath = upath.join(win.session.path, path.value);

	try {
		const res = await fetch(item.value.url, {
			method: 'DELETE',
		});
		
		
		window.$news(`文件：'${item.value.originPath}' 已删除`); // 通知更新
	} catch (error) {
		console.error("error", error);
		window.$news(`文件 ${item.value.originPath} 删除失败`); // 通知更新
	}
}

function rename() {
	emit('rename');
	emit('close');
}


function createFile() {
	// fetch(`${item.value.url}2333.5`, {
	// 	method: 'PUT',
	// 	body: ''
	// });
	// openAddUrl.value = true;
	emit('create');
	emit('close');
}
</script>
