<template>
	<div class="flex-1 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6">
		<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
			<div>
				<p class="text-sm text-gray-700 dark:text-gray-300">神探狄仁杰2</p>
			</div>
			<div>
				<oPagination v-model="videoNumber" :max="40" />
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, watch, getCurrentInstance, onMounted, IframeHTMLAttributes } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";


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
	episode: false
});

// // const open = ref(true);

// watch(videoNumber, (value) => {
// 	localStorage.setItem('videoNumber', String(value));
// 	// open.value = false;
// 	options.url = `./video/${value}.mp4`;
// 	options.danmaku = `./video/P${value}.xml`;
// });


async function getEpisodeInfo() {
	const res = await fetch(options.url, {
		method: 'DIRECTORY',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const dirInfo = await res.json();


	console.log('dirInfo', dirInfo);

	for (let i = 0; i < dirInfo.children.length; i++) {
		const current = dirInfo.children[i];
		if(/\.\_/.test(current.name)) continue;
		fileList.value.push(new FileItem(current));
	}
}


onMounted(() => {

	console.log('videoNumber', route.query);

	options.url = route.query.url as string;
	
	const number = localStorage.getItem('videoNumber');
	if (number) {
		videoNumber.value = Number(number);
	}
});
</script>
