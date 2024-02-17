import component from "./index.vue";

// const icons = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
// <path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-width="0.6" d="M18,18 L18,4.5 C18,3.67157288 17.3284271,3 16.5,3 L5.73243561,3 C5.90260571,3.29417337 6,3.63571286 6,4 L6,20 C6,20.5522847 6.44771525,21 7,21 C7.55228475,21 8,20.5522847 8,20 L8,18.5 C8,18.2238576 8.22385763,18 8.5,18 L18,18 Z M19,18 L21.5,18 C21.7761424,18 22,18.2238576 22,18.5 L22,19.5 C22,20.8807119 20.8807119,22 19.5,22 L7,22 C5.8954305,22 5,21.1045695 5,20 L5,6 L4,6 C2.8954305,6 2,5.1045695 2,4 C2,2.8954305 2.8954305,2 4,2 L16.5,2 C17.8807119,2 19,3.11928813 19,4.5 L19,18 Z M9,19 L9,20 C9,20.3642871 8.90260571,20.7058266 8.73243561,21 L19.5,21 C20.3284271,21 21,20.3284271 21,19.5 L21,19 L9,19 Z M5,5 L5,4 C5,3.44771525 4.55228475,3 4,3 C3.44771525,3 3,3.44771525 3,4 C3,4.55228475 3.44771525,5 4,5 L5,5 Z M8.5,7 C8.22385763,7 8,6.77614237 8,6.5 C8,6.22385763 8.22385763,6 8.5,6 L15.5,6 C15.7761424,6 16,6.22385763 16,6.5 C16,6.77614237 15.7761424,7 15.5,7 L8.5,7 Z M8.5,10 C8.22385763,10 8,9.77614237 8,9.5 C8,9.22385763 8.22385763,9 8.5,9 L15.5,9 C15.7761424,9 16,9.22385763 16,9.5 C16,9.77614237 15.7761424,10 15.5,10 L8.5,10 Z M8.5,13 C8.22385763,13 8,12.7761424 8,12.5 C8,12.2238576 8.22385763,12 8.5,12 L15.5,12 C15.7761424,12 16,12.2238576 16,12.5 C16,12.7761424 15.7761424,13 15.5,13 L8.5,13 Z M8.5,16 C8.22385763,16 8,15.7761424 8,15.5 C8,15.2238576 8.22385763,15 8.5,15 L13.5,15 C13.7761424,15 14,15.2238576 14,15.5 C14,15.7761424 13.7761424,16 13.5,16 L8.5,16 Z"/>
// </svg>`;


// const icons = `<svg class="w-6 h-6" stroke-width="0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// <path d="M5 7C5 6.44772 5.44772 6 6 6H14C14.5523 6 15 6.44771 15 7V9C15 9.55228 14.5523 10 14 10H6C5.44772 10 5 9.55229 5 9V7ZM14 7H6V9H14V7ZM12 11C11.4477 11 11 11.4477 11 12V13C11 13.5523 11.4477 14 12 14H14C14.5523 14 15 13.5523 15 13V12C15 11.4477 14.5523 11 14 11H12ZM12 12H14V13H12V12ZM5 11.5C5 11.2239 5.22386 11 5.5 11H9.5C9.77614 11 10 11.2239 10 11.5C10 11.7761 9.77614 12 9.5 12H5.5C5.22386 12 5 11.7761 5 11.5ZM5.5 13C5.22386 13 5 13.2239 5 13.5C5 13.7761 5.22386 14 5.5 14H9.5C9.77614 14 10 13.7761 10 13.5C10 13.2239 9.77614 13 9.5 13H5.5ZM3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 4C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H14C15.1046 16 16 15.1046 16 14V6C16 4.89543 15.1046 4 14 4H6Z"/>
// </svg>`;


const icons = `<svg class="w-6 h-6" stroke-width="0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
	<path d="M3 5.5C3 4.11929 4.11929 3 5.5 3H14.5C15.8807 3 17 4.11929 17 5.5V14.5C17 15.8807 15.8807 17 14.5 17H5.5C4.11929 17 3 15.8807 3 14.5V5.5ZM5.5 4C4.67157 4 4 4.67157 4 5.5V6H16V5.5C16 4.67157 15.3284 4 14.5 4H5.5ZM16 7H4V14.5C4 15.3284 4.67157 16 5.5 16H14.5C15.3284 16 16 15.3284 16 14.5V7ZM5 9C5 8.44771 5.44772 8 6 8H8C8.55228 8 9 8.44772 9 9V14C9 14.5523 8.55228 15 8 15H6C5.44772 15 5 14.5523 5 14V9ZM8 9H6V14H8V9ZM10 10.5C10 10.2239 10.2239 10 10.5 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H10.5C10.2239 11 10 10.7761 10 10.5ZM10.5 8C10.2239 8 10 8.22386 10 8.5C10 8.77614 10.2239 9 10.5 9H14.5C14.7761 9 15 8.77614 15 8.5C15 8.22386 14.7761 8 14.5 8H10.5Z"/>
</svg>`;



export default {
	path: '/browser',
	name: 'Browser',
	meta: {
		title: '浏览器',
		icons,
		dev: true,
		current: !true,
	},
	component,
};