<template>
	<div id="app" class="logged-in">
		<div id="app-info" class="info">
			<span class="time">3:33</span><span class="weather"><i class="fa-duotone fa-sun" aria-hidden="true"></i><span class="weather-temperature-value">65</span><span class="weather-temperature-unit">°F</span></span>
		</div>
		<AppPinWrapper />
		<AppMenu />
		<div id="app-background">
			<div id="app-background-image" class="background-image"></div>
		</div>
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
import AppMenu from './appMenu.vue';
import AppPinWrapper from './appPinWrapper.vue';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $xhr = globalProperties!.$xhr;
</script>

<style lang="less" scoped>
@import url('./style.less');
</style>
