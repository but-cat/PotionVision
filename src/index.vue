<template>
	<div @open-video="openVideo" class="w-full h-full bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 flex overflow-hidden text-sm">

		<NavBar />

		<NewsBar />

		<div class="flex-1 h-full flex flex-col overflow-hidden relative">
			<img v-if="true" src="~@assets/bg.png" alt="" class="absolute inset-0 h-full w-full object-cover object-right md:object-center" />
			<div v-else class="h-full w-full absolute sm:right-1/2 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
				<div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
			</div>
			<div class="w-full h-full flex flex-col overflow-hidden relative">
				<!-- <TabBars ref="tabBar" class="w-full h-10 absolute top-0 left-0 z-10"/> -->
				<div class="w-full flex-1 overflow-hidden" style="--nav-bars-heigth: 2.5rem">
					<router-view v-slot="{ Component }">
						<Transition name="fade-transform" mode="out-in">
							<!-- <KeepAlive> -->
								<component :is="Component" />
							<!-- </KeepAlive> -->
						</Transition>
					</router-view>
				</div>

				
			</div>
			
			
		</div>
	</div>

	<!-- <FileModal /> -->
	<div id="modal"></div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, computed, getCurrentInstance, onMounted } from 'vue';
import { useStore } from 'vuex';

import NavBar from '@/view/navBars/NavBars.vue';
import NewsBar from '@/view/newsBar/index.vue';
import TabBars from '@/view/tabBars/index.vue';

const store = useStore();

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;

const active = computed(() => store.state.page.activeTab);

const tabBar = ref<typeof TabBars>();

function openVideo(event: CustomEvent) {
	const { url } = event.detail as {
		url: string;
	};

	tabBar.value!.addItem(url);
}

(window as any).addEventListener('open-video', openVideo);

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


.nplayer.nplayer-web-full {
	// position: absolute;
	z-index: 10000;

	// * {
	// 	z-index: 1000;
	// }

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 6vh;
		-webkit-app-region: drag;
		// background-color: aqua;
		z-index: 3000;
	}

	// & > * {
	// 	-webkit-app-region: no-drag;
	// }
}
</style>
