import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import PackageJson from './package.json';

const global_ENV = {
	__APP_VERSION__: JSON.stringify(PackageJson.version),
	__APP_NAME__: JSON.stringify(PackageJson.name),
	__CLIENT_TYPE__: JSON.stringify(process.platform),
};

export default defineConfig({
	main: {
		build: {
			rollupOptions: {
				input: {
					index: resolve(__dirname, 'core/index.ts'),
				},
			},
		},
		plugins: [externalizeDepsPlugin({ exclude: ['file-type', 'node-pty'] })],
		resolve: {
			alias: {
				'@': resolve('core/'),
				'@view': resolve('view/'),
				'@preload': resolve('preload/'),
				'@icon': resolve('public/ico/'),
				'@assets': resolve('public/'),
				'@root': resolve(''),
			},
		},
	},
	preload: {
		build: {
			rollupOptions: {
				input: {
					index: resolve(__dirname, 'preload/index.ts'),
					tools: resolve(__dirname, 'preload/tools/index.ts'),
					core: resolve(__dirname, 'preload/core/index.ts'),
				},
			},
		},
		plugins: [externalizeDepsPlugin({ exclude: ['file-type'] })],
		resolve: {
			alias: {
				'@': resolve('preload/'),
				'@view': resolve('view/'),
				'@core': resolve('core/'),
				'@icon': resolve('public/ico/'),
				'@assets': resolve('public/'),
				'@root': resolve(''),
			},
		},
	},
	renderer: {
		root: './',
		publicDir: './public',
		resolve: {
			alias: {
				'@': resolve('src/'),
				'@core': resolve('core/'),
				'@preload': resolve('preload/'),
				'@icon': resolve('public/ico/'),
				'@assets': resolve('public/'),
				'@root': resolve(''),
			},
		},
		build: {
			rollupOptions: {
				input: {
					index: resolve(__dirname, './src/index.html'),
					
					

					startPage: resolve(__dirname, './tools/start/index.html'),
					videoPage: resolve(__dirname, './tools/video/index.html'),
					rssPage: resolve(__dirname, './tools/rss/index.html'),
				},
			},
		},
		define: global_ENV,
		plugins: [
			
			
			vue({
				template: {
					compilerOptions: {
						isCustomElement: (tag) => ['webview', 'node-canvas', 'node-container', 'node-block', 'point-in', 'point-out'].includes(tag),
					},
				},
			}),

			// ymlForm(),
			// Markdown(),
		],
	},
});
