<template>
	<div class="col-span-full dark:text-gray-200">
		<label for="region" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">{{ item.name }}</label>
		<div class="mt-2 text-gray-900 dark:text-gray-200">
			<o-input v-model="value" :placeholder="item.placeholder" type="text" autocomplete="address-level1" />
		</div>
		<p v-if="item.description" class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ item.description }}</p>
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
