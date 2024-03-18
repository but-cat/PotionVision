<template>
	<div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 relative overflow-hidden">
		<img v-if="true" src="~@assets/bg.png" alt="" class="absolute inset-0 h-full w-full object-cover object-right md:object-center" />
		<div class="w-full h-full px-6 py-10 flex flex-col justify-center items-center bg-gray-50/60 z-10">
			<svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
			</svg>
			<div class="mt-4 flex text-sm leading-6 text-gray-600">
				<label for="file-upload" class="px-2 relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500">
					<span>点击上传</span>
					<input id="file-upload" name="file-upload" accept="image/png, image/jpeg" multiple type="file" class="sr-only" />
				</label>
				<p class="pl-1">或拖拽到此处</p>
			</div>
			<p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF 推荐不大于 4MB</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch, getCurrentInstance, onMounted } from 'vue';
import yaml from 'js-yaml';
</script>
