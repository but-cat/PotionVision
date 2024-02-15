<template>
	<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm text-gray-900 dark:text-gray-300" aria-label="Pagination">
		<a @click="previous" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 focus:z-20 focus:outline-offset-0">
			<span class="sr-only">Previous</span>
			<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
			</svg>
		</a>
		
		<template v-if="size <= 7">
			<a v-for="i in size" @click="activeIndex = i" :class="i == activeIndex ? ['bg-primary-600', 'text-white'] : ['text-gray-900', 'dark:text-gray-300']" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 focus:z-20 focus:outline-offset-0">{{ i }}</a>
		</template>


		<template v-else>
			<template v-if="activeIndex <= 4">
				<a v-for="i in [1,2,3,4,5]" @click="activeIndex = i" :class="i == activeIndex ? ['bg-primary-600', 'text-white'] : []" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:z-20 focus:outline-offset-0">{{ i }}</a>
				<span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-offset-0">...</span>
				<a @click="activeIndex = size" class="relative hidden items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 focus:z-20 focus:outline-offset-0 md:inline-flex">{{ size }}</a>
			</template>


			<template v-else-if="activeIndex > 4 && activeIndex < (size - 3)">
				<a @click="activeIndex = 1" class="relative hidden items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 focus:z-20 focus:outline-offset-0 md:inline-flex">1</a>
				<span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-offset-0">...</span>
				<a v-for="i in [activeIndex-1, activeIndex, activeIndex+1]" @click="activeIndex = i" :class="i == activeIndex ? ['bg-primary-600', 'text-white'] : []" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:z-20 focus:outline-offset-0">{{ i }}</a>
				<span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-offset-0">...</span>
				<a @click="activeIndex = size" class="relative hidden items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 focus:z-20 focus:outline-offset-0 md:inline-flex">{{ size }}</a>
			</template>


			<template v-else>
				<a @click="activeIndex = 1" class="relative hidden items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 focus:z-20 focus:outline-offset-0 md:inline-flex">1</a>
				<span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-offset-0">...</span>
				<a v-for="i in [size-4, size-3, size-2, size-1, size]" @click="activeIndex = i" :class="i == activeIndex ? ['bg-primary-600', 'text-white'] : []" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:z-20 focus:outline-offset-0">{{ i }}</a>
			</template>
			
		</template>

		<a @click="next" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 focus:z-20 focus:outline-offset-0">
			<span class="sr-only">Next</span>
			<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
			</svg>
		</a>
	</nav>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, computed, getCurrentInstance, onMounted, IframeHTMLAttributes } from 'vue';

const emit = defineEmits(['update:modelValue', 'open', 'close']);

const props = defineProps({
	modelValue: {
		type: Number,
		default: 1,
	},
	max: {
		type: Number,
		default: 10,
	},
});

const size = computed(() => {
	return props.max;
});

const activeIndex = computed({
	get() {
		return props.modelValue;
	},
	set(value: number) {
		emit('update:modelValue', value);
	},
});

function previous() {
	activeIndex.value = activeIndex.value <= 1 ? 1 : activeIndex.value - 1;
}

function next() {
	activeIndex.value = activeIndex.value >= size.value ? size.value : activeIndex.value + 1;
}

// const videoNumber = 30;
</script>
