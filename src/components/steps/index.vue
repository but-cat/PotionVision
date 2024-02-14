<template>
	<nav class="progress-steps">
		<ol role="list" class="flex items-center">

			<template v-for="index in sizeNum">
				<li v-if="index < stepNum" class="relative flex justify-center items-center">
					<div href="#" class="w-8 h-8 p-1 rounded-full bg-primary-400 ">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-full h-full">
							<path
								fill-rule="evenodd"
								d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="w-28 h-8 flex justify-center items-center" aria-hidden="true">
						<div class="w-full h-0.5 bg-primary-400"></div>
					</div>
				</li>


				<li v-else-if="index == stepNum" class="relative flex justify-center items-cente">
					<div href="#" class="w-8 h-8 p-1 flex justify-center items-center rounded-full border-2 border-primary-400 ">
						<span class="w-2 h-2 bg-primary-400 rounded-full " aria-hidden="true"></span>
					</div>
					<div class="w-28 h-8 flex justify-center items-center" aria-hidden="true">
						<div class="w-full h-0.5 bg-gray-300"></div>
					</div>
				</li>


				<li v-else-if="index > stepNum" class="relative flex justify-center items-cente">
					<div href="#" class="w-8 h-8 p-1 flex justify-center items-center rounded-full border-2 border-gray-300 "></div>
					<div class="w-28 h-8 flex justify-center items-center" aria-hidden="true">
						<div class="w-full h-0.5 bg-gray-300"></div>
					</div>
				</li>
			</template>
		</ol>
	</nav>
</template>
<script lang="ts" setup>
import { useSlots, ref, toRefs, computed, onMounted } from 'vue';

const props = defineProps<{
	step: number | string;
	size: number | string;
}>();
const { step, size } = toRefs(props);

const sizeNum = computed(() => Number(size.value));
const stepNum = computed(() => Number(step.value));





</script>

<style lang="less" scoped>
.progress-steps {


	.relative {
		&:last-child div:last-child {
			display: none;
		}
	}
}
</style>
