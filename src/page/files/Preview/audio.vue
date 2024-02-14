<template>
	<div id="waveform" class="image-preview flex-1 h-full flex justify-center items-center relative bg-gray-100 dark:bg-gray-900 text-gray-300 dark:text-gray-800 overflow-hidden">
		<!-- <audio :src="props.url" ref="audioElement" alt="" controls /> -->
		<div class="w-full h-96 px-1 overflow-x-auto" ref="waveform"></div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, toRefs, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

import WaveSurfer from 'wavesurfer.js';
// import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.js';
// import Spectrogram from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/spectrogram.esm.js';

const props = defineProps<{
	url: string;
}>();
const { url } = toRefs(props);

const audioElement = ref(null as unknown as HTMLAudioElement);
const waveform = ref(null as unknown as HTMLDivElement);

onMounted(() => {
	const wavesurfer = WaveSurfer.create({
		container: waveform.value,
		url: url.value,

		height: 128,
		// splitChannels: false,
		normalize: true,
		waveColor: '#787878',
		progressColor: '#4fd1c5',
		cursorColor: '#858585',
		cursorWidth: 3,
		barWidth: 4,
		barGap: 5,
		barRadius: 2,
		barHeight: 1.3,
		// barAlign: '',
		minPxPerSec: 600,
		fillParent: true,
		mediaControls: true,
		autoplay: false,
		interact: true,
		dragToSeek: false,
		hideScrollbar: false,
		audioRate: 1,
		autoScroll: true,
		autoCenter: true,
		sampleRate: 8000,
	});

	// wavesurfer.registerPlugin(
	// 	Spectrogram.create({
	// 		labels: true,
	// 		height: 180,
	// 		splitChannels: false,
	// 	})
	// );
	wavesurfer.registerPlugin(TimelinePlugin.create());
	wavesurfer.on('finish', () => {
		wavesurfer.setTime(0);
	});

	wavesurfer.once('interaction', () => {
		wavesurfer.play();
	});
});
// const imgContent = ref(null as unknown as HTMLDivElement);
</script>

<style lang="less" scoped>
.image-preview {
	background-image: linear-gradient(45deg, currentColor 25%, transparent 0, transparent 75%, currentColor 0), linear-gradient(45deg, currentColor 25%, transparent 0, transparent 75%, currentColor 0);
	background-position: 0 0, 10px 10px;
	background-size: 20px 20px;

	:deep(.viewer-fullscreen) {
		display: none;
	}
}
</style>
