<template>
	<div class="video w-full h-full overflow-hidden">
		<div class="h-3/4">
			<NPlayer :url="options.url" :danmaku="options.danmaku" />
		</div>

		<div class="flex-1 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6">
			<div class="flex flex-1 justify-between sm:hidden">
				<a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
				<a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
			</div>
			<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p class="text-sm text-gray-700 dark:text-gray-300">神探狄仁杰2</p>
				</div>
				<div>
					<Pagination v-model="videoNumber" :max="40" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, watch, getCurrentInstance, onMounted, IframeHTMLAttributes } from 'vue';
import Pagination from './pagination.vue';
const videoNumber = ref(1);

const options = reactive({
	url: `./video/${videoNumber.value}.mp4`,
	danmaku: `./video/P${videoNumber.value}.xml`,
});

// const open = ref(true);

watch(videoNumber, (value) => {
	localStorage.setItem('videoNumber', String(value));
	// open.value = false;
	options.url = `./video/${value}.mp4`;
	options.danmaku = `./video/P${value}.xml`;
});


onMounted(() => {
	const number = localStorage.getItem('videoNumber');
	if (number) {
		console.log('number', number);
		
		videoNumber.value = Number(number);
	}
});
</script>
