<template>
	<div class="border-t border-slate-400/20 px-3 py-3">
		<div class="mb-1 text-xs font-semibold text-slate-500">Search Engines</div>

		<div v-for="item in searchEngineList" @click="search(item.url)" class="flex items-center rounded-md p-2 hover:bg-primary-400 hover:text-white cursor-pointer">
			<svg class="mr-2 h-5 w-5 flex-none stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
			</svg>
			{{ item.name }}
			<div class="ml-2 text-sm font-semibold opacity-50">{{ item.url }}{{ searchData }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted, getCurrentInstance, toRefs, watch } from 'vue';

const emit = defineEmits(['update:modelValue', 'search']);
const props = defineProps<{
	modelValue: string;
}>();
// const { searchEngine, searchData } = toRefs(props);


const searchEngine = ref('' as string);

const searchData = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});

const searchEngineList = computed(() => {
	const data = [
		{
			name: '必应搜索',
			tabString: ['必应', 'bing', 'b', 'biying'],
			url: 'https://cn.bing.com/search?q=',
		},
		{
			name: '百度搜索',
			tabString: ['百度', 'baidu', 'b', 'bd'],
			url: 'https://www.baidu.com/s?wd=',
		},
		{
			name: '谷歌搜索',
			tabString: ['谷歌', 'google', 'g', 'gg'],
			url: 'https://www.google.com/search?q=',
		},
	].filter(item => !searchEngine.value || item.tabString.includes(searchEngine.value));

	return data;
});

function search(url: string) {
	emit('search', url + searchData.value);
}


function tab(data: string) {
    console.log("searchEngines-tab");
	searchEngine.value = data;
}

function getSearchUrl(data: string) {
	const searchEngineItem = searchEngineList.value[0]
	return searchEngineItem.url + data;
}


defineExpose({
	tab,
	getSearchUrl,
});
</script>
