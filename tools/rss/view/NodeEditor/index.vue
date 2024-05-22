<template>
	<div class="w-full h-full overflow-hidden flex flex-col justify-between">

		<div class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
			<h1 class="m-2 text-sm font-medium tracking-tight text-green-500">
				<span class="text-slate-500">&lt;</span>{{ activeElement?.nodeName }}<span
					class="text-slate-500">/&gt;</span>
			</h1>


			<div class="relative flex-1">
				<input v-model="attributeFilter" type="search"
					class="px-8 h-full bg-transparent dark:text-white w-full rounded-md text-sm outline-none"
					placeholder="搜索属性" />
				<svg viewBox="0 0 24 24"
					class="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2"
					stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
			</div>

			<div class="mx-2">
				<deleteBtn title="删除该元素" />
			</div>
		</div>
		<div class="w-full flex-1 p-4 pb-36 space-y-4 overflow-auto border-b border-gray-200 dark:border-gray-700">


			<div v-for="item in attributeList" class="w-full flex flex-col">
				<div class="flex justify-between items-center">
					<span class="w-36 mb-2">{{ item.name }}</span>
					<forkBtn title="删除该属性" />
				</div>
				<input v-model="item.value"
					class="flex-1 flex items-center justify-between rounded-md bg-white dark:bg-slate-800 px-3 py-2 shadow-sm focus:outline outline-2 outline-primary-300/80">
			</div>

			<!-- <div class="h-72 p-2 rounded-md overflow-auto border border-dashed border-gray-400" v-html="md(activeNode.doc)">
			</div> -->


		</div>


		<div class="h-72 m-2 rounded-md overflow-auto">
			<HighlightJs :code="code" language="xml"></HighlightJs>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, onMounted, nextTick, getCurrentInstance } from 'vue';
import { XMLDocumentNode } from "./NodeEditor";
import deleteBtn from "./btn/delete.vue";
import forkBtn from "./btn/fork.vue";
import { useStore } from 'vuex';

const store = useStore();

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $http = globalProperties!.$http;


const attributeFilter = ref<string>("");

const activeElement = computed(() => store.state.edit.activeElement);


const attributeList = computed(() => {
	type listItem = { name: string; value: string };
	const element = activeElement.value as Element;

	return !element ? [] : Array.from(element!.attributes)
	.filter(att => {
		if(!attributeFilter.value) return true;
		return new RegExp(attributeFilter.value, "i").test(att.name);
	})
	.map((attribute) => ({
		name: attribute.name,
		// value: attribute.value,
		get value() {
			return attribute.value;
		},
		set value(value: string) {
			attribute.value = value;
		}
	}));
});




const code = computed(() => {
	const element = activeElement.value;
	if (element) {
		return element.outerHTML;
	}
	return "";
});

defineExpose({});
</script>

<style lang="less" scoped>
// @import url("./style.less");
@socket-size: 16px;

.material-node {
	width: 3000px;
	height: 2000px;

	// position: relative;
	overflow: hidden;
	/* border-left: 1px solid var(--divider); */
	/* background-color: var(--background); */

	/* width: 100%;
	height: 100%; */
	/* background-image: url(assets/tile.png); */
	background-repeat: repeat;
	background-size: 30px 30px;
	/* background-color: #fbfbfb; */


	--color: #8282821f;
	background-color: rgba(130, 130, 130, 0.046);

	background-image: linear-gradient(45deg, var(--color) 25%, transparent 25%, transparent 75%, var(--color) 75%, var(--color)), linear-gradient(45deg, var(--color) 26%, transparent 26%, transparent 74%, var(--color) 74%, var(--color));
	background-size: 20px 20px;
	background-position: 0 0, 10px 10px;

	display: flex;

}

.pass-item {}

node-container[active] * {
	pointer-events: none;
}
</style>