<template>
	<div class="image-preview flex-1 h-full relative bg-gray-100 dark:bg-gray-900 text-gray-300 dark:text-gray-800 overflow-auto">
		<!-- <img :src="url" ref="imgContent" alt="" class="opacity-0" /> -->
		<HighlightJs :code="code" language="xml"></HighlightJs>


		<!-- <button @click="editorFIle" class="absolute top-10 right-10 pointer-events-auto rounded-md bg-primary-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-primary-500">打开</button> -->
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, toRefs, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
// import Viewer from 'viewerjs';
// import 'viewerjs/dist/viewer.css';


const route = useRoute();
const router = useRouter();
const store = useStore();
const activeFile = computed(() => store.state.file.activeItem.isFile ? store.state.file.activeItem : undefined);

const props = defineProps<{
	url: string;
}>();
const { url } = toRefs(props);

const code = ref(`<?xml version="1.0" encoding="UTF-8"?>`);

const imgContent = ref(null as unknown as HTMLDivElement);


function getUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function editorFIle() {
	console.log("activeFile: ", activeFile.value);
	
	router.push({
		name: 'Items',
		params: {
			fileName: activeFile.value.name,
			uuid: getUUID(),
		} as any,
	});
}


watch(() => url.value, async (val) => {
	if (!url.value) return;
	const res = await fetch(url.value);
	code.value = await res.text();
}, {
	immediate: true,
});
</script>

<style lang="less" scoped>
.image-preview {
	// background-image:
	// 	linear-gradient(45deg, currentColor 25%, transparent 0, transparent 75%, currentColor 0),
	// 	linear-gradient(45deg, currentColor 25%, transparent 0, transparent 75%, currentColor 0);
	// background-position: 0 0, 10px 10px;
	// background-size: 20px 20px;


	:deep(.viewer-fullscreen) {
		display: none;
	}
}
</style>