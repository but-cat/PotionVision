<template>
	<div id="app-pin-wrapper">
		<input id="app-pin-hidden-input" maxlength="4" type="number" value="" disabled />
		<div id="app-pin">
			<div class="app-pin-digit focused">
				<span class="app-pin-digit-value"></span>
			</div>
			<div class="app-pin-digit">
				<span class="app-pin-digit-value"></span>
			</div>
			<div class="app-pin-digit">
				<span class="app-pin-digit-value"></span>
			</div>
			<div class="app-pin-digit">
				<span class="app-pin-digit-value"></span>
			</div>
		</div>
		<h3 id="app-pin-label">
			Enter PIN (1234)
			<span id="app-pin-cancel-text">Cancel</span>
		</h3>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted } from 'vue';
import AppMenu from './appMenu.vue';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $xhr = globalProperties!.$xhr;
</script>

<style lang="less" scoped>
// @import url("@/style/style.less");
</style>
