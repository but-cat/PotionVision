<template>
	<!-- <div class="flex-1 px-5 pt-5 space-y-4 overflow-auto"></div> -->
	<ul role="list" class="flex-1 px-8 divide-y divide-gray-300 dark:divide-gray-700 overflow-auto">
		<li v-for="item in tellActive" class="flex justify-between gap-x-6 py-5">
			<div class="flex min-w-0 gap-x-4">
				<!-- <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl" alt="" /> -->
				<div class="min-w-0 flex-auto">
					

					<p v-if="item?.bittorrent?.info" class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">{{ item?.bittorrent?.info?.name }}</p>
					<p v-else-if="item?.files[0].path" class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">{{ item?.files[0].path.replace(/(.*\/)*([^.]+).*/ig, "$2") }}</p>
					<p v-else class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">{{ item?.files[0].uris[0].uri }}</p>
					<!-- <p class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">{{ item?.bittorrent?.info?.name }}</p> -->

					<!-- <p class="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">{{ person.email }}</p> -->
					<!-- <progress :value="item.completedLength" :max="item.totalLength" class="w-full h-3"></progress> -->
				
					<div class="w-96 mt-2 flex flex-col">
						<oProgress :modelValue="item.completedLength" :max="item.totalLength" class="w-full h-1" />
						<div class="flex justify-between">
							<p class="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">{{ filesize(item.completedLength ?? 0) }} / {{ filesize(item.totalLength ?? 0) }}</p>
							<p v-if="item.bittorrent" class="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">{{ item.numSeeders }} | {{ item.connections }}</p>
							<p v-else></p>
						</div>
					</div>
				</div>
			</div>
			<div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
				
				<p v-if="['active'].includes(item.status)" class="mt-1 text-xs flex flex-row items-center leading-5 text-gray-500 dark:text-gray-400  space-x-3">
					<p class="text-sm leading-6 text-gray-900 dark:text-gray-50">↓{{ filesize(item.downloadSpeed ?? 0) }} / ↑{{ filesize(item.uploadSpeed ?? 0) }}</p>
					
					<button @click="pause(item)" class="">
						<svg v-if="!pauseSet.has(item.gid)" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path d="M5 2C3.89543 2 3 2.89543 3 4V16C3 17.1046 3.89543 18 5 18H7C8.10457 18 9 17.1046 9 16V4C9 2.89543 8.10457 2 7 2H5ZM4 4C4 3.44772 4.44772 3 5 3H7C7.55228 3 8 3.44772 8 4V16C8 16.5523 7.55228 17 7 17H5C4.44772 17 4 16.5523 4 16V4ZM13 2C11.8954 2 11 2.89543 11 4V16C11 17.1046 11.8954 18 13 18H15C16.1046 18 17 17.1046 17 16V4C17 2.89543 16.1046 2 15 2H13ZM12 4C12 3.44772 12.4477 3 13 3H15C15.5523 3 16 3.44772 16 4V16C16 16.5523 15.5523 17 15 17H13C12.4477 17 12 16.5523 12 16V4Z"/>
						</svg>

						<svg v-else class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path d="M3 3.70711L2.14645 2.85355C1.95118 2.65829 1.95118 2.34171 2.14645 2.14645C2.34171 1.95118 2.65829 1.95118 2.85355 2.14645L17.8536 17.1464C18.0488 17.3417 18.0488 17.6583 17.8536 17.8536C17.6583 18.0488 17.3417 18.0488 17.1464 17.8536L16.697 17.4041C16.4232 17.7661 15.9889 18 15.5 18H13.5C12.6716 18 12 17.3284 12 16.5V12.7071L8 8.70711V16.5C8 17.3284 7.32843 18 6.5 18H4.5C3.67157 18 3 17.3284 3 16.5V3.70711ZM7 7.70711L4 4.70711V16.5C4 16.7761 4.22386 17 4.5 17H6.5C6.77614 17 7 16.7761 7 16.5V7.70711ZM13 13.7071V16.5C13 16.7761 13.2239 17 13.5 17H15.5C15.7144 17 15.8973 16.8651 15.9683 16.6755L13 13.7071ZM7 3.5V4.87866L8 5.87866V3.5C8 2.67157 7.32843 2 6.5 2H4.5C4.38307 2 4.26926 2.01338 4.16003 2.03869L5.12134 3H6.5C6.77614 3 7 3.22386 7 3.5ZM12 9.87866L13 10.8787V3.5C13 3.22386 13.2239 3 13.5 3H15.5C15.7761 3 16 3.22386 16 3.5V13.8787L17 14.8787V3.5C17 2.67157 16.3284 2 15.5 2H13.5C12.6716 2 12 2.67157 12 3.5V9.87866Z"/>
						</svg>
					</button>

					<button @click="pause(item)" class="">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path d="M10.4921 8.91012C10.4497 8.67687 10.2456 8.49999 10.0001 8.49999C9.72397 8.49999 9.50011 8.72385 9.50011 8.99999V13.5021L9.50817 13.592C9.55051 13.8253 9.75465 14.0021 10.0001 14.0021C10.2763 14.0021 10.5001 13.7783 10.5001 13.5021V8.99999L10.4921 8.91012ZM10.7988 6.74999C10.7988 6.33578 10.463 5.99999 10.0488 5.99999C9.63461 5.99999 9.29883 6.33578 9.29883 6.74999C9.29883 7.16421 9.63461 7.49999 10.0488 7.49999C10.463 7.49999 10.7988 7.16421 10.7988 6.74999ZM18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z"/>
						</svg>
					</button>
				</p>
				
				<!-- <p v-if="item.lastSeen" class="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
					Last seen <time :datetime="item.lastSeenDateTime">{{ item.lastSeen }}</time>
				</p> -->
				<div v-if="item.status == 'active'" class="mt-1 flex items-center gap-x-1.5">
					<!-- <div class="flex-none rounded-full bg-emerald-500/20 p-1">
						<div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
					</div> -->
					<div class="flex justify-center items-center rounded-full relative">
						<div class="h-1.5 w-1.5 rounded-full bg-teal-500 absolute" />
						<div class="h-2 w-2 rounded-full bg-teal-500 animate-ping" />
					</div>
					<p class="text-xs leading-5 text-gray-500 dark:text-gray-400">传输中</p>
				</div>
			</div>
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, onMounted, watch, getCurrentInstance, onBeforeUnmount } from 'vue';
import { filesize } from "filesize";


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

	connections: number;										// 连接数
	numSeeders: number;											// 种子数
	seeder: boolean;											// 是否是种子

	gid: string;												// 任务的GID

	files: {
		index: number;											// 文件索引
		path: string;											// 文件路径
		length: number;											// 文件大小
		completedLength: number;								// 已完成大小 此文件的完整长度（以字节为单位）。
		selected: boolean;										// 是否选择此文件
		uris: {
			uri: string;										// URI
			status: string;										// 状态
		}[];
	}[];
}

const tellActive = ref<TellActiveItem[]>([

]);

const pauseSet = new Set<string>();


async function pause(item: TellActiveItem) {
	if(pauseSet.has(item.gid)) return;
	try {
		const res = await fetch('apps://download.api/progress/call', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify([
				'pause',
				item.gid,
			]),
		});
		const data = await res.json();
		pauseSet.add(item.gid);
	} catch (error) {
		console.log(error);
	}
}


async function getTellActive() {
	try {
		const res = await fetch('apps://download.api/progress/tellActive');
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
