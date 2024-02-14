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
							<o-input v-model="item.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" />
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
					</div>

					<div v-if="item.type == 'textarea'" class="col-span-full">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
						<div class="mt-2">
							<!-- <textarea v-model="item.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" ></textarea> -->
							<o-textarea v-model="item.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1"/>
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
					</div>

					

					<div v-if="item.type == 'number'" class="col-span-full">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
						<div class="mt-2">
							<!-- <input v-model="item.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> -->
							<o-input v-model="item.value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" class="w-full flex items-center justify-between rounded-md bg-white dark:bg-slate-800 px-3 py-2 shadow-sm focus:outline outline-2 outline-primary-300/80" />
							
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
					</div>

					<div v-if="item.type == 'range'" class="col-span-full">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
						<div class="mt-2 flex items-center">
							<!-- <input v-model="item.value" :min="item.min" :max="item.max" :step="item.step" type="range" autocomplete="address-level1" class="block w-full p-2 text-gray-900 placeholder:text-gray-400 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> -->
							<o-range v-model:value="item.value" class="w-full"/>
							<label for="push-everything" class="block ml-4 text-sm font-medium leading-6 text-gray-800 dark:text-gray-100">{{ item.value }}</label>
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
					</div>

					<div v-if="item.type == 'switch'" class="col-span-full">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
						<div class="mt-2">
							<o-switch v-model:value="item.value" />
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
					</div>



					<div v-if="item.type == 'color'" class="col-span-full">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
						<div class="mt-2">
							<o-color v-model="item.value"></o-color>
						</div>
						<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
					</div>
				</template>

				

			</div>
		</div>
</template>

<script setup lang="ts">
import { it } from 'node:test';
import { reactive, ref, computed, watch, getCurrentInstance, onMounted } from 'vue';
import yaml from "js-yaml";

// const props = defineProps(['modelValue', 'template']);
const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
	defineProps<{
		modelValue?: any;
		template?: string;
	}>(),
	{
		modelValue: {},
		template: ''
	},
);

// const config = computed({
// 	get() {
// 		return JSON.parse(JSON.stringify(props.modelValue));
// 	},
// 	set(value) {
// 		emit('update:modelValue', value)
// 	}
// });



function configStringify(data: any) {
	const interfaceList: any[] = Object.entries(data);
	return interfaceList.reduce((prev, [keys, config]) => {


		let params: any = {};

		if (/\[/.test(keys)) params = typeof config === "object" ? config : {
			key: keys.replace(/(.*\/)*([^\[]+).*/ig, "$2"),
			type: /\[/.test(keys) ? keys.replace(/(.*\[)*([^\]]+).*/ig, "$2") : 'string',
			value: /\=/.test(keys) ? keys.replace(/.+\=/, "") : undefined,
			description: config
		};// [type]
		else params = typeof config === "object" ? config : {
			key: keys,
			type: 'string',
			value: config,
			description: config
		};// string

		const { type, value, description = '', item = '', key = keys } = params;

		switch (type) {
			case 'array':
				let def = {
					"type": "array",
					"description": `${description} 数组`,
					"items": {
						"type": item,
						"description": description,
					},
				}
				if (typeof item === "string") prev[key] = ({
					string: def,
					number: def,
					boolean: def,
				} as any)[item as any];

				if (!Array.isArray(item) && typeof item === "object") prev[key] = {
					"type": "object",
					"value": typeof item,
					"properties": configStringify(item),													// 对象
				};


				break;

			case 'object':
				prev[key] = {
					"type": "object",
					"title": `${description} 对象`,
					"properties": configStringify(value),											// 对象
					"required": Object.keys(value),												// 必填项
				}
				break;

			case 'title':

			case 'input':
			case 'textarea':
			case 'number':
			case 'range':
			case 'switch':
			case 'color':
				prev[key] = { key, name: key, type, value, description };
				break;

			default:
				prev[key] = { key, name: key, type: 'text', value: undefined, description };
				break;
		}


		// if(Array.isArray()) 
		return prev;
	}, {} as any);


	// interfaceReq.reduce((prev, { key, type, value, description }) => {
	// 	// console.log(key, type, value, description);

	// 	prev[key] = { key, type, value, description };
	// 	return prev;
	// }, {} as any),
}


function dataStringify(config: any) {
	console.log(config);
	
	// return Object.defineProperties({}, config.reduce((prev, { key, type, value, description }) => {
	// 	// console.log(key, type, value, description);

	// 	prev[key] = { key, type, value, description };
	// 	return prev;
	// }, {} as any));
}


// const 

// bracketSameLine: true,
// useTabs: true,
// tabWidth: 4,
// // printWidth: 960,
// printWidth: 80,

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


watch(() => props.template, (val) => {
	try {
		const ymlConfig = yaml.load(val);
		config.value = configStringify(ymlConfig) ?? [];
		// console.log('modelValue' ,data, config.value);

		data.value = dataStringify(config.value ?? []) ?? {};

	} catch (error) {
		config.value = [];
	}
}, { immediate: true });


// watch(config, (val) => {
// 	// console.log(val);
	
// }, {
// 	deep: true,
// });
</script>
