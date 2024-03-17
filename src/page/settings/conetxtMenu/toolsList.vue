<template>
	<div class="border-t border-slate-400/20 px-3 py-3">

		<div v-for="item in itemList" @click="openTools(item.url)" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<img class="mr-2 h-5 w-5 flex-none" :src="item.icon" alt="">
			{{ item.name }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, toRefs, onMounted } from 'vue';
import { FileItem } from '../utils/filetype';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties!;
const $edgebar = globalProperties.$edgebar;
const $xhr = globalProperties!.$xhr;

const remote = require("@electron/remote");

const emit = defineEmits(['close']);

const props = defineProps<{
	// path: string;
	item: FileItem;
}>();
const { item } = toRefs(props);


const itemList = ref<any[]>([]);



function openTools(url: string) {
	console.log("openTools", url, item.value.url);
	if(item.value.url) window.dispatchEvent(new CustomEvent('open-url-page', {
		// detail: `${url}$assets://project.local${paths.value}`,
		detail: `${url}$${item.value.url}`,
	}));
	emit('close');
}


onMounted(async () => {
	try {
		const res = await $xhr("note://tools.api/local/allList");
		itemList.value = res.toolsList;
		
	} catch (error) {
		console.log(error);
	}
})
</script>
