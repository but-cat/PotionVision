<template>
	<div class="w-full p-2 rounded-lg bg-gray-50 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none">
		<!-- <div class="px-6 py-2 font-semibold items-center border-b border-gray-100 dark:border-gray-600 flex justify-between">
			点击上传图片
			<button @click="$refs.file.click" class="flex items-center justify-center inline-flex px-3 py-1 text-white bg-primary-600 hover:bg-primary-700 focus:bg-primary-700 rounded-md">
				<svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
				</svg>
				点击上传图片
			</button>
		</div> -->
		<div @click="!disabled && $refs.file.click()" :class="!disabled ?? 'pointer-events-none'" class="p-1 flex-grow">
			<div class="flex items-center justify-center h-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-gray-400 text-md font-semibold bg-gray-100 border-2 border-gray-200 dark:border-gray-600 border-dashed rounded-md">
				<p v-if="title" class="title">{{ title }}</p>
				<div class="input">
					<div v-if="!value" class="content">
						<span>点此上传证件</span>
					</div>
					<img v-else class="w-full h-48 object-cover" :src="value" alt="img" />
				</div>
			</div>
		</div>
		<input ref="input" type="file" accept="image/*" style="display: none;" />
		<input @change="upload" ref="file" type="file" accept="image/*" style="display: none;" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	name: "oUploadImage",
	emits: ["update:value"],
	props: {
		title: {
			type: String,
			default: ""
		},
		value: {
			type: Object as PropType<string>,
		},
		disabled: {
			type: Boolean,
			default: false
		},
	},

	data: () => ({
		file: null,
		url: ""
	}),

	methods: {
		async upload(event: any) {
			try {
				const file = event.target.files[0];
				
				if (file instanceof File && file.size > 10 * 1024 * 1024) throw new Error('图片不能大于10M!');

				console.log("upload file", file.name);

				const formData = new FormData();
				formData.append('file', file);
				formData.append('name', file.name || 'file');
				

				const res = await (this as any).$http({
					url: '/sys/common/upload',
					method: 'post',
					data: formData,
					onUploadProgress: ({ total, loaded }: any) => {
						let percent = Math.ceil((loaded / total) * 100)
						percent = percent <= 100 ? percent : 100
						console.log('????', percent)
						// arg.onProgress(percent)
					},
					transformRequest: [function(data: any, headers: any) {
					// 去除post请求默认的Content-Type
						delete headers.post['Content-Type']
						return data
					}],
				});

				// this.url = res.message;

				this.$emit("update:value", res.message);

				console.log("update:value", res.message);
			} catch (error) {
				console.log(error);
			}

		}
	}
});
</script>
