<template>
	<div @pointerdown="pointerdown" class="movable alp-selector flex items-center" ref="hueTack">
		<div class="pointer" :style="{ left, '--color': `${color}${'ff'}` }"></div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, computed, watch, onMounted, getCurrentInstance } from 'vue';

const emit = defineEmits(['update:a', 'open', 'close']);

const props = defineProps({
	color: {
		type: String,
		default: '#ffffff',
	},
	a: {
		type: Number,
		default: 0,
	},
});

const a = computed({
	get() {
		return props.a;
	},
	set(value: number) {
		emit('update:a', value);
	},
});


const alpha = computed(() => {
	return a.value / 100;
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
		a.value = Math.round((left.value / width) * 360);
	};

	const onMouseUp = (event: PointerEvent) => {
		dom.releasePointerCapture(pointerId);
		dom.onpointermove = null;
		a.value = Math.round((left.value / width) * 360);
	};
	window.addEventListener('pointerup', onMouseUp, { once: true });
}


onMounted(() => {
	const hueWidth = hueTack.value?.clientWidth ?? 0;
	left.value = Math.round((a.value / 360) * hueWidth);
});

// });
</script>

<style lang="less" scoped>
// @import url("./o_color.less");

@width: 250px;
@spacing: 15px;
@color-black: #021f27;
// @color-light-black: #243135;
@color-lighter-black: #3a4d52;

@img: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==");

.alp-selector {
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
	background-image: @img, linear-gradient(to right, v-bind(color), rgba(255, 255, 255, 0));
	background-size: 8px 8px, 100% 100%;
	
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
