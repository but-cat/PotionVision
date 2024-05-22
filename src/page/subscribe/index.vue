<template>
	<div class="w-full h-full bg-gray-50/60 dark:bg-gray-900/40 relative isolate overflow-hidden">
		<!-- <img src="https://cn.bing.com/th?id=OHR.FolegandrosGreece_ZH-CN7803666477_1920x1080.webp&qlt=50" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center" /> -->

		<div class="w-full h-full py-32 overflow-auto">
			<!-- <div class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
				<div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
			</div> -->
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl lg:mx-0">
					<h2 class="text-4xl font-bold tracking-tight text-gray-600 dark:text-white sm:text-6xl">RSS订阅源</h2>
					<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">您可以在BT站点中添加RSS订阅</p>
				</div>
			</div>

			<!-- <HistoryList /> -->

			<VideoList />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, IframeHTMLAttributes } from 'vue';
import VideoList from "./list.vue";
const videoNumber = 29;

const options = reactive({
	url: `./video/${videoNumber}.mp4`,
	danmaku: `./video/P${videoNumber}.xml`,
});
</script>
