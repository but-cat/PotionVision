<template>
	<Teleport to="#modal">
		<div @blur="closeMenu" @click="closeMenu" @contextmenu="closeMenu" class="w-full h-full relative">
			<div @click.stop :style="{ left: left + 'px', top: top + 'px' }" ref="menuElement" class="menu-element absolute rounded-lg shadow-lg ">
				<object ref="objectEl" class="object absolute left-0 top-0 w-full h-full" type="text/html" data="about:blank" />
				<slot/>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, onMounted, onBeforeUnmount, nextTick, getCurrentInstance } from 'vue';

const emit = defineEmits(['close']);

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties!;
const $edgebar = globalProperties.$edgebar;

const props = withDefaults(
	defineProps<{
		left: number;
		top: number;
	}>(),
	{
		left: 0,
		top: 0,
	},
);

const objectEl = ref<HTMLObjectElement>();
const menuElement = ref<HTMLElement>();
const size = ref<{ windowWidth: number; windowHeight: number; width: number; height: number }>({ 
	windowWidth: window.innerWidth,
	windowHeight: window.innerHeight,
	width: 100, 
	height: 100 
});

const left = computed(() => {
	const { width, windowWidth } = size.value;
	const offset = windowWidth - width;
	return props.left + width > windowWidth ? offset : props.left;
});
const top = computed(() => {
	const { height, windowHeight } = size.value;
	// const { top } = props;
	const offset = windowHeight - height;
	return props.top + height > windowHeight ? offset : props.top;
});

// const fileName = computed(() => path.value.replace(/(.*\/)*([^.]+).*/gi, '$2'));

function resize() {
	const element = menuElement.value;
	if (!element) return;

	size.value = {
		windowWidth: window.innerWidth,
		windowHeight: window.innerHeight,
		width: element.offsetWidth + 10,
		height: element.offsetHeight + 10,
	};
}

function closeMenu() {
	emit('close');
}

onMounted(() => {
	objectEl.value!.contentDocument!.defaultView!.addEventListener('resize', resize);
	window.addEventListener('resize', resize);
	nextTick(() => resize());
});

onBeforeUnmount(() => {
	objectEl.value!.contentDocument!.defaultView!.removeEventListener("resize", resize);
	window.removeEventListener('resize', resize);
});
</script>

<style scoped lang="less">
.file-name {
	white-space: nowrap;
	overflow: hidden;
	text-align: left;
	text-overflow: ellipsis;
}

.menu-element {
	transition: all 0.2s;
}

.object {
	display: block;
	// position: absolute;
	// top: 0;
	// left: 0;
	// height: 100%;
	// width: 100%;
	overflow: hidden;
	// opacity: 0;
	pointer-events: none;
	// z-index: -100;
	opacity: 0;
}
</style>
