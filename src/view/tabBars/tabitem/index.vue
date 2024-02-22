<template>
	<li @click.stop="setActiveItem" @contextmenu.stop="$emit('omnibox', $event)" :class="active ? ['active', 'bg-white', 'dark:bg-gray-900'] : ['bg-gray-50/80', 'dark:bg-gray-900/80']"
		class="list-group-item dark:text-white text-gray-600 select-none">
		<!-- <div @error.prevent.stop class="favicon flex justify-center items-center">
			<Loding v-if="pageState!.loading" src="~@icon/file.svg" class="default"/>
			<img v-else="favicon" :src="favicon"/>
		</div> -->
		<!-- <Favicon :favicon="pageState!.favicon" :loading="pageState!.loading" class="w-5 h-5 flex-0"/> -->
		<span class="ml-2 title select-none">{{ pageState!.title }}</span>

		<button @click="closeItem" class="close" draggable="false">
			<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" role="img"
				class="icon icon-16 fill-current">
				<path fill="currentColor"
					d="m14.828 12 4.586-4.586c.781-.781.781-2.047 0-2.828-.78-.781-2.048-.781-2.828 0l-4.586 4.586-4.586-4.586c-.78-.781-2.048-.781-2.828 0-.781.781-.781 2.047 0 2.828l4.586 4.586-4.586 4.586c-.781.781-.781 2.047 0 2.828.39.391.902.586 1.414.586s1.024-.195 1.414-.586l4.586-4.586 4.586 4.586c.39.391.902.586 1.414.586s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828z" />
			</svg>
		</button>
	</li>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, watch, onMounted, getCurrentInstance } from 'vue';
import TabItem from "@/store/page/tabItem";
import Loding from "./loding.vue";
import defaultFavicon from "@icon/file.svg";
import Favicon from "../favicon/index.vue";

import { useStore } from 'vuex';
const store = useStore();

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties!;
const $xhr = globalProperties.$xhr;

const emit = defineEmits(['close', 'active', 'omnibox']);


const props = defineProps<{
	uuid: string;
}>();
const { uuid } = toRefs(props);



// const page = ref<TabItem>(new TabItem('assets://project.local/[ANi] 葬送的芙莉蓮 - 05 [1080P][Baha][WEB-DL][AAC AVC][CHT][V2].mp4'));

const page = computed(() => store.state.page.tabSet.get(uuid.value)!);

const active = computed(() => store.state.page.activeTab == uuid.value);

const pageState = computed(() => page.value!.state);


function setActiveItem() {
	store.commit('page/setActiveTabUUID', uuid.value);
}


function closeItem() {
	store.commit('page/delTabItem', uuid.value);
}

onMounted(() => {
	// page.value!.addEventListener('change', () => {
	// 	// this.$forceUpdate();
	// 	internalInstance!.proxy!.$forceUpdate();
	// });
});
</script>

<style lang="less" scoped>
.list-group-item {
	// all: unset;
	-webkit-app-region: no-drag;
	// margin: 0 3px;
	margin-right: 3px;

	padding: 4px 12px;
	// min-width: 200px;
	// max-width: 240px;
	width: 240px;
	// flex: 0 0 240px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
	cursor: pointer;
	// color: var(--textPrimary);
	// color: var(--textPccent);

	height: 32px;

	display: flex;
	align-items: center;

	border-left: 1px solid var(--disabledBackground);

	border-radius: 4px;


	* {
		pointer-events: none;
	}

	.title {
		flex: 1;
		overflow: hidden;
		white-space: nowrap;
		overflow: hidden;
		text-align: left;
		text-overflow: ellipsis;
	}

	&:active {
		opacity: 0.6;
	}

	&.active {
		// border-radius: 4px 4px 0 0;
		border-radius: 4px;
		// background-color: var(--background);
		box-shadow: 0 0 8px var(--disabledBackground);
		// border-right: none;
		border-left: 1px solid transparent;
		// color: var(--textPrimary);

		.close {
			opacity: 1;
			pointer-events: auto;
		}


		&+.list-group-item {
			border-left: 1px solid transparent;
		}
	}

	&:first-child {
		// border-radius: 0 0 4px 4px;
		border-left: 1px solid transparent;
	}

	// .close {
	// 	opacity: 0;
	// 	pointer-events: none;
	// }

	.favicon {
		width: 24px;
		height: 24px;
		color: var(--textPrimary);
		margin-right: 8px;
		// background-color: aliceblue;
		// border-radius: 2px;

		img {
			width: 75%;
			height: 75%;
			object-fit: contain;
		}
	}


	.close {
		all: unset;
		display: inline-block;
		width: 12px;
		height: 12px;
		color: rgb(235, 84, 84);
		cursor: pointer;
		-webkit-app-region: no-drag;
		transition: color 0.2s;
		padding: 2px;
		// margin-right: 5px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;

		pointer-events: none;
		opacity: 0;

		&:hover {
			background-color: var(--highlight);
		}
	}
}

.list-group-item i {
	cursor: pointer;
	// -webkit-app-region: no-drag;
	// margin: 2px 4px;
}


</style>