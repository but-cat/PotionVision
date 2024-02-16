import component from "./index.vue";

const icons = `<svg class="w-6 h-6" stroke-width="0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
	<path d="M8.5 10C8.22386 10 8 10.2239 8 10.5C8 10.7761 8.22386 11 8.5 11H11.5C11.7761 11 12 10.7761 12 10.5C12 10.2239 11.7761 10 11.5 10H8.5ZM2 4.75C2 3.7835 2.7835 3 3.75 3H16.25C17.2165 3 18 3.7835 18 4.75V6.25C18 6.9481 17.5912 7.55073 17 7.83159V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V7.83159C2.40876 7.55073 2 6.9481 2 6.25V4.75ZM3.75 4C3.33579 4 3 4.33579 3 4.75V6.25C3 6.66421 3.33579 7 3.75 7H16.25C16.6642 7 17 6.66421 17 6.25V4.75C17 4.33579 16.6642 4 16.25 4H3.75ZM4 8V14C4 15.1046 4.89543 16 6 16H14C15.1046 16 16 15.1046 16 14V8H4Z"/>
</svg>`

export default {
	path: '/archive',
	name: 'Archive',
	meta: {
		title: "归档",
		icons,
		dev: true,
		hideTabBar: true,
	},
	component,
}