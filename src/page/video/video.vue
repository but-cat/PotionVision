<template>
	<div class="flex-1 flex flex-col items-center border-t border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-800 overflow-hidden">
		<div class="w-full h-6 flex-0 p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-900">
			<div>
				<p @click="focusItem" class="text-sm text-gray-700 dark:text-gray-300">{{ fileName }}</p>
			</div>
			<div>
				{{ accessTime }}
			</div>
		</div>

		<div ref="videoList" class="w-full flex-1 flex flex-wrap p-4 pb-28 overflow-auto">
			<!-- Column -->
			<div v-for="(item, index) in fileList" class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
				<article :class="url == item.url && ['outline outline-2 outline-primary-300/80']" class="h-60 flex flex-col overflow-hidden rounded-lg shadow-lg bg-gray-100 dark:bg-gray-700">
					<div @click="url = item.url" class="block w-full h-36 relative" style="background-color: black">
						<video :src="item.url" class="w-full h-full" alt="Placeholder" width="600" height="400" style="object-fit: cover;"/>
						<svg v-if="url != item.url" class="w-12 h-12 absolute left-0 right-0 top-4 bottom-0 m-auto" viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
							<defs>
								<path id="pid-53-svgo-a" d="M0 0h80v80H0z"></path>
								<path d="M52.546 8.014a3.998 3.998 0 014.222 3.077c.104.446.093.808.039 1.138a2.74 2.74 0 01-.312.881c-.073.132-.16.254-.246.376l-.257.366-.521.73c-.7.969-1.415 1.926-2.154 2.866l-.015.02a240.945 240.945 0 015.986.341l1.643.123.822.066.41.034.206.018.103.008.115.012c1.266.116 2.516.45 3.677.975a11.663 11.663 0 013.166 2.114c.931.87 1.719 1.895 2.321 3.022a11.595 11.595 0 011.224 3.613c.03.157.046.316.068.474l.015.119.013.112.022.206.085.822.159 1.646c.1 1.098.19 2.198.27 3.298.315 4.4.463 8.829.36 13.255a166.489 166.489 0 01-.843 13.213c-.012.127-.034.297-.053.454a7.589 7.589 0 01-.072.475l-.04.237-.05.236a11.762 11.762 0 01-.74 2.287 11.755 11.755 0 01-5.118 5.57 11.705 11.705 0 01-3.623 1.263c-.158.024-.316.052-.475.072l-.477.053-.821.071-1.644.134c-1.096.086-2.192.16-3.288.23a260.08 260.08 0 01-6.578.325c-8.772.324-17.546.22-26.313-.302a242.458 242.458 0 01-3.287-.22l-1.643-.129-.822-.069-.41-.035-.206-.018c-.068-.006-.133-.01-.218-.02a11.566 11.566 0 01-3.7-.992 11.732 11.732 0 01-5.497-5.178 11.73 11.73 0 01-1.215-3.627c-.024-.158-.051-.316-.067-.475l-.026-.238-.013-.119-.01-.103-.07-.823-.132-1.648a190.637 190.637 0 01-.22-3.298c-.256-4.399-.358-8.817-.258-13.233.099-4.412.372-8.811.788-13.197a11.65 11.65 0 013.039-6.835 11.585 11.585 0 016.572-3.563c.157-.023.312-.051.47-.07l.47-.05.82-.07 1.643-.13a228.493 228.493 0 016.647-.405l-.041-.05a88.145 88.145 0 01-2.154-2.867l-.52-.73-.258-.366c-.086-.122-.173-.244-.246-.376a2.74 2.74 0 01-.312-.881 2.808 2.808 0 01.04-1.138 3.998 3.998 0 014.22-3.077 2.8 2.8 0 011.093.313c.294.155.538.347.742.568.102.11.19.23.28.35l.27.359.532.72a88.059 88.059 0 012.06 2.936 73.036 73.036 0 011.929 3.03c.187.313.373.628.556.945 2.724-.047 5.447-.056 8.17-.038.748.006 1.496.015 2.244.026.18-.313.364-.624.549-.934a73.281 73.281 0 011.93-3.03 88.737 88.737 0 012.059-2.935l.533-.72.268-.359c.09-.12.179-.24.281-.35a2.8 2.8 0 011.834-.881zM30.13 34.631a4 4 0 00-.418 1.42 91.157 91.157 0 00-.446 9.128c0 2.828.121 5.656.364 8.483l.11 1.212a4 4 0 005.858 3.143c2.82-1.498 5.55-3.033 8.193-4.606a177.41 177.41 0 005.896-3.666l1.434-.942a4 4 0 00.047-6.632 137.703 137.703 0 00-7.377-4.708 146.88 146.88 0 00-6.879-3.849l-1.4-.725a4 4 0 00-5.382 1.742z" id="pid-53-svgo-d"></path>
								<filter x="-15.4%" y="-16.3%" width="130.9%" height="132.5%" filterUnits="objectBoundingBox" id="pid-53-svgo-c">
									<feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
									<feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
									<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
									<feOffset in="SourceAlpha" result="shadowOffsetOuter2"></feOffset>
									<feGaussianBlur stdDeviation="3.5" in="shadowOffsetOuter2" result="shadowBlurOuter2"></feGaussianBlur>
									<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" in="shadowBlurOuter2" result="shadowMatrixOuter2"></feColorMatrix>
									<feMerge>
										<feMergeNode in="shadowMatrixOuter1"></feMergeNode>
										<feMergeNode in="shadowMatrixOuter2"></feMergeNode>
									</feMerge>
								</filter>
							</defs>
							<g fill="none" fill-rule="evenodd" opacity=".8">
								<mask id="pid-53-svgo-b" fill="#fff"><use xlink:href="#pid-53-svgo-a"></use></mask>
								<g mask="url(#pid-53-svgo-b)">
									<use fill="#000" filter="url(#pid-53-svgo-c)" xlink:href="#pid-53-svgo-d"></use>
									<use fill="#FFF" xlink:href="#pid-53-svgo-d"></use>
								</g>
							</g>
						</svg>
					</div>

					<header class="flex-1 flex flex-col items-center justify-between leading-tight p-2 md:p-4">
						<h1 @click="url = item.url" class="video-name w-full text-md no-underline hover:underline text-black">
							{{ item.name }}
						</h1>

						<div class="w-full mt-3 flex flex-row items-center justify-between">
							<p class="text-grey-darker text-sm">{{ getAccessTime(item.accessTime) }}</p>
							<div>
								<svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"></path>
								</svg>
							</div>
						</div>
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

