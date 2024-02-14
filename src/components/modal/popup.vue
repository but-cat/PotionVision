<template>
	<Teleport to="#modal">
		<div class="address_model" :class="open && 'open'" @click.prevent.self="$emit('update:open', false)">
			<transition name="model">
				<div v-show="open" class="model">
					<!-- <button @click="$emit('input', false)" class="close"/> -->

					<div class="content">
						<slot />
					</div>
				</div>
			</transition>
		</div>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from "vue";
export default defineComponent({
	name: "oModalPopup",

	emits: ["update:open"],
	props: {
		open: {
			type: Boolean,
			default: false
		},
		data: {
			type: String
		}
	}
});
</script>

<style lang="less" scoped>
.address_model {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 10;
	pointer-events: none;
	transition: all 0.3s;
	top: 0;
	right: 0;

	&.open {
		background-color: #24283e88;

		pointer-events: auto;
	}

	// .radio_ui();

	.model {
		width: 100%;
		// height: 648px;
		position: absolute;
		// background-color: white;
		// border-radius: 8px 8px 0 0;
		bottom: 0;
		transform: translateY(0%);
		transition: translateY 0.3s;

		&.model-enter-active, &.model-leave-active {
			transition: all 0.3s;
		}

		&.model-enter-from,
		&.model-leave-to {
			transform: translateY(100%);
			opacity: 0;
		}

		.content {
			width: 100%;
			// height: 100%;
			// height: 280px;
			// padding: 112px 32px 64px;
		}
	}
}
</style>