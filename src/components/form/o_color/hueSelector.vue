<template>
	<div @pointerdown="pointerdown" class="movable hue-selector flex items-center" ref="hueTack">
		<div class="pointer" :style="{ left: `${left}px`, '--color': `#${convert.hsv.hex(h, 100, 100)}` }"></div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, computed, watch, onMounted, getCurrentInstance } from 'vue';

import convert from 'color-convert';

const emit = defineEmits(['update:h', 'open', 'close']);

const props = defineProps({
	h: {
		type: Number,
		default: 0,
	},
});

const h = computed({
	get() {
		return props.h;
	},
	set(value: number) {
		emit('update:h', value);
	},
});

const left = ref(0);
const hueTack = ref<HTMLDivElement>();

function pointerdown(event: PointerEvent) {
	event.preventDefault();
	event.stopPropagation();
	const dom = event.currentTarget as HTMLDivElement;
	const width = dom.clientWidth - 16;
	const pointerId = event.pointerId;

	dom.setPointerCapture(event.pointerId);

	left.value = event.offsetX - 9;
	dom.onpointermove = (event) => {
		left.value = event.offsetX - 9;
		if (left.value <= 0) left.value = 0;
		else if (left.value >= width) left.value = width;
		h.value = Math.round((left.value / width) * 360);
	};

	const onMouseUp = (event: PointerEvent) => {
		dom.releasePointerCapture(pointerId);
		dom.onpointermove = null;
		h.value = Math.round((left.value / width) * 360);
	};
	window.addEventListener('pointerup', onMouseUp, { once: true });
}


// watch(() => h.value, () => {
onMounted(() => {
	const hueWidth = hueTack.value?.clientWidth ?? 0;
	left.value = Math.round((h.value / 360) * hueWidth);
});

// });
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

	.hue-selector {
		position: relative;
		width: @width;
		margin: @spacing;
		cursor: pointer;
		user-select: none;
		border-radius: 3px;
		box-shadow:
			inset 0 0 1px rgba(@color-black, 0.4),
			inset 0 0 5px rgba(@color-lighter-black, 0.2);

		height: 8px;
		background-image: linear-gradient(90deg, red, #ff0, lime, cyan, blue, #f0f, red);
	}

	.pointer {
		position: absolute;
		z-index: 1;
		top: 0;
		bottom: 0;
		margin: auto;
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
