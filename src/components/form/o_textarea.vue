<template>
	<!-- <input v-bind="$attrs" class="w-full flex items-center justify-between rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 px-3 py-2 shadow-sm focus:outline outline-2 outline-primary-300/80" /> -->
    <textarea v-bind="$attrs" type="text" autocomplete="address-level1" class="w-full px-3 py-2 flex items-center justify-between rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 border border-slate-400/20  shadow-sm focus:outline outline-2 outline-primary-300/80" ></textarea>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, getCurrentInstance, watch, Prop } from "vue";



</script>