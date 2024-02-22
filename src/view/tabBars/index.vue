<template>
	<div class="tab-bars bg-gray-50/60 dark:bg-gray-900/20 w-16 flex flex-shrink-0 flex-col z-50 backdrop-blur-sm">
		

		<TabList v-bind="$attrs" @active="setActiveItem" @close="closeItem" />
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

// const tabList = ref<string[]>([]);
// watch(() => store.state.page.tabSet, (value) => {
// 	console.log("store.state.page.tabList: ", value);
	
// 	tabList.value = [...value.keys()];
// }, { immediate: true, deep: true });


const activeItem = computed(() => {
	const tabList = store.state.page.tabSet;
	const activeTabUUID = store.state.page.activeTab;
	return [tabList.get(activeTabUUID)];
});



function addItem(url: string) {
	store.commit('page/addTabItem', url);
}


function setActiveItem(item: TabItem | number) {
	const items = typeof item == 'number' ? tabList.value[item] : item;
	store.commit('page/setActiveTab', items);
}



function closeItem(item: TabItem | number) {
	const { uuid } = typeof item == 'number' ? tabList.value[item] : item;
	// tabSet.value!.splice(index, 1);
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
