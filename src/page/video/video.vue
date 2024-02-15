<template>
	<div class="flex-1 flex flex-col items-center border-t border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-800 overflow-hidden">
		<div class="w-full h-6 flex-0 p-6  flex items-center justify-between border-b border-gray-200 dark:border-gray-900">
			<div>
				<p class="text-sm text-gray-700 dark:text-gray-300">{{ fileName }}</p>
			</div>
			<div>
				{{ accessTime }}
			</div>
		</div>

		<div class="w-full flex-1 flex flex-wrap p-4 pb-28 overflow-auto">
			<!-- Column -->
			<div v-for="(item, index) in fileList" class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
				<article :class="url == item.url && ['outline outline-2 outline-primary-300/80']" class="overflow-hidden rounded-lg shadow-lg bg-gray-100 dark:bg-gray-700">
					<video :src="item.url" alt="Placeholder" class="block w-full h-36" width="600" height="400" style="background-color: black;"/>

					<header class="h-16 flex items-center justify-between leading-tight p-2 md:p-4">
						<h1 @click="url = item.url" class="video-name text-lg no-underline hover:underline text-black">
							{{ item.name }}
						</h1>
						<p class="text-grey-darker text-sm">{{ getAccessTime(item.accessTime) }}</p>
					</header>
				</article>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, computed, watch, getCurrentInstance, onMounted, IframeHTMLAttributes } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';

import { FileItem } from '@/page/files/utils/filetype';

const emit = defineEmits(['update:modelValue', 'url']);

const router = useRouter();
const route = useRoute();

const fileList = ref<FileItem[]>([]);

onBeforeRouteUpdate((to, from, next) => {
	console.log('to', to);
	console.log('from', from);
	console.log('next', next);
});

const options = reactive({
	url: ``,
	fileName: ``,
	danmaku: ``,
	episode: false,
});

const url = computed({
	get() {
		return options.url;
	},
	set(value) {
		options.url = value;
		emit('update:modelValue', value);
	},
});

const accessTime = computed(() => {
	const item = fileList.value.find((item) => item.url === url.value);
	const accessTime = item?.accessTime as number;
	return accessTime ? getAccessTime(accessTime) : '';
});

const fileName = computed(() => url.value.replace(/(.*\/)*([^.]+).*/gi, '$2'));

async function getEpisodeInfo() {
	const dirUrl = options.url.replace(/\/[^\/]+$/, '/');

	const res = await fetch(dirUrl, {
		method: 'DIRECTORY',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const dirInfo = await res.json();

	console.log('dirInfo', dirInfo);

	for (let i = 0; i < dirInfo.children.length; i++) {
		const current = dirInfo.children[i];
		if (/\.\_/.test(current.name)) continue;
		if (current.type !== 'file') continue;
		if (!['video/mp4', 'video/ogg', 'video/webm', 'video/quicktime', 'video/x-msvideo'].includes(current.mime)) continue;
		fileList.value.push(new FileItem(current));
	}
}


function getAccessTime(accessTime: number) {
	const year = new Date(accessTime).getFullYear();
	const month = new Date(accessTime).getMonth() + 1;
	const day = new Date(accessTime).getDate();
	return `${year}/${month}/${day}`;
};

onMounted(() => {
	console.log('videoNumber', route.query);
	url.value = route.query.url as string;

	emit('url', options.url);

	getEpisodeInfo();
});
</script>


<style lang="less" scoped>
.video-name {
	word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    // width: 140px;
    display: -webkit-box;
    overflow: hidden;
}

</style>