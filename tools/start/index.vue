<template>

	<img v-if="true" src="~@assets/bg.png" alt="" class="absolute inset-0 h-full w-full object-cover object-right md:object-center" />
	<div v-else class="h-full w-full absolute sm:right-1/2 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
		<div class="aspect-[1097/845] w-[72.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#ab6fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
	</div>
	
	<div class="w-full h-full">
		<AppMenu />
		<Background/>
		<div id="sign-in-button-wrapper">
			<button id="sign-in-button" class="user-status-button clear-button" type="button">
				<i class="fa-solid fa-arrow-right-to-arc" aria-hidden="true"></i>
			</button>
		</div>
		<div id="app-loading-icon">
			<i class="fa-solid fa-spinner-third" aria-hidden="true"></i>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted } from 'vue';
// import Filelist from '@/browser/view/Filelist/index.vue';
import AppMenu from './view/menu/index.vue';
import AppPinWrapper from './view/appPinWrapper.vue';
import Background from './view/background.vue';
// import monaco from './editor/index.vue';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $xhr = globalProperties!.$xhr;

const code = ref('');

function saveFile() {
	const stringData = code.value;
	const blob = new Blob([stringData], {
		type: 'text/plain;charset=utf-8',
	});
	const objectURL = URL.createObjectURL(blob);
	const aTag = document.createElement('a');
	aTag.href = objectURL;
	aTag.download = '文本文件.txt';
	aTag.click();
	URL.revokeObjectURL(objectURL);
}

onMounted(async () => {
	// if (!window.BASE_URL) return;

	// const data = await $xhr(window.BASE_URL);
	// console.log('BASE_URL', data);
	// if (data) code.value = data;



	const res = await fetch('apps://setting.api/root/getData');
	const settingData = await res.json();

	console.log('settingData', settingData);
	
});
</script>

<style lang="less" scoped></style>

<style lang="less">
// @import url('./style/style.less');
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
