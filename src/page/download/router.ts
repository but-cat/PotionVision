// const icons = `<svg viewBox="0 0 24 24" class="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
// <rect x="3" y="3" width="7" height="7"></rect>
// <rect x="14" y="3" width="7" height="7"></rect>
// <rect x="14" y="14" width="7" height="7"></rect>
// <rect x="3" y="14" width="7" height="7"></rect>
// </svg>`;

// const icons = `<svg viewBox="0 0 24 24" class="w-6 h-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
//   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//   <polyline points="7 10 12 15 17 10" />
//   <line x1="12" y1="15" x2="12" y2="3" />
// </svg>`

const icons = `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg">
	<path d="M15.5 16.9997C15.7761 16.9997 16 17.2236 16 17.4997C16 17.7452 15.8231 17.9494 15.5899 17.9917L15.5 17.9997H4.5C4.22386 17.9997 4 17.7759 4 17.4997C4 17.2543 4.17688 17.0501 4.41012 17.0078L4.5 16.9997H15.5ZM10.0001 2.00195C10.2456 2.00195 10.4497 2.17896 10.492 2.41222L10.5 2.5021L10.496 14.296L14.1414 10.6476C14.3148 10.4739 14.5842 10.4544 14.7792 10.5892L14.8485 10.647C15.0222 10.8204 15.0418 11.0898 14.907 11.2848L14.8492 11.3541L10.3574 15.8541C10.285 15.9267 10.1957 15.9724 10.1021 15.9911L9.99608 16.0008C9.83511 16.0008 9.69192 15.9247 9.60051 15.8065L5.14386 11.3547C4.94846 11.1595 4.94823 10.8429 5.14336 10.6475C5.3168 10.4739 5.58621 10.4544 5.78117 10.5892L5.85046 10.647L9.496 14.288L9.5 2.50181C9.50008 2.22567 9.724 2.00195 10.0001 2.00195Z"/>
</svg>`

import component from "./index.vue";

export default {
	path: '/download',
	name: 'Download',
	meta: {
		title: '下载',
		icons,
		dev: false,
		current: !true,
	},
	component,
};
