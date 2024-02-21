<template>

	<div class="w-full h-full p-12 pt-10 overflow-auto bg-gray-50">
		<div class="space-y-12">
			<appearance :options="setting.appearance"/>
		</div>

		<div class="mt-6 flex items-center justify-end gap-x-6">
			<!-- <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button> -->
			<button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">保存</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, IframeHTMLAttributes } from 'vue';
import appearance from "./appearance/index.vue";

const setting = reactive({
	appearance: {
		theme: 'auto',											// auto, light, dark
		coverPhoto: '',											// 封面图片
	},


	player: {

	},


	download: {

	},


	subsection: {
		path: '/setting/appearance',
	},



	experimental: {
		enable: false,
	},
});
</script>
