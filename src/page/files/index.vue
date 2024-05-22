<template>
	<div class="w-full h-full flex-0 bg-gray-100/40 dark:bg-gray-900/40 dark:text-white text-gray-600 flex overflow-hidden text-sm relative">
		<!-- <Filelist /> -->

		<div class="flex-1 h-full relative  text-gray-300 dark:text-gray-800 overflow-hidden">
			<GalleryView v-if="viewType == 'gallery'" v-model:path="activePath" :fileList="fileList" :foceItem="foceItem" />
			<ListView v-else-if="viewType == 'list'" v-model:path="activePath" :fileList="fileList" :foceItem="foceItem"/>
			<IconView v-else-if="viewType == 'icon'" v-model:path="activePath" :fileList="fileList" :foceItem="foceItem" />
		</div>

		<div class="w-full h-10 px-4 absolute left-0 bottom-0 flex flex-row items-center bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
			<div class="w-20 flex-0 dark:text-gray-400 text-gray-600">
				<button @click="parent" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="transform: translateY(-2px)" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.2773 16.2211C9.57 16.5142 9.56967 16.9891 9.27658 17.2818C8.98349 17.5745 8.50861 17.5742 8.21592 17.2811L3.21931 12.2776C2.92678 11.9847 2.92692 11.5101 3.21962 11.2174L8.21623 6.21972C8.50909 5.9268 8.98396 5.92675 9.27689 6.21962C9.56981 6.51248 9.56986 6.98735 9.277 7.28028L5.557 11H13.3988C14.9936 11 16.2099 11.242 17.2878 11.7645L17.5342 11.89C18.6427 12.4829 19.5171 13.3573 20.11 14.4658C20.7194 15.6053 21 16.8837 21 18.6012C21 19.0154 20.6642 19.3512 20.25 19.3512C19.8358 19.3512 19.5 19.0154 19.5 18.6012C19.5 17.1174 19.2723 16.0802 18.7872 15.1732C18.3342 14.3261 17.6739 13.6658 16.8268 13.2128C15.9895 12.765 15.0414 12.5365 13.7334 12.5041L13.3988 12.5H5.562L9.2773 16.2211Z" />
					</svg>
				</button>
				<button @click="getDirInfo" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" data-inject-url="http://localhost:5173/resources/ico/reload.svg" data-v-3bf548a2="" reload="" class="m-auto">
						<path fill="currentColor" d="M12 4.5C16.1421 4.5 19.5 7.85786 19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 11.6236 4.52772 11.2538 4.58123 10.8923C4.64845 10.4382 4.31609 10 3.85708 10C3.48623 10 3.161 10.2562 3.10471 10.6228C3.03576 11.0718 3 11.5317 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C9.69494 3 7.59227 3.86656 6 5.29168V4.25C6 3.83579 5.66421 3.5 5.25 3.5C4.83579 3.5 4.5 3.83579 4.5 4.25V7.25C4.5 7.66421 4.83579 8 5.25 8H8.25C8.66421 8 9 7.66421 9 7.25C9 6.83579 8.66421 6.5 8.25 6.5H6.90093C8.23907 5.25883 10.0309 4.5 12 4.5Z"></path>
					</svg>
				</button>
			</div>

			<oBreadcrumbs v-model:path="activePath" class="flex-1 ml-4" />

			<div class="w-32 flex-0 dark:text-gray-400 text-gray-600">
				<button @click="viewType = 'list'" :class="viewType == 'list' ? ['text-primary-600'] : []" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.25 4C3.00736 4 2 5.00736 2 6.25V8.75C2 9.99264 3.00736 11 4.25 11H6.75C7.99264 11 9 9.99264 9 8.75V6.25C9 5.00736 7.99264 4 6.75 4H4.25ZM3.5 6.25C3.5 5.83579 3.83579 5.5 4.25 5.5H6.75C7.16421 5.5 7.5 5.83579 7.5 6.25V8.75C7.5 9.16421 7.16421 9.5 6.75 9.5H4.25C3.83579 9.5 3.5 9.16421 3.5 8.75V6.25ZM11.25 5C10.8358 5 10.5 5.33579 10.5 5.75C10.5 6.16421 10.8358 6.5 11.25 6.5H21.25C21.6642 6.5 22 6.16421 22 5.75C22 5.33579 21.6642 5 21.25 5H11.25ZM11.25 8C10.8358 8 10.5 8.33579 10.5 8.75C10.5 9.16421 10.8358 9.5 11.25 9.5H18.25C18.6642 9.5 19 9.16421 19 8.75C19 8.33579 18.6642 8 18.25 8H11.25ZM4.25 13C3.00736 13 2 14.0074 2 15.25V17.75C2 18.9926 3.00736 20 4.25 20H6.75C7.99264 20 9 18.9926 9 17.75V15.25C9 14.0074 7.99264 13 6.75 13H4.25ZM3.5 15.25C3.5 14.8358 3.83579 14.5 4.25 14.5H6.75C7.16421 14.5 7.5 14.8358 7.5 15.25V17.75C7.5 18.1642 7.16421 18.5 6.75 18.5H4.25C3.83579 18.5 3.5 18.1642 3.5 17.75V15.25ZM11.25 14C10.8358 14 10.5 14.3358 10.5 14.75C10.5 15.1642 10.8358 15.5 11.25 15.5H21.25C21.6642 15.5 22 15.1642 22 14.75C22 14.3358 21.6642 14 21.25 14H11.25ZM11.25 17C10.8358 17 10.5 17.3358 10.5 17.75C10.5 18.1642 10.8358 18.5 11.25 18.5H18.25C18.6642 18.5 19 18.1642 19 17.75C19 17.3358 18.6642 17 18.25 17H11.25Z" />
					</svg>
				</button>
				<button @click="viewType = 'icon'" :class="viewType == 'icon' ? ['text-primary-600'] : []" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.75 13C9.99264 13 11 14.0074 11 15.25V18.75C11 19.9926 9.99264 21 8.75 21H5.25C4.00736 21 3 19.9926 3 18.75V15.25C3 14.0074 4.00736 13 5.25 13H8.75ZM18.75 13C19.9926 13 21 14.0074 21 15.25V18.75C21 19.9926 19.9926 21 18.75 21H15.25C14.0074 21 13 19.9926 13 18.75V15.25C13 14.0074 14.0074 13 15.25 13H18.75ZM8.75 14.5H5.25C4.83579 14.5 4.5 14.8358 4.5 15.25V18.75C4.5 19.1642 4.83579 19.5 5.25 19.5H8.75C9.16421 19.5 9.5 19.1642 9.5 18.75V15.25C9.5 14.8358 9.16421 14.5 8.75 14.5ZM18.75 14.5H15.25C14.8358 14.5 14.5 14.8358 14.5 15.25V18.75C14.5 19.1642 14.8358 19.5 15.25 19.5H18.75C19.1642 19.5 19.5 19.1642 19.5 18.75V15.25C19.5 14.8358 19.1642 14.5 18.75 14.5ZM8.75 3C9.99264 3 11 4.00736 11 5.25V8.75C11 9.99264 9.99264 11 8.75 11H5.25C4.00736 11 3 9.99264 3 8.75V5.25C3 4.00736 4.00736 3 5.25 3H8.75ZM18.75 3C19.9926 3 21 4.00736 21 5.25V8.75C21 9.99264 19.9926 11 18.75 11H15.25C14.0074 11 13 9.99264 13 8.75V5.25C13 4.00736 14.0074 3 15.25 3H18.75ZM8.75 4.5H5.25C4.83579 4.5 4.5 4.83579 4.5 5.25V8.75C4.5 9.16421 4.83579 9.5 5.25 9.5H8.75C9.16421 9.5 9.5 9.16421 9.5 8.75V5.25C9.5 4.83579 9.16421 4.5 8.75 4.5ZM18.75 4.5H15.25C14.8358 4.5 14.5 4.83579 14.5 5.25V8.75C14.5 9.16421 14.8358 9.5 15.25 9.5H18.75C19.1642 9.5 19.5 9.16421 19.5 8.75V5.25C19.5 4.83579 19.1642 4.5 18.75 4.5Z" />
					</svg>
				</button>
				<!-- <button class="w-10 h-10 text-xs leading-none rounded-full">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M20.25 11.9932C21.2165 11.9932 22 12.7767 22 13.7432V16.2432C22 17.2097 21.2165 17.9932 20.25 17.9932H17.75C16.7835 17.9932 16 17.2097 16 16.2432V13.7432C16 12.7767 16.7835 11.9932 17.75 11.9932H20.25ZM6.25 11.9932C7.2165 11.9932 8 12.7767 8 13.7432V16.2432C8 17.2097 7.2165 17.9932 6.25 17.9932H3.75C2.7835 17.9932 2 17.2097 2 16.2432V13.7432C2 12.7767 2.7835 11.9932 3.75 11.9932H6.25ZM13.25 11.9932C14.2165 11.9932 15 12.7767 15 13.7432V16.2432C15 17.2097 14.2165 17.9932 13.25 17.9932H10.75C9.7835 17.9932 9 17.2097 9 16.2432V13.7432C9 12.7767 9.7835 11.9932 10.75 11.9932H13.25ZM20.25 13.4932H17.75C17.6119 13.4932 17.5 13.6051 17.5 13.7432V16.2432C17.5 16.3812 17.6119 16.4932 17.75 16.4932H20.25C20.3881 16.4932 20.5 16.3812 20.5 16.2432V13.7432C20.5 13.6051 20.3881 13.4932 20.25 13.4932ZM6.25 13.4932H3.75C3.61193 13.4932 3.5 13.6051 3.5 13.7432V16.2432C3.5 16.3812 3.61193 16.4932 3.75 16.4932H6.25C6.38807 16.4932 6.5 16.3812 6.5 16.2432V13.7432C6.5 13.6051 6.38807 13.4932 6.25 13.4932ZM13.25 13.4932H10.75C10.6119 13.4932 10.5 13.6051 10.5 13.7432V16.2432C10.5 16.3812 10.6119 16.4932 10.75 16.4932H13.25C13.3881 16.4932 13.5 16.3812 13.5 16.2432V13.7432C13.5 13.6051 13.3881 13.4932 13.25 13.4932ZM13.25 4.99316C14.2165 4.99316 15 5.77667 15 6.74316V9.24316C15 10.2097 14.2165 10.9932 13.25 10.9932H10.75C9.7835 10.9932 9 10.2097 9 9.24316V6.74316C9 5.77667 9.7835 4.99316 10.75 4.99316H13.25ZM20.25 4.99316C21.2165 4.99316 22 5.77667 22 6.74316V9.24316C22 10.2097 21.2165 10.9932 20.25 10.9932H17.75C16.7835 10.9932 16 10.2097 16 9.24316V6.74316C16 5.77667 16.7835 4.99316 17.75 4.99316H20.25ZM6.25 4.99316C7.2165 4.99316 8 5.77667 8 6.74316V9.24316C8 10.2097 7.2165 10.9932 6.25 10.9932H3.75C2.7835 10.9932 2 10.2097 2 9.24316V6.74316C2 5.82499 2.70711 5.07197 3.60647 4.99897L3.75 4.99316H6.25ZM13.25 6.49316H10.75C10.6119 6.49316 10.5 6.60509 10.5 6.74316V9.24316C10.5 9.38124 10.6119 9.49316 10.75 9.49316H13.25C13.3881 9.49316 13.5 9.38124 13.5 9.24316V6.74316C13.5 6.60509 13.3881 6.49316 13.25 6.49316ZM20.25 6.49316H17.75C17.6119 6.49316 17.5 6.60509 17.5 6.74316V9.24316C17.5 9.38124 17.6119 9.49316 17.75 9.49316H20.25C20.3881 9.49316 20.5 9.38124 20.5 9.24316V6.74316C20.5 6.60509 20.3881 6.49316 20.25 6.49316ZM6.25 6.49316H3.75L3.69268 6.49977C3.58223 6.52568 3.5 6.62482 3.5 6.74316V9.24316C3.5 9.38124 3.61193 9.49316 3.75 9.49316H6.25C6.38807 9.49316 6.5 9.38124 6.5 9.24316V6.74316C6.5 6.60509 6.38807 6.49316 6.25 6.49316Z"/>
					</svg>
				</button> -->

				<button @click="viewType = 'gallery'" :class="viewType == 'gallery' ? ['text-primary-600'] : []" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.25498 14.0045C10.2215 14.0045 11.005 14.788 11.005 15.7545V19.2535C11.005 20.2199 10.2215 21.0035 9.25498 21.0035H3.75C2.7835 21.0035 2 20.2199 2 19.2535V15.7545C2 14.788 2.7835 14.0045 3.75 14.0045H9.25498ZM20.25 14.0045C21.2165 14.0045 22 14.788 22 15.7545V19.2535C22 20.2199 21.2165 21.0035 20.25 21.0035H14.745C13.7785 21.0035 12.995 20.2199 12.995 19.2535V15.7545C12.995 14.788 13.7785 14.0045 14.745 14.0045H20.25ZM9.25498 15.5045H3.75C3.61193 15.5045 3.5 15.6165 3.5 15.7545V19.2535C3.5 19.3915 3.61193 19.5035 3.75 19.5035H9.25498C9.39306 19.5035 9.50498 19.3915 9.50498 19.2535V15.7545C9.50498 15.6165 9.39306 15.5045 9.25498 15.5045ZM20.25 15.5045H14.745C14.6069 15.5045 14.495 15.6165 14.495 15.7545V19.2535C14.495 19.3915 14.6069 19.5035 14.745 19.5035H20.25C20.3881 19.5035 20.5 19.3915 20.5 19.2535V15.7545C20.5 15.6165 20.3881 15.5045 20.25 15.5045ZM20.25 3C21.2165 3 22 3.7835 22 4.75V10.25C22 11.2165 21.2165 12 20.25 12H3.75C2.7835 12 2 11.2165 2 10.25V4.75C2 3.83183 2.70711 3.07881 3.60647 3.0058L3.75 3H20.25ZM20.25 4.5H3.75L3.69268 4.5066C3.58223 4.53251 3.5 4.63165 3.5 4.75V10.25C3.5 10.3881 3.61193 10.5 3.75 10.5H20.25C20.3881 10.5 20.5 10.3881 20.5 10.25V4.75C20.5 4.61193 20.3881 4.5 20.25 4.5Z" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, toRaw, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";



