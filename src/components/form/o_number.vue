<template>
	<input :value="modelValue" @input="$emit('update:modelValue', +($event.target as HTMLInputElement)!.value)" type="number" class="px-3 py-2 w-full flex items-center justify-between rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 shadow-sm focus:outline outline-2 outline-primary-300/80" />
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, getCurrentInstance, watch, Prop } from "vue";

defineProps(['modelValue']);
defineEmits(['update:modelValue']);

</script>