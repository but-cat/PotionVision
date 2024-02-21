import { ref, toRefs, computed, watch, onMounted, getCurrentInstance } from 'vue';
import NPlayer from 'nplayer';
import Danmaku, { DanmakuPluginOption } from '@nplayer/danmaku';
import { BulletOption } from '@nplayer/danmaku/src/ts/danmaku/bullet';

export default class VideoItem {


	static generateUUID() {
		let d = new Date().getTime();
		if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
			d += performance.now(); //use high-precision timer if available
		}
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}



	readonly uuid: string = VideoItem.generateUUID();


	
	danmaku = ref<{
		text: string;
		time: number;
		color: string;
		type: 'top' | 'bottom' | 'scroll'
	}[]>([]);

	name: string;
	component: any;


	src: string;

	state: {
		title: string;
		favicon: string;
		playing: boolean;
		loading: boolean;
		ended: boolean;
		controls: boolean;
		volume: number;
		muted: boolean;
		playbackRate: number;
		seeking: boolean;
		seekable: number;
		duration: number;
		currentTime: number;
		readyState: number;
		networkState: number;
		videoWidth: number;
		videoHeight: number;
		autoplay: boolean;
		loop: boolean;
		poster: string;
		src: string;
	};





	constructor(readonly url: string) {
		this.uuid = VideoItem.generateUUID();
		this.src = url;
		this.state = {
			title: "",
			favicon: "",
			playing: false,
			loading: false,
			ended: false,
			controls: true,
			volume: 1,
			muted: false,
			playbackRate: 1,
			seeking: false,
			seekable: 0,
			duration: 0,
			currentTime: 0,
			readyState: 0,
			networkState: 0,
			videoWidth: 0,
			videoHeight: 0,
			autoplay: false,
			loop: false,
			poster: "",
			src: ""
		}
	}



	async init() {
		const res = await fetch(this.url, {
			method: 'INFO',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const fileInfo = await res.json();
	}


	async danmakuParse() {
		const { url, danmaku } = this.component;

		try {
			const danmakuUrl = danmaku.value ? danmaku.value : url.value.replace(/\.\w+$/, '.xml');
			console.log('danmakuUrl', danmakuUrl);
			
			const res = await fetch(danmakuUrl);
			if (!res.ok) return;
			const parser = new DOMParser();
			const danmakuXml = parser.parseFromString(await res.text(),"text/xml");
	
			// const el = danmakuXml.querySelector('d');
			// console.log(el, el!.getAttribute('p')?.split(','));
			const danmakuList: BulletOption[] = [];
	
			danmakuXml.querySelectorAll('d').forEach(el => {
				const p = el.getAttribute('p')?.split(',') as string[];
				danmakuList.push({
					text: el.innerHTML,
					time: Number(p[0]),
					color: `#${Number(p[6]).toString(16).padStart(6, '0')}`,
					type: ['', 'scroll', '', '', '', 'top', 'bottom'][Number(p[1])] as 'top' | 'bottom' | 'scroll',
				});
			});
	
			// const danmakuXmlD = danmakuXml.querySelectorAll('d');
			// for (let i = 0; i < danmakuXmlD.length; i++) {
			// 	const el = danmakuXml[i];
			// 	const p = el.getAttribute('p')?.split(',') as string[];
			// 	danmakuList.push({
			// 		text: el.innerHTML,
			// 		time: Number(p[0]),
			// 		color: `#${Number(p[6]).toString(16).padStart(6, '0')}`,
			// 		type: ['', 'scroll', '', '', '', 'top', 'bottom'][Number(p[1])] as 'top' | 'bottom' | 'scroll',
			// 	});
			// }
	
			danmakuList.sort((a, b) => a.time - b.time);
	
			// player.danmaku.resetItems(danmakuList);
		} catch (error) {
			// console.log(error);
		}
	
		// return danmakuList;
	}
}