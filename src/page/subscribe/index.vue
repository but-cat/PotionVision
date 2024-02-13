<template>
    <div class="video w-full h-full overflow-hidden">
        <NPlayer :url="options.url" :danmaku="options.danmaku"/>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, IframeHTMLAttributes } from 'vue';

const videoNumber = 29;

const options = reactive({
    url: `./video/${videoNumber}.mp4`,
	danmaku: `./video/P${videoNumber}.xml`,
});
</script>
