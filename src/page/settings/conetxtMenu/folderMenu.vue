<template>
	<div class="border-t border-slate-400/20 px-3 py-3">

		<div @click="openView" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg>
			显示资源管理视图
		</div>

		<div @click="showItemInFolder" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg>
			在资源管理器中显示
		</div>
		<div @click="openFIle" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
			</svg>
			使用默认方式打开
		</div>


		<div @click="trashItem" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
			</svg>
			删除
		</div>
		
	</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, toRefs } from 'vue';
import { FileItem } from '../utils/filetype';

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




function openView() {
	// note://core.page.api/Code/index.html
	console.log("openView: ", `${root.value}${item.value.path}`, item.value.url);
	
	window.dispatchEvent(new CustomEvent('open-url-page', {
		// detail: `note://core.page.api/tools/Assets/index.html$${item.value.url}`,
		detail: `note://core.page.api/tools/Assets/index.html$${root.value + item.value.path}`,
	}));
	emit('close');
}

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
</script>
