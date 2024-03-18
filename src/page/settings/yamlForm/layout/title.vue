<template>
	<div class="mb-1 col-span-full dark:text-gray-200">
		<h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">{{ item.name }}</h2>
		<p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch, getCurrentInstance, onMounted } from 'vue';

const emit = defineEmits(['update:modelValue']);


interface Item {
	name: string;
	description: string;
	placeholder: string;
}

const props = withDefaults(
	defineProps<{
		modelValue?: string;
		item?: Item;
	}>(),
	{
		modelValue: '',
		item: () => ({
			name: '',
			description: '',
			placeholder: ''
		})
	},
);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value)
	}
});

</script>
