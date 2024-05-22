<template>
	<div class="app-menu w-full h-full overflow-auto">
		<div id="app-menu-content-wrapper" class="mt-[60vh]">
			<div id="app-menu-content" class="">
				<ContentHeader />

				<HistoryBlock />

				<ListBlock />

				<!-- <RestaurantsSection /> -->

				<!-- <ToolsSection /> -->

				<!-- <MoviesSection /> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted } from 'vue';

import ContentHeader from './contentHeader.vue';
import HistoryBlock from './history.vue';
import ListBlock from './list.vue';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $xhr = globalProperties!.$xhr;
</script>

<style lang="less" scoped>
// @import url("@/style/style.less");

.app-menu {
	height: 100vh;
	overflow: auto;
	// opacity: 0;
	// pointer-events: none;
	position: relative;
	// transform: translateY(-10%);
	transition: opacity 250ms, transform 250ms;
	z-index: 2;

	#app-menu-content-wrapper {
		background: linear-gradient(to bottom, transparent, gray(30));

		// margin-top: 80vh;
		// min-height: 80vh;
		// padding: 80px;
		padding-top: 0px;

		#app-menu-content {
			margin: auto;
			max-width: 1600px;
			position: relative;

			#app-menu-content-header {
				display: flex;
				justify-content: space-between;
			}
		}
	}
}

.scrollable-component {
	cursor: grab;
	overflow: auto;
	user-select: none;
	width: 100%;

	&:active {
		cursor: grabbing;
	}

	&::-webkit-scrollbar {
		height: 0px;
		width: 0px;
	}
}
</style>
