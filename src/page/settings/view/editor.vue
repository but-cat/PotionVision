<template>
	<div class="w-full h-full flex flex-col items-center space-y-12 overflow-auto">
		<div class="max-w-550 border-b border-gray-900/10 p-4 pb-24">
			<h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Prettierrc</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">配置代码格式化</p>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

				<template v-for="item in config">
					<div v-if="item.type == 'text'" class="col-span-full dark:text-gray-200">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
						<div class="mt-2 text-gray-900 dark:text-gray-200">
							<input v-model="item.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" class="block w-full rounded-md border-0 p-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{{ item.description }}</p>
					</div>

					<div v-if="item.type == 'textarea'" class="col-span-full">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
						<div class="mt-2">
							<!-- <textarea v-model="item.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" ></textarea> -->
							<textarea v-model="item.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" class="w-full flex items-center justify-between rounded-md bg-white dark:bg-slate-800 px-3 py-2 shadow-sm focus:outline outline-2 outline-primary-300/80" ></textarea>
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{{ item.description }}</p>
					</div>

					

					<div v-if="item.type == 'number'" class="col-span-full">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
						<div class="mt-2">
							<!-- <input v-model="item.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> -->
							<input v-model="item.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" class="w-full flex items-center justify-between rounded-md bg-white dark:bg-slate-800 px-3 py-2 shadow-sm focus:outline outline-2 outline-primary-300/80" />
							
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{{ item.description }}</p>
					</div>

					<div v-if="item.type == 'range'" class="col-span-full">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
						<div class="mt-2 flex items-center">
							<!-- <input v-model="item.value" :min="item.min" :max="item.max" :step="item.step" type="range" autocomplete="address-level1" class="block w-full p-2 text-gray-900 placeholder:text-gray-400 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> -->
							<o-range v-model:value="item.value" class="w-full"/>
							<label for="push-everything" class="block ml-4 text-sm font-medium leading-6 text-gray-800 dark:text-gray-100">{{ item.value }}</label>
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{{ item.description }}</p>
					</div>

					<div v-if="item.type == 'switch'" class="col-span-full">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
						<div class="mt-2">
							<o-switch v-model:value="item.value" />
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{{ item.description }}</p>
					</div>



					<div v-if="item.type == 'color'" class="col-span-full">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
						<div class="mt-2">
							<o-color v-model="item.value"></o-color>
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{{ item.description }}</p>
					</div>


					<div v-if="item.type == 'image'" class="col-span-full">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
						<div class="mt-2">
							<div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 relative overflow-hidden">
								<img v-if="true" src="~@assets/bg.png" alt="" class="absolute inset-0 h-full w-full object-cover object-right md:object-center" />
								<div class="w-full h-full px-6 py-10 flex flex-col justify-center items-center bg-gray-50/60 z-10">
									<svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
										<path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
									</svg>
									<div class="mt-4 flex text-sm leading-6 text-gray-600">
										<label for="file-upload" class="px-2 relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
											<span>点击上传</span>
											<input id="file-upload" name="file-upload" accept="image/png, image/jpeg" multiple type="file" class="sr-only" />
										</label>
										<p class="pl-1">或拖拽到此处</p>
									</div>
									<p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF 推荐不大于 4MB</p>
								</div>
							</div>
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{{ item.description }}</p>
					</div>
				</template>

				

			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { it } from 'node:test';
import { reactive, ref, watch, getCurrentInstance, onMounted } from 'vue';

// const 

// bracketSameLine: true,
// useTabs: true,
// tabWidth: 4,
// // printWidth: 960,
// printWidth: 80,

const config = ref([
	{
		name: 'bracketSameLine',
		mutations: 'setting/setBracketSameLine',
		description: '将多行 XML 元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）。',
		label: 'Username',
		type: 'switch',
		value: false,
		
		placeholder: 'janesmith',
	},

	{
		name: 'tabWidth',
		mutations: 'setting/setTabWidth',
		description: '指定每个缩进级别的空格数。',
		label: 'State / Province',
		type: 'range',
		value: 4,
		// placeholder: 'janesmith',
		min: 2,
		max: 8,
		step: 2,
	},


	{
		name: 'printWidth',
		mutations: 'setting/setPrintWidth',
		description: `指定最大的换行行长度。在代码样式指南中，最大行长规则通常设置为 100 或 120。`,
		type: 'number',
		value: 120,
		placeholder: 'janesmith',
	},

	{
		name: 'useTabs',
		mutations: 'setting/setUseTabs',
		description: `使用制表符（tab）缩进而不是空格（space）。`,
		type: 'switch',
		value: true,
		placeholder: 'janesmith',
	},

	{
		name: 'singleAttributePerLine',
		mutations: 'setting/setSingleAttributePerLine',
		description: `在多个属性时，将每个属性放在单独的行上。`,
		type: 'switch',
		value: false,
		placeholder: 'janesmith',
	},

	{
		name: 'useTabs',
		mutations: 'setting/setUseTabs',
		description: `使用制表符（tab）缩进而不是空格（space）。`,
		type: 'color',
		value: "#ffffff",
		placeholder: 'janesmith',
	},

	
]);



watch(config, (val) => {
	// console.log(val);
	
}, {
	deep: true,
});
</script>
