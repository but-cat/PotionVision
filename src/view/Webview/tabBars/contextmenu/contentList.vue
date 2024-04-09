<template>
	<div class="border-t border-slate-400/20 px-3 py-3">
		<div class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg>
			新建标签页
		</div>
		<div class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
			</svg>
			新建窗口
		</div>
		<div class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
			</svg>
			打开侧边栏
		</div>
		<div class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z">
				</path>
			</svg>
			打开开发者工具
		</div>

		<div class="flex items-center rounded-md p-1 hover:bg-primary-400/20 hover:text-white">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z">
				</path>
			</svg>
			打开浏览器开发者工具
		</div>

		<!-- <div @click="emit('newPage', 'orbit://settings.local/settings/index.html')" class="flex items-center rounded-md p-1.5 hover:bg-primary-400/20 hover:text-white">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z">
				</path>
			</svg>
			浏览器设置
		</div> -->

		<!-- <div v-for="item in searchEngineList" @click="search(item.url)" class="flex items-center rounded-md p-1.5 hover:bg-primary-400/20 hover:text-white">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path
					d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
				</path>
			</svg>
			{{ item.name }}
		</div> -->
	</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, toRefs } from 'vue';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties!;
const $edgebar = globalProperties.$edgebar;

const remote = require("@electron/remote");
</script>
