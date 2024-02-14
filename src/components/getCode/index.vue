<template>
	<div class="w-full flex-shrink-0 p-4 rounded-md bg-card shadow-sm bg-white space-y-4 mt-8">
		<div>
			<label class="block text-gray-700">验证码</label>
			<div class="w-full flex items-center mt-2">
				<input :value="code" @input="event => $emit('update:code', event.target.value)" placeholder="请输入验证码" class="w-full p-2 rounded-md bg-gray-50 border focus:border-blue-500 focus:bg-white focus:outline-none" />
				<button @click="getCode()" v-if="countdown == 0" class="w-28 text-xs ml-2 py-1 leading-none self-stretch bg-blue-400 text-white rounded-md">发送验证码</button>
				<button v-else class="w-28 text-xs ml-2 py-1 leading-none self-stretch bg-blue-200 text-white rounded-md">{{ countdown }}s 后重试</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance, defineEmits, PropType } from "vue";

const emit = defineEmits(['update:code'])

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $http = globalProperties!.$http;
const $news = globalProperties!.$news;


const props = defineProps({
  code: [String, Number] as PropType<string | number>,
})

const countdown = ref(0);



async function getCode() {
	try {
		const res = await $http.get("/agentCore/getCode");
		if (!res.success) throw new Error(res.message);
		countdown.value = 60;

		const timer = setInterval(() => {
			countdown.value--;
			if (countdown.value <= 0) {
				clearInterval(timer);
			}
		}, 1000);
	} catch (error: any) {
		console.log("error", error);
		$news(error.message);
	}
}
</script>

<style>
</style>