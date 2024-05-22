<template>
	<button class="del-btn w-8 h-8 p-2 border-gray-400/20 hover:text-rose-400 active:scale-90">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" stroke-width="2">
			<g transform="rotate(-45 50 50)">
				<path d="M50-15.5L50-15.5c0.7,0,1.3,0.5,1.3,1.3V6.7C51.3,7.4,50.7,8,50,8l0,0c-0.7,0-1.3-0.5-1.3-1.3v-20.8 C48.7-14.9,49.3-15.5,50-15.5z" />
				<path d="M39.6-5.1h20.8c0.7,0,1.3,0.5,1.3,1.3l0,0c0,0.7-0.5,1.3-1.3,1.3H39.6c-0.7,0-1.3-0.5-1.3-1.3l0,0 C38.3-4.4,38.9-5.1,39.6-5.1z" />
			</g>
		</svg>
	</button>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
</script>

<style lang="less" scoped>
.del-btn {
	display: inline-block;
	// color: #fff;
	cursor: pointer;
	-webkit-app-region: no-drag;
	transition: color 0.2s;
	// margin-left: -5px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	fill: currentColor;
	overflow: hidden;
	// padding: 5px;

	// opacity: 0;
	// position: absolute;
	// top: -15px;
	// right: -15px;

	// color: rgb(235, 84, 84);
	// background-color: #fff;

	&.home:hover {
		color: rgb(84, 235, 223);
		// background-color: rgba(255, 255, 255, 0.3);
	}

	&[disabled='disabled'] {
		color: #ccc;
		cursor: not-allowed;

		&:hover {
			color: #ccc;
			background-color: transparent;
		}
	}
}
</style>
