<template>
	<draggable @changePosition="changePosition" class="list-group" v-bind="{ ...$attrs, ...dragOptions }" @start="drag = true" @end="drag = false">
		<!-- @changePosition="data => $emit('changePosition', data)" -->
		<transition-group name="flip-list" type="transition">
			<Tabitems v-for="(item, index) in tabList" :key="item" :uuid="item" :index="index" :active="active == item" @omnibox="menu"/>
		</transition-group>

		<button class="new-page hover:text-gray-800 hover:bg-gray-100 hover:shadow-gray-800" @click="addPage">
			+
		</button>

		<div v-if="isWindows" class="h-10 w-36 opacity-0"/>
	</draggable>

	

	<BrowserMenu v-if="position.open" :left="position.left" :top="position.top" @close="position.open = false" />
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import draggable from './draggable.vue';
import { PageView } from "@/store/page/webView/index";
import Tabitems from './tabitem/index.vue';

import BrowserMenu from "./contextmenu/index.vue";

const isWindows = ref(__CLIENT_TYPE__ == 'win32');

const store = useStore();

const emit = defineEmits(['changePosition', 'menu', 'close', 'active']);

const props = defineProps<{
	
}>();

const openMenu = ref(false);
const position = reactive({
	open: false,
	left: 0,
	top: 0,
});


const tabList = computed(() => store.state.page.tabList);
const active = computed(() => store.state.page.activeTab as string);


const dragOptions = computed(() => ({
	animation: 200,
	group: 'description',
	disabled: false,
	ghostClass: 'ghost',
}));

const drag = ref(false);

function changePosition({ item, target }: { item: number; target: number }) {
	const belTabList = tabList.value;
	[belTabList[item], belTabList[target]] = [belTabList[target], belTabList[item]];
	store.commit('page/setTabList', belTabList);
}


function addPage() {
	// store.commit('page/addTabItem', new PageView());
	store.commit('page/addWebView', 'apps://core.page.api/tools/start/index.html');
}



function menu(event: PointerEvent) {
	// e.preventDefault();
	// position.page = active.value;
	console.log("menu: ", event);
	
	position.left = event.clientX;
	position.top = event.clientY;
	position.open = true;
}
</script>

<style lang="less" scoped>
.list-group {
	all: unset;
	-webkit-app-region: drag;
	flex: 1;

	min-height: 20px;
	margin: 0;
	height: 100%;
	padding: 0 20px;
	overflow-x: auto;
	overflow-y: hidden;

	display: flex;
	justify-content: flex-start;

	// align-items: center;
	align-items: flex-end;

	& > span {
		height: 100%;
		display: flex;
		align-items: stretch;
		overflow: auto;
		padding-right: 20px;
		&::-webkit-scrollbar {
			display: none; /* Chrome Safari */
		}
	}

	&::-webkit-scrollbar {
		display: none; /* Chrome Safari */
	}

	.favicon {
		width: 20px;
		height: 20px;
		object-fit: contain;
		margin: 0 8px;
		&.default {
			opacity: 0.6;
		}
	}
}

.flip-list-move {
	transition: transform 0.3s;
}

button.new-page {
	// all: unset;

	flex: 0 0 28px;
	width: 28px;
	height: 28px;

	display: flex;
	justify-content: center;
	align-items: center;
	align-self: center;

	// padding: 4px;
	font-size: 12px;
	// color: inherit;
	border-radius: 4px;
	margin-left: 4px;

	// box-shadow: 0 0 8px var(--disabledBackground);
	-webkit-user-select: none;
	-webkit-app-region: no-drag;

	// color: var(--sceneText);

	// height: 100%;
	// line-height: 10px;
	opacity: 1;
	cursor: pointer;

	box-sizing: border-box;
	// background-color: transparent;
	// &:hover {
	// 	background-color: var(--background, #fff);
	// 	box-shadow: 0 0 8px var(--disabledBackground, #fff);
	// }
	// &:active {
	// 	opacity: 0.6;
	// 	box-shadow: 0 0 2px var(--disabledBackground, #fff);
	// }
	&:disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	& > svg {
		width: 16px;
		height: 16px;
		color: var(--textPrimary);
		pointer-events: none !important;
		cursor: pointer;
	}
}
</style>

