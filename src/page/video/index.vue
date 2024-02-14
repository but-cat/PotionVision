<template>
	<div class="video w-full h-full overflow-hidden">
		<div class="h-3/4">
			<NPlayer :url="options.url" :danmaku="options.danmaku" />
			<!-- <video :src="options.url" class="w-full h-full" controls></video> -->
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
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";

import Pagination from './pagination.vue';


const router = useRouter();
const route = useRoute();

const videoNumber = ref(1);



onBeforeRouteUpdate((to, from, next) => {
	console.log('to', to);
	console.log('from', from);
	console.log('next', next);
});

const options = reactive({
	url: ``,
	danmaku: ``,
});

// // const open = ref(true);

// watch(videoNumber, (value) => {
// 	localStorage.setItem('videoNumber', String(value));
// 	// open.value = false;
// 	options.url = `./video/${value}.mp4`;
// 	options.danmaku = `./video/P${value}.xml`;
// });


onMounted(() => {

	console.log('videoNumber', route.query);

	options.url = route.query.url as string;
	// options.url = 'https://www.runoob.com/try/demo_source/movie.mp4';
	// options.url = 'assets://project.local/SaveTwitter.Net%20-%201671478950722260993(720p).mp4'
	// options.url = 'assets://project.local/SaveTwitter.Net%20-%201671478950722260993(720p).mp04'
	
	const number = localStorage.getItem('videoNumber');
	if (number) {
		videoNumber.value = Number(number);
	}
});
</script>
