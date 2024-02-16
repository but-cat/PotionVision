<template>
	<div class="w-full h-full flex flex-col dark:text-white bg-gray-100 dark:bg-gray-900 overflow-hidden">
		
		<HeadBar v-model="tellType"/>
		
		
		<!-- <TellActiveList /> -->

		<component :is="componentMap.get(tellType)" />

		
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, markRaw, computed, onMounted, watch, getCurrentInstance, onBeforeUnmount } from 'vue';
// import { NodeTemplate } from '@/browser/core/node';
import HeadBar from './head.vue';

// import TellActiveList from './tellActiveList.vue';
import TellActive from './tellActive.vue';
import TellStopped from './tellStopped.vue';
import TellWaiting from './tellWaiting.vue';


const componentMap = ref(
	new Map([
		['tellActive', markRaw(TellActive)],
		['tellStopped', markRaw(TellStopped)],
		['tellWaiting', markRaw(TellWaiting)],
	])
);

// import { XMLDoc } from '../Core/index';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $xhr = globalProperties!.$xhr;




const tellType = ref<string>('tellActive');

onMounted(async () => {});
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
