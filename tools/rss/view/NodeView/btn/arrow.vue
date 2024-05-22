<template>
	<button @click.stop="!filterNode.has(item.el) ? filterNode.add(item.el) : filterNode.delete(item.el)" :class="[filterNode.has(item.el) && '-rotate-90', !item.isSubNode && 'opacity-0']" class="arrow-btn w-3 h-3 mx-2 text-slate-500">
		<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="284.929px" height="284.929px" viewBox="0 0 284.929 284.929" xml:space="preserve">
			<path
				d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
		L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
		c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
		c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"
			/>
		</svg>
	</button>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import { NodeItem } from '../types';

const props = defineProps<{
	filterNode: Set<Element>;
	item: NodeItem;
}>();
const { filterNode, item } = toRefs(props);

</script>

<style lang="less" scoped>
.arrow-btn {
	cursor: pointer;
	transition: color 0.2s;
	display: flex;
	justify-content: center;
	align-items: center;
	fill: currentColor;
	overflow: hidden;

	&[disabled='disabled'] {
		color: #ccc;
		cursor: not-allowed;

		&:hover {
			color: #ccc;
			background-color: transparent;
		}
	}
}
</style>
