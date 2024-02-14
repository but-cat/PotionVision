<template>
	<div @keydown.right.capture.stop="nextItem" @keydown.left.capture.stop="prevItem" class="flex-1 w-full h-full flex flex-col ">
		<div class="flex-1 w-full overflow-hidden">
			<!-- <webview src="tools://image.project/index.html$assets://project.local/111318823_p0.jpeg" :useragent="userAgent" class="w-full h-full"/> -->
			<component :is="componentMap.get(previewItem?.mime!)!" :url="previewItem?.url" v-if="componentMap.has(previewItem?.mime!)"/>
			<span v-else>无预览</span>
		</div>
		<!-- <div>
			<button @click="prevItem">上一个</button>
			<button @click="nextItem">下一个</button>
		</div> -->
		<div @keydown.right.capture @keydown.left.capture class="fileListContainer w-full h-52 relative overflow-hidden text-gray-900 dark:text-gray-200">
			<div @keydown.right.capture @keydown.left.capture ref="fileListContainer" class="w-full h-full p-6 space-x-2 flex font-medium text-gray-900 dark:text-gray-200 overflow-y-hidden overflow-x-auto ">
				<div @keydown.right.capture @keydown.left.capture v-for="item in fileList" @contextmenu.prevent.stop="setActiveFile($event, item)" :class="previewItem == item && 'bg-primary-200/40 dark:bg-primary-400/10'" class="item rounded p-4 w-full h-full">
					<div v-if="item.isFolder" @click="activePath = item.path" class="flex flex-col items-center justify-self-center">
						<oFolder class="icon-block" :name="item.name" :isSubNode="item.isSubNode" :toolsPage="true" />
						<span @click.prevent.stop="copyText(item.name)" class="item-name mt-2 text-xs text-center">{{ item.name }}</span>
					</div>

					<div v-else @click="setPreviewItem(item)" class="flex flex-col items-center justify-between">
						<div class="icon-block flex-1 flex flex-col items-center justify-center relative">
							<FileIcon :name="item.name" :toolsPage="true" class="w-12 h-12 flex-0" ref="fileIcon" />
						</div>
						<span @click.prevent.stop="copyText(item.name)" class="item-name mt-2 text-xs text-center">{{ item.name }}</span>
					</div>
				</div>
				
			</div>

			<button @click="prevItem" class="prevItem w-10 h-10 text-xs leading-none rounded-full bg-primary-200/40 dark:bg-primary-400/10 absolute left-4 top-0 bottom-0 m-auto  focus:outline outline-2 outline-primary-300/80">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-inject-url="http://localhost:5173/resources/ico/back.svg" class="m-auto">
					<path fill="currentColor" d="M10.7327 19.7905C11.0326 20.0762 11.5074 20.0646 11.7931 19.7647C12.0787 19.4648 12.0672 18.99 11.7673 18.7043L5.51587 12.7497L20.25 12.7497C20.6642 12.7497 21 12.4139 21 11.9997C21 11.5855 20.6642 11.2497 20.25 11.2497L5.51577 11.2497L11.7673 5.29502C12.0672 5.00933 12.0787 4.5346 11.7931 4.23467C11.5074 3.93475 11.0326 3.9232 10.7327 4.20889L3.31379 11.2756C3.14486 11.4365 3.04491 11.6417 3.01393 11.8551C3.00479 11.9019 3 11.9503 3 11.9997C3 12.0493 3.00481 12.0977 3.01398 12.1446C3.04502 12.3579 3.14496 12.563 3.31379 12.7238L10.7327 19.7905Z"></path>
				</svg>
			</button>
			<button @click="nextItem" class="nextItem w-10 h-10 text-xs leading-none rounded-full bg-primary-200/40 dark:bg-primary-400/10 absolute right-4 top-0 bottom-0 m-auto  focus:outline outline-2 outline-primary-300/80">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" data-inject-url="http://localhost:5173/resources/ico/forward.svg" class="m-auto">
					<path fill="currentColor" d="M13.2673 4.20889C12.9674 3.9232 12.4926 3.93475 12.2069 4.23467C11.9213 4.5346 11.9328 5.00933 12.2327 5.29502L18.4841 11.2496H3.75C3.33579 11.2496 3 11.5854 3 11.9996C3 12.4138 3.33579 12.7496 3.75 12.7496H18.4842L12.2327 18.7043C11.9328 18.99 11.9213 19.4648 12.2069 19.7647C12.4926 20.0646 12.9674 20.0762 13.2673 19.7905L20.6862 12.7238C20.8551 12.5629 20.9551 12.3576 20.9861 12.1443C20.9952 12.0975 21 12.0491 21 11.9996C21 11.9501 20.9952 11.9016 20.986 11.8547C20.955 11.6415 20.855 11.4364 20.6862 11.2756L13.2673 4.20889Z"></path>
				</svg>
			</button>
		</div>

		
	</div>

	<ConetxtMenu v-if="openMenu" :item="activeItem!" :root="rootPath" :left="position.left" :top="position.top" @close="activeItem = null" />
