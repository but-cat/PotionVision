<template>
	<div class="-border-t border-slate-400/20 px-3 py-3">

		<div v-for="item in itemList" @click="openTools(item)" class="flex items-center rounded-md p-1 hover:bg-primary-400 hover:text-white cursor-pointer">
			<!-- <img class="mr-2 h-5 w-5 flex-none" :src="item.icon" alt=""> -->
			{{ item }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, toRefs, onMounted } from 'vue';
import { useStore } from "vuex";

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties!;
const $edgebar = globalProperties.$edgebar;
const $xhr = globalProperties!.$xhr;

const store = useStore();

const remote = require("@electron/remote");

const emit = defineEmits(['close']);



const itemList = ref<any[]>([]);


function openTools(params: string) {
	console.log(params);
	store.commit('file/setBaseUrl', params);
}


onMounted(async () => {
	try {
		const res = await fetch('assets://project.api/mark/allList');
		itemList.value = await res.json();
		
	} catch (error) {
		console.log(error);
	}
})
</script>
