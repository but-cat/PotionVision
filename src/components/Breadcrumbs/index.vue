<template>
	<nav class="lx" aria-label="Breadcrumb">
		<ol role="list" class="flex items-center text-gray-500">
			<li @click="emit('update:path', '/')">
				<div class="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-5 h-5">
						<path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd"></path>
					</svg>
					<!-- <span class="text-md text-gray-500">Root</span> -->
				</div>
			</li>
			<li v-for="(pathName, index) in pathList" @click="updatePath(index)">
				<div class="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-6 h-6">
						<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
					</svg>
					<a href="#" class="text-md text-gray-500">{{ pathName }}</a>
				</div>
			</li>
		</ol>
	</nav>
</template>

<script setup lang="ts">
import { useSlots, ref, toRefs, computed, onMounted } from 'vue';

const emit = defineEmits(['update:path']);

const props = withDefaults(
	defineProps<{
		path?: string;
	}>(),
	{
		path: '/',
	},
);
const { path } = toRefs(props);

const pathList = computed(() => path.value.split('/').filter((item) => item !== ''));


function updatePath(index: number) {
	emit('update:path', pathList.value.slice(0, index + 1).join('/'));
}

</script>

<style lang="less" scoped></style>
