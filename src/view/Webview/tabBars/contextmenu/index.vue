<template>
	<oContextMenu :left="left" :top="top" :page="page" @close="closeMenu" >
		<div ref="menuElement" class="menu-element absolute w-80 rounded-lg bg-white dark:bg-gray-900 text-1 leading-5 text-slate-700 dark:text-slate-500 shadow-lg border border-slate-400/20 shadow-black/5 ring-slate-700/10 self-start">
			<object ref="objectEl" class="object absolute left-0 top-0 w-full h-full" type="text/html" data="about:blank" />
			<div tabindex="1" class="flex items-center px-3 py-2 text-slate-400">
				<Favicon :favicon="pageState!.favicon" :loading="pageState!.loading" class="w-5 h-5 flex-0" />
				<span class="flex-1 ml-2 title select-none truncate">{{ pageState!.title }}</span>
			</div>
			
			<PageOptions @close="closeMenu" :page="page"/>
			<!-- <ContentList @close="closeMenu" /> -->
			<OpenList @close="closeMenu" :page="page"/>
			<!-- <DevList @close="closeMenu" :path="path"/> -->
		</div>
	</oContextMenu>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, onMounted, onBeforeUnmount, nextTick, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';

// import ContentList from './contentList.vue';
import OpenList from './openList.vue';
// import DevList from './devList.vue';
// import defaultFavicon from "@icon/file.svg";
import { PageView as Page } from "@/store/page/webView/index";

import PageOptions from "./pageOptions.vue";
import Favicon from '../favicon/index.vue';

const store = useStore();
const emit = defineEmits(['close']);

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties!;
const $edgebar = globalProperties.$edgebar;





const props = withDefaults(
	defineProps<{
		// page: Page;
		left: number;
		top: number;
	}>(),
	{
		left: 0,
		top: 0,
	},
);


const active = computed(() => store.state.page.activeTab as string);
const page = computed(() => store.state.page.tabSet.get(active.value)!);
const pageState = computed(() => page.value!.state);
// const favicon = ref<string>(defaultFavicon);

const objectEl = ref<HTMLObjectElement>();
const menuElement = ref<HTMLElement>();
const size = ref<{ windowWidth: number; windowHeight: number; width: number; height: number }>({ 
	windowWidth: window.innerWidth,
	windowHeight: window.innerHeight,
	width: 100, 
	height: 100 
});

const left = computed(() => {
	const { width, windowWidth } = size.value;
	const offset = windowWidth - width;
	return props.left + width > windowWidth ? offset : props.left;
});
const top = computed(() => {
	const { height, windowHeight } = size.value;
	// const { top } = props;
	const offset = windowHeight - height;
	return props.top + height > windowHeight ? offset : props.top;
});

const fileName = computed(() => path.value.replace(/(.*\/)*([^.]+).*/gi, '$2'));

function resize() {
	const element = menuElement.value;
	if (!element) return;

	size.value = {
		windowWidth: window.innerWidth,
		windowHeight: window.innerHeight,
		width: element.offsetWidth + 10,
		height: element.offsetHeight + 10,
	};
}

function closeMenu() {
	emit('close');
}

onMounted(() => {
	objectEl.value!.contentDocument!.defaultView!.addEventListener('resize', resize);
	window.addEventListener('resize', resize);
	nextTick(() => resize());
});

onBeforeUnmount(() => {
	objectEl.value!.contentDocument!.defaultView!.removeEventListener("resize", resize);
	window.removeEventListener('resize', resize);
});
</script>

<style scoped lang="less">
.file-name {
	white-space: nowrap;
	overflow: hidden;
	text-align: left;
	text-overflow: ellipsis;
}

.menu-element {
	transition: all 0.2s;
}

.object {
	display: block;
	// position: absolute;
	// top: 0;
	// left: 0;
	// height: 100%;
	// width: 100%;
	overflow: hidden;
	// opacity: 0;
	pointer-events: none;
	// z-index: -100;
	opacity: 0;
}
</style>
