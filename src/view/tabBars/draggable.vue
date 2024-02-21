<template>
	<ul @pointerdown="pointerdown" @pointerup="stopSliding" class="draggable" ref="draggable" draggable="false">
		<slot />
	</ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Page from "./interface";

interface initial {
	offsetX: number;
	offsetY: number;
	clientX: number;
	clientY: number;
}

export default defineComponent({
	name: 'draggable',
	emits: ['dragstart', 'dragend', 'dragging', 'active', 'menu', 'changePosition'],
	props: {
		// page: Object,
		page: {
			type: Object as PropType<Page>
		},
	},
	data() {
		return {
			cloneEl: null as HTMLElement | null,
			targetEl: null as HTMLElement | null,
			originPos: 0,
			lastPos: 0,
			dragging: false,
			pointerId: -1,

			grid: [] as number[][],
			targetIndex: -1,
			reach: false as number | false,
		}
	},

	computed: {
		style() {
			return {
				transform: `translate(${this.lastPos}px)`,
			}
		},

	},

	methods: {
		contextMenu(event: MouseEvent) {

			const target = event.target as HTMLElement;
			if (target.classList.contains('list-group-item') && target.classList.contains('active')) {
				// target.classList.add('active');
				event.preventDefault();
				const index = Array.from(target.parentElement!.children).indexOf(target);
				// console.log('menu', index);

				this.$emit('menu', index);
			}
		},


		debounce(callback: (...arge: unknown[]) => void, delay = 100) {
			let time: any;
			return () => {
				if (time !== undefined) clearTimeout(time);
				time = setTimeout(callback.bind(this), delay)
			}
		},

		pointerdown(event: PointerEvent) {
			const target = event.target as HTMLElement;

			console.log("pointerdown", event);
			
			if(event.button !== 0) return;																				// 非左键取消

			if (target.classList.contains('list-group-item') && target.classList.contains('active') && !this.cloneEl) {
				event.preventDefault();

				// 选中了元素
				this.cloneEl = target.cloneNode(true) as HTMLElement;
				this.cloneEl.classList.add('flutter');
				this.cloneEl.style.left = target.offsetLeft + 'px';
				this.cloneEl.style.width = target.getBoundingClientRect().width + 'px';

				target.style.opacity = '0';
				this.targetEl = target;

				const index = Array.from(target.parentElement!.children).indexOf(target);
				this.targetIndex = index;

				this.$emit('active', index);


				target.parentElement!.appendChild(this.cloneEl);
				target.classList.add('hide'); // 放在最后


				const slider = this.cloneEl as HTMLElement;
				this.originPos = event.pageX - this.lastPos;
				this.dragging = true;
				this.pointerId = event.pointerId;
				// slider.requestPointerLock();

				slider.onpointermove = this.slide;
				slider.setPointerCapture(event.pointerId);

			}
		},

		stopSliding(event: PointerEvent) {
			if (!this.cloneEl) return;
			const slider = this.cloneEl as HTMLElement;
			slider.onpointermove = null;
			this.dragging = false;
			slider.releasePointerCapture(event.pointerId);
			// document.exitPointerLock();

			const { cloneEl, targetEl } = this;

			this.targetEl?.classList.remove('hide');
			this.targetEl = null;

			setTimeout(() => {
				this.cloneEl = null;
				targetEl!.style.opacity = '1';
				cloneEl && cloneEl.remove();
			}, 400);
			cloneEl.addEventListener('transitionstart', () => {
				cloneEl.addEventListener('transitionend', () => {
					// cloneEl.classList.remove('is_return');
					this.cloneEl = null;
					cloneEl!.remove();

					targetEl!.style.opacity = '1';
					// targetEl!.removeAttribute("style");
				}, { once: true });
			}, { once: true });

			cloneEl.classList.add('is_return');
			// cloneEl.style.transform = `translate(0px)`;
			cloneEl.style.transform = `translate(${targetEl!.offsetLeft - cloneEl?.offsetLeft}px)`;


			this.originPos = 0;
			this.lastPos = 0;
			this.pointerId = -1;

		},

		slide(event: PointerEvent) {
			const { targetEl } = this;
			// const slider = this.$refs.track as HTMLDivElement;
			this.lastPos = event.clientX - this.originPos;
			// this.lastPos = this.lastPos <= 0 ? 0 : this.lastPos;
			this.cloneEl!.style.transform = `translate(${this.lastPos}px)`;


			if (!this.reach) {
				this.reach = setTimeout(() => {
					this.reach = false;
				}, 32) as any;

				const grid = Array.from(targetEl!.parentElement!.children).filter(el => el.classList.contains('list-group-item') && el !== this.cloneEl).map((el) => {
					const elItem = el as HTMLElement;
					const start = Math.floor(elItem.offsetLeft);
					const end = el?.nextElementSibling ? Math.floor((el?.nextElementSibling as HTMLElement).offsetLeft) : Infinity;

					return [start, end];
				});

				const lastPos = event.clientX;
				const targetIndex = Array.from(this.targetEl!.parentElement!.children).indexOf(this.targetEl as HTMLElement);
				const index = grid.findIndex(([start, end]) => lastPos >= start && lastPos <= end);
				// console.log("index", index);
				if (index >= 0 && targetIndex !== index) this.$emit('changePosition', {
					item: targetIndex,
					target: index
				});
			}
		},
	},
	mounted() {
		window.addEventListener('pointerup', this.stopSliding.bind(this));
		// window.addEventListener('blur', this.stopSliding.bind(this));
	}
});
</script>


<style lang="less">
.draggable {
	position: relative;
	padding: 0 10px;
}

.flutter {
	position: absolute;
	z-index: 100;
	// top: 0;
	// left: 269px;

}

// .hide {
// 	opacity: 0;
// 	pointer-events: none;
// }


.is_return {
	transition: transform 0.3s;
	// transform: translate(0);
}
</style>