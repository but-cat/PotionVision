<template>
	<div class="w-full h-full">
		{{ code }}
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted } from 'vue';

const code = ref('');




async function getRssData() {
	const searchData = new URLSearchParams(location.search);
	const rssLink = searchData.get('url');
	if (!rssLink) return;

	const res = await fetch(rssLink);
	const settingData = await res.text();

	console.log('settingData', settingData);

    code.value = settingData;
}

onMounted(async () => {
	getRssData();
});
</script>

<style lang="less" scoped></style>