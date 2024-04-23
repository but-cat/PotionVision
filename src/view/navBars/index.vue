<template>
	<aside class="navigation w-72 h-full bg-gray-100 dark:bg-gray-800 flex-0 flex-shrink-0 border-r-4 border-primary-200 dark:border-primary-800 flex-col hidden sm:flex">
		<a href="#" class="w-full h-16 px-5 mt-10 inline-flex items-center justify-start">
			<img src="/logo.png" class="w-10 h-10" />
			<h1 class="text-md ml-2">{{ appName }}</h1>
		</a>
		<div class="w-full flex-1 px-3 py-4 flex-grow flex flex-col justify-between items-center text-gray-500">
			<div class="w-full flex-1 overflow-auto">
				<nav class="w-full flex flex-col items-center my-6 space-y-2">
					<router-link v-for="nav in navList" :to="`${nav.path}`" v-slot="{ isActive, href, navigate }" class="w-full h-10 flex items-center">
						<div :data-laber="isActive" :class="isActive && ['text-primary-600', 'bg-white dark:bg-slate-700 rounded-lg']" class="w-full h-full px-3 py-2 flex items-center rounded-md hover:bg-white hover:dark:bg-slate-700 dark:text-white text-gray-600 focus:outline outline-2 outline-primary-300/80">
							<div v-html="nav.meta!.icons" class="mr-2 h-6 w-6 flex-none "></div>
							<span class="-sr-only">{{ nav.meta!.title }}</span>
						</div>

						<div v-if="nav.meta!.menu" @click="$event => emit('open-menu', $event)" :class="!isActive && ['hidden']" class="w-10 h-full flex-0 ml-1 flex justify-center items-center rounded-md p-1 hover:bg-white hover:dark:bg-slate-700 cursor-pointer">
							<svg class="w-4 h-4 -rotate-90 text-slate-400" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 284.929 284.929" xml:space="preserve"><path fill="currentColor" d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
								L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
								c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
								c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"></path>
							</svg>
						</div>
					</router-link>
				</nav>


				<template v-if="$route.path !== '/video'">
					<label for="region" class="block text-sm leading-6 text-gray-900 dark:text-gray-50">历史记录</label>

					<nav class="w-full flex flex-col items-center my-2 space-y-2">
						<router-link v-for="item in history" :to="{path:'/video',query: item }" v-slot="{ isActive, href, navigate }" class="w-full h-10">
							<div :data-laber="isActive" :class="$route.query.url == item.url && ['text-primary-600', 'bg-white dark:bg-slate-700 rounded-lg']" class="w-full h-full px-3 py-2 flex items-center rounded-md hover:bg-white hover:dark:bg-slate-700 dark:text-white text-gray-600 focus:outline outline-2 outline-primary-300/80">
								<span class="-sr-only truncate">{{ item.title }}</span>
							</div>
						</router-link>
					</nav>
				</template>

				
				
			</div>

			<div class="w-full h-16 inline-flex flex-col items-start justify-end">
				

				<!-- <button class="p-1 rounded-full hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700">
					<img v-if="userInfo && userInfo.avatar" :src="userInfo.avatar" class="h-10 w-10 bg-white block rounded-full" />
					<img v-else src="/logo.png" class="h-10 w-10 bg-white block rounded-full" />
				</button> -->

				<!-- <button class="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
					<span class="sr-only">Settings</span>
					<svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</button>-->

				<div class="ml-0 space-x-2">
					<button class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
						<span class="sr-only">Close Apps</span>
						<svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
						</svg>
					</button>
					<button class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
						<template v-if="true">
							<span class="sr-only">Notifications</span>
							<span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
							<span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
						</template>
						<svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
						</svg>
					</button>
					<button @click="dark" class="float-right p-2 hover:text-gray-400 hover:bg-gray-300 hover:dark:bg-gray-700 focus:text-gray-400 focus:bg-gray-300 focus:dark:bg-gray-700 rounded-lg">
						<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true" class="h-6 w-6 dark:hidden">
							<path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
							<path stroke-linecap="round" d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 15.5v-1M6.11 13.889l.708-.707M4.5 10h1M6.11 6.111l.708.707" />
						</svg>
						<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" stroke="currentColor" class="hidden h-6 w-6 dark:block">
							<path d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
// import packageJson from "@root/package.json";
import { useRouter, useRoute } from "vue-router";
import { useStore } from 'vuex';

const emit = defineEmits(['open-video', 'open-file', 'open-menu']);

const router = useRouter();
const route = useRoute();
const store = useStore();

const appName = ref('PotionVision');
const history = ref([] as {
	title: string;
	time: number;
	url: string;
}[]);

const navList = computed(() => router.options.routes.filter((nav: any) => nav.meta.nav || nav.meta.nav == undefined));

function dark() {
	document.body.classList.toggle('dark');
	const remote = require('@electron/remote');
	const win: any = remote.getCurrentWindow() as any;
	win.themeSource = document.body.classList.contains('dark') ? 'dark' : 'light';
};

function video() {
	router.push({
		path: 'video',
		query: {
			history: "true"
		},
	});
};

function historyUpdata() {
	const historyStr = localStorage.getItem('nplayer_history');
	if (historyStr) {
		const _history = JSON.parse(historyStr) as {
			title: string;
			time: number;
			url: string;
		}[];

		history.value = _history;
	}
};

onMounted(() => {
	window.addEventListener('storage', () => {
		historyUpdata();
	});
	historyUpdata();
});
</script>

<style lang="less">

.navigation {
	-webkit-app-region: drag;

	& > * {
		-webkit-app-region: no-drag;
	}
}
</style>
