import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from "dotenv";
import { resolve, dirname } from "upath";
import path from "path";

import monacoEditorPlugin from "vite-plugin-monaco-editor";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	publicDir: "public",// 作为静态资源服务的文件夹。该目录中的文件在开发期间在 / 处提供，并在构建期间复制到 outDir 的根目录，并且始终按原样提供或复制而无需进行转换。该值可以是文件系统的绝对路径，也可以是相对于项目的根目录的相对路径。
	plugins: [
		vue({}),
		monacoEditorPlugin({}),
	],//需要用到的插件数组。Falsy 虚值的插件将被忽略，插件数组将被扁平化（flatten）。查看 插件 API 获取 Vite 插件的更多细节。


	optimizeDeps: {
		include: [
			`monaco-editor/esm/vs/language/json/json.worker`,
			`monaco-editor/esm/vs/language/css/css.worker`,
			`monaco-editor/esm/vs/language/html/html.worker`,
			`monaco-editor/esm/vs/language/typescript/ts.worker`,
			`monaco-editor/esm/vs/editor/editor.worker`
		],
	},

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@components": path.resolve(__dirname, "src/components"),
		},
	},

	// define: {
	// 	'process.env': dotenv.config({
	// 		path: resolve(process.cwd(), process.env.NODE_ENV !== 'development' ? './.env.production' : './.env.development'), // 配置文件路径
	// 		encoding: 'utf8', // 编码方式，默认utf8
	// 		debug: false, // 是否开启debug，默认false
	// 	}).parsed,
	// },
	// envDir: process.cwd(),// 指定环境变量文件的目录。默认为项目根目录。如果指定了 envFile，该选项将被忽略。

	server: {
		port: 3600,
	},


	build: {
		// outDir: "dist",
		outDir: "../../youfo_test/.youfo/tools/code/",
		target: 'esnext',
		// rollupOptions: {
		// 	input: {
		// 		default: './index.html',
		// 	},
		// },
	},


	css: {
		// css预处理器
		preprocessorOptions: {
			less: {
				charset: false,
				// additionalData: '@import "./src/style/index.less";',
				additionalData: `
					@import "./src/style/index.less";
				`,

			},
		},
	},

});