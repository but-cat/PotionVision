<template>
	<div class="flex-1 w-full h-full p-6 pb-40 flex-1 grid grid-cols-6 gap-4 auto-rows-max font-medium text-gray-900 dark:text-gray-200 overflow-auto">

		<div v-for="item in fileList" @contextmenu.prevent.stop="setActiveFile($event, item)" class="item w-full h-full">
			<div v-if="item.isFolder" @click="activePath = item.path" class="flex flex-col items-center justify-self-center">
				<oFolder class="icon-block" :name="item.name" :isSubNode="item.isSubNode" :toolsPage="true" />
				<span @click.prevent.stop="copyText(item.name)" class="item-name mt-2 text-xs text-center">{{ item.name }}</span>
			</div>

			<div v-else @click="openVideo(item)" class="flex flex-col items-center justify-between">
				<div class="icon-block flex-1 flex flex-col items-center justify-center relative">
					<FileIcon :name="item.name" :toolsPage="true" class="w-12 h-12 flex-0" ref="fileIcon" />
				</div>
				<span @click.prevent.stop="copyText(item.name)" class="item-name mt-2 text-xs text-center">{{ item.name }}</span>
			</div>
		</div>
	</div>

	<ConetxtMenu v-if="openMenu" :item="activeItem!" :root="rootPath" :left="position.left" :top="position.top" @close="activeItem = null" />
</template>

<script lang="ts" setup>
import { useSlots, ref, toRefs, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { FileItem } from '../utils/filetype';
// import ConetxtMenu from '@/view/FileList/conetxtMenu/index.vue';
import ConetxtMenu from '../conetxtMenu/index.vue';

const router = useRouter();
const route = useRoute();



const emit = defineEmits(['update:path', 'getDirInfo']);

const props = defineProps<{
	path: string;
	fileList: FileItem[]
}>();
const { fileList } = toRefs(props);

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

	activeItem.value = item;
}

function openVideo(item: FileItem) {
	console.log('item', item.url);
	const mimeList = [
		"video/mp4", 
		"video/ogg",
		"video/webm",
		"video/quicktime",
		"video/x-msvideo",
		"video/x-matroska",
	];


	if(mimeList.includes(item.mime)) router.push({
		path: 'video',
		query: {
			url: item.url,
		},
	});
}

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


.item-name {
	width: 140px;
	word-break: break-all;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
	// text-overflow: ellipsis;
}
</style>
