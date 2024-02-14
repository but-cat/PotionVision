<template>
	<li @click="click" :class="choice && 'text-blue-400'" class="o-option py-2 text-sm text-center" ref="li"><span><slot/></span></li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: "oSelectOption",
	inject: ['selectedData'],
	props: {
		// selected: {
		// 	value: [String, Boolean],
		// 	// default: false
		// },
		value: {
			value: [String, Boolean, Number],
			default: false
		},
	},
	computed: {
		choice() {
			return this.value === (this as any).selectedData;
		}
	},
	methods: {
		selecteds() {
			if ((this as any).selectedData === this.value) {
				const selected = new CustomEvent('selected', { bubbles: true, cancelable: true }) as any;
				selected.value = this.value;
				selected.name = (this as any).$refs?.li?.innerText;
				(this as any).$refs?.li?.dispatchEvent(selected);
			}
		},
		click() {
			const select = new CustomEvent('select', { bubbles: true, cancelable: true }) as any;
			select.value = this.value;
			select.name = (this as any).$refs?.li?.innerText;
			(this as any).$refs?.li?.dispatchEvent(select);
		}
	},
	watch: {
		value() {
			if(this.$refs?.li) this.selecteds();
		},
		selectedData() {
			if(this.$refs?.li) this.selecteds();
		},
	},
	mounted() {
		if(this.$refs?.li) this.selecteds();

		(this as any).$refs?.li.parentElement.addEventListener("change-val", this.selecteds.bind(this));
	},
});
</script>

<style lang="less" scoped>
.o-option {
	display: block;
	width: 100%;
	// height: 24px;
	// font-size: 16px;
	// display: flex;
	// align-items: center;
	// justify-content: flex-start;
	content-visibility: auto;

	margin: 0;
	padding: 2px 20px;
	padding-left: 14px;
	box-sizing: border-box;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	
	

	// &:not(:last-child) {
	// 	border-bottom: 1px solid #ebf0f5;
	// }
	// &:active {
	// 	background-color: rgba(77, 198, 255, 0.849);
	// }
	span {
		position: relative;
		&:hover::before {
			position: absolute;
			top: 50%;
			left: -27px;
			content: '';
			transform: translateY(-50%);
			width:17px;
			height: 12px;
			
			background-size: 100% 100%;
		}
		&.choice::before {
			position: absolute;
			top: 50%;
			left: 55px;
			content: '';
			transform: translateY(-50%);
			width:17px;
			height: 12px;
			background-color: var(--primary);
			background-size: 100% 100%;
		}
	}
	&:hover {
		position: relative;
		color: var(--sceneText);
		background-color: var(--primary);
	}
	&.choice {
		position: relative;
		color: var(--sceneText);
		background-color: var(--primary);
	}
}
</style>