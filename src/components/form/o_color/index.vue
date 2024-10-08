<template>
	<div class="o-color w-full rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 px-3 py-2 shadow-sm focus:outline outline-2 outline-primary-300/80 relative" @blur="open = false" tabindex="1" ref="list">
		<div @click="openColorSelect" class="content h-5 flex items-center justify-between">
			<span class="w-fulls text-sm">{{ modelValue }}</span>
			<div @click.prevent.stop="!(open = false) && inputColor?.click()" class="color w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-700 dark:text-gray-200" :style="{ 'backgroundColor': modelValue }"></div>
		</div>

		<input v-model="color" type="color" ref="inputColor" class="w-full h-full left-0 top-0 absolute opacity-0 pointer-events-none">

		<!-- <ul v-if="open" class="shadow-lg rounded-md">
			<div class="color-picker bg-white dark:bg-slate-800 shadow-lg rounded-md">
				<ShadeSelector :color="color" :h="colorHSV.h" v-model:s="colorHSV.s" v-model:v="colorHSV.v"/>
				<HueSelector :color="color" v-model:h="colorHSV.h"/>
				<div class="info-box text-gray-600 dark:text-gray-300">
					<div title="Hex">{{ colorHEX }}</div>
					<div title="R">{{ colorRGB[0] }}</div>
					<div title="G">{{ colorRGB[1] }}</div>
					<div title="B">{{ colorRGB[2] }}</div>
				</div>
				<AlpSelector v-if="alpha" :color="colorHEX" v-model:a="colorHSV.a"/>
			</div>
		</ul> -->

		<oContextMenu v-if="open"  :left="position.left" :top="position.top" @close="open = false">
			<!-- <div class="relative shadow-lg rounded-md"> -->
				<div class="color-picker relative bg-white dark:bg-slate-800 shadow-lg rounded-md">
					<ShadeSelector :color="color" :h="colorHSV.h" v-model:s="colorHSV.s" v-model:v="colorHSV.v"/>
					<HueSelector :color="color" v-model:h="colorHSV.h"/>
					<div class="info-box text-gray-600 dark:text-gray-300">
						<div title="Hex">{{ colorHEX }}</div>
						<div title="R">{{ colorRGB[0] }}</div>
						<div title="G">{{ colorRGB[1] }}</div>
						<div title="B">{{ colorRGB[2] }}</div>
					</div>
					<AlpSelector v-if="alpha" :color="colorHEX" v-model:a="colorHSV.a"/>
				</div>
			<!-- </div> -->
		</oContextMenu>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, computed, watch, onMounted, getCurrentInstance } from "vue";
import ShadeSelector from "./shadeSelector.vue";
import HueSelector from "./hueSelector.vue";
import AlpSelector from "./alpSelector.vue";

import convert from "color-convert";

const emit = defineEmits(["update:modelValue", 'open', 'close', 'change']);

const props = defineProps({
	modelValue: {
		type: String,
		default: ""
	},
	type: {
		type: String,
		default: "HEX"
	},
	alpha: {
		type: Boolean,
		default: false
	}
});
const { type, modelValue } = toRefs(props);


const position = reactive({
	left: 0,
	top: 0
});

const open = ref(false);
const inputColor = ref<HTMLInputElement>();

const colorHSV = reactive({
	h: 0,
	s: 0,
	v: 0,
	a: 0,
});

const colorHEX = computed(() => {
	return `#${convert.hsv.hex(colorHSV.h, colorHSV.s, colorHSV.v)}`;
});

const colorRGB = computed(() => {
	return convert.hsv.rgb(colorHSV.h, colorHSV.s, colorHSV.v);
});

const color = computed({
	get() {
		return colorHEX.value;
	},
	set(value: string) {
		const color = convert.hex.hsv(value);
		colorHSV.h = color[0];
		colorHSV.s = color[1];
		colorHSV.v = color[2];
	},
});


function openColorSelect(event: MouseEvent) {
	open.value = true;
	position.left = event.clientX + 10;
	position.top = event.clientY + 10;
}

watch(() => open.value, (val) => val ? emit('open') : emit('close'));

watch(() => colorHSV, () => {
	emit('update:modelValue', colorHEX.value);
	emit('change', colorHEX.value);
}, { deep: true });

watch(() => modelValue.value, () => {
	if (!modelValue.value || modelValue.value == colorHEX.value) return;
	const color = convert.hex.hsv(modelValue.value);
	colorHSV.h = color[0];
	colorHSV.s = color[1];
	colorHSV.v = color[2];
});
	
</script>

<style lang="less" scoped>
// @import url("./o_color.less");

.o-color {
	// flex-basis: fit-content;
	position: relative;
	// display: block;
	// text-align: left;
	// user-select: none;
	// overflow: visible;
	// outline: none;

	// width: 100%;
	// height: 24px;
	// border: 1px solid var(--divider);
	// border-radius: 3px;

	// height: 36px;

	.color-picker {
		// min-width: 280px;
		width: 280px;
		outline: none;
		// max-height: 300px;
		font-size: 25px;
		// box-shadow: 0 0 10px #b8bac8;
		// border: 1px solid #d9d9d9;
		// background-color: white;
		// border-radius: 3px;
		position: absolute;
		top: 42px;
		right: 0;
		overflow: auto;
		// width: 100%;
		color: #717171;
		list-style: none;
		// overflow: hidden;
		// margin: 0 0 0 20px;
		// padding: 0;
		z-index: 1000;
	}
}

@width: 250px;
@spacing: 15px;
@color-red: red;
@color-black: #021f27;
@color-light-black: #243135;
@color-lighter-black: #3a4d52;

.color-picker {
	// width: @width;
	width: 280px;
	// height: 100%;
	// background-color: white;
	border-radius: 5px;
	// box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
	overflow: hidden;
}

.info-box {
	display: flex;
	justify-content: space-between;
	margin: 30px 10px 10px;

	div {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-basis: 50px;
		font-size: 12px;
		height: 28px;
		border: 1px solid rgba(black, 0.1);
		border-radius: 6px;
		user-select: all;

		&::before {
			content: attr(title);
			position: absolute;
			top: -18px;
			font-weight: bold;
			font-size: 10px;
		}

		&:first-child {
			flex-basis: 80px;
		}
	}
}
</style>
