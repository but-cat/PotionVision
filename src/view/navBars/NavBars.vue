<template>
	<aside class="navigation w-72 h-full bg-gray-100 dark:bg-gray-800 flex-0 flex-shrink-0 border-r-4 border-primary-200 dark:border-primary-800 flex-col hidden sm:flex">
		<a href="#" class="w-full h-16 px-5 mt-10 inline-flex items-center justify-start">
			<img src="/logo.png" class="w-10 h-10" />
			<h1 class="text-md ml-2">{{ appName }}</h1>
		</a>
		<div class="w-full flex-1 px-3 py-4 flex-grow flex flex-col justify-between items-center text-gray-500">
			<div class="w-full flex-1 overflow-auto">
				<nav class="w-full flex flex-col items-center my-6 space-y-2">
					<!-- <a href="#/" :class="$route.path == '/' ? ['text-primary-600', 'bg-white rounded-lg'] : []" class="w-full px-3 py-2 flex items-center rounded-md bg-white dark:bg-slate-700 dark:text-white text-gray-600 focus:outline outline-2 outline-primary-300/80">
						<svg viewBox="0 0 24 24" class="mr-2 h-6 w-6 flex-none dark:stroke-white stroke-gray-600" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
							<polyline points="9 22 9 12 15 12 15 22" />
						</svg>
						<span class="-sr-only">Home</span>
					</a> -->

					<router-link v-for="nav in navList" :to="`${nav.path}`" v-slot="{ isActive, href, navigate }" class="w-full h-10">
						<div :data-laber="isActive" :class="isActive && ['text-primary-600', 'bg-white dark:bg-slate-700 rounded-lg']" class="w-full h-full px-3 py-2 flex items-center rounded-md hover:bg-white hover:dark:bg-slate-700 dark:text-white text-gray-600 focus:outline outline-2 outline-primary-300/80">
							<div v-html="nav.meta.icons" class="mr-2 h-6 w-6 flex-none "></div>
							<span class="-sr-only">{{ nav.meta.title }}</span>
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

<script lang="ts">
import { defineComponent } from 'vue';
// import packageJson from "@root/package.json";

export default defineComponent({
	name: 'navBar',
	props: {
		userInfo: {
			type: Object,
			default: () => ({}),
			
		},
	},
	data: () => ({
		appName: 'PotionVision',
		history: [] as {
			title: string;
			time: number;
			url: string;
		}[],
	}),
	methods: {
		dark() {
			document.body.classList.toggle('dark');
			const remote = require('@electron/remote');
			const win: any = remote.getCurrentWindow() as any;
			win.themeSource = document.body.classList.contains('dark') ? 'dark' : 'light';
		},
		video() {
			this.$router.push({
				path: 'video',
				query: {
					history: "true"
				},
			});
		},

		historyUpdata() {
			const historyStr = localStorage.getItem('nplayer_history');
			if (historyStr) {
				const history = JSON.parse(historyStr) as {
					title: string;
					time: number;
					url: string;
				}[];

				this.history = history;
			}
		},
	},
	computed: {
		navList(): any {
			return this.$router.options.routes.filter((nav: any) => nav.meta.nav || nav.meta.nav == undefined);
		},
	},
	mounted() {
		window.addEventListener('storage', () => {
			this.historyUpdata();
		});
		this.historyUpdata();
	},
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
