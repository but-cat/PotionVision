<template>
	<div class="w-full h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
		<div class="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" style="flex: 0 0 6px;border-bottom-width: 1px;"></div>

		<div class="w-full flex-1 bg-gray-50 dark:bg-gray-900" ref="webviewContainer">

		</div>
		<!-- <webview src="https://www.baidu.com" ref="webview" class="w-full h-full"></webview> -->

		<!-- <webview partition="C:/Users/666/Desktop/新建文件夹2/.note" src="tools://preview3d.pre/index.html" style="display:inline-flex; width:100%; height:100%" useragent="userAgent"></webview> -->
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, toRefs, nextTick, onMounted } from 'vue';
import { useStore } from 'vuex';

// import WebView from "@/store/page/webView";
import { CoreView, WebView } from "@/store/page/webView";

const props = defineProps<{
	page: WebView;
}>();
const { page } = toRefs(props);


const webviewContainer = ref<HTMLDivElement>(null as unknown as HTMLDivElement);




onMounted(() => {
	console.log("page: ", page);
	// webviewContainer.value!.appendChild(page.value.webview);
	webviewContainer.value!.appendChild(page.value);
	page.value.init();
	console.log("page: ", page.value.webview);
});

</script>

<style lang="less" scoped>
.pages {
	width: 100%;
	height: 100%;

	iframe,
	:deep(webview) {
		width: 100%;
		height: 100%;
	}
}
</style>
