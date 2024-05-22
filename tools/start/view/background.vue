<template>
	<div class="app-background">
		<div class="image background-image"></div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted } from 'vue';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $xhr = globalProperties!.$xhr;





</script>

<style lang="less" scoped>
// @import url('./style.less');

// @backgroundImage: './background/113806412_p0.png';
// @backgroundImage: "./background/113778228_p0.png";
// @backgroundImage: "./background/114059313_p0.jpg";
// @backgroundImage: "./background/111315905_p0.jpg";
// @backgroundImage: "./background/105120027_p0.jpg";
// @backgroundImage: "./background/58942603_p0.jpg";
// @backgroundImage: "./background/106065387_p0.jpg";
// @backgroundImage: "./background/IMG_3086.PNG";
// @backgroundImage: "./background/111321985_p0.jpg";
// @backgroundImage: "./background/109578701_p0.jpg";
// @backgroundImage: "./background/102281083_p0.jpg";
// @backgroundImage: "./background/100881100_p0.jpg";

@backgroundImage: "~@assets/bg.png";

.app-background {
	height: 100%;
	left: 0px;
	overflow: hidden;
	position: fixed;
	top: 0px;
	width: 100%;
	z-index: 1;

	.image {
		background-image: url(@backgroundImage);
		height: 100%;
		transition: filter 250ms, transform 250ms;
		width: 100%;
	}
}
</style>
