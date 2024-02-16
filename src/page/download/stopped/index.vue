<template>
	<!-- <div class="flex-1 px-5 pt-5 space-y-4 overflow-auto"></div> -->
	<ul role="list" class="flex-1 px-8 divide-y divide-gray-300 dark:divide-gray-700 overflow-auto">
		<li v-for="item in tellActive" class="flex justify-between gap-x-6 py-5">
			<div class="flex min-w-0 gap-x-4">
				<!-- <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl" alt="" /> -->
				<div class="min-w-0 flex-auto">
					

					<p v-if="item?.bittorrent?.info" class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">{{ item?.bittorrent?.info?.name }}</p>
					<p v-else class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">{{ item?.files[0].path.replace(/(.*\/)*([^.]+).*/ig, "$2") }}</p>
					<!-- <p class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">{{ item?.bittorrent?.info?.name }}</p> -->

					<!-- <p class="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">{{ person.email }}</p> -->
					
					<div class="w-96 mt-2 flex flex-col">
						<oProgress :modelValue="item.completedLength" :max="item.totalLength" class="w-full h-1" />
						<p class="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">{{ filesize(item.completedLength ?? 0) }} / {{ filesize(item.totalLength ?? 0) }}</p>
					</div>
				</div>
			</div>
			<div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
				<p class="text-sm leading-6 text-gray-900 dark:text-gray-50">{{ filesize(item.downloadSpeed ?? 0) }}/{{ filesize(item.uploadSpeed ?? 0) }}</p>
				<!-- <p v-if="item.lastSeen" class="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
					Last seen <time :datetime="item.lastSeenDateTime">{{ item.lastSeen }}</time>
				</p> -->
				<div v-if="['paused'].includes(item.status)" class="mt-1 flex items-center gap-x-1.5">
					<div class="flex-none rounded-full bg-blue-500/20 p-1">
						<div class="h-1.5 w-1.5 rounded-full bg-blue-500" />
					</div>
					<p class="text-xs leading-5 text-gray-500 dark:text-gray-400">暂停</p>
				</div>

				<div v-if="['error'].includes(item.status)" @click="() => { activeItem = item; openErrorModal = true }" class="mt-1 flex items-center gap-x-1.5">
					<div class="flex-none rounded-full bg-red-500/20 p-1">
						<div class="h-1.5 w-1.5 rounded-full bg-red-500" />
					</div>
					<p class="text-xs leading-5 text-gray-500 dark:text-gray-400">错误</p>
				</div>

				<div v-if="['complete'].includes(item.status)" class="mt-1 flex items-center gap-x-1.5">
					<div class="flex-none rounded-full bg-emerald-500/20 p-1">
						<div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
					</div>
					<p class="text-xs leading-5 text-gray-500 dark:text-gray-400">完成</p>
				</div>
			</div>
		</li>
	</ul>

	<ErrorModal v-model="openErrorModal" :item="activeItem"/>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, onMounted, watch, getCurrentInstance, onBeforeUnmount } from 'vue';
import { filesize } from "filesize";
import ErrorModal from "./error.vue";


interface TellActiveItem {

	bittorrent: {												// Struct，其中包含从.torrent检索到的信息 （文件）。仅限 BitTorrent。它包含以下键。
		announceList: string[];									// 服务器列表
		creationDate: number;									// 创建时间
		verifiedLength: number;									// 文件正在验证的字节数 哈希检查。仅当正在下载此密钥时，此密钥才存在 哈希检查。
		verifyIntegrityPending: boolean;						// 是否正在验证文件
		info: {
			name: string;
		},


	};
	infoHash: string;											// 文件的哈希值 - 仅限 BitTorrent。
	
	status: 'active' | 'waiting' | 'paused' | 'error' | 'complete' | 'removed';// 状态
	dir: string;												// 保存到的文件夹
	numPieces: number;											// 文件的数量

	completedLength: number;									// 已完成大小
	totalLength: number;										// 总大小
	downloadSpeed: number;										// 下载速度
	uploadSpeed: number;										// 上传速度


	files: {
		index: number;											// 文件索引
		path: string;											// 文件路径
		length: number;											// 文件大小
		completedLength: number;								// 已完成大小 此文件的完整长度（以字节为单位）。
		selected: boolean;										// 是否选择此文件
		uris: string[];											// 文件的URI字符串
	}[];
}

const tellActive = ref<TellActiveItem[]>([]);
const openErrorModal = ref<boolean>(false);
const activeItem = ref<TellActiveItem | null>(null);


async function getTellActive() {
	try {
		const res = await fetch('apps://download.api/progress/call', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify([
				'tellStopped',
				0,
				100,
			]),
		});
		const data = await res.json();
		// console.log("data", data);

		tellActive.value = data;
	} catch (error) {
		console.log(error);
	}
}

const interval = setInterval(() => {
	getTellActive();
}, 1000);

onMounted(async () => {
	getTellActive();
});

onBeforeUnmount(() => {
	clearInterval(interval);
});
</script>
