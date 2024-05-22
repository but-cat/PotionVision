<template>
	<div class="w-96 h-full p-5 border-r border-gray-200 dark:text-white dark:border-gray-700 overflow-y-auto">
		<div class="text-xs text-gray-400 tracking-wider">ITEMS</div>
		<div class="relative mt-2">
			<input v-model="attributeFilter" type="text"
				class="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white focus:outline outline-2 outline-primary-300/80 w-full rounded-md text-sm"
				placeholder="搜索" />
			<svg viewBox="0 0 24 24"
				class="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2"
				stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="11" cy="11" r="8"></circle>
				<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
			</svg>
		</div>
		<div class="space-y-4 mt-3">
			<button @click="store.commit('edit/setActiveItem', item.element)" v-for="(item, index) in itemList" :class="activeItem == item.element ? ['ring-2', 'ring-primary-300'] : []" class="w-full p-3 bg-white dark:bg-gray-800 rounded-md shadow-md text-left flex flex-col items-center">
				<div class="w-full flex items-center">
					<img class="h-12 w-12 rounded-md" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=faces&amp;fit=crop&amp;h=200&amp;w=200&amp;s=046c29138c1335ef8edee7daf521ba50" alt={imageAlt}>
					<div class="flex-1 ml-3 flex flex-col items-start">
						<h1 class="w-full mb-1 pb-1 flex xl:flex-row flex-col items-center font-medium text-gray-800 dark:text-gray-200 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">{{ item.name }}</h1>
						<span class="w-full text-xs text-purple-500 dark:text-purple-400">id: {{ item.identifier }}</span>
					</div>
				</div>
				
				<p v-if="item.description" class="w-full mt-2 text-slate-500">{{ item.description }}</p>
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, onMounted, watch, getCurrentInstance } from 'vue';
// import { NodeTemplate } from '@/core/node';
import { useStore } from 'vuex';

// import { XMLDoc } from '../Core/index';

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

const xmlDoc = computed(() => store.state.edit.xmlDoc);
const itemList = computed(() => (store.state.edit.itemList ?? [])
// .filter((item: Element) => {
// 	if(!attributeFilter.value) return true;
// 	if(!item.getAttribute('name')) return false;
// 	return new RegExp(attributeFilter.value, "i").test(item.getAttribute('name') || '<>');
// })
.map((item: Element) =>
({
	identifier: item.getAttribute('identifier') || '无',
	name: item.querySelector('title')?.innerText || '未命名',
	description: item.getAttribute('description') || '',
	element: item,
} as NodeItem)));
const activeItem = computed(() => store.state.edit.activeItem);

watch(() => store.state.edit.activeItem, () => {
	console.log("activeItem", activeItem.value);
})


function setActiveItem(el: Element) {
	console.log("333");
	
	store.commit('edit/setActiveItem', el)
}
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