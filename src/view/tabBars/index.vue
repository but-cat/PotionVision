<template>
	<div class="tab-bars bg-gray-50/60 dark:bg-gray-900/20 w-16 flex flex-shrink-0 flex-col z-50 backdrop-blur-sm">
		

		<TabList v-bind="$attrs" :tabList="tabList" :activeItem="activeItem" @active="setActiveItem" @close="closeItem" />
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useStore } from 'vuex';



import TabList from "./main.vue";
import TabItem from "@/store/page/tabItem";

const router = useRouter();
const route = useRoute();
const store = useStore();



// const openDev = ref(true);

// const tabList = ref<TabItem[]>([]);
// watch(tabList, (value) => {
// 	tabList.value = [...value.values()];store.commit('page/setTabList', i)
// }, { immediate: true });
const tabList = computed({
	get: () => {
		console.log("store.state.page.tabList: ", store.state.page.tabList);
		const list  = store.state.page.tabList.values();
		return [...list];
	},
	set: (value) => {
		value.forEach((i) => {
			store.commit('page/setTabList', i)
		});
	},
});

const activeItem = computed(() => {
	const tabList = store.state.page.tabList;
	const activeTabUUID = store.state.page.activeTab;
	return [tabList.get(activeTabUUID)];
});



function addItem(url: string) {
	const page = tabList.value.find((i) => i.url === url);
	if (page) {
		setActiveItem(page);
		return;
	}

	
	

	const item: TabItem = new TabItem(url);
	// tabList.value.push(item);
	tabList.value = [...tabList.value, item];
	setActiveItem(item);
	
	console.log("url: ", activeItem.value);
}


function setActiveItem(item: TabItem | number) {
	const items = typeof item == 'number' ? tabList.value[item] : item;
	store.commit('page/setActiveTab', items);
}



function closeItem(item: TabItem | number) {
	const { uuid } = typeof item == 'number' ? tabList.value[item] : item;
	// tabList.value!.splice(index, 1);
	store.commit('page/delTabItem', uuid);
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
