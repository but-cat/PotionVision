<template>
	<div class="tab-bars bg-gray-50/60 dark:bg-gray-900/20 w-16 flex flex-shrink-0 flex-col z-50 backdrop-blur-sm">
		

		<TabList v-bind="$attrs" :tabList="tabList" :activeItem="activePage" @active="activeItem" @close="closeItem" />
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from "vue-router";
// import { useStore } from 'vuex';

import TabList from "./main.vue";
import TabItem from "./interface";

const router = useRouter();
const route = useRoute();
// const store = useStore();

const tabList = ref<TabItem[]>([]);
const activePage = ref<TabItem[]>([]);
// const openDev = ref(true);



function addItem(url: string) {
	const page = tabList.value.find((i) => i.url === url);
	if (page) {
		activeItem(page);
		return;
	}

	console.log("url: ", url);
	

	const item: TabItem = new TabItem(url);
	tabList.value.push(item);
	activeItem(item);
	
}


function activeItem(item: TabItem | number) {
	const index = typeof item == 'number' ? item : tabList.value.findIndex((i) => i.uuid === item.uuid);

	if (activePage.value.includes(tabList.value[index])) return;
	activePage.value = [tabList.value[index]];
}



function closeItem(item: TabItem | number) {
	const index = typeof item == 'number' ? item : tabList.value.findIndex((i) => i.uuid === item.uuid);
	tabList.value!.splice(index, 1);
}

defineExpose({
	addItem,
	activeItem,
	closeItem,
});
</script>


<style lang="less">
.tab-bars {
	-webkit-app-region: drag;
}

</style>
