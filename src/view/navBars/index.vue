<template>
	<aside class="bg-white dark:bg-gray-900 w-16 flex-shrink-0 flex-col hidden sm:flex">
		
		<div class="flex-grow flex flex-col justify-between items-center text-gray-500 bg-gray-800">
			<nav class="flex flex-col items-center my-6 space-y-4">
				<a href="#/" :class="route.path == '/' ? ['text-primary-600', 'bg-white rounded-lg'] : ['hover:text-gray-400', 'hover:bg-gray-700', 'focus:text-gray-400', 'focus:bg-gray-700']" class="inline-flex items-center justify-center py-3 rounded-lg w-10 h-10">
					<span class="sr-only">Folders</span>
					<!-- <div v-if="nav.meta.icons" v-html="nav.meta.icons"></div> -->
					<svg viewBox="0 0 24 24" class="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
						<polyline points="9 22 9 12 15 12 15 22" />
					</svg>
				</a>

				<router-link v-for="nav in navList" :to="{ name: nav.name, params: { fileName: '' } }" v-slot="{ isActive, href, navigate }">
					<span :data-laber="isActive" :class="isActive ? ['text-primary-600', 'bg-white rounded-lg'] : ['hover:text-gray-400', 'hover:bg-gray-700', 'focus:text-gray-400', 'focus:bg-gray-700']" class="inline-flex items-center justify-center py-3 rounded-lg w-10 h-10 relative">
						<span class="sr-only">{{ nav.meta!.title }}</span>
						<div v-html="nav.meta!.icons"></div>

						<template v-if="nav.meta!.dev">
							<span v-if="isActive" title="开发中" class=" w-10 h-4 bg-sky-500 text-white inline-flex items-center justify-center px-1 rounded-lg absolute -bottom-2 -right-4 scale-50">dev</span>
							<span v-else class=" w-3 h-3 bg-sky-500/20 text-white inline-flex items-center justify-center px-1 rounded-lg absolute -bottom-1 -right-1 scale-50"></span>
						</template>
					</span>

					
				</router-link>
			</nav>
			<div class="inline-flex flex-col items-center justify-end h-60 pb-6 space-y-4">
				<!-- <button @click="openDev = !openDev" :class="openDev ? ['text-primary-600', 'bg-white rounded-lg'] : ['hover:text-gray-400', 'hover:bg-gray-700', 'focus:text-gray-400', 'focus:bg-gray-700']" class="w-8 h-8 p-2 hover:text-gray-400 dark:text-gray-400 rounded-lg">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 522.468 522.469" fill="currentColor">
						<path
							d="M325.762,70.513l-17.706-4.854c-2.279-0.76-4.524-0.521-6.707,0.715c-2.19,1.237-3.669,3.094-4.429,5.568L190.426,440.53
									c-0.76,2.475-0.522,4.809,0.715,6.995c1.237,2.19,3.09,3.665,5.568,4.425l17.701,4.856c2.284,0.766,4.521,0.526,6.71-0.712
									c2.19-1.243,3.666-3.094,4.425-5.564L332.042,81.936c0.759-2.474,0.523-4.808-0.716-6.999
									C330.088,72.747,328.237,71.272,325.762,70.513z"
						/>
						<path
							d="M166.167,142.465c0-2.474-0.953-4.665-2.856-6.567l-14.277-14.276c-1.903-1.903-4.093-2.857-6.567-2.857
									s-4.665,0.955-6.567,2.857L2.856,254.666C0.95,256.569,0,258.759,0,261.233c0,2.474,0.953,4.664,2.856,6.566l133.043,133.044
									c1.902,1.906,4.089,2.854,6.567,2.854s4.665-0.951,6.567-2.854l14.277-14.268c1.903-1.902,2.856-4.093,2.856-6.57
									c0-2.471-0.953-4.661-2.856-6.563L51.107,261.233l112.204-112.201C165.217,147.13,166.167,144.939,166.167,142.465z"
						/>
						<path
							d="M519.614,254.663L386.567,121.619c-1.902-1.902-4.093-2.857-6.563-2.857c-2.478,0-4.661,0.955-6.57,2.857l-14.271,14.275
									c-1.902,1.903-2.851,4.09-2.851,6.567s0.948,4.665,2.851,6.567l112.206,112.204L359.163,373.442
									c-1.902,1.902-2.851,4.093-2.851,6.563c0,2.478,0.948,4.668,2.851,6.57l14.271,14.268c1.909,1.906,4.093,2.854,6.57,2.854
									c2.471,0,4.661-0.951,6.563-2.854L519.614,267.8c1.903-1.902,2.854-4.096,2.854-6.57
									C522.468,258.755,521.517,256.565,519.614,254.663z"
						/>
					</svg>
				</button> -->

				<button @click="dark" class="p-2 hover:text-gray-400 dark:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
					<span class="sr-only">Settings</span>
					<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true" class="h-7 w-7 dark:hidden">
						<path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
						<path stroke-linecap="round" d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 15.5v-1M6.11 13.889l.708-.707M4.5 10h1M6.11 6.111l.708.707" />
					</svg>
					<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" stroke="currentColor" class="hidden h-7 w-7 dark:block">
						<path d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z" />
					</svg>
				</button>

				<router-link v-for="nav in currentNavBtn" :to="`${nav.path}/`" v-slot="{ isActive, href, navigate }">
					<span :data-laber="isActive" :class="isActive ? ['text-primary-600', 'bg-white rounded-lg'] : ['hover:text-gray-400', 'hover:bg-gray-700', 'focus:text-gray-400', 'focus:bg-gray-700']" class="inline-flex items-center justify-center py-3 rounded-lg w-10 h-10 relative">
						<span class="sr-only">{{ nav.meta!.title }}</span>
						<div v-html="nav.meta!.icons"></div>

						<template v-if="nav.meta!.dev">
							<span v-if="isActive" title="开发中" class=" w-10 h-4 bg-sky-500 text-white inline-flex items-center justify-center px-1 rounded-lg absolute -bottom-2 -right-4 scale-50">dev</span>
							<span v-else class=" w-3 h-3 bg-sky-500/20 text-white inline-flex items-center justify-center px-1 rounded-lg absolute -bottom-1 -right-1 scale-50"></span>
						</template>
					</span>
				</router-link>
			</div>
		</div>

		<!-- <a href="#" class="inline-flex items-center justify-center h-16 w-16 bg-white">
			<img src="/logo.png" class="h-10 w-10" />
		</a> -->
	</aside>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

const hideNav = ["/", "/register"];
const openDev = ref(true);

function dark() {
	document.body.classList.toggle('dark')
}
const navList = computed(() => {
	const routeList = router.options.routes.filter((nav: any) => nav.meta.icons && !hideNav.includes(nav.path) && !nav.meta?.current);
	return routeList.filter((nav: any) => !nav.meta!.dev || openDev.value);
});
const currentNavBtn = computed(() => {
	const routeList = router.options.routes.filter((nav: any) => nav.meta.icons && !hideNav.includes(nav.path) && nav.meta?.current);
	return routeList.filter((nav: any) => !nav.meta!.dev || openDev.value);
});
</script>


<style lang="less"></style>
