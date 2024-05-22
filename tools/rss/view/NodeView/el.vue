<template>
	<h1
		class="text-sm font-medium tracking-tight rounded text-green-500 hover:bg-primary-200/10 hover:dark:bg-primary-200/5 flex items-center">
		<!-- <arrowBtn :filterNode="filterNode" :item="item"></arrowBtn> -->
		<slot></slot>
		<span class="text-slate-500">&lt;</span>
		{{ item.name }}

		<span v-for="attribute in attributeList" class="ml-2 text-slate-500 flex">
			<span class="text-green-300">{{ attribute.name }}</span>
			=
			<span class="text-orange-500 flex-1 truncate">"{{ attribute.value }}"</span>
		</span>
		
		<span class="text-slate-500">&gt;</span>

		<span :title="innerText" class="ml-2 text-slate-200 truncate">{{ innerText }}</span>
	</h1>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { XMLDoc } from '../Core/index';
import { NodeItem } from './types';
import { useStore } from 'vuex';

import arrowBtn from './btn/arrow.vue';
import codeBtn from './btn/code.vue';
import { title } from 'process';

const props = defineProps<{
	// filterNode: Set<NodeItem>;
	item: NodeItem;
}>();

const { item } = toRefs(props);


const activeElement = computed(() => item.value.el as unknown as Element);

const innerText = computed(() => item.value.el?.childNodes[0]?.nodeValue);

const attributeList = computed(() => {
	type listItem = { name: string; value: string };
	const element = activeElement.value as Element;

	return !element ? [] : Array.from(element!.attributes)
		// .filter(att => {
		// 	if (!attributeFilter.value) return true;
		// 	return new RegExp(attributeFilter.value, "i").test(att.name);
		// })
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

</script>

<style lang="less" scoped>
// @import url("./style.less");
@socket-size: 16px;

.node-view {}

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
