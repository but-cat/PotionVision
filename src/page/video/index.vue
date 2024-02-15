<template>
	<div class="video w-full h-full flex flex-col overflow-hidden">
		<div :style="{ flex: `0 0 ${heightData}`, height: heightData }" class="relative bg-gray-800">
			<NPlayer v-if="videoOptions.url" :url="videoOptions.url" :danmaku="videoOptions.danmaku" />
			<!-- <video :src="options.url" class="w-full h-full" controls></video> -->

			<oSashY v-model="height" :min="350" :max="650" class="absolute right-0 left-0 bottom-1 m-auto z-10" style="z-index: 1000;"/>
		</div>

		<Episode v-if="options.episode" @url="data => videoOptions.url = data"/>
		<Videos v-else v-model="videoOptions.url"/>

	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, computed, watch, getCurrentInstance, onMounted, IframeHTMLAttributes } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";

import Episode from "./episode.vue";
import Videos from "./video.vue";


const router = useRouter();
const route = useRoute();

const height = ref(650);
const heightData = computed(() => `${height.value}px`);

const videoNumber = ref(1);




const videoOptions = reactive({
	url: ``,
	danmaku: ``,
});

const options = reactive({
	url: ``,
	danmaku: ``,
	episode: false
});




onMounted(() => {

	options.url = route.query.url as string;
	
	const number = localStorage.getItem('videoNumber');
	if (number) {
		videoNumber.value = Number(number);
	}
});
</script>
