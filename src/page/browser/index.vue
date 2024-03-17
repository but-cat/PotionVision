<template>
	<div class="w-full h-full flex flex-col overflow-hidden">
		<div class="w-full px-4 py-2 bg-white relative flex items-center shadow-sm">
			<div class="w-48">
				<button @click="back" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg class="m-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.7327 19.7905C11.0326 20.0762 11.5074 20.0646 11.7931 19.7647C12.0787 19.4648 12.0672 18.99 11.7673 18.7043L5.51587 12.7497L20.25 12.7497C20.6642 12.7497 21 12.4139 21 11.9997C21 11.5855 20.6642 11.2497 20.25 11.2497L5.51577 11.2497L11.7673 5.29502C12.0672 5.00933 12.0787 4.5346 11.7931 4.23467C11.5074 3.93475 11.0326 3.9232 10.7327 4.20889L3.31379 11.2756C3.14486 11.4365 3.04491 11.6417 3.01393 11.8551C3.00479 11.9019 3 11.9503 3 11.9997C3 12.0493 3.00481 12.0977 3.01398 12.1446C3.04502 12.3579 3.14496 12.563 3.31379 12.7238L10.7327 19.7905Z" fill="#212121"/>
					</svg>
				</button>
				<button @click="forward" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg class="m-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.2673 4.20889C12.9674 3.9232 12.4926 3.93475 12.2069 4.23467C11.9213 4.5346 11.9328 5.00933 12.2327 5.29502L18.4841 11.2496H3.75C3.33579 11.2496 3 11.5854 3 11.9996C3 12.4138 3.33579 12.7496 3.75 12.7496H18.4842L12.2327 18.7043C11.9328 18.99 11.9213 19.4648 12.2069 19.7647C12.4926 20.0646 12.9674 20.0762 13.2673 19.7905L20.6862 12.7238C20.8551 12.5629 20.9551 12.3576 20.9861 12.1443C20.9952 12.0975 21 12.0491 21 11.9996C21 11.9501 20.9952 11.9016 20.986 11.8547C20.955 11.6415 20.855 11.4364 20.6862 11.2756L13.2673 4.20889Z" fill="#212121"/>
					</svg>
				</button>
				<button @click="reload" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg class="m-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 4.5C16.1421 4.5 19.5 7.85786 19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 11.6236 4.52772 11.2538 4.58123 10.8923C4.64845 10.4382 4.31609 10 3.85708 10C3.48623 10 3.161 10.2562 3.10471 10.6228C3.03576 11.0718 3 11.5317 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C9.69494 3 7.59227 3.86656 6 5.29168V4.25C6 3.83579 5.66421 3.5 5.25 3.5C4.83579 3.5 4.5 3.83579 4.5 4.25V7.25C4.5 7.66421 4.83579 8 5.25 8H8.25C8.66421 8 9 7.66421 9 7.25C9 6.83579 8.66421 6.5 8.25 6.5H6.90093C8.23907 5.25883 10.0309 4.5 12 4.5Z" fill="#212121"/>
					</svg>
				</button>
			</div>

			<div
				class="relative top-0 z-10 w-full rounded-lg bg-white text-1 leading-5 text-slate-700 shadow-md border border-slate-400/20 shadow-black/5 ring-slate-700/10 self-start">
				<div class="flex items-center px-3 py-2 text-slate-400">
					<svg class="mr-2 h-5 w-5 stroke-slate-500" fill="none" viewBox="0 0 24 24" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
					<input v-model="contentUrl" @focus="focusInput = true" @blur="focusInput = false" type="text"
						name="company_website" id="company_website" class="px-2 w-full outline-none"
						placeholder="Search projects..." />
				</div>
				<template v-if="focusInput">
					<div class="border-t border-slate-400/20 px-3.5 py-3">
						<div class="mb-1.5 text-[0.6875rem] font-semibold text-slate-500">Recent searches</div>
						<div class="flex items-center rounded-md p-1.5 bg-indigo-600 text-white">
							<svg class="mr-2 h-5 w-5 flex-none stroke-white" fill="none" viewBox="0 0 24 24"
								stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round"
									d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
							</svg>Tailwind Labs / Website Redesign
						</div>
						<div class="flex items-center rounded-md p-1.5">
							<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24"
								stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round"
									d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
							</svg>Laravel LLC / Conference Branding
						</div>
					</div>
					<div class="border-t border-slate-400/20 px-3.5 py-3">
						<div class="flex items-center rounded-md p-1.5">
							<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24"
								stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path
									d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
								</path>
							</svg>Add new file...
						</div>
						<div class="flex items-center rounded-md p-1.5">
							<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24"
								stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path
									d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z">
								</path>
							</svg>Add new folder...
						</div>
						<div class="flex items-center rounded-md p-1.5">
							<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24"
								stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
							</svg>Add hashtag...
						</div>
						<div class="flex items-center rounded-md p-1.5">
							<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24"
								stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path
									d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z">
								</path>
							</svg>Add label...
						</div>
					</div>
				</template>
			</div>

			<div class="w-32">
				<button @click="start" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg class="m-auto"  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.7878 3.10263C11.283 2.09926 12.7138 2.09925 13.209 3.10263L15.567 7.88036L20.8395 8.6465C21.9468 8.8074 22.3889 10.1682 21.5877 10.9492L17.7724 14.6681L18.6731 19.9193C18.8622 21.0222 17.7047 21.8632 16.7143 21.3425L11.9984 18.8632L7.28252 21.3425C6.29213 21.8632 5.13459 21.0222 5.32374 19.9193L6.2244 14.6681L2.40916 10.9492C1.60791 10.1682 2.05005 8.8074 3.15735 8.6465L8.42988 7.88036L10.7878 3.10263ZM11.9984 4.03903L9.74008 8.61492C9.54344 9.01336 9.16332 9.28953 8.72361 9.35343L3.67382 10.0872L7.32788 13.649C7.64606 13.9592 7.79125 14.406 7.71614 14.844L6.85353 19.8734L11.3702 17.4988C11.7635 17.292 12.2333 17.292 12.6266 17.4988L17.1433 19.8734L16.2807 14.844C16.2056 14.406 16.3508 13.9592 16.6689 13.649L20.323 10.0872L15.2732 9.35343C14.8335 9.28953 14.4534 9.01336 14.2568 8.61492L11.9984 4.03903Z" fill="#212121"/>
					</svg>
				</button>
				<button @click="tune" class="w-10 h-10 text-xs leading-none rounded-full">
					<svg class="m-auto"  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.75 13.5C10.2862 13.5 11.5735 14.5658 11.9126 15.9983L21.25 16C21.6642 16 22 16.3358 22 16.75C22 17.1297 21.7178 17.4435 21.3518 17.4932L21.25 17.5L11.9129 17.5007C11.5741 18.9337 10.2866 20 8.75 20C7.21345 20 5.92594 18.9337 5.58712 17.5007L2.75 17.5C2.33579 17.5 2 17.1642 2 16.75C2 16.3703 2.28215 16.0565 2.64823 16.0068L2.75 16L5.58712 15.9993C5.92594 14.5663 7.21345 13.5 8.75 13.5ZM8.75 15C7.98586 15 7.33611 15.4898 7.09753 16.1725L7.07696 16.2352L7.03847 16.3834C7.01326 16.5016 7 16.6242 7 16.75C7 16.9048 7.02011 17.055 7.05785 17.1979L7.09766 17.3279L7.12335 17.3966C7.38055 18.0431 8.01191 18.5 8.75 18.5C9.51376 18.5 10.1632 18.0107 10.4021 17.3285L10.4422 17.1978L10.4251 17.2581C10.4738 17.0973 10.5 16.9267 10.5 16.75C10.5 16.6452 10.4908 16.5425 10.4731 16.4428L10.4431 16.3057L10.4231 16.2353L10.3763 16.1024C10.1188 15.4565 9.48771 15 8.75 15ZM15.25 4C16.7866 4 18.0741 5.06632 18.4129 6.49934L21.25 6.5C21.6642 6.5 22 6.83579 22 7.25C22 7.6297 21.7178 7.94349 21.3518 7.99315L21.25 8L18.4129 8.00066C18.0741 9.43368 16.7866 10.5 15.25 10.5C13.7134 10.5 12.4259 9.43368 12.0871 8.00066L2.75 8C2.33579 8 2 7.66421 2 7.25C2 6.8703 2.28215 6.55651 2.64823 6.50685L2.75 6.5L12.0874 6.49833C12.4265 5.06582 13.7138 4 15.25 4ZM15.25 5.5C14.4859 5.5 13.8361 5.98976 13.5975 6.6725L13.577 6.73515L13.5385 6.88337C13.5133 7.0016 13.5 7.12425 13.5 7.25C13.5 7.40483 13.5201 7.55497 13.5579 7.69794L13.5977 7.82787L13.6234 7.89664C13.8805 8.54307 14.5119 9 15.25 9C16.0138 9 16.6632 8.51073 16.9021 7.82852L16.9422 7.69781L16.9251 7.75808C16.9738 7.59729 17 7.4267 17 7.25C17 7.14518 16.9908 7.04251 16.9731 6.94275L16.9431 6.80565L16.9231 6.73529L16.8763 6.60236C16.6188 5.95647 15.9877 5.5 15.25 5.5Z" fill="#212121"/>
					</svg>
				</button>
			</div>

			<!-- <button @click="search" class="w-16 self-stretch text-xs ml-2 py-1 leading-none bg-blue-400 text-white rounded-lg">搜索</button>
			<button @click="search" class="w-16 self-stretch text-xs ml-2 py-1 leading-none bg-blue-400 text-white rounded-lg">搜索</button> -->
		</div>

		<!-- <iframe :src="contentUrl" frameborder="0" class="w-full h-full"></iframe> -->

		<webview :src="contentUrl" ref="webview" class="w-full h-full"></webview>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, getCurrentInstance, toRefs, watch } from 'vue';
// import { Feed, FeedItem } from "../interface/feed.d";

const props = defineProps<{
	url?: string
}>();
const { url } = toRefs(props);


const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $http = globalProperties!.$http;
const $news = globalProperties!.$news;


const webview = ref(null as any);

const focusInput = ref(false as boolean);
const contentUrl = ref('https://mikanani.me/' as string | undefined);


watch(() => url?.value, (val) => {
	console.log("", val);
	
	if (val) contentUrl.value = val;
});


function back() {
	webview.value.goBack();
}

function forward() {
	webview.value.goForward();
}

function reload() {
	webview.value.reload();
}

function start() {
	
}

function tune() {
	
}
</script>
