<template>
	<div class="w-full h-full py-5 flex flex-col dark:text-white bg-gray-100 dark:bg-gray-900 overflow-hidden">
		<div class="text-xs px-5 text-gray-400 tracking-wider uppercase">Download</div>

		<div class="flex-1 px-5 pt-5 space-y-4 overflow-auto">
			<button @click="openTools(item.url)" v-for="(item, index) in itemList" :class="!true ? ['ring-2', 'ring-primary-300'] : []" class="w-full p-3 bg-white dark:bg-gray-800 rounded-md shadow-md text-left flex flex-col items-center">
				<div class="w-full flex items-center">
					<!-- <img class="h-12 w-12 rounded-md" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=faces&amp;fit=crop&amp;h=200&amp;w=200&amp;s=046c29138c1335ef8edee7daf521ba50" alt={imageAlt}> -->
					<img class="h-12 w-12 rounded-md" :src="item.icon" alt={imageAlt}>
					<div class="flex-1 ml-3 flex flex-col items-start">
						<h1 class="w-full mb-1 pb-1 font-medium text-gray-800 dark:text-gray-200 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">{{ item.name }}</h1>
						<span class="w-full text-xs text-purple-500 dark:text-purple-400">id: {{ item.id }}</span>
					</div>
				</div>
				
				<p v-if="item.description" class="w-full mt-2 text-slate-500">{{ item.description }}</p>
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, onMounted, watch, getCurrentInstance } from 'vue';
// import { NodeTemplate } from '@/browser/core/node';
import { useStore } from 'vuex';

// import { XMLDoc } from '../Core/index';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $xhr = globalProperties!.$xhr;


const store = useStore();

// const props = defineProps<{
// 	xmlDoc: XMLDoc;
// }>();
// const { xmlDoc } = toRefs(props);
const attributeFilter = ref<string>("");

interface NodeItem {
	identifier: string; // 唯一标识
	name: string; // 名称
	description: string; // 描述
	element: Element;
}

// const xmlDoc = computed(() => store.state.edit.xmlDoc);
const itemList = ref<any[]>([...Array(16)].map((_, index) => ({
	identifier: `node${index}`,
	name: `节点${index}`,
	description: `节点${index}的描述`,
	element: null
})));
// const activeItem = computed(() => store.state.edit.activeItem);

// watch(() => store.state.edit.activeItem, () => {
// 	console.log("activeItem", activeItem.value);
// })


function openTools(url: string) {
	console.log("openTools", url);
	window.dispatchEvent(new CustomEvent('open-url-page', {
		detail: `${url}$assets://aaaa.local/aaaaa.js`,
	}));
}


onMounted(async () => {
	try {
		const res = await $xhr("tools://project.api/allList");
		console.log("tools://project.api/", res);
		
		itemList.value = res.toolsList;
	} catch (error) {
		console.log(error);
	}
})
</script>

<style lang="less" scoped>
.material-node {
	position: relative;
	overflow: hidden;
	/* border-left: 1px solid var(--divider); */
	/* background-color: var(--background); */

	/* width: 100%;
	height: 100%; */
	/* background-image: url(assets/tile.png); */
	background-repeat: repeat;
	background-size: 30px 30px;
	/* background-color: #fbfbfb; */

	@grid_line: #171f2f;

	yellow: rgb(255, 251, 0);

	background: linear-gradient(to right, transparent 48%, @grid_line 49%, @grid_line 50%, transparent 51%), linear-gradient(to bottom, transparent 48%, @grid_line 49%, @grid_line 50%, transparent 51%);
	background-size: 50px 50px;
}

.node-editor[type='number'] point-in:not([type='number']) {
	opacity: 0.3;
}

.node-editor[type='vec4'] point-in:not([type='vec4']) {
	opacity: 0.3;
}

</style>