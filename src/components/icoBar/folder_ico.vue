<template>
	<span class="w-5 h-5 mr-1 text-slate-500">
		<img v-if="getFolderIconUrl" :src="getFolderIconUrl" alt="" srcset="" class="w-full h-full">
		<svg v-else viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-full h-full">
			<path class="cls-1" d="M4,28a3,3,0,0,1-3-3V7A3,3,0,0,1,4,4h7a1,1,0,0,1,.77.36L14.8,8H27a1,1,0,0,1,0,2H14.33a1,1,0,0,1-.76-.36L10.53,6H4A1,1,0,0,0,3,7V25a1,1,0,0,0,1,1,1,1,0,0,1,0,2Z" />
			<path class="cls-1" d="M25.38,28H4a1,1,0,0,1-1-1.21l3-14A1,1,0,0,1,7,12H30a1,1,0,0,1,1,1.21L28.32,25.63A3,3,0,0,1,25.38,28ZM5.24,26H25.38a1,1,0,0,0,1-.79L28.76,14h-21Z" />
		</svg>
	</span>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
// import { FileItem } from '../filetype';

// import { fileIcons } from "./fileIcons";
import { folderIcons, fileNames } from "./folderIcons";
import { url2Base64 } from "./urlToBase64";

const props = defineProps<{
	// filterNode: Set<string>;
	// item: FileItem;
	name: string;
	open: boolean;
	toolsPage?: boolean;
}>();
const { name, open, toolsPage } = toRefs(props);
const iconBase64 = ref<string>('');

const getFolderIconUrl = computed(() => {

	if(toolsPage.value) {
		const icon = fileNames.get(name.value);
		// const icon = folderIcons.find((item) => item?.folderNames?.includes(props.name));
		if (!icon) return `../../material/folder-default${open.value ? '-open' : ''}.svg`;
		const urlPath = `../../material/${icon?.name}${open.value ? '-open' : ''}.svg`;
		return urlPath;
	}

	const icon = fileNames.get(name.value);
	// const icon = folderIcons.find((item) => item?.folderNames?.includes(props.name));
	if (!icon) return `../material/folder-default${open.value ? '-open' : ''}.svg`;
	const urlPath = `../material/${icon?.name}${open.value ? '-open' : ''}.svg`;
	return urlPath;
});


watch(getFolderIconUrl, async (val) => iconBase64.value = await url2Base64(val));

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
