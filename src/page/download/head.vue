<template>
	<nav class="bg-white dark:bg-gray-800 pt-10 z-5">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<div class="hidden md:block">
						<div class="flex items-baseline space-x-4">
							<template v-for="(name, key) in typeList">
								<a v-if="key == tellType" class=" bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400 rounded-md px-3 py-2 text-sm font-medium" aria-current="page">{{ name }}</a>
								<a v-else @click="tellType = key as string" class="text-gray-300 hover:bg-gray-300 hover:dark:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">{{ name }}</a>
							</template>
						</div>
					</div>
				</div>
				<div class="hidden md:block">
					<div class="ml-4 flex items-center md:ml-6">
						<!-- Profile dropdown -->
						<div class="relative ml-3">
							<button @click="menuOpen = !menuOpen" type="button" class="bg-gray-100 dark:bg-gray-900 relative flex max-w-xs items-center rounded-full text-sm">
								<!-- <span class="absolute -inset-1.5"></span>
								<span class="sr-only">Open user menu</span> -->
								<div class="h-8 w-8 p-2 rounded-full flex justify-center items-center">
									<svg class="w-full h-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path d="M10 2.5C10 2.22386 9.77614 2 9.5 2C9.22386 2 9 2.22386 9 2.5V9H2.5C2.22386 9 2 9.22386 2 9.5C2 9.77614 2.22386 10 2.5 10H9V16.5C9 16.7761 9.22386 17 9.5 17C9.77614 17 10 16.7761 10 16.5V10H16.5C16.7761 10 17 9.77614 17 9.5C17 9.22386 16.7761 9 16.5 9H10V2.5Z" />
									</svg>
								</div>
							</button>

							<div v-if="menuOpen" @click="menuOpen = false" class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"></div>
							<div v-if="menuOpen" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg border border-1 border-gray-200 dark:border-gray-700" role="menu">
								<!-- Active: "bg-gray-100", Not Active: "" -->
								<a @click="openAddUrl = true" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">添加新任务</a>
								<a @click="call(['pauseAll'])" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">暂停所有任务</a>
								<a class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">恢复所有任务</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<AddUrl v-model="openAddUrl" />
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, onMounted, watch, getCurrentInstance, onBeforeUnmount } from 'vue';
// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import AddUrl from './addUrl.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
	modelValue: {
		type: String,
		default: false,
	},
});

const openAddUrl = ref<boolean>(false);
const menuOpen = ref<boolean>(false);

const tellType = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});

const typeList = ref<{
	[key: string]: string;
}>({
	tellActive: '运行中',
	tellWaiting: '等待中',
	tellStopped: '已停止',
});

async function call(parameter: any[]) {
	try {
		await fetch('apps://download.api/progress/call', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(parameter),
		});
	} catch (error) {}
}
</script>
