<template>
	<oContextMenu :left="left" :top="top" @close="emit('close')">
		<div @click.stop ref="menuElement" class=" w-80 rounded-lg bg-white text-1 leading-5 text-slate-700 shadow-lg border border-slate-400/20 shadow-black/5 ring-slate-700/10 self-start">
			<object ref="objectEl" class="object absolute left-0 top-0 w-full h-full" type="text/html" data="about:blank" />
			<div tabindex="1" class="flex items-center px-3 py-2 text-slate-400">
				<!-- <FileIcon :name="path" class="w-5 h-5 flex-0" /> -->
				<FolderIcon v-if="item.isFolder" :name="item.name" :toolsPage="true" class="w-5 h-5 flex-0"/>
				<FileIcon v-else-if="item.isFile" :name="item.name" :toolsPage="true" class="w-5 h-5 flex-0"/>
				<span class="file-name ml-2 flex-1">{{ item.name }}</span>
			</div>

			<!-- <ToolsList v-if="item.isFile" @close="emit('close')" :item="item" /> -->
			
			<FileMenu v-if="item.isFile" @close="emit('close')" :path="path" :root="root" :item="item"/>
			<FolderMenu v-else-if="item.isFolder" @close="emit('close')" :path="path" :root="root" :item="item"/>

		</div>
	</oContextMenu>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, onMounted, onBeforeUnmount, nextTick, withDefaults, getCurrentInstance } from 'vue';
import ToolsList from './toolsList.vue';
import FileMenu from './fileMenu.vue';
import FolderMenu from './folderMenu.vue';

import { FileItem } from '../utils/filetype';

const emit = defineEmits(['close']);

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties!;
const $edgebar = globalProperties.$edgebar;


interface Props {
	root: string;
	// path: string;
	item: FileItem;
	left: number;
	top: number;
}


const props = withDefaults(defineProps<Props>(),
	{
		// rootPath: '',
		// root: '',
		left: 0,
		top: 0,
	},
);
const { left, top } = toRefs(props);

const objectEl = ref<HTMLObjectElement>();
const menuElement = ref<HTMLElement>();
const path = computed(() => props.item.path);
const fileName = computed(() => path.value.replace(/(.*\/)*([^.]+).*/gi, '$2'));


onMounted(() => {
	console.log("mounted", props);
	
})
</script>

<style scoped lang="less">
.file-name {
	white-space: nowrap;
	overflow: hidden;
	text-align: left;
	text-overflow: ellipsis;
}

.menu-element {
	transition: all 0.2s;
}

.object {
	display: block;
	// position: absolute;
	// top: 0;
	// left: 0;
	// height: 100%;
	// width: 100%;
	overflow: hidden;
	// opacity: 0;
	pointer-events: none;
	// z-index: -100;
	opacity: 0;
}
</style>