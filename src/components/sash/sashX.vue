<template>
	<div class="h-30 flex-0 flex flex-col justify-center items-center">
		<div @pointerdown="pointerdown" @pointerup="stopSliding" class="w-1 h-24 rounded-lg bg-primary-300/50 dark:bg-primary-500/50 hover:bg-primary-300 hover:dark:bg-primary-500 cursor-col-resize"></div>
		<div @click="close" class="w-1 h-1 mt-4 rounded-lg bg-red-300/50 dark:bg-red-500/50 hover:bg-red-300 hover:dark:bg-red-500 cursor-pointer hover:scale-150 transition delay-150 duration-150 ease-in-out"></div>
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

const width = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});

// const width = ref(350);
const minWidth = 200;
const maxWidth = 650;
// const widthData = computed(() => `${width.value}px`);

function pointerdown(event: PointerEvent) {
	const target = event.target as HTMLElement;
	console.log('pointerdown', event);
	if (event.button !== 0) return; // 非左键取消

	const pointerId = event.pointerId;

	const dom = event.currentTarget as HTMLDivElement;
	dom.setPointerCapture(event.pointerId);

	dom.onpointermove = event => {
		// width.value += event.movementX;
		width.value = Math.max(min.value, Math.min(max.value, width.value + event.movementX));
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
