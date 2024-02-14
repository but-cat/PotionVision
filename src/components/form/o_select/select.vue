<template>
	<div class="o-select dowebok outline-primary-300/80" @blur="open = false" tabindex="1"  ref="list">
		<span @click="open = !open" :placeholder="placeholder" :class="open ? 'is-open' : ''"  class="content">

			<span v-if="name" class=" text-sm">{{ name }}</span>
			<span v-else class="text-gray-400 text-sm">{{ placeholder }}</span>
			<!-- <img src="/icon/button_arrow_xl.png" onload="SVGInject(this)" class="icon" alt=""> -->
		</span>

		<e-collapse>
			<ul v-show="open" @selected="selecteds" @select="selectChangeVal">
				<slot />
			</ul>
		</e-collapse>
	</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue';

export default defineComponent({
	name: "oSelect",
	emits: ["update:modelValue", "open", "close"],
	props: {
		placeholder: {
			value: String,
			default: ""
		},
		value: {
			value: [String, Array],
			default: ""
		},
		multiple: Boolean
	},
	data: () => ({
		open: false,
		name: ""
	}),
	provide() {
		return {
			selectedData: computed(() => this.value)
		}
	},
	methods: {
		selectChangeVal(event: any) {
			event.stopPropagation();
			// let { name } = this;
			// if (name == event.name) return;

			
			// if (this.multiple) {
			// 	this.$emit("update:modelValue", [...new Set([...this.value, event.value])]);
			// } else {
			// 	this.$emit("update:modelValue", event.value);
			// 	this.open = false;
			// }

			this.name = event.name;
			this.$emit("update:modelValue", event.value);
			this.open = false;
		},
		selecteds(event: any) {
			event.stopPropagation();
			this.name = event.name;
		}
	},
	watch: {
		open() {
			if (this.open) this.$emit("open");
			else this.$emit("close");
		}
	}
});
</script>

<style lang="less" scoped>
.o-select {
	position: relative;
	display: block;
	text-align: left;
	user-select: none;
	overflow: visible;
	outline: none;

	width: 100%;
	// height: 24px;
	// border: 1px solid var(--divider);
	// border-radius: 3px;

	.content {
		position: relative;
		z-index: 2;
		// background: url("~@assets/image/input-bg.png") no-repeat center;
		background-size: 100% 100%;
		background-color: var(--background);
		// margin-left: 20px;
		color: var(--textHint);
		// padding-left: 17px;
		width: 100%;
		height: 100%;
		font-size: 16px;
		outline: none;
		display: inline-block;

		&:empty::before {
			color: #b8bac8;
			content: attr(placeholder);
		}

		.icon {
			transition: 0.3s;
			display: inline-block;
			flex: 0 0 25px;
			margin-right: 14px;
			width: 25px;
			height: 13px;

			right: 0;
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;

			object-position: center;
			object-fit: contain;
		}
		&.is-open .icon {
			transform: rotate(180deg);
		}
	}

	ul {
		outline: none;
		// max-height: 300px;
		font-size: 25px;
		box-shadow: 0 0 10px #b8bac8;
		border: 1px solid #d9d9d9;
		background-color: white;
		border-radius: 3px;
		position: absolute;
		// top: 38px;
		overflow: auto;
		width: 100%;
		color: #717171;
		list-style: none;
		// margin: 0 0 0 20px;
		padding: 0;
		z-index: 1000;
	}
}
</style>