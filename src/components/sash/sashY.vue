<template>
	<div class="w-30 flex-0 flex flex-row justify-center items-center">
		<div @pointerdown="pointerdown" @pointerup="stopSliding" class="w-24 h-1 rounded-lg bg-primary-300/50 dark:bg-primary-500/50 hover:bg-primary-300 hover:dark:bg-primary-500 cursor-row-resize"></div>
	</div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, watch, markRaw } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

const emit = defineEmits(['update:modelValue']);
// const props = defineProps(['modelValue']);

const props = withDefaults(
	defineProps<{
		modelValue: number;
		min: number;
		max: number;
	}>(),
	{
		modelValue: 350,
		min: 0,
		max: Infinity,
	},
);
const { min, max } = toRefs(props);

const height = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});



function pointerdown(event: PointerEvent) {
	const target = event.target as HTMLElement;
	console.log('pointerdown', event);
	if (event.button !== 0) return; // 非左键取消

	const pointerId = event.pointerId;

	const dom = event.currentTarget as HTMLDivElement;
	dom.setPointerCapture(event.pointerId);

	dom.onpointermove = event => {
		height.value = Math.max(min.value, Math.min(max.value, height.value + event.movementY));
	};

	const onMouseUp = (event: PointerEvent) => {
		dom.releasePointerCapture(pointerId);
		dom.onpointermove = null;
		window.removeEventListener('pointerup', onMouseUp);
	};
	window.addEventListener('pointerup', onMouseUp, { once: true });
}

function stopSliding() {}

function close() {
	router.push('/');
}
</script>
