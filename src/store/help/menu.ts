import Vue from 'vue';
import store from '../index';

export default {
	label: '帮助',
	submenu: [
		// ...list,
		{
			label: '官网',
			click() {
				// console.log("切换配色");
				// store.commit('view/setDark');
				alert('木有～');
			},
		},
		{
			label: '文档',
			click() {
				// console.log("切换配色");
				// store.commit('view/setDark');
			},
		},
		{
			label: '快捷操作',
			click() {
				// console.log("切换配色");
				// store.commit('view/setDark');
				alert('木有～');
			},
		},
		{ type: 'separator' },
		{
			label: '反馈',
			click() {
				let index = 0;
				const message = ['憋着！', '就憋一会儿嘛，甭太执着了好不好', '往好处想，咱还有桃儿可以撅呢！', `( σ'ω')σ 桃儿还等着你呢～`, '桃子：(¦3[___]', '桃子：(:3[___]', '桃子：_(:з」∠)_', '桃子：_(:D」∠ ✼ )_', '桃子：_( ✼ √ ζ ε:)_', '_(:D」∠ ✼ )_  (´･д(´･д･｀)д･｀)д･｀)д･｀)̣ <- 想撅桃的群友们'];
				const messageIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse();
				+(function openConfirm(i) {
					index = messageIndex.find((v) => i > v) ?? 0;
					if (confirm(message[index] ?? '你是否要撅桃？不想我就多问几遍~')) return;
					else openConfirm(i + 1);
				})(0);
			},
		},
		{
			label: 'QQ交流群',
			click() {
				// console.log("切换配色");
				// store.commit('view/setDark');
			},
		},
		{ type: 'separator' },
		{
			label: '关于',
			click() {
				// console.log("切换配色");
				// store.commit('view/setDark');
			},
		},
	],
};
