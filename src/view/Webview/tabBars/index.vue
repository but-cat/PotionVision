<template>
	<div class="tab-bars w-full h-full  w-16 flex flex-col flex-shrink-0 flex-col z-50 backdrop-blur-sm">
		

		<TabList v-bind="$attrs"/>
		
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



const activeItem = computed(() => {
	const tabList = store.state.page.tabSet;
	const activeTabUUID = store.state.page.activeTab;
	return [tabList.get(activeTabUUID)];
});



function addItem(url: string) {
	store.commit('page/addTabItem', url);
}


defineExpose({
	addItem,
	// activeItem,
	// closeItem,
});
</script>


<style lang="less">
.tab-bars {
	// -webkit-app-region: drag;
}

</style>