import GalleryView from './view/galleryView.vue';
import ListView from './view/listView.vue';
import IconView from './view/iconView.vue';


import { FileItem } from './utils/filetype';
import { Authority } from './utils/authority';

const BASE_URL = computed(() => (window as any).BASE_URL ?? '暂无工作路径');

const router = useRouter();
const route = useRoute();
const store = useStore();

const activePath = ref<string>(''); // 显示的目录
const rootPath = ref<string>('');
const fileList = ref<FileItem[]>([]);
const foceItem = ref<FileItem | null>(null);
const viewType = ref<string>('icon');




watch(() => store.state.file.baseUrl, (data) => {
	// console.log('store', data);
	const BASE_URL = data+'/';
	const authority = new Authority(BASE_URL);
	rootPath.value = `${authority.scheme}://${authority.host}`;
	activePath.value = authority.path;
	getDirInfo();
});


async function getDirInfo() {
	fileList.value = [];

	let dirInfo: any = { children: [] };
	try {
		const res = await fetch(`${rootPath.value}/${activePath.value}`, {
			method: 'DIRECTORY',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		// await wait();
		dirInfo = await res.json();
	} catch (error) {}

	if (!dirInfo.children.length) return;

	// dirInfo.children.sort((a, b) => sortLikeWin('name', a, b));

	// dirInfo.children.forEach((current: any) => {
	// 	fileList.value.push(new FileItem(current));
	// });

	for (let i = 0; i < dirInfo.children.length; i++) {
		const current = dirInfo.children[i];
		if(/\.\_/.test(current.name)) continue;
		fileList.value.push(new FileItem(current));
	}


	
}

async function getFolderInfo() {
	try {
		const res = await fetch(`${rootPath.value}/${activePath.value}`, {
			method: 'INFO',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		// await wait();
		const current = await res.json();
		foceItem.value = new FileItem(current);
		console.log(foceItem.value);
		
	} catch (error) {}
}

function parent() {
	activePath.value = activePath.value.replace(/\/[^\/]+$/, '');
}

function updateFloder() {
	getFolderInfo();
	getDirInfo();
}

watch(activePath, updateFloder);

onMounted(() => {
	const BASE_URL = store.state.file.baseUrl;
	const authority = new Authority(BASE_URL);
	rootPath.value = `${authority.scheme}://${authority.host}`;
	activePath.value = authority.path;
});


onMounted(async () => {
	window.addEventListener('file-update', updateFloder);
});

onBeforeUnmount(() => {
	window.removeEventListener('file-update', updateFloder);
});
</script>

<style lang="less" scoped></style>

<style lang="less">
*,
*:before,
*:after {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

html,
body,
#app {
	height: 100%;
	width: 100%;
	margin: 0;
	// padding: 50px;
	color: #eee9dc;
	font: 16px Verdana, sans-serif;
	// user-select: none;
}

.terminal {
	// height: 100%;
	width: 100%;
	flex: 1;
}
</style>