</template>

<script lang="ts" setup>
import { useSlots, ref, markRaw, toRefs, computed, watch, onMounted } from 'vue';
import { $xhr } from '@/GlobleAPI';
import { FileItem } from '@/view/FileList/utils/filetype';
// import ConetxtMenu from '@/view/FileList/conetxtMenu/index.vue';
import ConetxtMenu from '../conetxtMenu/index.vue';

import { Authority } from '../authority';

const emit = defineEmits(['update:path', 'getDirInfo']);

import imagePreview from '../Preview/image.vue';
import codePreview from '../Preview/code.vue';
// import yamlPreview from './Preview/yaml.vue';
import audioPreview from '../Preview/audio.vue';
import pdfPreview from '../Preview/pdfs.vue';
import videoPreview from "../Preview/video.vue";

const fileListContainer = ref<HTMLElement | null>(null);

const componentMap = ref(
	new Map([
		['image/png', markRaw(imagePreview)],
		['image/jpeg', markRaw(imagePreview)],
		['image/gif', markRaw(imagePreview)],
		['image/webp', markRaw(imagePreview)],
		['image/svg+xml', markRaw(imagePreview)],
		['image/bmp', markRaw(imagePreview)],
		['image/x-icon', markRaw(imagePreview)],
		['image/vnd.microsoft.icon', markRaw(imagePreview)],
		['image/tiff', markRaw(imagePreview)],
		['text/xml', markRaw(codePreview)],
		['application/javascript', markRaw(codePreview)],
		['application/json', markRaw(codePreview)],
		['text/html', markRaw(codePreview)],
		['text/css', markRaw(codePreview)],
		['text/markdown', markRaw(codePreview)],
		['text/x-yaml', markRaw(codePreview)],
		['text/yaml', markRaw(codePreview)],
		['text/x-python', markRaw(codePreview)],
		['text/x-c++', markRaw(codePreview)],
		['text/x-c', markRaw(codePreview)],
		['text/x-java', markRaw(codePreview)],
		['text/x-csharp', markRaw(codePreview)],
		['text/x-php', markRaw(codePreview)],
		['text/x-ruby', markRaw(codePreview)],
		['text/x-go', markRaw(codePreview)],
		['text/x-swift', markRaw(codePreview)],
		['text/x-kotlin', markRaw(codePreview)],
		['text/x-scala', markRaw(codePreview)],
		['text/x-rust', markRaw(codePreview)],
		['text/x-dart', markRaw(codePreview)],
		['text/x-typescript', markRaw(codePreview)],
		['text/x-coffeescript', markRaw(codePreview)],
		['text/x-haskell', markRaw(codePreview)],
		['text/x-lua', markRaw(codePreview)],
		['text/x-clojure', markRaw(codePreview)],
		['text/x-erlang', markRaw(codePreview)],
		['text/x-elm', markRaw(codePreview)],
		['text/x-purescript', markRaw(codePreview)],
		['text/x-julia', markRaw(codePreview)],
		['text/x-racket', markRaw(codePreview)],
		['text/x-ocaml', markRaw(codePreview)],
		['text/x-fsharp', markRaw(codePreview)],
		['text/x-d', markRaw(codePreview)],
		['text/x-nim', markRaw(codePreview)],
		['text/x-livescript', markRaw(codePreview)],
		['text/x-pony', markRaw(codePreview)],
		['text/x-tcl', markRaw(codePreview)],
		['text/x-elm', markRaw(codePreview)],
		['text/x-elm', markRaw(codePreview)],
		['text/x-elm', markRaw(codePreview)],
		

		
		// ['text/yaml', markRaw(yamlPreview)],
		['audio/ogg', markRaw(audioPreview)],
		['audio/mpeg', markRaw(audioPreview)],
		['audio/x-m4a', markRaw(audioPreview)],


		['video/mp4', markRaw(videoPreview)],
		['video/webm', markRaw(videoPreview)],
		['video/ogg', markRaw(videoPreview)],
		['video/quicktime', markRaw(videoPreview)],


		['application/pdf', markRaw(pdfPreview)],
	] as [string, any][]),
);

