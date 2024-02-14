<template>
	<input :value="modelValue" @input="update" type="range" class="text-primary-400 bg-gray-400 dark:bg-gray-100 w-full block rounded-md focus:outline outline-2 outline-primary-300/80" />
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, getCurrentInstance, watch, Prop } from "vue";

defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'change']);


function update(event: Event) {
	const dom = event.currentTarget as HTMLInputElement;
	emit('update:modelValue', +dom.value);
	emit('change', +dom.value);
}

</script>

<style lang="less" scoped>
input {
	&[type="range"] {
		-webkit-appearance: none;
		appearance: none;
		margin: 0;
		outline: 0;
		background-color: transparent;
		// width: 300px;
	}

	&[type="range"]::-webkit-slider-runnable-track {
		height: 4px;
		background: #99999970;
	}

	&[type="range"]::-webkit-slider-container {
		height: 20px;
		overflow: hidden;
	}

	&[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: currentColor;
		border: 1px solid transparent;
		margin-top: -8px;
		border-image: linear-gradient(currentColor, currentColor) 0 fill / 8 20 8 0 / 0px 0px 0 2000px;
		box-shadow: 0 0 5px 0 rgba(105, 115, 133, 0.2);
		// border: 2px solid rgba(105, 115, 133, 0.2);
		position: relative;
		z-index: 1;
	}
}</style>