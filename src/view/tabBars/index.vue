<template>
	<div class="tab-bars bg-gray-50/60 dark:bg-gray-900/20 w-16 flex flex-shrink-0 flex-col z-50 backdrop-blur-sm">
		

	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

const navList = ["assets://project.local/5f29b3a2-d0be-11ea-b57e-623890f1f3ea.mp4", "assets://project.local/[夜莺家族&YYQ字幕组]New Doraemon 哆啦A梦新番[794][2024.01.20][AVC][1080P][GB_JP].mp4", "assets://project.local/Koppelman-Galaxy_1440x610_HPA.mp4"];
const openDev = ref(true);


</script>


<style lang="less">
.tab-bars {
	-webkit-app-region: drag;
}

</style>
