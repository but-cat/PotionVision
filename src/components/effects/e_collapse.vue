<template>
	<transition
		@enter="enter"
		@before-enter="beforeEnter"
		@before-leave="beforeLeave"
		@leave="leave"
		@after-enter="afterEnter"
		@after-leave="afterLeave"
	>
		<slot/>
	</transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const shnCollapseElTransition =
	"0.2s height ease-in-out," +
	" 0.2s padding-top ease-in-out," +
	" 0.2s padding-bottom ease-in-out"; // 折叠元素过渡表达式

// 组件部分
export default defineComponent({
	name: "eCollapse",
	functional: true,

	methods: {
		beforeEnter(el: any) {
			el.style.transition = shnCollapseElTransition;
			if (!el.dataset) el.dataset = {};

			el.dataset.oldPaddingTop = el.style.paddingTop;
			el.dataset.oldPaddingBottom = el.style.paddingBottom;

			el.style.height = "0";
			el.style.paddingTop = "0";
			el.style.paddingBottom = "0";
		},

		enter(el: any) {
			el.dataset.oldOverflow = el.style.overflow;
			if (el.scrollHeight !== 0) {
				el.style.height = el.scrollHeight + "px";
				el.style.paddingTop = el.dataset.oldPaddingTop;
				el.style.paddingBottom = el.dataset.oldPaddingBottom;
			} else {
				el.style.height = "";
				el.style.paddingTop = el.dataset.oldPaddingTop;
				el.style.paddingBottom = el.dataset.oldPaddingBottom;
			}
			el.style.overflow = "hidden";
		},

		afterEnter(el: any) {
			el.style.transition = "";
			el.style.height = "";
			el.style.overflow = el.dataset.oldOverflow;
		},

		beforeLeave(el: any) {
			if (!el.dataset) el.dataset = {};
			el.dataset.oldPaddingTop = el.style.paddingTop;
			el.dataset.oldPaddingBottom = el.style.paddingBottom;
			el.dataset.oldOverflow = el.style.overflow;

			el.style.height = el.scrollHeight + "px";
			el.style.overflow = "hidden";
		},

		leave(el: any) {
			if (el.scrollHeight !== 0) {
				el.style.transition = shnCollapseElTransition;
				el.style.height = 0;
				el.style.paddingTop = 0;
				el.style.paddingBottom = 0;
			}
		},

		afterLeave(el: any) {
			el.style.transition = "";
			el.style.height = "";
			el.style.overflow = el.dataset.oldOverflow;
			el.style.paddingTop = el.dataset.oldPaddingTop;
			el.style.paddingBottom = el.dataset.oldPaddingBottom;
		}
	},
});
</script>