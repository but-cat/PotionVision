<template>
	<Teleport to="#modal">
		<div @blur="closeMenu" @click="closeMenu" class="w-full h-full flex justify-end fixed left-0 top-0">
			<div @click.stop class="omnibox w-80 mt-24 mr-6 rounded-lg text-slate-700 dark:text-slate-500 bg-white dark:bg-gray-900 text-1 leading-5 shadow-lg border border-slate-400/20 shadow-black/5 ring-slate-700/10 self-start">
				<PageOptions @close="closeMenu" :page="page"/>
				<OpenList @close="closeMenu" :page="page"/>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, computed, toRefs, nextTick, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import OpenList from './openList.vue';
import PageOptions from "./pageOptions.vue";

const store = useStore();

const emit = defineEmits(['close']);

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties!;
const $edgebar = globalProperties.$edgebar;


const active = computed(() => store.state.page.activeTab as string);
const page = computed(() => store.state.page.tabSet.get(active.value)!);

const open = ref(false);

function openMenu() {
	open.value = true;
}

function closeMenu() {
	open.value = false;
	emit('close');
}
</script>

<style scoped lang="less"></style>
