<template>
	<div class="w-full  flex-1 overflow-hidden">
		<div class="w-full h-full overflow-scroll grid grid-cols-[repeat(7,1fr)] grid-rows-[50px,repeat(5,1fr)]">
			<!-- Calendar frame -->
			<!-- <div class="row-start-[1] col-start-[1] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2"></div> -->
			<div class="row-start-[1] col-start-[1] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">周日</div>
			<div class="row-start-[1] col-start-[2] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">周一</div>
			<div class="row-start-[1] col-start-[3] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">周二</div>
			<div class="row-start-[1] col-start-[4] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">周三</div>
			<div class="row-start-[1] col-start-[5] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">周四</div>
			<div class="row-start-[1] col-start-[6] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">周五</div>
			<div class="row-start-[1] col-start-[7] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center">周六</div>

			<!-- <div class="row-start-[2] col-start-[1] border-slate-100 dark:border-slate-200/5 border-r text-xs p-1.5 text-right text-slate-400 uppercase sticky left-0 bg-white dark:bg-slate-800 font-medium">5 AM</div> -->
			<div class="row-start-[2] col-start-[1] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[2] col-start-[2] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[2] col-start-[3] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[2] col-start-[4] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[2] col-start-[5] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[2] col-start-[6] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[2] col-start-[7] border-slate-100 dark:border-slate-200/5 border-b"></div>
			<!-- <div class="row-start-[3] col-start-[1] border-slate-100 dark:border-slate-200/5 border-r text-xs p-1.5 text-right text-slate-400 uppercase sticky left-0 bg-white dark:bg-slate-800 font-medium">6 AM</div> -->
			<div class="row-start-[3] col-start-[1] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[3] col-start-[2] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[3] col-start-[3] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[3] col-start-[4] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[3] col-start-[5] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[3] col-start-[6] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[3] col-start-[7] border-slate-100 dark:border-slate-200/5 border-b"></div>
			<!-- <div class="row-start-[4] col-start-[1] border-slate-100 dark:border-slate-200/5 border-r text-xs p-1.5 text-right text-slate-400 uppercase sticky left-0 bg-white dark:bg-slate-800 font-medium">7 AM</div> -->
			<div class="row-start-[4] col-start-[1] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[4] col-start-[2] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[4] col-start-[3] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[4] col-start-[4] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[4] col-start-[5] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[4] col-start-[6] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[4] col-start-[7] border-slate-100 dark:border-slate-200/5 border-b"></div>
			<!-- <div class="row-start-[5] col-start-[1] border-slate-100 dark:border-slate-200/5 border-r text-xs p-1.5 text-right text-slate-400 uppercase sticky left-0 bg-white dark:bg-slate-800 font-medium">8 AM</div> -->
			<div class="row-start-[5] col-start-[1] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[5] col-start-[2] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[5] col-start-[3] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[5] col-start-[4] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[5] col-start-[5] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[5] col-start-[6] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[5] col-start-[7] border-slate-100 dark:border-slate-200/5 border-b"></div>

			<!-- <div class="row-start-[6] col-start-[1] border-slate-100 dark:border-slate-200/5 border-r text-xs p-1.5 text-right text-slate-400 uppercase sticky left-0 bg-white dark:bg-slate-800 font-medium">9 AM</div> -->
			<div class="row-start-[6] col-start-[1] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[6] col-start-[2] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[6] col-start-[3] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[6] col-start-[4] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[6] col-start-[5] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[6] col-start-[6] border-slate-100 dark:border-slate-200/5 border-b border-r"></div>
			<div class="row-start-[6] col-start-[7] border-slate-100 dark:border-slate-200/5 border-b"></div>

			<template v-for="(week, row) in calendarArray">
				<template v-for="(item, index) in week">
					<div v-if="!!item && day == item" :style="{ gridColumnStart: index+1, gridRowStart: row+2 }" class="bg-blue-400/20 dark:bg-primary-600/10 backdrop-blur-sm border border-primary-700/10 dark:border-primary-500 p-1 flex flex-col shadow-lg dark:shadow-md dark:shadow-primary-500/30 cursor-pointer">
						<span class="text-lg text-primary-600 dark:text-sky-100">{{ month }}月{{ item }}日</span>
						<!-- <span class="text-xs font-medium text-primary-600 dark:text-sky-100">Flight to vancouver</span> -->
					</div>
					<div v-else-if="!!item" :style="{ gridColumnStart: index+1, gridRowStart: row+2 }" class="bg-blue-400/20 dark:bg-sky-600/20 border border-blue-700/10 backdrop-blur-sm dark:border-sky-500 p-1 flex flex-col shadow-lg dark:shadow-md dark:shadow-sky-500/30 cursor-pointer">
						<span class="text-lg text-blue-600 dark:text-sky-100">{{ month }}月{{ item }}日</span>
						<!-- <span class="text-xs font-medium text-blue-600 dark:text-sky-100">Flight to vancouver</span> -->
					</div>

					<!-- <div v-if="!!item" :style="{ gridColumnStart: index+1, gridRowStart: row+2 }" :class="day == item ? ['border-primary-700/10 dark:border-primary-500 dark:shadow-primary-500/30'] : ['border-blue-700/10 dark:border-sky-500 dark:shadow-sky-500/30']" class="bg-blue-400/20 dark:bg-sky-600/50 border rounded-lg m-1 p-1 flex flex-col shadow-lg dark:shadow-md cursor-pointer">
						<span class="text-xs text-blue-600 dark:text-sky-100">{{ item }}</span>
						<span class="text-xs font-medium text-blue-600 dark:text-sky-100">Flight to vancouver</span>
					</div> -->
				</template>
			</template>
			<!-- Calendar contents -->
			<!-- <div class="row-start-[2] col-start-3 row-span-4 bg-blue-400/20 dark:bg-sky-600/50 border border-blue-700/10 dark:border-sky-500 rounded-lg m-1 p-1 flex flex-col">
				<span class="text-xs text-blue-600 dark:text-sky-100">5 AM</span>
				<span class="text-xs font-medium text-blue-600 dark:text-sky-100">Flight to vancouver</span>
				<span class="text-xs text-blue-600 dark:text-sky-100">Toronto YYZ</span>
			</div> -->
			<!-- <div class="row-start-[3] col-start-[4] row-span-4 bg-purple-400/20 dark:bg-fuchsia-600/50 border border-purple-700/10 dark:border-fuchsia-500 rounded-lg m-1 p-1 flex flex-col">
				<span class="text-xs text-purple-600 dark:text-fuchsia-100">6 AM</span>
				<span class="text-xs font-medium text-purple-600 dark:text-fuchsia-100">Breakfast</span>
				<span class="text-xs text-purple-600 dark:text-fuchsia-100">Mel's Diner</span>
			</div> -->
			<!-- <div class="row-start-[14] col-start-[7] row-span-3 bg-pink-400/20 dark:bg-indigo-600/50 border border-pink-700/10 dark:border-indigo-500 rounded-lg m-1 p-1 flex flex-col">
				<span class="text-xs text-pink-600 dark:text-indigo-100">5 PM</span>
				<span class="text-xs font-medium text-pink-600 dark:text-indigo-100">🎉 Party party 🎉</span>
				<span class="text-xs text-pink-600 dark:text-indigo-100">We like to party!</span>
			</div> -->
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, onMounted, watch, getCurrentInstance, onBeforeUnmount } from 'vue';


