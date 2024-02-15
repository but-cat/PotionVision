import Home from "./home/router";

import Video from "@/page/video/router";
import Plan from "@/page/plan/router";
import File from "@/page/files/router";
import Download from "@/page/download/router";
import Subscribe from "@/page/subscribe/router";
import Browser from "@/page/browser/router";


import Setting from "./setting/router";

export default [
	
	Home,															// 主页
	Video,															// 视频
	File,															// 文件
	Browser,

	// Plan,															// 计划
	// Download,														// 下载
	// Subscribe,														// 订阅

	Setting,														// 设置
];
