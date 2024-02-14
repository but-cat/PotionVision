<template>
	
		<!-- <div class="address_model z-50" :class="open && 'open'" @click.prevent.self="$emit('update:open', false)"> -->
			<transition name="model">
				<Teleport v-if="open" to="#modal">
					<div class="model z-20 w-full h-full fixed left-0 right-0 top-0 bottom-0 m-auto flex justify-center items-center">
						<slot />
					</div>
				</Teleport>
			</transition>


			<transition name="model">
				<Teleport v-if="open" to="#modal">
					<div class="address_model z-10 w-full h-full fixed left-0 right-0 top-0 bottom-0 m-auto" :class="open && 'open'" @click.prevent.self="$emit('update:open', false)"/> 
				</Teleport>
			</transition>
		<!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from "vue";

export default defineComponent({
	name: "oModalBlock",
	emits: ["update:open"],
	props: {
		open: {
			type: Boolean,
			default: false
		}
	}
});
</script>

<style lang="less" scoped>
.address_model {
	width: 100%;
	// height: 100%;
	position: fixed;
	// z-index: 10;
	pointer-events: none;
	transition: all 0.3s;
	box-sizing: border-box;
	// padding: 0 32px;

	display: flex;
	justify-content: center;
	align-items: center;

	// top: 0;
	// right: 0;
	// bottom: 0;

	&.open {
		background-color: #24283e88;
		pointer-events: auto;
	}
}

.model {
	width: 100%;
	min-height: 150px;
	position: relative;
	// background-color: white;
	// border-radius: 8px;
	bottom: 0;
	transition: all 0.3s;
	transform: translateY(0%);
	// padding: 0 32px;
	// margin: 0 32px;
	// margin-bottom: 40vw;

	&.model-enter-active, &.model-leave-active {
		transition: all 0.3s;
	}

	&.model-enter-from,
	&.model-leave-to {
		transform: translateY(20%);
		opacity: 0;
	}


}
</style>