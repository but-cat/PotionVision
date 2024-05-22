<template>
	<div id="app-menu-content-header" class="container my-12 mx-auto px-4 md:px-12">
		<div class="app-menu-content-header-section">
			<div id="app-menu-info" class="info">
				<span class="time">{{ times }}</span>
				<span class="weather">
					<span class="weather-temperature-value">{{ month }}月{{ day }}日 星期{{ week }}</span>
					<!-- <span class="weather-temperature-unit">周{{ week }}</span> -->
				</span>
				<!-- <span class="weather">
					<i class="fa-duotone fa-sun" aria-hidden="true"></i>
					<span class="weather-temperature-value">65</span>
					<span class="weather-temperature-unit">°F</span>
				</span> -->
			</div>
			<!-- <div class="reminder">
				<div class="reminder-icon">
					<i class="fa-regular fa-bell" aria-hidden="true"></i>
				</div>
				<span class="reminder-text">Extra cool people meeting <span class="reminder-time">10AM</span></span>
			</div> -->
		</div>
		<!-- <div class="app-menu-content-header-section">
			<button id="sign-out-button" class="user-status-button clear-button" type="button">
				<i class="fa-solid fa-arrow-right-from-arc" aria-hidden="true"></i>
			</button>
		</div> -->
	</div>

	<div class="scrollable-component mx-auto px-4 md:px-12" id="quick-nav">
		<a v-for="link in linkList" :href="link.url" class="quick-nav-item clear-button flex items-center" target="_blank">
			<img v-if="link.favicon" :src="link.favicon" alt="" class="w-5 h-5 mr-2" />
			<span class="quick-nav-item-label">{{ link.name }}</span>
		</a>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted } from 'vue';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $xhr = globalProperties!.$xhr;

const times = ref('');

const week = ref('');
const month = ref('');
const day = ref('');

function frame() {
	const time = new Date();

	week.value = ['日', '一', '二', '三', '四', '五', '六'][time.getDay()];
	month.value = String(time.getMonth() + 1);
	day.value = String(time.getDate());

	const hours = time.getHours();
	const minute = time.getMinutes();
	const seconds = time.getSeconds();
	const milliseconds = time.getMilliseconds();
	const timeString = `${'00'.slice(String(hours).length) + String(hours).slice(0, 2)}:${'00'.slice(String(minute).length) + String(minute).slice(0, 2)}`;
	times.value = timeString as string;
	requestAnimationFrame(frame);
}

const linkList = ref([
	{
		name: 'bilibili',
		url: 'https://www.bilibili.com/',
		favicon: 'https://www.bilibili.com/favicon.ico',
	},
	{
		name: 'youtube',
		url: 'https://www.youtube.com/',
		favicon: 'https://www.youtube.com/favicon.ico',
	},
	{
		name: 'mikanani',
		url: 'https://mikanani.me/',
		favicon: 'https://mikanani.me/favicon.ico',
	},
	{
		name: 'onekuma',
		url: 'https://garden.onekuma.cn/',
		favicon: 'https://garden.onekuma.cn/favicon.ico',
	},
]);

requestAnimationFrame(frame);
onMounted(async () => {
	frame();
});
</script>

<style lang="less" scoped>
.grayColor(@color) {
	color: rgb(@color, @color, @color);
}

// @gray: rgb(245, 245, 245);
@red: rgb(239, 83, 80);
@orange: rgb(255, 160, 0);
@yellow: rgb(253, 216, 53);
@green: rgb(42, 252, 152);
@indigo: rgb(57, 73, 171);
@violet: rgb(103, 58, 183);

.weather {
	display: inline-flex;
	height: 20px;
	margin-bottom: 6px;
	margin-left: 20px;

	i,
	span {
		align-items: center;
		display: inline-flex;
	}

	i {
		color: @yellow;
		font-size: 0.9em;
	}

	span {
		color: white;
	}

	.weather-type {
		height: 20px;
	}

	.weather-temperature-value {
		font-size: 1.5em;
		height: 20px;
		margin-left: 5px;
	}

	.weather-temperature-unit {
		align-items: flex-start;
		font-size: 0.8em;
		margin-left: 3px;
	}
}

#quick-nav {
	display: flex;
	gap: 10px;
	margin-top: 20px;
	overflow: auto;
	padding-bottom: 5px;
	width: 100%;
	z-index: 3;

	.quick-nav-item {
		padding: 10px 20px;

		&:last-of-type {
			margin-right: 10px;
		}

		.quick-nav-item-label {
			// color: gray(245);
			.grayColor(245);
			text-shadow: 0px 0px 2px rgba(black, 0.1);
		}
	}
}

.info {
	align-items: flex-end;
	display: flex;

	.time {
		// color: gray(245);
		.grayColor(245);
		font-size: 6em;
		height: 80px;
		line-height: 80px;
		text-shadow: 2px 2px 2px rgba(black, 0.1);
	}

	.weather {
		display: inline-flex;
		height: 20px;
		margin-bottom: 6px;
		margin-left: 20px;

		i,
		span {
			align-items: center;
			display: inline-flex;
		}

		i {
			color: @yellow;
			font-size: 0.9em;
		}

		span {
			color: white;
		}

		.weather-type {
			height: 20px;
		}

		.weather-temperature-value {
			font-size: 1.5em;
			height: 20px;
			margin-left: 5px;
		}

		.weather-temperature-unit {
			align-items: flex-start;
			font-size: 0.8em;
			margin-left: 3px;
		}
	}
}

.clear-button {
	backdrop-filter: blur(3px);
	background-color: rgba(white, 0.1);
	border: 1px solid rgba(white, 0.1);
	border-radius: 100px;
	box-shadow: 2px 2px 2px rgba(black, 0.1);
	cursor: pointer;

	&:hover {
		background-color: rgba(white, 0.2);
		border: 1px solid rgba(white, 0.3);
	}
}
</style>
