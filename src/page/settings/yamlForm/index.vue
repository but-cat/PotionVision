<template>
	<div class="w-full border-b border-gray-900/10 p-4 pb-24">
		<!-- <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Prettierrc</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">配置代码格式化</p> -->

		<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
			<template v-for="item in config">
				<div v-if="item.type == 'title'" class="mb-1 col-span-full dark:text-gray-200">
					<h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">{{ item.name }}</h2>
					<p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
				</div>

				<div v-if="item.type == 'text'" class="col-span-full dark:text-gray-200">
					<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
					<div class="mt-2 text-gray-900 dark:text-gray-200">
						<o-input v-model="data[item.key]" :value="data[item.key]" @input="e => data[item.key] = e.target.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" />
					</div>
					<!-- <p>{{ data }} | {{ item.key }}</p> -->
					<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
				</div>

				<div v-if="item.type == 'textarea'" class="col-span-full">
					<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
					<div class="mt-2">
						<!-- <textarea v-model="item.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" ></textarea> -->
						<o-textarea :value="data[item.key]" @input="e => data[item.key] = e.target.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" />
					</div>
					<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
				</div>

				<div v-if="item.type == 'number'" class="col-span-full">
					<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
					<div class="mt-2">
						<!-- <input v-model="item.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> -->
						<o-input :value="data[item.key]" @input="e => data[item.key] = e.target.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" class="w-full flex items-center justify-between rounded-md bg-white dark:bg-slate-800 px-3 py-2 shadow-sm focus:outline outline-2 outline-primary-300/80" />
					</div>
					<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
				</div>

				<div v-if="item.type == 'range'" class="col-span-full">
					<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
					<div class="mt-2 flex items-center">
						<!-- <input v-model="item.value" :min="item.min" :max="item.max" :step="item.step" type="range" autocomplete="address-level1" class="block w-full p-2 text-gray-900 placeholder:text-gray-400 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> -->
						<!-- <o-range v-model:value="data[item.key]"  class="w-full" /> -->
						<o-range :value="data[item.key]" @input="e => data[item.key] = e.target.value"  class="w-full" />
						<label for="push-everything" class="block ml-4 text-sm font-medium leading-6 text-gray-800 dark:text-gray-100">{{ item.value }}</label>
					</div>
					<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
				</div>

				<div v-if="item.type == 'switch'" class="col-span-full">
					<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
					<div class="mt-2">
						<o-switch v-model:value="data[item.key]" />
					</div>
					<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
				</div>

				<div v-if="item.type == 'color'" class="col-span-full">
					<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
					<div class="mt-2">
						<o-color v-model="data[item.key]"></o-color>
					</div>
					<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
				</div>

				<div v-if="item.type == 'radio'" class="col-span-full">
					<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
					<div class="mt-2 ml-4 space-y-6">
						<!-- <div class="mt-6 space-y-6"> -->
						<div class="flex items-center gap-x-3">
							<input id="push-everything" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600" />
							<label for="push-everything" class="block text-sm font-medium leading-6 text-gray-900">自动</label>
						</div>
						<div class="flex items-center gap-x-3">
							<input id="push-email" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600" />
							<label for="push-email" class="block text-sm font-medium leading-6 text-gray-900">亮色</label>
						</div>
						<div class="flex items-center gap-x-3">
							<input id="push-nothing" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600" />
							<label for="push-nothing" class="block text-sm font-medium leading-6 text-gray-900">暗色</label>
						</div>
						<!-- </div> -->
					</div>
					<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
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
									<label for="file-upload" class="px-2 relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500">
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

		<div class="mt-6 flex items-center justify-end gap-x-6">
			<button @click="cancel" type="button" class="text-sm font-semibold leading-6 text-gray-900">重置</button>
			<button @click="submit" type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">保存</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { it } from 'node:test';
import { reactive, ref, computed, watch, getCurrentInstance, onMounted } from 'vue';
import yaml from 'js-yaml';

// const props = defineProps(['modelValue', 'template']);
const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
	defineProps<{
		modelValue?: any;
		template?: string;
	}>(),
	{
		modelValue: {},
		template: '',
	},
);


interface FormItem {
	key: string;
	name: string;
	type: string;
	value: any;
	description: string;
	placeholder?: string;
	// min?: number;
	// max?: number;
	// step?: number;
}

const config = ref<FormItem[]>([]);

const data = ref<any>({});

// watch(() => props.template, (val) => {
// 	try {
// 		const ymlConfig = yaml.load(val);
// 		config.value = configStringify(ymlConfig) ?? [];
// 		// console.log('modelValue' ,data, config.value);

// 		data.value = dataStringify(config.value ?? []) ?? {};

// 	} catch (error) {
// 		config.value = [];
// 	}
// }, { immediate: true });



async function cancel() {
	const dataRes = await fetch("apps://setting.api/root/getData");					// 获取数据
	const dataResData = await dataRes.json();

	console.log(dataResData);
	data.value = dataResData ?? {};
}

async function submit() {
	try {
		const res = await fetch("apps://setting.api/root/setData", {				// 设置数据
			method: 'POST',
			body: JSON.stringify(data.value)
		});
		if(res.status !== 200) throw new Error('保存失败');
		window.$news('保存成功');
	} catch (error: any) {
		window.$news(error.message)
	}
}


onMounted(async () => {
	try {
		// const ymlConfig = yaml.load(props.template);
		// config.value = configStringify(ymlConfig) ?? [];
		// console.log('modelValue' ,data, config.value);

		const res = await fetch('apps://setting.api/root/getTemplate'); // 获取表单配置
		const resData = await res.json();

		console.log(resData);
		
		config.value = resData ?? {};



		await cancel();

	} catch (error) {
		config.value = [];
	}
});

// watch(data, (val) => {
// 	console.log('数据更新', val);
// }, {
// 	deep: true,
// });
</script>
