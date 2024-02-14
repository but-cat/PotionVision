<template>
	<div class="image-preview flex-1 h-full relative bg-gray-100 dark:bg-gray-900 text-gray-300 dark:text-gray-800">
		<!-- <img :src="url" ref="imgContent" alt="" class="opacity-0" /> -->
		<NPlayer :url="url"/>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, toRefs, computed, watch, onMounted } from 'vue';

const props = defineProps<{
	url: string;
}>();
const { url } = toRefs(props);
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