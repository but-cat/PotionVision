<template>
	<div class="news-container">
		<transition-group name="slide-fade">
			<!-- <div v-for="(item, index) in newsList" :key="index" class="news-bar" :style="{ color: ['white', 'indianred', '#90e7aa'][item.type] }" v-html="item.text"></div> -->

			<div v-for="(item, index) in newsList" :key="index" class="mb-3 relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900">
				<div class="flex min-w-72 px-3 py-2">
					<!-- <svg class="mr-2.5 h-5 w-5 flex-none fill-slate-400"><path d="M5 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14l-5-2.5L5 18V4Z"></path></svg> -->
					<svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 mr-3 flex-none stroke-slate-400">
						<path stroke-linecap="round" fill="none" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
					</svg>
					<span v-html="item.text"></span>
				</div>
				<!-- <div class="border-l border-slate-400/20 px-2.5 py-2">12k</div> -->
			</div>
		</transition-group>

		<!-- <transition name="loader">
			<div v-if="isLoad" class="load-container">
				<div class="loading">
					<div class="loader"></div>
				</div>
				<span>加载中...</span>
			</div>
		</transition> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data: () => ({
		isLoad: false,
		newsList: [] as {
			text: string;
			type: number;
		}[],
	}),

	methods: {
		removalNews() {
			setTimeout(() => {
				this.newsList.shift();
				// if (this.newsList.length != 0) this.removalNews();
			}, 3000);
		},
	},

	mounted() {
		// Vue.prototype.$news = (text, type = 0) => {
		// 	if (!text) return;
		// 	// console.log(param);
		// 	this.newsList.push({ text, type });
		// 	this.removalNews();
		// };
		// Vue.prototype.$load = (isLoad = false) => {
		// 	this.isLoad = isLoad;
		// };

		window.addEventListener('news', (event: any) => {
			// this.$EventBus.$emit('resize', {});
			const { text, type } = event.detail;
			if (!text) return;
			// console.log(param);
			this.newsList.push({ text, type });
			this.removalNews();
		});
	},
	// destroyed() {
	// 	this.$EventBus.$off('news', {})
	// }
});
</script>

<style lang="less" scoped>
// @import "../assets/methods.less";

.news-container {
	width: 100%;
	// height: 100%;
	// padding: 22px 5%;
	top: 0;
	left: 0;
	position: fixed;
	z-index: 100000;
	pointer-events: none;
	padding-top: 60px;

	// background: rgba(0.2,0.2,0.2, 0.2);
	// .flex(flex-start, center, column);

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	.news-bar {
		width: 70%;
		max-width: 320px;
		// height: 100%;
		padding: 8px;
		margin: 10px;
		border-radius: 10px;

		// padding: 60px 15px;
		// background-color: #F2EFEB;
		// background-color: #FFF;
		font-weight: bold;
		font-size: 18px;
		color: white;
		box-shadow: 0 2px 3px #000000a6;
		text-shadow: 0 2px 3px #000000a6;
		text-align: center;

		background: #2c2c2cd3;
		border-radius: 4px;
		box-shadow: 0 2px 3px #000000a6;
		// background-image: linear-gradient(#ed46fd, #690a98);
		// background-image: linear-gradient(#a272ef, #733dc9);
		// color:
	}

	& > span {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.slide-fade-enter-active {
		transition: all 0.3s ease;
	}
	.slide-fade-leave-active {
		transition: all 0.8s ease;
	}
	.slide-fade-enter,
	.slide-fade-leave-to {
		transform: translateY(-10px);
		opacity: 0;
		// width: 70%;
	}
}

.load-container {
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	background-color: #000000a6;
	pointer-events: auto;
	color: white;
	transition: all 0.3s ease;
	// transition-timing-function: cubic-bezier(0.68, 0.01, 1, 1);
}

.loading {
	// top: 0;
	// left: 0;

	// position: absolute;
	overflow: hidden;
	text-align: center;

	opacity: 1;
	transition: opacity 0.5s ease;

	.loader {
		margin: 50px auto;
		font-size: 10px;
		position: relative;
		text-indent: -9999em;
		border-top: 1.1em solid rgba(255, 255, 255, 0.2);
		border-right: 1.1em solid rgba(255, 255, 255, 0.2);
		border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
		border-left: 1.1em solid #c4c4c4;
		-webkit-transform: translateZ(0);
		-ms-transform: translateZ(0);
		transform: translateZ(0);
		-webkit-animation: loading 1.1s infinite linear;
		animation: loading 1.1s infinite linear;

		&,
		&:after {
			border-radius: 50%;
			width: 80px;
			height: 80px;
		}
	}
	@-webkit-keyframes loading {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@keyframes loading {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
}

&.loader-enter,
&.loader-leave-to {
	opacity: 0;
}
&.loader-enter-to,
&.loader-leave {
	opacity: 1;
}
</style>
