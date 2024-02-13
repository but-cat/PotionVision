<template>
	<div class="w-full h-full bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 flex overflow-hidden text-sm">

		<NavBar />

		<NewsBar />

		<div class="flex-1 flex flex-col overflow-hidden">
			<router-view v-slot="{ Component }">
				<Transition name="fade-transform" mode="out-in">
					<KeepAlive>
						<component :is="Component" />
					</KeepAlive>
				</Transition>
			</router-view>
			
		</div>
	</div>

	<!-- <FileModal /> -->
	<div id="modal"></div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted } from 'vue';
// import NPlayer from './view/player.vue';
// import NavBar from '@/view/navBars/index.vue';
import NavBar from '@/view/navBars/NavBars.vue';
import NewsBar from '@/view/newsBar/index.vue';
// import AppMenu from '@/view/appMenu/index.vue';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;

onMounted(async () => {});
</script>

<style lang="less" scoped>
// .btn {
// 	display: inline-block;
// 	width: 24px;
// 	height: 24px;
// 	color: #fff;
// 	cursor: pointer;
// 	-webkit-app-region: no-drag;
// 	transition: color 0.2s;
// 	margin-left: -5px;
// 	border-radius: 50%;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	fill: currentColor;
// 	padding: 5px;

// 	// opacity: 0;
// 	// position: absolute;
// 	// top: -15px;
// 	// right: -15px;

// 	color: rgb(235, 84, 84);
// 	background-color: #fff;

// 	&.home:hover {
// 		color: rgb(84, 235, 223);
// 		// background-color: rgba(255, 255, 255, 0.3);
// 	}

// 	&[disabled='disabled'] {
// 		color: #ccc;
// 		cursor: not-allowed;

// 		&:hover {
// 			color: #ccc;
// 			background-color: transparent;
// 		}
// 	}
// }
</style>

<style lang="less">
*,
*:before,
*:after {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

html,
body,
#app {
	height: 100%;
	width: 100%;
	margin: 0;
	// padding: 50px;
	color: #eee9dc;
	font: 16px Verdana, sans-serif;
	// user-select: none;
}
</style>
