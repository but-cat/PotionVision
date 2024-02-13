const purgecss = require('@fullhuman/postcss-purgecss')({
	content: [
		'./src/**/*.html',
		'./src/**/*.vue',
		'./src/**/*.jsx',
	],
	safelist: [
		/^swiper/,
		/^swiper-/,
	],

	// Include any special characters you're using in this regular expression
	defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

// module.exports = {
// 	plugins: {
// 		tailwindcss: {},
// 		autoprefixer: {},
// 	},
// }

module.exports = {
	plugins: [
		require('tailwindcss'),
		require('autoprefixer'),
		// ...process.env.NODE_ENV === 'production'
		// 	? [purgecss]
		// 	: []
	]
}