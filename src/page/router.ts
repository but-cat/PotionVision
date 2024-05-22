import Home from "./home/router";

import Video from "@/page/video/router";
import Plan from "@/page/plan/router";
import File from "@/page/files/router";
import Download from "@/page/download/router";
import Subscribe from "@/page/subscribe/router";
import Browser from "@/page/browser/router";

import Archive from "@/page/archive/router";

import Terminal from "@/page/terminal/router";


import Setting from "./setting/router";
import Settings from "./settings/router";

export default [
	
	// Home,															// 主页
	Browser,														// 浏览器
	Video,															// 视频
	File,															// 文件

	
	Download,														// 下载
	Subscribe,														// 订阅
	// Plan,															// 计划
	// Archive,														// 归档

	// Terminal,														// 终端

	// Setting,														// 设置
	Settings,														// 设置

	// { path: '*', redirect: '/home' }
];
