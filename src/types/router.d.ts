// typings.d.ts or router.ts
import 'vue-router';

declare module 'vue-router' {
	interface RouteMeta {

		title: string;						// 标题
		icons: string;						// 图标
		dev: boolean; // 是否开发中
		// hideTabBar: boolean; // 是否隐藏底部导航栏
		introduce: string; // 介绍
		fileType: string | string[]; // 文件类型
	}
}
