<template>
	<div :class="[type, disabled ? 'disableds' : '']" class="switch " @click="toggle">
		<div :class="[valueData ? 'no text-primary-400' : 'off text-gray-400 dark:text-gray-100', disableds]" class="bar"></div>
		<div :class="[valueData ? 'no text-primary-400' : 'off text-gray-400 dark:text-gray-100']" class="container"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: "oSwitch",
	emits: ["update:value"],
	props: {
		value: {
			type: [Boolean, String, Number],
			default: false
		},
		type: {
			type: String,
			default: "primary"
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		disableds() {
			return this.disabled ? "disableds" : "";
		},
		valueData() {
			switch (typeof this.value) {
				case "string":
					return this.value === "true";
					break;
			
				case "number":
					return this.value === 1;
					break;

				case "boolean":
					return this.value;
					break;

				default:
					return false;
					break;
			}
		}
	},
	methods: {
		toggle() {
			switch (typeof this.value) {
				case "string":
					return this.$emit("update:value", this.value === "true" ? "false" : "true");
					break;
			
				case "number":
					return this.$emit("update:value", this.value === 1 ? 0 : 1);
					break;

				case "boolean":
					return this.$emit("update:value", !this.value);
					break;

				default:
					return this.$emit("update:value", false);
					break;
			}
		}
	}
});
</script>
<style lang="less" scoped>
// @import "../../../_style/variables.less";
.switch {
	position: relative;
	width: 26px;
	height: 24px;
	display: inline-flex;
	justify-content: center;
	align-items: center;

	margin: 0 10px;
	.container {
		width: 100%;
		height: 14px;
		background-color: #bcb4b4;
		border-radius: 100px;
		user-select: none;
		transition: all 0.3s;
		opacity: 0.5;
	}
	.bar {
		width: 20px;
		height: 20px;
		cursor: pointer;
		position: absolute;
		z-index: 1;
		border-radius: 100%;
		box-shadow: 0 0 3px 0 rgba(105, 115, 133, 0.2);
		transition: all 0.3s, width 0.3s;
	}
	.no {
		left: 14px;
		background-color: currentColor;
	}
	.off {
		left: -8px;
		background-color: currentColor;
	}


	/* 禁用状态 */
	&.disabled {
		box-shadow: none;
		pointer-events: none !important;
		opacity: 0.5;
		filter: grayscale(80%);
		cursor: not-allowed !important;
	}

	// 主要
	// &.primary {
	// 	color: #60a5fa;

	// }
	// // 成功
	// &.success {
	// 	color: var(--success);
	// }
	// // 信息
	// &.info {
	// 	color: var(--info);
	// }
	// // 警告
	// &.warning {
	// 	color: var(--warning);
	// }
	// // 危险
	// &.danger {
	// 	color: var(--danger);
	// }
}
</style>