<template>
	<div class="image-preview flex-1 h-full relative bg-gray-100 dark:bg-gray-900 text-gray-300 dark:text-gray-800">
		<!-- <img :src="url" ref="imgContent" alt="" class="opacity-0" /> -->
		<webview src="tools://preview3d.pre/index.html#model=assets://project.local/scene.gltf" :partition="partition" class="w-full h-full"></webview>
		<!-- <webview src="tools://preview3d.pre/index.html#model=assets://project.local/scene.gltf" partition="CCyoTFSZZdGVuYB" class="w-full h-full"></webview> -->
		<!-- <webview src="tools://preview3d.pre/index.html#model=assets://project.local/scene.gltf" class="w-full h-full"></webview> -->

		
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, toRefs, computed, watch, onMounted, nextTick } from 'vue';
// import Viewer from 'viewerjs';
// import 'viewerjs/dist/viewer.css';
// import { nextTick } from 'process';

const props = defineProps<{
	url: string;
}>();
const { url } = toRefs(props);

const partition = ref<Viewer>((window as any).SESSION_PARTITION);

watch(url, async () => {
	nextTick(() => {
		
	});
});

onMounted(() => {
	
});
</script>

<style lang="less" scoped>
.image-preview {
	background-image:
		linear-gradient(45deg, currentColor 25%, transparent 0, transparent 75%, currentColor 0),
		linear-gradient(45deg, currentColor 25%, transparent 0, transparent 75%, currentColor 0);
	background-position: 0 0, 10px 10px;
	background-size: 20px 20px;


	:deep(.viewer-fullscreen) {
		display: none;
	}
}
</style>