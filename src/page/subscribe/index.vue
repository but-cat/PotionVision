<template>
	<div class="w-full h-full bg-gray-50/60 dark:bg-gray-900/40 relative isolate overflow-hidden flex flex-col">
		<!-- <img src="https://cn.bing.com/th?id=OHR.FolegandrosGreece_ZH-CN7803666477_1920x1080.webp&qlt=50" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center" /> -->

		<HeadBar v-model="tellType" :typeList="typeList" :exception="exception"/>
		
		<component :is="componentMap.get(tellType)!.component" v-model:exception="exception"/>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, markRaw, computed, getCurrentInstance, onMounted, IframeHTMLAttributes } from 'vue';
import HeadBar from "./head.vue";

import SubscribeList from "./list.vue";
import CalendarBlock from "./calendar.vue";


const exception = ref<boolean>(false);

const tellType = ref<string>('SubscribeList');
const componentMap = ref(new Map([
	['SubscribeList', {
		name: '订阅列表',
		component: markRaw(SubscribeList),
	}],
	['Calendar', {
		name: '日历',
		component: markRaw(CalendarBlock),
	}],
	// ['tellWaiting', markRaw(TellWaiting)],
]));

const typeList = computed(() => {
	let typeList = {} as { [key: string]: string };
	Array.from(componentMap.value.entries()).map(([key, value]) => Object.defineProperty(typeList, key, {
		value: value.name,
		enumerable: true,
	}));
	return typeList;
});

</script>
