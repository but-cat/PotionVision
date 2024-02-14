<template>
	<div :class="[disabled ? 'disabled' : '']" @click="toggle" class="o-checkbox text-primary-400">
		<input :checked="value" type="checkbox" style="display:none;"><!-- 实际操作的input组件 -->
		<label for="checkbox" :class="disabled ? 'disabled' : ''" class="but-label"></label><!-- 复选框 -->
		<div class="content text-gray-900 dark:text-gray-200 pl-2"><slot/></div><!-- 文本 -->
	</div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted, getCurrentInstance, watch, Prop } from "vue";


const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
	value: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
});
const { disabled, value } = toRefs(props);

function toggle(event: Event) {
	const dom = event.currentTarget as HTMLInputElement;
	emit('update:modelValue', !value.value);
	// emit('change', +dom.value);
}

</script>
<!-- 
<script>
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'oCheckbox',
	emits: ['update:modelValue'],
	props: {
		value: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'primary',
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		// 处理拨动动作
		toggle() {
			if(!this.disabled){
				this.$emit('update:modelValue', !this.value);
			}
		}
	}
});
</script> -->
<style lang="less" scoped>

@checked-color: #fff;
// @checked-bg:rgb(101,141,181);
@unchecked-color: currentColor;
@unchecked-bg:#f9f9f9;
@checkbox-height: 20px;
@background-color:#fff;
@font-color:#dcdcdc;
@duration: .4s;


@keyframes dothabottomcheck{
	0% { height: 0; }
	100% { height: @checkbox-height * 0.35;  }
}
@keyframes dothatopcheck{
	0% { height: 0; }
	50% { height: 0; }
	100% { height: @checkbox-height * 0.7; }
}

.o-checkbox {
	// width: 26px;
	height: 24px;

	display: flex;
	// justify-content: center;
	// margin-top: 60px;
	align-items: center;
	position: relative;
	input[type=checkbox]:checked + .but-label,
	.but-label.checked{
		&::after{
			border-color: @checked-color;
			height: @checkbox-height * .35;
			animation: dothabottomcheck @duration/2 ease 0s forwards;
		}
		&::before{
			border-color:@checked-color;
			height: @checkbox-height * 1;
			animation: dothatopcheck @duration ease 0s forwards;
		}


		background: currentColor;
		border-color: currentColor;
	}
	.but-label{
		height: @checkbox-height;
		width: @checkbox-height;
		border-radius: 2px;
		background: @unchecked-bg;
		border: @checkbox-height * .1 solid @unchecked-color;
		// position: relative;
		position: absolute;
		display: inline-block;
		box-sizing: border-box;
		transition: border-color ease @duration/2;
		cursor: pointer;
		&::before,&::after{
			box-sizing: border-box;
			position: absolute;
			height: 0;
			width: @checkbox-height * 0.2;
			background: @checked-color;
			display: inline-block;
			transform-origin: left top;
			content: '';
			transition: opacity ease 0.5s;
		}
		&::before{
			top:@checkbox-height * 0.7;
			left: @checkbox-height * 0.31;
			transform: rotate(-135deg);
		}
		&::after {
			top: @checkbox-height * .45;
			left: @checkbox-height * 0;
			transform: rotate(-45deg);
		}
	}
	.content {
		width: 100%;
		margin-left: 26px;
	}


	




	/* 禁用状态 */
	&.disabled {
		box-shadow: none;
		pointer-events: none !important;
		opacity: 0.5;
		cursor: not-allowed !important;
	}


	// .but-container(@checked-bg){
	// 	input[type=checkbox]:checked + .but-label,
	// 	.but-label.checked{
	// 		background: @checked-bg;
	// 		border-color: @checked-bg;
	// }


	// 主要
	&.primary {
		color: var(--primary);
	}
	// 成功
	&.success {
		color: var(--success);
	}
	// 信息
	&.info {
		color: var(--info);
	}
	// 警告
	&.warning {
		color: var(--warning);
	}
	// 危险
	&.danger {
		color: var(--danger);
	}
}
</style>