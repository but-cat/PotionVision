<template>
<component :is="type" v-bind="$attrs" class="modal">
	<slot/>
</component>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue';


import modal from "./modal.vue";
import popup from "./popup.vue";
export default defineComponent({
	name: "modalBar",
	props: {
		type: {
			type: String,
			default: "modals"
		}
	},
	components: {
		"modals": modal,
		"popup": popup
	}
})
</script>

<style lang="less" scoped>
.model {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 10;
	pointer-events: none;
	transition: all .3s;
	top: 0;
	right: 0;

	&.open {
		background-color: #24283e88;
		
		pointer-events: auto;
	}


	// .radio_ui();

	.content {
		width: 100%;
		min-height: 648px;
		position: absolute;
		background-color: white;
		border-radius: 16px 16px 0 0;
		bottom: 0;
		transition: transform .3s;

		// &.model-enter-active, &.model-leave-active {
		// 	transition: all .3s;
		// }
		&.model-enter, &.model-leave-to {
			transform: translateY(100%);
		}
		&.model-enter-to, &.model-leave {
			
			transform: translateY(0%);
		}
	}


	button.close {
		all: unset;
		width: 48px;
		height: 48px;
		background-size: 100%;
		background-position: center;
		background-clip: inherit;
		background-repeat: no-repeat;
		margin-right: 16px;

		position: absolute;
		top: 16px;
		right: 32px;

		// background-image: url("~@image/form/close.png");
	}

	h1.title {
		font-size: 36px;
		color: black;
		margin-top: 78px;
		margin-bottom: 26px;
		text-align: center;
	}

	.list {
		flex: 1;
		overflow: auto;
		height: 280px;
		scroll-snap-type: y mandatory;
		.item {
			display: flex;
			align-items: center;
			scroll-snap-align: start;
			color: gray;
			margin: 0 32px;
			margin-bottom: 32px;
			font-size: 28px;

			input {
				margin-right: 16px;
			}
		}
	}
}
</style>