<template>
<!-- @blur="open = false"  -->
	<div :class="disabled ? 'opacity-50' : ''" class="o-select-card dowebok" tabindex="1" ref="list">
		<span @click="() => { if(!disabled) open = !open }" :placeholder="placeholder" :class="open ? 'is-open' : ''"  class="content">

			<span v-if="name" class=" text-sm">{{ name }}</span>
			<span v-else class="text-gray-400 text-sm">{{ placeholder }}</span>
			<!-- <img src="/icon/button_arrow_xl.png" onload="SVGInject(this)" class="icon" alt=""> -->
		</span>


		<!-- <transition name="model">
			<div v-show="open" class="content-card">
				<ul @selected="selecteds" @select="selectChangeVal">
					<slot />
				</ul>
			</div>
		</transition> -->

		<o-modal-popup v-model:open="open">
			<div class="absolute z-10 top-0 left-0 w-full h-10 bg-gradient-to-b from-gray-50 via-gray-50 rounded-t-xl pointer-events-none" data-v-e72b1c36=""></div>
			<ul @selected="selecteds" @select="selectChangeVal" ref="optionList" class="select-list divide-y pb-6 bg-gray-50">
				<slot />
			</ul>
			<div class="absolute z-10 bottom-0 left-0 w-full h-10 bg-gradient-to-t from-gray-50 via-gray-50 rounded-t-xl pointer-events-none" data-v-e72b1c36=""></div>
		</o-modal-popup>

		<!-- <o-modal-block v-model:open="open" :data="data">
			<ul @selected="selecteds" @select="selectChangeVal">
				<slot />
			</ul>
		</o-modal-block> -->
	</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue';

export default defineComponent({
	name: "oSelectCard",
	emits: ["update:value", "open", "close"],
	props: {
		placeholder: {
			value: String,
			default: ""
		},
		value: {
			value: [String, Array],
			default: ""
		},
		multiple: Boolean,

		disabled: {
			value: Boolean,
			default: false
		}
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
			// 	this.$emit("update:value", [...new Set([...this.value, event.value])]);
			// } else {
			// 	this.$emit("update:value", event.value);
			// 	this.open = false;
			// }

			this.name = event.name;
			this.$emit("update:value", event.value);
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
		},

		value: {
			handler(val) {
				this.$nextTick(() => {
					this.name = "";
					const event = new Event("change-val");
					(this as any).$refs.optionList?.dispatchEvent(event);
				});
			},
			immediate: true
		}
	}
});
</script>

<style lang="less" scoped>
.o-select-card {
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

	.select-list {
		width: 100%;
		height: 100%;

		outline: none;
		max-height: 300px;
		font-size: 25px;
		box-shadow: 0 0 10px #b8bac8;
		border: 1px solid #d9d9d9;
		background-color: white;
		border-radius: 16px 16px 0 0;
		// position: fixed;
		// bottom: 0;
		// left: 0;
		overflow: auto;
		color: #717171;
		list-style: none;
		// margin: 0 0 0 20px;
		padding: 20px 10px 0 10px;
		// z-index: 1000;
	}
}

.content-card {
	outline: none;

	width: 100%;
	// height: 300px;
	max-height: 300px;

	box-shadow: 0 0 10px #b8bac8;
	border: 1px solid #d9d9d9;
	border-radius: 12px 12px 0 0;
	background-color: white;
	
	position: fixed;
	bottom: 0;
	left: 0;
	// overflow: hidden;
	
	color: #717171;
	list-style: none;
	// margin: 0 0 0 20px;
	// padding: 20px 20px 0 20px !important;
	z-index: 1000;
}

&.model-enter, &.model-leave-to {
	transform: translateY(100%);
}
&.model-enter-to, &.model-leave {
	transform: translateY(0%);
}
</style>


<style lang="less">
.select-list {
	width: 100%;
	height: 100%;

	outline: none;
	max-height: 300px;
	font-size: 25px;
	box-shadow: 0 0 10px #b8bac8;
	border: 1px solid #d9d9d9;
	background-color: white;
	border-radius: 16px 16px 0 0;
	// position: fixed;
	// bottom: 0;
	// left: 0;
	overflow: auto;
	color: #717171;
	list-style: none;
	// margin: 0 0 0 20px;
	padding: 20px 10px 0 10px;
	// z-index: 1000;
}
</style>