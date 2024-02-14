<template>
	<div class="image-preview flex-1 h-full relative bg-gray-100 dark:bg-gray-900 text-gray-300 dark:text-gray-800">
		<img :src="url" ref="imgContent" alt="" class="opacity-0" />
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, toRefs, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import { nextTick } from 'process';



const store = useStore();
const activeFile = computed(() => store.state.file.activeItem.isFile ? store.state.file.activeItem : undefined);

const props = defineProps<{
	url: string;
}>();
const { url } = toRefs(props);
const viewer = ref(null as unknown as Viewer);

const imgContent = ref(null as unknown as HTMLDivElement);



watch(url, async () => {
	nextTick(() => {
		viewer.value?.update();
	});
});

onMounted(() => {
	// const image = new Image();
	// image.src = './0513b842e833d61d47755ac1893a3c34181804397.png';
	viewer.value = new Viewer(imgContent.value, {
		transition: false,
		backdrop: false,
		tooltip: false,
		interval: Infinity,
		inline: true,
		navbar: false,
		toolbar: {
			zoomIn: 4,
			zoomOut: 4,
			oneToOne: 4,
			rotateLeft: 4,
			// play: {
			// 	show: 4,
			// 	size: 'large',
			// },
			// prev: 4,
			// next: 4,
			reset: 4,
			rotateRight: 4,

			flipHorizontal: 4,
			flipVertical: 4,
			// download() {
			// 	const a = document.createElement('a');

			// 	a.href = viewer.image.src;
			// 	a.download = viewer.image.alt;
			// 	document.body.appendChild(a);
			// 	a.click();
			// 	document.body.removeChild(a);
			// },
		},
	});


	// viewer.view(index);
	viewer.value.show();
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