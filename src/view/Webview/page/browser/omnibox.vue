<template>
	<div tabindex="1"
		class="relative top-0 z-10 w-full rounded-lg bg-white dark:bg-gray-800 text-1 leading-5 text-slate-700 shadow-md border border-slate-400/20 shadow-black/5 ring-slate-700/10 self-start overflow-hidden">
		<div class="flex items-center px-3 py-2 text-slate-400 dark:text-slate-800">
			<svg class="mr-2 h-5 w-5 stroke-slate-500" fill="none" viewBox="0 0 24 24" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
				</path>
			</svg>

			<input v-show="focusInput" v-model="contentUrl" @search="search" @blur="close" type="search"
				class="px-2 w-full outline-none bg-white dark:bg-gray-800 text-slate-400 dark:text-slate-500" placeholder="Search projects..." ref="searchInput" />

			<input v-show="!focusInput" :value="url" @click="focusInput = true" @focus="focusInput = true" type="text" class="px-2 w-full outline-none bg-white dark:bg-gray-800 text-slate-400 dark:text-slate-500"/>
		</div>
		<template v-if="focusInput">
			<SearchEngines v-show="!isHttpUrl" v-model="contentUrl" @search="search" v-bind="$attrs" ref="searchEnginesBox" />
			<div class="border-t border-slate-400/20 px-3.5 py-3">
				<div class="mb-1.5 text-[0.6875rem] font-semibold text-slate-500">Recent searches</div>
				<div class="flex items-center rounded-md p-1.5 bg-primary-600 dark:bg-primary-200 text-white dark:text-gray-950">
					<svg class="mr-2 h-5 w-5 flex-none stroke-white" fill="none" viewBox="0 0 24 24" stroke-width="2">
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
						<path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z">
						</path>
					</svg>
					Add new folder...
				</div>
				<div class="flex items-center rounded-md p-1.5">
					<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24"
						stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
					</svg>
					Add hashtag...
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
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted, getCurrentInstance, toRefs, watch } from 'vue';
import WebView from '@/store/page/webView';
import SearchEngines from './searchEngines.vue';
import { is } from 'type-is';

const emit = defineEmits(['search']);

interface Props {
	url: string;
	page: WebView;
}

const props = defineProps<Props>();
const { url, page } = toRefs(props);

const searchInput = ref<HTMLInputElement>(null as unknown as HTMLInputElement);
const searchEnginesBox = ref<any>(null);

const focusInput = ref(false as boolean);
const contentUrl = ref('');

// const strRegex =
// 	'^((https|http|ftp|orbit|near|tools|assets)://)?' + //(https或http或ftp):// 可有可无
// 	"(([\\w_!~*'()\\.&=+$%-]+: )?[\\w_!~*'()\\.&=+$%-]+@)?" + //ftp的user@  可有可无
// 	'(([0-9]{1,3}\\.){3}[0-9]{1,3}' + // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
// 	'|' + // 允许IP和DOMAIN（域名）
// 	'(localhost|test)|' + //匹配localhost
// 	"([\\w_!~*'()-]+\\.)*" + // 域名- 至少一个[英文或数字_!~*\'()-]加上.
// 	'\\w+\\.' + // 一级域名 -英文或数字  加上.
// 	'[a-zA-Z]{1,9})' + // 顶级域名- 1-6位英文
// 	'(:[0-9]{1,5})?' + // 端口- :80 ,1-5位数字
// 	'((/?)|' + // url无参数结尾 - 斜杆或这没有
// 	"(/[\\w_!~*'()\\.;?:@&=+$,%#-]+)+/?)$"; //请求参数结尾- 英文或数字和[]内的各种字符

const strRegex = /(https|http|ftp|orbit|near|tools|assets):\/\//;

const isHttpUrl = computed(() => {
	const re = new RegExp(strRegex);
	return re.test(contentUrl.value);
});

watch(focusInput, val => {
	// console.log("contentUrl: ", val, page.value.getURL());

	if (val) {
		contentUrl.value = decodeURIComponent(page.value.getURL()!);
		setTimeout(() => {
			searchInput.value?.focus();
			searchInput.value?.setSelectionRange(searchInput.value.value.length, searchInput.value.value.length);
		}, 100);
	}
});

function close() {
	setTimeout(() => {
		focusInput.value = false;
	}, 100);
}

function search(data) {
	console.log('search', contentUrl.value);

	if (data && typeof data === 'string') {
		if (new RegExp(strRegex).test(data)) {
			emit('search', data);
		} else {
			searchEnginesBox.value!.getSearchUrl(data);
		}

		focusInput.value = false;
	} else {
		emit('search', contentUrl.value);
		focusInput.value = false;
	}
}
</script>
