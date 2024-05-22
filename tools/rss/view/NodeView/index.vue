<template>
	<div class="node-view w-full h-full p-2 pb-24 space-y-1 overflow-auto border-r dark:text-white border-gray-200 dark:border-gray-700 flex flex-col text-xs relative">
		<!-- <h1 v-for="item in nodeList" :style="{ paddingLeft: `${item.tabSize * 30}px` }" @click="store.commit('edit/setActiveElement', item.el)" :class="activeElement == item.el && 'bg-primary-200/40 dark:bg-primary-400/10'" class=" text-sm font-medium tracking-tight rounded text-green-500 hover:bg-primary-200/10 hover:dark:bg-primary-200/5 flex items-center">
			<arrowBtn :filterNode="filterNode" :item="item"></arrowBtn>
			<span class="text-slate-500">&lt;</span>
			{{ item.name }}
			<span v-for="(attribute) in item.el" class="ml-2 text-slate-500">attribute</span> 
			<span class="text-slate-500">&gt;</span> 
		</h1> -->

		<div class="overflow-hidden">
			<ElementItem v-for="item in nodeList" :style="{ paddingLeft: `${item.tabSize * 30}px` }" :item="item" @click="store.commit('edit/setActiveElement', item.el)" :class="activeElement == item.el && 'bg-primary-200/40 dark:bg-primary-400/10'">
				<arrowBtn :filterNode="filterNode" :item="item"></arrowBtn>
			</ElementItem>
		</div>

		<span v-if="!nodeList.length" class="h-12 w-26 absolute left-0 right-0 top-0 bottom-0 m-auto z-50">选择一个项目以开始编辑</span>
		<codeBtn @click="highlightJs = !highlightJs"></codeBtn>

		<div v-if="highlightJs" class="h-full w-full bg-gray-100 dark:bg-gray-900 overflow-auto absolute bottom-0 left-0">
			<HighlightJs :code="code" language="xml"></HighlightJs>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { XMLDoc } from '../Core/index';
import { NodeItem } from './types';
import { useStore } from 'vuex';

import arrowBtn from './btn/arrow.vue';
import codeBtn from './btn/code.vue';

import ElementItem from './el.vue';

const store = useStore();

const highlightJs = ref<boolean>(false);
// const xmlDoc = computed(() => $store.state.edit.xmlDoc);
const code = computed(() => store.state.edit.xmlString);

const activeItem = computed(() => store.state.edit.activeItem);
// const activeItem = computed(() => store.state.edit.document.value?.documentElement);
const activeElement = computed(() => store.state.edit.activeElement);

const filterNode = ref<Set<Element>>(new Set());

const nodeList = computed(() => {
	const list: NodeItem[] = [];
	// const element = xmlDoc.value?.document.value?.documentElement;
	// const element = activeItem.value;
	const element = activeItem.value;

	if (!element) return list;
	+(function traverse(current: Element, tabSize: number) {
		list.push({
			name: current.nodeName,
			el: current,
			tabSize: tabSize,
			isSubNode: !!current.children.length,
		});

		if (!filterNode.value.has(current)) for (let i = 0; i < current.children.length; i++) traverse(current.children[i], tabSize + 1);
	})(element!, 0);

	return list;
});

// watch(() => store.state.edit.activeItem, (newVal, oldVal) => {
// 	filterNode.value.clear();
// }, { immediate: true });

defineExpose({});
</script>

<style lang="less" scoped>
// @import url("./style.less");
@socket-size: 16px;

.node-view {
}

.btn {
	display: inline-block;
	// color: #fff;
	cursor: pointer;
	-webkit-app-region: no-drag;
	transition: color 0.2s;
	// margin-left: -5px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	fill: currentColor;
	// padding: 5px;

	// opacity: 0;
	// position: absolute;
	// top: -15px;
	// right: -15px;

	// color: rgb(235, 84, 84);
	background-color: #fff;

	&.home:hover {
		color: rgb(84, 235, 223);
		// background-color: rgba(255, 255, 255, 0.3);
	}

	&[disabled='disabled'] {
		color: #ccc;
		cursor: not-allowed;

		&:hover {
			color: #ccc;
			background-color: transparent;
		}
	}
}
</style>