const calendarArray = ref<Array<number | null>[]>([]);
const year = ref<number>(0);
const month = ref<number>(0);
const day = ref<number>(0);


function generateCalendarArray(year: number, month: number) {
	const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	// 创建日期对象
	const firstDay = new Date(year, month - 1, 1);
	const lastDay = new Date(year, month, 0);

	const firstDayIndex = firstDay.getDay();
	const daysInMonth = lastDay.getDate();

	// 初始化二维数组
	type weekList = Array<number | null>;
	let week: weekList = new Array(7).fill(null);
	const calendarArray: weekList[] = [];

	// 填充空白单元格
	for (let i = 0; i < firstDayIndex; i++) {
		week[i] = null;
	}

	// 填充日期单元格
	let dayCounter = 1;
	for (let i = firstDayIndex; i < 7; i++) {
		week[i] = dayCounter++;
	}
	calendarArray.push(week);

	// 填充剩余的日期
	while (dayCounter <= daysInMonth) {
		week = new Array(7).fill(null);
		for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
			week[i] = dayCounter++;
		}
		calendarArray.push(week);
	}

	return calendarArray;
}




onMounted(() => {
	const now = new Date();
	year.value = now.getFullYear();
	month.value = now.getMonth() + 1;
	day.value = now.getDate();
	calendarArray.value = generateCalendarArray(year.value, month.value);
	
	console.log(calendarArray);
});
</script>