const videoList = ref<HTMLElement | null>(null);

onBeforeRouteUpdate((to, from, next) => {
	console.log('to', to);
	console.log('from', from);
	console.log('next', next);
});

const mimeList = [
	"video/mp4", 
	"video/ogg",
	"video/webm",
	"video/quicktime",
	"video/x-msvideo",
	"video/x-matroska",
]

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
	const item = fileList.value.find(item => item.url === url.value);
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
		if (!mimeList.includes(current.mime)) continue;
		fileList.value.push(new FileItem(current));
	}
}

function getAccessTime(accessTime: number) {
	const year = new Date(accessTime).getFullYear();
	const month = new Date(accessTime).getMonth() + 1;
	const day = new Date(accessTime).getDate();
	return `${year}/${month}/${day}`;
}


function focusItem() {
	const index = fileList.value.findIndex(item => item.url === url.value);
	const item = videoList.value?.children[index] as HTMLElement;
	item.scrollIntoView({ behavior: 'smooth', block: 'center' });
	// videoList
}

onMounted(async () => {
	console.log('videoNumber', route.query);
	url.value = route.query.url as string;

	emit('url', options.url);

	await getEpisodeInfo();

	focusItem();
});
</script>

<style lang="less" scoped>
.video-name {
	text-align: left;
	word-break: break-all;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	// width: 140px;
	display: -webkit-box;
	overflow: hidden;
}
</style>
