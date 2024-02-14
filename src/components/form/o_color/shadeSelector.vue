<template>
	<div @pointerdown="pointerdown" class="movable shade-selector relative" :style="{ '--color': `#${convert.hsv.hex(h, 100, 100)}` }" ref="shadeContainer">
		<div class="pointer" :style="{ '--color': `#${convert.hsv.hex(h, s, v)}`, top: `${top}px`, left: `${left}px` }"></div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, computed, watch, onMounted, getCurrentInstance } from 'vue';
import convert from 'color-convert';

const emit = defineEmits(['update:modelValue', 'update:s', 'update:v']);

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	color: {
		type: String,
		default: '#ff0000',
	},
	h: {
		type: Number,
		default: 0,
	},
	s: {
		type: Number,
		default: 0,
	},
	v: {
		type: Number,
		default: 0,
	},
});
const { modelValue, color, h } = toRefs(props);

const colorHSV = computed(() => convert.hex.hsv(color.value));

const top = ref(0);
const left = ref(0);
const shadeContainer = ref<HTMLDivElement>();

const s = computed({
	get() {
		return props.s;
	},
	set(value: number) {
		emit('update:s', value);
	},
});

const v = computed({
	get() {
		return props.v;
	},
	set(value: number) {
		emit('update:v', value);
	},
});

// const s = ref(0);
// const v = ref(0);
function pointerdown(event: PointerEvent) {
	event.preventDefault();
	event.stopPropagation();
	const dom = event.currentTarget as HTMLDivElement;
	const pointerId = event.pointerId;
	const width = dom.clientWidth - 16;
	const height = dom.clientHeight - 16;

	
	

	top.value = event.offsetY - 9;
	left.value = event.offsetX - 9;

	dom.setPointerCapture(event.pointerId);

    const color = modelValue.value.split(',');

	dom.onpointermove = (event) => {
		left.value = event.offsetX - 9;
		if (left.value <= 0) left.value = 0;
		else if (left.value >= width) left.value = width;

		top.value = event.offsetY - 9;
		if (top.value <= 0) top.value = 0;
		else if (top.value >= height) top.value = height;

		s.value = Math.round((left.value / width) * 100);
		v.value = Math.round(100 - (top.value / height) * 100);

		console.log(event.offsetX, event.offsetY);
	};

	const onMouseUp = (event: PointerEvent) => {
		dom.releasePointerCapture(pointerId);
		dom.onpointermove = null;
	};
	window.addEventListener('pointerup', onMouseUp, { once: true });
}

onMounted(() => {
	const width = shadeContainer.value?.clientWidth ?? 0;
	const height = shadeContainer.value?.clientHeight ?? 0;
	left.value = Math.round((s.value / 100) * (width - 16));
	top.value = Math.round((100 - v.value) / 100 * (height - 16));
});
</script>

<style lang="less" scoped>
// @import url("./o_color.less");

@width: 250px;
@spacing: 15px;
@color-red: red;
@color-black: #021f27;
@color-light-black: #243135;
@color-lighter-black: #3a4d52;

.color-picker {
	height: 100%;
	background-color: white;
	border-radius: 5px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
	overflow: hidden;

	.shade-selector {
		position: relative;
		width: @width;
		margin: @spacing;
		cursor: pointer;
		user-select: none;
		border-radius: 3px;
		box-shadow:
			inset 0 0 1px rgba(@color-black, 0.4),
			inset 0 0 5px rgba(@color-lighter-black, 0.2);

		background-image: linear-gradient(90deg, red, #ff0, lime, cyan, blue, #f0f, red);

		height: @width;
		background: linear-gradient(transparent, black), linear-gradient(90deg, white, transparent), linear-gradient(var(--color), var(--color));
	}

	.pointer {
		position: absolute;
		z-index: 1;
		// top: 0;
		// bottom: 0;
		// margin: auto;
		width: 16px;
		height: 16px;
		border-radius: 10px;
		border: 2px solid white;
		// transform: translate(-10px, -10px);
		box-shadow:
			0 0 5px rgba(black, 0.2),
			inset 0 0 5px rgba(black, 0.2);
		background-color: var(--color);
	}
}
</style>
