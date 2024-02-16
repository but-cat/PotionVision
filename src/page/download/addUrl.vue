<template>
	<div v-if="open" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

		<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
			<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<div class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
					<div class="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
						<div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
							<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-dark-200" id="modal-title">创建下载任务</h3>
							<div class="mt-2 w-full">
								<!-- <p class="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p> -->
								<!-- <oTextarea v-model="url" class="w-full" /> -->
								<!-- {{ url }} -->

								<textarea v-model="url" type="text" autocomplete="address-level1" class="w-full h-36 px-3 py-2 flex items-center justify-between rounded-md bg-white dark:bg-slate-800 border border-slate-400/20  shadow-sm focus:outline outline-2 outline-primary-300/80" ></textarea>
							</div>
						</div>
					</div>
					<div class="px-4 py-3 flex flex-row-reverse px-6">
						<button @click="addUrl" type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">确定</button>
						<button @click="open = false" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, onMounted, watch, getCurrentInstance, onBeforeUnmount } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
});


const url = ref<string>('');

const open = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		url.value = '';
		emit('update:modelValue', value);
	},
});

async function addUrl() {
	try {
		await fetch('apps://download.api/progress/addUrl', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				url: url.value,
				dir: '',
			}),
		});


		open.value = false;
	} catch (error) {
		
	}
}
</script>
