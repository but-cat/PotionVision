<template>
	<div class="w-full h-full">
		<Swiper ref="mySwiperBar" :spaceBetween="30" :effect="'fade'" :navigation="true" :modules="modules" :pagination="pagination" @swiper="onSwiper" @slideChange="onSlideChange" class="mySwiperBar w-full h-full">
			<SwiperSlide v-for="([key, page], index) in browserList" :key="key" style="height: 100%">
				<PageView v-if="page.type == 'web'" :page="page" />
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { useStore } from 'vuex';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/effect-fade';

import PageView from './page/browser/index.vue';

const modules = ref([EffectFade, Navigation, Pagination]);

const store = useStore();

const browserList = computed(() => store.state.page.tabSet as Map<string, any>);
// const activePage = computed(() => browserList.value.get(store.state.page.activeTab));

const activeItem = computed(() => {
	const tabList = store.state.page.tabSet;
	const activeTabUUID = store.state.page.activeTab;
	return [tabList.get(activeTabUUID)];
});

let swiper: any;
const pagination = ref<any>({
	dynamicBullets: true,
	// scrollbar: true,
});

function onSwiper(swiperItem: any) {
	console.log('slide change', swiper);

	swiper = swiperItem;
	console.log(swiper);
	//
}

function onSlideChange(index: any) {
	console.log('slide change', index);
}

watch(
	() => store.state.page.activeTab,
	(value: string) => {
		console.log('store.state.page.tabSet: ', value);

		const list = browserList.value.entries();
		const pageIndex = [...list].findIndex(([key]) => key == value);
		nextTick(() => {
			swiper.slideTo(pageIndex);
			// page.webview.focus();
		});
	},
	{ immediate: true, deep: true },
);

onMounted(() => {});
</script>
