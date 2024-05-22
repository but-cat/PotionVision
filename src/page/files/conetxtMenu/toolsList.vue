<template>
	<div class="border-t border-slate-400/20 px-3 py-3">

		<div v-if="extension == 'read'" @click="openReadView" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg>
			在阅读器中查看
		</div>

		<div v-if="extension == 'mark'" @click="openMark" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg>
			打开链接
		</div>

		<div v-if="item.name == 'manifest.json'" @click="openManifestView" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg>
			查看清单文件
		</div>

		<div class="flex flex-row">
			<div v-if="fitTools" @click="openTools(fitTools.url)" class="flex-1 flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
				<img class="mr-2 h-5 w-5 flex-none" :src="fitTools.icon" alt="">
				{{ fitTools.name }}
			</div>

			<div @click="openToolsList" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
				<svg class="w-4 h-4 ml-1 -rotate-90 text-slate-400" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 284.929 284.929" xml:space="preserve">
					<path fill="currentColor" d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
					L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
					c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
					c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"></path>
				</svg>
			</div>
		</div>

		<!-- <template v-if="!['read', 'mark'].includes(extension)">
			<div v-for="item in itemList" @click="openTools(item.url)" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
				<img class="mr-2 h-5 w-5 flex-none" :src="item.icon" alt="">
				{{ item.name }}
			</div>
		</template> -->

		
	</div>

	<oContextMenu v-if="position.open" :left="position.left" :top="position.top" @close="emit('close')">
		<div @click.stop class=" w-80 p-3 rounded-lg bg-white text-1 leading-5 text-slate-700 shadow-lg border border-slate-400/20 shadow-black/5 ring-slate-700/10 self-start space-y-1">
			<div v-for="item in itemList" @click="openTools(item.url)" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
				<img class="mr-2 h-5 w-5 flex-none" :src="item.icon" alt="">
				{{ item.name }}
			</div>
		</div>
	</oContextMenu>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, computed, toRefs, onMounted } from 'vue';
import { FileItem } from '../utils/filetype';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties!;
const $edgebar = globalProperties.$edgebar;
const $xhr = globalProperties!.$xhr;

const remote = require("@electron/remote");
const { shell } = require('electron');
const upath = require("upath");
const nodePath = require("node:path");

const emit = defineEmits(['close']);

const props = defineProps<{
	// path: string;
	item: FileItem;
}>();
const { item } = toRefs(props);


const itemList = ref<any[]>([]);
const position = ref<{ left: number; top: number, open: boolean }>({ left: 0, top: 0, open: false });

const fitTools = computed(() => {
	const tools = itemList.value.find((item) => item.manifest.extension.includes(extension.value));
	if (tools) return tools;
	else return itemList.value[0];
});

const extension = computed(() => {
	const [_extension, extension] = item.value.path.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ?? [];
	return extension;
});


function openTools(url: string) {
	console.log("openTools", url, item.value.url);
	// if(item.value.url) window.dispatchEvent(new CustomEvent('open-url-page', {
	// 	// detail: `${url}$assets://project.local${paths.value}`,
	// 	detail: `${url}$${item.value.url}`,
	// }));
	window.open(`${url}$${item.value.url}`);
	emit('close');
}


function openManifestView() {
	// console.log("openView: ", root.value, item.value);
	// const workerFile = upath.join(root.value, item.value.path);
	// console.log("openReadView: ", workerFile);
	
	window.open(`${window.NAME}://core.page.api/view/Manifest/index.html$${item.value.url}`);
	// window.open(`${NAME}://core.page.api/view/Read/index.html`);
	emit('close');
}


function openReadView() {
	// console.log("openView: ", root.value, item.value);
	// const workerFile = upath.join(root.value, item.value.path);
	// console.log("openReadView: ", workerFile);
	
	window.open(`${window.NAME}://core.page.api/view/Read/index.html$${item.value.url}`);
	// window.open(`${NAME}://core.page.api/view/Read/index.html`);
	emit('close');
}

async function openMark() {
	const res = await fetch(item.value.url);
	const data = await res.json();
	console.log("openMark", data);
	window.open(data.url);
	emit('close');
}



function openToolsList(event: MouseEvent) {
	position.value = {
		left: event.clientX + 10,
		top: event.clientY + 10,
		open: true,
	};
}

onMounted(async () => {
	try {
		// const res = await $xhr(`${NAME}://tools.api/local/allList`);
		const res = await fetch(`${window.NAME}://tools.api/local/allList`);
		const data = await res.json();
		itemList.value = data.toolsList;
		
	} catch (error) {
		console.log(error);
	}
})
</script>
