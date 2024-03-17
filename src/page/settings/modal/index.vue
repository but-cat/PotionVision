<template>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance } from 'vue';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties!;
// const $http = globalProperties.$http;

const observer = new MutationObserver(function callback(mutationList: MutationRecord[], observer: MutationObserver) {
	// mutationList.forEach((mutation) => {
	// 	type MutationType = 'childList' | 'attributes' | 'subtree' | 'attributeOldValue' | 'characterDataOldValue';
	// });

	// console.log('mutationList', mutationList, Boolean(document.querySelector('#modal')!.children.length > 0));
});

onMounted(() => {
	console.log("document.querySelector('#modal')", document.querySelector('#modal')!);

	observer.observe(document.querySelector('#modal')!, {
		childList: true,
		subtree: true,
		// attributes: true,
		// attributeOldValue: true,
		// characterDataOldValue: true
	});


	if(import.meta.env.DEV) observer.observe(document.querySelector('body')!, {
		childList: true,
		subtree: true,
	});
});
</script>

<style lang="less">
@import '@/style/index.less';

#modal {
	flex: 1;
	background-color: transparent;

	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	&:empty {
		/* display: none; */
		// background-color: white;
		pointer-events: none;
	}
	&:not(:empty) {
		z-index: 1000;
	}
}
</style>
