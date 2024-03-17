<template>
	<div class="w-full h-full flex-0 bg-gray-50/80 dark:bg-gray-900/20 dark:text-white text-gray-600 flex overflow-hidden text-sm relative">
		<!-- <Filelist /> -->

		<div class="flex-1 h-full relative text-gray-300 dark:text-gray-800 overflow-hidden">
			<!-- <EditorView v-if="viewType == 'editor'" v-model:path="activePath" :fileList="fileList"/> -->

			
			<div v-if="viewType == 'editor'" class="w-full h-full flex flex-col items-center space-y-12 overflow-auto">
				
				<div class="max-w-550">
					<oYamlForm :template="ymlTemplate"/>
				</div>
			</div>
			<CodeView v-else-if="viewType == 'code'" v-model:path="activePath" :fileList="fileList" url="''"/>
		</div>

	

		<div class="w-full h-10 px-4 absolute left-0 bottom-0 flex flex-row items-center bg-white dark:bg-gray-800  border-t border-gray-200 dark:border-gray-600" style="z-index: 1000;">
			<div class="w-20 flex-0 dark:text-gray-400 text-gray-600">
				<!-- <button @click="parent" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="transform: translateY(-2px);" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.2773 16.2211C9.57 16.5142 9.56967 16.9891 9.27658 17.2818C8.98349 17.5745 8.50861 17.5742 8.21592 17.2811L3.21931 12.2776C2.92678 11.9847 2.92692 11.5101 3.21962 11.2174L8.21623 6.21972C8.50909 5.9268 8.98396 5.92675 9.27689 6.21962C9.56981 6.51248 9.56986 6.98735 9.277 7.28028L5.557 11H13.3988C14.9936 11 16.2099 11.242 17.2878 11.7645L17.5342 11.89C18.6427 12.4829 19.5171 13.3573 20.11 14.4658C20.7194 15.6053 21 16.8837 21 18.6012C21 19.0154 20.6642 19.3512 20.25 19.3512C19.8358 19.3512 19.5 19.0154 19.5 18.6012C19.5 17.1174 19.2723 16.0802 18.7872 15.1732C18.3342 14.3261 17.6739 13.6658 16.8268 13.2128C15.9895 12.765 15.0414 12.5365 13.7334 12.5041L13.3988 12.5H5.562L9.2773 16.2211Z"/>
					</svg>
				</button> -->
				<button class="w-10 h-10 text-xs leading-none rounded-full">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" data-inject-url="http://localhost:5173/resources/ico/reload.svg" data-v-3bf548a2="" reload="" class="m-auto">
						<path fill="currentColor" d="M12 4.5C16.1421 4.5 19.5 7.85786 19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 11.6236 4.52772 11.2538 4.58123 10.8923C4.64845 10.4382 4.31609 10 3.85708 10C3.48623 10 3.161 10.2562 3.10471 10.6228C3.03576 11.0718 3 11.5317 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C9.69494 3 7.59227 3.86656 6 5.29168V4.25C6 3.83579 5.66421 3.5 5.25 3.5C4.83579 3.5 4.5 3.83579 4.5 4.25V7.25C4.5 7.66421 4.83579 8 5.25 8H8.25C8.66421 8 9 7.66421 9 7.25C9 6.83579 8.66421 6.5 8.25 6.5H6.90093C8.23907 5.25883 10.0309 4.5 12 4.5Z"></path>
					</svg>
				</button>
			</div>
			
			<oBreadcrumbs v-model:path="activePath" class="flex-1 ml-4"/>


			<div class="w-32 flex-0 dark:text-gray-400 text-gray-600">
				<button @click="viewType = 'editor'" :class="viewType == 'list' ? ['text-primary-600'] : []" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.25 4C3.00736 4 2 5.00736 2 6.25V8.75C2 9.99264 3.00736 11 4.25 11H6.75C7.99264 11 9 9.99264 9 8.75V6.25C9 5.00736 7.99264 4 6.75 4H4.25ZM3.5 6.25C3.5 5.83579 3.83579 5.5 4.25 5.5H6.75C7.16421 5.5 7.5 5.83579 7.5 6.25V8.75C7.5 9.16421 7.16421 9.5 6.75 9.5H4.25C3.83579 9.5 3.5 9.16421 3.5 8.75V6.25ZM11.25 5C10.8358 5 10.5 5.33579 10.5 5.75C10.5 6.16421 10.8358 6.5 11.25 6.5H21.25C21.6642 6.5 22 6.16421 22 5.75C22 5.33579 21.6642 5 21.25 5H11.25ZM11.25 8C10.8358 8 10.5 8.33579 10.5 8.75C10.5 9.16421 10.8358 9.5 11.25 9.5H18.25C18.6642 9.5 19 9.16421 19 8.75C19 8.33579 18.6642 8 18.25 8H11.25ZM4.25 13C3.00736 13 2 14.0074 2 15.25V17.75C2 18.9926 3.00736 20 4.25 20H6.75C7.99264 20 9 18.9926 9 17.75V15.25C9 14.0074 7.99264 13 6.75 13H4.25ZM3.5 15.25C3.5 14.8358 3.83579 14.5 4.25 14.5H6.75C7.16421 14.5 7.5 14.8358 7.5 15.25V17.75C7.5 18.1642 7.16421 18.5 6.75 18.5H4.25C3.83579 18.5 3.5 18.1642 3.5 17.75V15.25ZM11.25 14C10.8358 14 10.5 14.3358 10.5 14.75C10.5 15.1642 10.8358 15.5 11.25 15.5H21.25C21.6642 15.5 22 15.1642 22 14.75C22 14.3358 21.6642 14 21.25 14H11.25ZM11.25 17C10.8358 17 10.5 17.3358 10.5 17.75C10.5 18.1642 10.8358 18.5 11.25 18.5H18.25C18.6642 18.5 19 18.1642 19 17.75C19 17.3358 18.6642 17 18.25 17H11.25Z"/>
					</svg>
				</button>
				<button @click="viewType = 'code'" :class="viewType == 'icon' ? ['text-primary-600'] : []" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.75 13C9.99264 13 11 14.0074 11 15.25V18.75C11 19.9926 9.99264 21 8.75 21H5.25C4.00736 21 3 19.9926 3 18.75V15.25C3 14.0074 4.00736 13 5.25 13H8.75ZM18.75 13C19.9926 13 21 14.0074 21 15.25V18.75C21 19.9926 19.9926 21 18.75 21H15.25C14.0074 21 13 19.9926 13 18.75V15.25C13 14.0074 14.0074 13 15.25 13H18.75ZM8.75 14.5H5.25C4.83579 14.5 4.5 14.8358 4.5 15.25V18.75C4.5 19.1642 4.83579 19.5 5.25 19.5H8.75C9.16421 19.5 9.5 19.1642 9.5 18.75V15.25C9.5 14.8358 9.16421 14.5 8.75 14.5ZM18.75 14.5H15.25C14.8358 14.5 14.5 14.8358 14.5 15.25V18.75C14.5 19.1642 14.8358 19.5 15.25 19.5H18.75C19.1642 19.5 19.5 19.1642 19.5 18.75V15.25C19.5 14.8358 19.1642 14.5 18.75 14.5ZM8.75 3C9.99264 3 11 4.00736 11 5.25V8.75C11 9.99264 9.99264 11 8.75 11H5.25C4.00736 11 3 9.99264 3 8.75V5.25C3 4.00736 4.00736 3 5.25 3H8.75ZM18.75 3C19.9926 3 21 4.00736 21 5.25V8.75C21 9.99264 19.9926 11 18.75 11H15.25C14.0074 11 13 9.99264 13 8.75V5.25C13 4.00736 14.0074 3 15.25 3H18.75ZM8.75 4.5H5.25C4.83579 4.5 4.5 4.83579 4.5 5.25V8.75C4.5 9.16421 4.83579 9.5 5.25 9.5H8.75C9.16421 9.5 9.5 9.16421 9.5 8.75V5.25C9.5 4.83579 9.16421 4.5 8.75 4.5ZM18.75 4.5H15.25C14.8358 4.5 14.5 4.83579 14.5 5.25V8.75C14.5 9.16421 14.8358 9.5 15.25 9.5H18.75C19.1642 9.5 19.5 9.16421 19.5 8.75V5.25C19.5 4.83579 19.1642 4.5 18.75 4.5Z"/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, toRaw, computed, watch, onMounted, markRaw, nextTick } from 'vue';

