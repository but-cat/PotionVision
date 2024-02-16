<template>
	<div class="flex flex-auto rounded-full bg-gray-300 dark:bg-gray-500 overflow-hidden">
		
		<div :style="{ width }" class="h-full flex-none rounded-full rounded-l-full bg-primary-600/80"></div>
		<!-- <div class="-my-[0.3125rem] ml-0.5 h-[1.125rem] w-1 rounded-full bg-indigo-600"></div> -->
	</div>

	<!-- {{ progress }} -->
</template>


<script lang="ts" setup>
import { reactive, ref, computed, onMounted, getCurrentInstance, watch, Prop } from "vue";

const props = defineProps({
	modelValue: {
		type: Number,
		default: 0,
	},
	max: {
		type: Number,
		default: 100,
	},
});



const progress = computed(() => {
	return Math.min(100, Math.max(0, props.modelValue / props.max * 100));
});

const width = computed(() => {
	return `${progress.value}%`;
});


</script>
