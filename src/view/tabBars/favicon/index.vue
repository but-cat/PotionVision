<template>
	<div @error.prevent.stop class="flex justify-center items-center">
		<Loding v-if="loading" src="~@icon/file.svg" class="default" />
		<img v-else="favicon" :src="favicon" />
	</div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, watch, onMounted, getCurrentInstance } from 'vue';
import Loding from './loding.vue';
import defaultFavicon from '@icon/file.svg';

const props = defineProps<{
	favicon: string;
	loading: boolean;
}>();
const { favicon, loading } = toRefs(props);
// const defaultFavicons = ref<string>(defaultFavicon);

const icon = ref<string>(defaultFavicon);

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties!;
const $xhr = globalProperties.$xhr;
</script>