import yaml from "js-yaml";



import EditorView from './view/editor.vue';
import CodeView from './view/monaco/index.vue';

import { $xhr } from '@/GlobleAPI';
import { FileItem } from '@/view/FileList/utils/filetype';
import { Authority } from './authority';


import ymlTemplate from './welcome.yml?raw';

// const router = useRouter();
// const route = useRoute();
// const store = useStore();
const BASE_URL = computed(() => (window as any).BASE_URL ?? '暂无工作路径');

// const type = ref<string>('');
// const url = ref<string>('');


const activePath = ref<string>('');																		// 显示的目录
const rootPath = ref<string>('');
const fileList = ref<FileItem[]>([]);
const viewType = ref<string>('editor');




function dataStringify(data: any) {
	const interfaceList: any[] = Object.entries(data);
	return interfaceList.reduce((prev, [keys, config]) => {


		let params: any = {};

		if (/\[/.test(keys)) params = typeof config === "object" ? config : {
			key: keys.replace(/(.*\/)*([^\[]+).*/ig, "$2"),
			type: /\[/.test(keys) ? keys.replace(/(.*\[)*([^\]]+).*/ig, "$2") : 'string',
			value: /\=/.test(keys) ? keys.replace(/.+\=/, "") : undefined,
			description: config
		};// [type]
		else params = typeof config === "object" ? config : {
			key: keys,
			type: 'string',
			value: config,
			description: config
		};// string

		const { type, value, description = '', item = '', key = keys } = params;

		switch (type) {
			case 'array':
				let def = {
					"type": "array",
					"description": `${description} 数组`,
					"items": {
						"type": item,
						"description": description,
					},
				}
				if (typeof item === "string") prev[key] = ({
					string: def,
					number: def,
					boolean: def,
				} as any)[item as any];

				if (!Array.isArray(item) && typeof item === "object") prev[key] = {
					"type": "object",
					"value": typeof item,
					"properties": dataStringify(item),													// 对象
				};


				break;

			case 'object':
				prev[key] = {
					"type": "object",
					"title": `${description} 对象`,
					"properties": dataStringify(value),											// 对象
					"required": Object.keys(value),												// 必填项
				}
				break;

			case 'string':
			case 'number':
			case 'boolean':
				prev[key] = { key, type, value, description };
				break;
		}


		// if(Array.isArray()) 
		return prev;
	}, {} as any);


	// interfaceReq.reduce((prev, { key, type, value, description }) => {
	// 	// console.log(key, type, value, description);

	// 	prev[key] = { key, type, value, description };
	// 	return prev;
	// }, {} as any),
}

onMounted(() => {
	const authority = new Authority(window.BASE_URL);
	rootPath.value = `${authority.scheme}://${authority.host}`;
	activePath.value = authority.path;
});
</script>

<style lang="less" scoped>
.btn {
	display: inline-block;
	width: 24px;
	height: 24px;
	color: #fff;
	cursor: pointer;
	-webkit-app-region: no-drag;
	transition: color 0.2s;
	margin-left: -5px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	fill: currentColor;
	padding: 5px;

	// opacity: 0;
	position: absolute;
	// top: -15px;
	// right: -15px;

	color: rgb(235, 84, 84);
	background-color: #fff;

	&.home:hover {
		color: rgb(84, 235, 223);
		// background-color: rgba(255, 255, 255, 0.3);
	}

	&[disabled='disabled'] {
		color: #ccc;
		cursor: not-allowed;

		&:hover {
			color: #ccc;
			background-color: transparent;
		}
	}
}

.close {
	display: inline-block;
	width: 30px;
	height: 30px;
	color: #fff;
	cursor: pointer;
	-webkit-app-region: no-drag;
	transition: color 0.2s;
	margin-left: -5px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		color: rgb(235, 84, 84);
		background-color: rgba(255, 255, 255, 0.3);
	}
}
</style>
