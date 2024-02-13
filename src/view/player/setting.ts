import NPlayer, {} from 'nplayer';
import Danmaku, { DanmakuPluginOption } from '@nplayer/danmaku';

export const speedSettingItem = {
	html: '播放速度',
	type: 'select',
	value: 1,
	options: [
		{ value: 0.25, html: '0.25' },
		{ value: 0.5, html: '0.5' },
		{ value: 1, html: '正常' },
		{ value: 1.5, html: '1.5' },
		{ value: 2, html: '2' },
	],
	init(player: NPlayer) {
		player.playbackRate = 1;
	},
	change(value: number, player: NPlayer) {
		this.value = player.playbackRate = value;
	},
};




export const areaDanmaku = {
	html: '弹幕显示区域',
	type: 'select',
	value: 0.5,
	options: [
		{ value: 0.25, html: '四分之一' },
		{ value: 0.5, html: '半屏' },
        { value: 0.75, html: '四分之三' },
		{ value: 1, html: '全屏' },
	],
	init(player: NPlayer) {
        player.danmaku.updateArea(this.value as 0.25 | 0.5 | 0.75 | 1);
        
	},
	change(value: 0.25 | 0.5 | 0.75 | 1, player: NPlayer) {
        player.danmaku.updateArea(value);
        this.value = value;
	},
};



export const opacityDanmaku = {
	html: '弹幕透明度',
	type: 'select',
	value: 0.75,
	options: [
		{ value: 0.25, html: '四分之一' },
		{ value: 0.5, html: '二分之一' },
        { value: 0.75, html: '四分之三' },
		{ value: 1, html: '不透明' },
	],
	init(player: NPlayer) {
        player.danmaku.updateOpacity(this.value as 0.25 | 0.5 | 0.75 | 1);
        
	},
	change(value: 0.25 | 0.5 | 0.75 | 1, player: NPlayer) {
        player.danmaku.updateOpacity(value);
        this.value = value;
	},
};





