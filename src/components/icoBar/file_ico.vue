<template>
	<span class=" text-slate-500">
		<img v-if="getFileIconUrl" :src="getFileIconUrl!" alt="" srcset="" class="w-full h-full">
		<!-- <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68" fill="currentColor" class="w-full h-full">
			<path
				d="M62.06,22.498c0-0.559-0.234-1.093-0.646-1.472L39.904,1.225C39.601,0.505,38.89,0,38.06,0
				c-0.044,0-0.085,0.07-0.129,0.073c-0.046-0.004-0.092,0.046-0.139,0.046h-22.13c-6.012,0-9.602,2.814-9.602,7.728v50.188
				c0,5.495,4.308,10.084,9.603,10.084H52.34c5.269,0,9.72-4.683,9.72-10.084V22.498z M40.06,6.806l15.42,14.313H40.06V6.806z
				M52.339,64.119H15.663c-3.038,0-5.603-2.851-5.603-6.084V7.847c0-1.053,0-3.728,5.603-3.728H36.06V23
				c0,1.104,0.896,2.119,2,2.119h20v32.916C58.06,61.268,55.439,64.119,52.339,64.119z"
			/>
		</svg> -->
	</span>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
// import { FileItem } from '../filetype';

import { fileIcons, FileIconItem, fileNames, fileExtensions } from "./fileIcons";
import { folderIcons } from "./folderIcons";

import { url2Base64 } from "./urlToBase64";


interface Props {
	name?: string;
	toolsPage?: boolean;
	defaultIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	name: '',
	toolsPage: false,
	defaultIcon: true,
});
const { name, toolsPage, defaultIcon } = toRefs(props);

const iconBase64 = ref<string>('');

const extension = computed(() => name.value.replace(/.+\./,""));


const getFileIconUrl = computed(() => {

	if(toolsPage.value) {
		const icon = fileNames.get(name.value) || fileExtensions.get(extension.value);
		if (!icon) return defaultIcon.value ? '../../material/default.svg' : '';
		const urlPath = `../../material/${icon?.name}.svg`;
		return urlPath;
	}

	const icon = fileNames.get(name.value) || fileExtensions.get(extension.value);
	// const icon = fileIcons.find((item) => item?.fileNames?.includes(name.value)) || fileIcons.find((item) => item?.fileExtensions?.includes(extension.value));
	// if (!icon) return defaultIcon.value ? '../../material/default.svg' : '';
	if (!icon) return defaultIcon.value ? '../material/default.svg' : '';
	const urlPath = `../material/${icon?.name}.svg`;
	return urlPath;
});



// onMounted(() => {
// 	console.log('fileIcons: ', fileNames);
// })



watch(getFileIconUrl, async (val) => iconBase64.value = await url2Base64(val));
// watch(name, async (val) => iconBase64.value = await url2Base64(val));


defineExpose({
	// getFileIconUrl,
	icon() {
		return iconBase64.value;
	},
});
</script>

<style lang="less" scoped>
.arrow-btn {
	cursor: pointer;
	transition: color 0.2s;
	display: flex;
	justify-content: center;
	align-items: center;
	fill: currentColor;
	overflow: hidden;

	&[disabled='disabled'] {
		color: #ccc;
		cursor: not-allowed;

		&:hover {
			color: #ccc;
			background-color: transparent;
		}
	}
}
</style>
