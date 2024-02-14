<template>
	<div
		class="image-preview flex-1 h-full relative bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 overflow-auto">
		<!-- <img :src="url" ref="imgContent" alt="" class="opacity-0" /> -->
		<!-- <HighlightJs :code="code" language="xml"></HighlightJs> -->


		<VuePdfEmbed :source="url" />
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, toRefs, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';


import VuePdfEmbed from 'vue-pdf-embed'



const store = useStore();
const activeFile = computed(() => store.state.file.activeItem.isFile ? store.state.file.activeItem : undefined);

const props = defineProps<{
	url: string;
}>();
const { url } = toRefs(props);

const code = ref(`<?xml version="1.0" encoding="UTF-8"?>`);

const imgContent = ref(null as unknown as HTMLDivElement);

watch(() => url.value, async (val) => {
	if (!url.value) return;
	const res = await fetch(url.value);
	code.value = await res.text();
}, {
	immediate: true,
});
</script>

<style lang="less" scoped>
.image-preview {
	:deep(.viewer-fullscreen) {
		display: none;
	}
}
</style>