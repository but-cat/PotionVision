<template>
	<div class="redraw">
		<div class="con">
			<slot />
		</div>
		<object ref="objectEl" class="object" type="text/html" data="about:blank" />
	</div>
</template>
	
<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits([ "resize" ]);

const objectEl = ref<HTMLObjectElement>();

function resize() {
	let size = objectEl.value!.getBoundingClientRect();
	emit("resize", size.width, size.height);
}


onMounted(() => {
	nextTick(() => {
		resize();
		objectEl.value!.contentDocument!.defaultView!.addEventListener("resize", resize);
	});
});


onBeforeUnmount(() => {
	objectEl.value!.contentDocument!.defaultView!.removeEventListener("resize", resize);
});
</script>
	
<style lang="less" scoped>
.redraw {
	width: 100%;
	height: 100%;
	overflow: auto;
	position: relative;
}

.con {
	width: 100%;
	height: 100%;
	position: static;
	overflow: hidden;
}

.object {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
	opacity: 0;
	pointer-events: none;
	z-index: -100;
	opacity: 0;
}
</style>