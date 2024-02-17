<template>
	<div class="border-b border-gray-900/10 pb-12">
		<h2 class="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
		<p class="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>

		<div class="mt-10 space-y-10">

			<div class="col-span-full">
				<label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">主题</label>
				<div class="mt-6 space-y-6">
					<div class="flex items-center gap-x-3">
						<input id="push-everything" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
						<label for="push-everything" class="block text-sm font-medium leading-6 text-gray-900">自动</label>
					</div>
					<div class="flex items-center gap-x-3">
						<input id="push-email" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
						<label for="push-email" class="block text-sm font-medium leading-6 text-gray-900">亮色</label>
					</div>
					<div class="flex items-center gap-x-3">
						<input id="push-nothing" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
						<label for="push-nothing" class="block text-sm font-medium leading-6 text-gray-900">暗色</label>
					</div>
				</div>
			</div>

			<div class="col-span-full">
				<label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">背景图片</label>
				<div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 relative overflow-hidden">
					<img v-if="true" src="~@assets/114773226_p0.png" alt="" class="absolute inset-0 h-full w-full object-cover object-right md:object-center" />
					<div class="w-full h-full px-6 py-10 flex flex-col justify-center items-center bg-gray-50/60 z-10">
						<svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
						</svg>
						<div class="mt-4 flex text-sm leading-6 text-gray-600">
							<label for="file-upload" class="px-2 relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
								<span>点击上传</span>
								<input id="file-upload" name="file-upload" type="file" class="sr-only" />
							</label>
							<p class="pl-1">或拖拽到此处</p>
						</div>
						<p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF 推荐不大于 4MB</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, IframeHTMLAttributes } from 'vue';

const setting = reactive({
	appearance: {
		theme: 'auto', // auto, light, dark
		coverPhoto: '', // 封面图片
	},

	player: {},

	download: {},

	subsection: {
		path: '/setting/appearance',
	},

	experimental: {
		enable: false,
	},
});
</script>