const props = defineProps<{
	path: string;
	fileList: FileItem[];
}>();
const { fileList } = toRefs(props);

const userAgent = ref<string>(navigator.userAgent);

const previewItem = ref<FileItem | undefined>(undefined);

// const activePath = ref<string>('');																		// 显示的目录
const rootPath = ref<string>('');
// const fileList = ref<FileItem[]>([]);

const activePath = computed({
	get() {
		return props.path;
	},
	set(value) {
		emit('update:path', value);
	},
});

const activeItem = ref<FileItem | null>(null);
const position = ref<{ left: number; top: number }>({ left: 0, top: 0 });

const openMenu = computed(() => !!activeItem.value);

async function getDirInfo() {
	emit('getDirInfo');
}

function setPreviewItem(item: FileItem) {
	previewItem.value = item;
}

function copyText(text){
	var oInput = document.createElement('input'); // 创建一个input元素
	oInput.value = text;
	document.body.appendChild(oInput);
	oInput.select(); 					// 选择对象
	document.execCommand("Copy"); 		// 执行浏览器复制命令
	oInput.style.display='none';
	document.body.removeChild(oInput);
}

function setActiveFile(event: MouseEvent, item: FileItem) {
	position.value = {
		left: event.clientX + 10,
		top: event.clientY + 10,
	};

	console.log('23333');

	// filePath.value = item.path;
	activeItem.value = item;
	// console.log(item, position.value);
}


function nextItem() {
	const index = fileList.value.findIndex((i) => i == previewItem.value);
	if (index == -1) return;
	const nextIndex = index + 1;
	if (nextIndex >= fileList.value.length) return;
	setPreviewItem(fileList.value[nextIndex]);
	const itemEl = fileListContainer.value?.children[nextIndex] as HTMLElement;
	if (!itemEl) return;
	itemEl.scrollIntoView({ behavior: 'smooth', inline: 'center' });
}


function prevItem() {
	const index = fileList.value.findIndex((i) => i == previewItem.value);
	if (index == -1) return;
	const nextIndex = index - 1;
	if (nextIndex < 0) return;
	setPreviewItem(fileList.value[nextIndex]);
	const itemEl = fileListContainer.value?.children[nextIndex] as HTMLElement;
	if (!itemEl) return;
	itemEl.scrollIntoView({ behavior: 'smooth', inline: 'center' });
}

watch(activePath, () => {
	// getDirInfo();
	previewItem.value = undefined;
});

</script>

<style lang="less" scoped>
.item {
	width: 120px;
	height: 110px;

	.icon-block {
		// width: 100px;
		// height: 80px;
		width: 80px;
		// height: 65px;
		flex: 0 0 65px;
	}
}


.fileListContainer  {
	.prevItem {
		opacity: 0;
		transform: translateX(10px);
		transition: all 0.2s;
	}

	&:hover .prevItem {
		opacity: 1;
		transform: translateX(0px);
	}

	.nextItem {
		opacity: 0;
		transform: translateX(-10px);
		transition: all 0.2s;
	}

	&:hover .nextItem {
		opacity: 1;
		transform: translateX(0px);
	}
}

.item-name {
	width: 120px;
	display: -webkit-box;
	word-break: break-all;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
