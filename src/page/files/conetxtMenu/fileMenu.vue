<template>
	<div class="border-t border-slate-400/20 px-3 py-3">
		

		

		<!-- <div v-if="extension == 'read'" @click="openReadView" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg>
			在阅读器中查看
		</div> -->

		<!-- <div v-if="item.name == 'manifest.json'" @click="openManifestView" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg>
			查看清单文件
		</div> -->



		

		<!-- <div @click="openView" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg>
			显示资源管理视图
		</div> -->

		

		<div @click="showItemInFolder" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<!-- <svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg> -->

			<svg class="mr-2 h-5 w-5 flex-none stroke-current fill-slate-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path d="M20.0005 9.50198V8.74988C20.0005 7.50724 18.9931 6.49988 17.7505 6.49988H12.0252L9.64417 4.51998C9.24008 4.18396 8.73112 4 8.20558 4H4.25006C3.00772 4 2.00049 5.00689 2.00006 6.24922L1.99609 17.7492C1.99567 18.9922 3.00315 20 4.24609 20H4.27245C4.27656 20 4.28068 20 4.2848 20H18.4698C19.2728 20 19.9727 19.4536 20.1675 18.6746L21.9174 11.6765C22.1936 10.572 21.3582 9.50198 20.2197 9.50198H20.0005ZM4.25006 5.5H8.20558C8.38076 5.5 8.55041 5.56132 8.68511 5.67333L11.2745 7.82655C11.4092 7.93855 11.5789 7.99988 11.7541 7.99988H17.7505C18.1647 7.99988 18.5005 8.33566 18.5005 8.74988V9.50198H6.42434C5.39184 9.50198 4.49186 10.2047 4.24149 11.2064L3.49732 14.1837L3.50006 6.24974C3.5002 5.83563 3.83595 5.5 4.25006 5.5ZM5.69672 11.5701C5.78018 11.2362 6.08017 11.002 6.42434 11.002H20.2197C20.3823 11.002 20.5017 11.1548 20.4622 11.3126L18.7123 18.3107C18.6845 18.422 18.5845 18.5 18.4698 18.5H4.2848C4.12216 18.5 4.00282 18.3472 4.04226 18.1894L5.69672 11.5701Z"></path>
			</svg>
			在资源管理器中显示
		</div>

		

		<div @click="openFIle" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<!-- <svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
			</svg> -->
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="15 14 20 9 15 4"></polyline>
				<path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
			</svg>
			使用默认方式打开
		</div>

		<div @click="rename" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<!-- <svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg> -->
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
			</svg>
			重命名
		</div>

		<div @click="deleteItem" class="flex items-center rounded-md p-1 hover:bg-red-400 text-red-400 hover:text-white cursor-pointer">
			<!-- <svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
			</svg> -->
			<svg class="mr-2 h-5 w-5 flex-none0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="3 6 5 6 21 6"></polyline>
				<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
				<line x1="10" y1="11" x2="10" y2="17"></line>
				<line x1="14" y1="11" x2="14" y2="17"></line>
			</svg>
			删除
		</div>
		
	</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, toRefs, computed } from 'vue';
import { FileItem } from '../utils/filetype';

const remote = require('@electron/remote');
const win = remote.getCurrentWindow() as any;

const { shell } = require('electron');
const upath = require("upath");
const nodePath = require("node:path");

const emit = defineEmits(['close', 'rename']);
const props = defineProps<{
	root: string;
	path: string;
	item: FileItem;
}>();
const { item, path, root } = toRefs(props);


const extension = computed(() => {
	const [_extension, extension] = item.value.path.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ?? [];
	return extension;
});


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


// function trashItem() {
// 	console.log("openFolder", upath.join(win.session.path, path.value));
// 	const filepath = nodePath. upath.join(win.session.path, path.value);
// 	shell.trashItem(nodePath.normalize(filepath));
// 	emit('close');
// }





function openReadView() {
	// console.log("openView: ", root.value, item.value);
	const workerFile = upath.join(root.value, item.value.path);
	// console.log("openReadView: ", workerFile);
	
	window.open(`${window.NAME}://core.page.api/view/Read/index.html$${item.value.url}`);
	// window.open(`${NAME}://core.page.api/view/Read/index.html`);
	emit('close');
}


function openManifestView() {
	// console.log("openView: ", root.value, item.value);
	const workerFile = upath.join(root.value, item.value.path);
	// console.log("openReadView: ", workerFile);
	
	window.open(`${window.NAME}://core.page.api/view/Manifest/index.html$${item.value.url}`);
	// window.open(`${NAME}://core.page.api/view/Read/index.html`);
	emit('close');
}


// function openView() {
// 	console.log("openView: ", root.value, item.value);
	
// 	const workerPath = upath.join(root.value, item.value.path).replace(/\.\w+$/,'');
	
// 	window.open(`${NAME}://core.page.api/view/Read/index.html$${workerPath}`);
// 	emit('close');
// }

// function openTerminal() {
// 	// console.log("openView: ", `${root.value}${item.value.path}`, item.value.url);
// 	const workerPath = upath.join(root.value, item.value.path).replace(/\.\w+$/,'');
	
// 	window.open(`${NAME}://core.page.api/view/Read/index.html$${workerPath}`);
// 	emit('close');
// }

function rename() {
	emit('rename');
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
</script>
