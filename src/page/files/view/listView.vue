<template>
	<div class="flex-1 w-full h-full p-6 pb-40 font-medium text-gray-900 dark:text-gray-200 overflow-auto">
		<table class="w-full text-left">
			<thead>
				<tr class="text-gray-400">
					<!-- <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"></th> -->
					<th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">文件名</th>
					<th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">种类</th>
					<th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">大小</th>
					<th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">修改时间</th>
				</tr>
			</thead>
			<tbody class="text-gray-600 dark:text-gray-100">
				<tr v-for="item in fileList" class="">
					<td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
						<!-- <div class="flex items-center">
							<svg viewBox="0 0 24 24" class="w-4 mr-5 text-yellow-500" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="12" y1="8" x2="12" y2="12"></line>
								<line x1="12" y1="16" x2="12.01" y2="16"></line>
							</svg>
							{{ item.name }}
						</div> -->

						<div v-if="item.isFolder" @click="activePath = item.path" class="flex flex-row items-center justify-self-center">
							<!-- <oFolder class="icon-block w-6 h-6" :name="item.name" :isSubNode="item.isSubNode" :toolsPage="true" /> -->
							<!-- <div class="icon-block w-6 h-6 mr-5 flex flex-col items-center justify-center relative">
								<FolderIcon :name="item.name" :toolsPage="true" class="w-6 h-6 flex-0" ref="folderIcon"/>
							</div> -->
							<FolderIcon :name="item.name" class="w-6 h-6 flex-0 mr-5" ref="folderIcon"/>
							<span @click="copyText(item.name)" class="text-xs text-center">{{ item.name }}</span>
						</div>

						<div v-else class="flex flex-row items-center">
							<!-- <div class="icon-block w-6 h-6 mr-5 flex flex-col items-center justify-center relative">
								<FileIcon :name="item.name" :toolsPage="true" class="w-6 h-6 flex-0" ref="fileIcon" />
							</div> -->
							<FileIcon :name="item.name" class="w-6 h-6 flex-0 mr-5" ref="fileIcon" />
							<span @click="copyText(item.name)" class="text-xs text-center">{{ item.name }}</span>
						</div>
						
					</td>
					<td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
						<span v-if="item.isFolder">文件夹</span>
						<span v-else>{{ item.mime }}</span>
					</td>
					<td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">{{ filesize(item.size, {standard: "jedec"}) }}</td>
					<!-- <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">{{ item.size }}</td> -->
					<td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
						<div class="flex items-center">
							<div class="sm:flex hidden flex-col">
								<!-- 24.12.2020
								<div class="text-gray-400 text-xs">11:16 AM</div> -->

								{{ item.modifyTime }}
							</div>
							<button @click="setActiveFile($event, item)" class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
								<svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="12" r="1"></circle>
									<circle cx="19" cy="12" r="1"></circle>
									<circle cx="5" cy="12" r="1"></circle>
								</svg>
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<ConetxtMenu v-if="openMenu" :item="activeItem!" :root="rootPath" :left="position.left" :top="position.top" @close="activeItem = null" />
</template>

<script lang="ts" setup>
import { useSlots, ref, toRefs, computed, watch, onMounted } from 'vue';
import { $xhr } from '@/GlobleAPI';
import { FileItem } from '@/view/FileList/utils/filetype';
// import ConetxtMenu from '@/view/FileList/conetxtMenu/index.vue';
import ConetxtMenu from '../conetxtMenu/index.vue';
import { filesize } from "filesize";
import { Authority } from '../authority';

const emit = defineEmits(['update:path', 'getDirInfo']);

const props = defineProps<{
	foceItem: FileItem;
	path: string;
	fileList: FileItem[];
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

	console.log('23333');

	// filePath.value = item.path;
	activeItem.value = item;
	// console.log(item, position.value);
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
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
</style>
