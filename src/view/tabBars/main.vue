<template>
	<draggable @changePosition="changePosition" class="list-group" v-bind="{ ...$attrs, ...dragOptions }" @start="drag = true" @end="drag = false">
		<!-- @changePosition="data => $emit('changePosition', data)" -->
		<transition-group name="flip-list" type="transition">
			<Tabitem v-for="(page, index) in browserList" :key="page.uuid" :page="page" :index="index" :active="activePage!.includes(page)" @mousedown="openOmnibox($event, page)" @active="setActive(index)" @omnibox="setActiveFile" @close="$emit('close', page, index)" />
		</transition-group>
	</draggable>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import draggable from './draggable.vue';

import Page from "./interface";

import Tabitem from './tabitem/index.vue';

export default defineComponent({
	emits: ['changePosition', 'menu', 'close', 'active'],

	props: {
		browserList: Array as PropType<Page[]>,
		activePage: Array as PropType<Page[]>,
	},

	computed: {
		dragOptions() {
			return {
				animation: 200,
				group: 'description',
				disabled: false,
				ghostClass: 'ghost',
			};
		},
	},

	data() {
		return {
			// list: message.map((name, index) => {
			// 	return { name, order: index + 1 };
			// }),
			drag: false,



			multiple: false,

			// page: null as Page | null,
			openMenu: false,
			position: {
				page: null as Page | null,
				left: 0,
				top: 0,
			},

			// searchBar: false,

			isDev: process.env.NODE_ENV === 'development',
		};
	},
	methods: {
		setActive(item?: number | Page) {
			const page: Page = typeof item == 'number' ? this.browserList![item] : (item as Page);

			if (this.activePage!.includes(page)) return;

			const pageIndex = this.browserList!.findIndex((i) => i == page);
			this.$emit('active', pageIndex);
		},

		openOmnibox(event: MouseEvent, item?: number | Page) {
			console.log('openOmnibox', item);
			if(event.button !== 2) return;
			
			
			const page: Page = typeof item == 'number' ? this.browserList![item] : (item as Page);
			const remote = require('@electron/remote');
			const win: any = remote.getCurrentWindow() as any;
			
			win.view.openModal('browser-omnibox', {
				url: page.uuid,
			});
		},

		/**
		 * @deprecated
		 */
		close(item: Page, index: number) {
			this.$emit('close', item, index);
		},

		/**
		 * @deprecated
		 */
		newPage(url: string = 'https://www.bing.com', uuid?: string) {
			if (uuid) {
				const page = this.browserList?.find((page) => page.uuid == uuid);
				if (!page) return;
				page?.loadUrl(url);
				return;
			} else {
				const page = new Page(url);
				const index = this.browserList!.push(page);

				page.addEventListener(
					'change',
					(event: Event) => {
						this.setActive(index - 1);
						this.$forceUpdate();
					},
					{ once: true },
				);
			}
		},

		changePosition({ item, target }: { item: number; target: number }) {
			[this.browserList![item], this.browserList![target]] = [this.browserList![target], this.browserList![item]];
		},

		setActiveFile(event: PointerEvent) {
			const page = this.activePage![0];
			if (!page) return;
			
			const remote = require('@electron/remote');
			const win: any = remote.getCurrentWindow() as any;
			
			win.view.openModal('browser-menu', {
				uuid: page.uuid,
				left: event.clientX + 10,
				top: event.clientY + 10,
			});
		},
	},
	mounted() {
		(window as any).vm = this;
	},
	components: {
		BrowserMenu,
		draggable,
		Tabitem,
	},
});
</script>

<style lang="less" scoped>
.list-group {
	all: unset;
	-webkit-app-region: drag;
	flex: 1;

	min-height: 20px;
	margin: 0;
	height: 100%;
	padding: 0 20px;
	overflow-x: auto;
	overflow-y: hidden;

	display: flex;
	justify-content: flex-end;

	// align-items: center;
	align-items: flex-end;

	& > span {
		height: 100%;
		display: flex;
		align-items: stretch;
		overflow: auto;
		padding-right: 20px;
		&::-webkit-scrollbar {
			display: none; /* Chrome Safari */
		}
	}

	&::-webkit-scrollbar {
		display: none; /* Chrome Safari */
	}

	.favicon {
		width: 20px;
		height: 20px;
		object-fit: contain;
		margin: 0 8px;
		&.default {
			opacity: 0.6;
		}
	}
}

.flip-list-move {
	transition: transform 0.3s;
}

button.new-page {
	all: unset;

	flex: 0 0 28px;
	width: 28px;
	height: 28px;

	display: flex;
	justify-content: center;
	align-items: center;
	align-self: center;

	// padding: 4px;
	font-size: 12px;
	color: inherit;
	border-radius: 4px;
	margin-left: 4px;

	// box-shadow: 0 0 8px var(--disabledBackground);
	-webkit-user-select: none;
	-webkit-app-region: no-drag;

	color: var(--sceneText);

	// height: 100%;
	// line-height: 10px;
	opacity: 1;
	cursor: pointer;

	box-sizing: border-box;
	background-color: transparent;
	&:hover {
		background-color: var(--background, #fff);
		box-shadow: 0 0 8px var(--disabledBackground, #fff);
	}
	&:active {
		opacity: 0.6;
		box-shadow: 0 0 2px var(--disabledBackground, #fff);
	}
	&:disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	& > svg {
		width: 16px;
		height: 16px;
		color: var(--textPrimary);
		pointer-events: none !important;
		cursor: pointer;
	}
}
</style>
