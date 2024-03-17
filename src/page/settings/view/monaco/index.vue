<template>
	<div class="code w-full h-full" ref="codeContent">
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, computed, getCurrentInstance, onMounted, onBeforeUnmount, toRefs } from 'vue';
import { useStore } from 'vuex';
import monokai from "monaco-themes/themes/Monokai.json";															// https://editor.bitwiser.in/
import blackboard from "monaco-themes/themes/Blackboard.json";
// import active4d from 'monaco-themes/themes/Active4D.json';
import active4d from './Active4D.json';
import * as monaco from "monaco-editor";
import "./xml";
const store = useStore();

const codeContent = ref(null as unknown as HTMLDivElement);
let editor: any = null;
// const code = ref("");
// const code = computed(() => '6666');


const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const code = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
});

// const theme = ref("vs-dark");

function initEditor() {
	console.log(codeContent.value);

	// 初始化编辑器，确保dom已经渲染
	monaco.editor.defineTheme('monokai', monokai as any);
	monaco.editor.defineTheme('blackboard', blackboard as any);
	monaco.editor.defineTheme('active4d', active4d as any);
	editor = monaco.editor.create(codeContent.value, {
		value: code.value, //编辑器初始显示代码
		language: "yaml", //语言支持自行查阅demo
		automaticLayout: true, //自动布局
		theme: document.body.classList.contains("dark") ? "blackboard" : "active4d", //官方自带三种主题vs, hc-black, or vs-dark

		model: (window as any).model ? (window as any).model : undefined,
		viewState: (window as any).viewState ? (window as any).viewState : undefined,
	});
	editor.onKeyUp(() => {
		// 当键盘按下，判断当前编辑器文本与已保存的编辑器文本是否一致
		const value = editor.getValue();
		store.commit('code/setCodeString', value);
	});


	store.commit('code/setMonacoEditor', editor);

	if (store.state.code.codeString) editor.setValue(store.state.code.codeString);
	// if(store.state.code.MonacoModel) editor.setModel(toRefs(store.state.code.MonacoModel));
	if (store.state.code.MonacoViewState) editor.restoreViewState(toRefs(store.state.code.MonacoViewState));
	// if((window as any).viewState) editor.restoreViewState((window as any).viewState);
	// if((window as any).model) editor.setModel((window as any).model);
}

function getValue() {
	editor.getValue(); //获取编辑器中的文本
}
function setValue(data: string) {
	editor.setValue(data); // 设置编辑器中的文本
}

onMounted(() => {
	initEditor();
	// console.log('onMounted', toRefs(store.state.code.MonacoModel));

	const observer = new MutationObserver(() => {
		// monaco.editor.setTheme('monokai');
		if (document.body.classList.contains("dark")) monaco.editor.setTheme('blackboard');
		else monaco.editor.setTheme('active4d');
	});

	observer.observe(document.body, {
		attributes: true,
		attributeFilter: ['class'],
	});


	// self.monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
	// 	console.log('SAVE pressed!')
	// })

	editor.onDidChangeModelContent(() => {
		let codeStr = editor.getValue() // 获取编辑器中的语句
		// console.log(codeStr);
		code.value = codeStr;
	})
});


onBeforeUnmount(() => {
	// https://stackoverflow.com/questions/48210120/get-restore-monaco-editor-undoredo-stack/49189282#49189282
	const model = editor.getModel();
	const viewState = editor.saveViewState();
	const value = editor.getValue();

	// store.commit('code/setMonacoModel', model);
	// store.commit('code/setMonacoViewState', viewState);
	store.commit('code/setCodeString', value);
	store.commit('code/setMonacoViewState', viewState);




	(window as any).viewState = viewState;
	(window as any).model = model;


	// editor.dispose();
});
</script>

<style lang="less" scoped>
.code {
	// width: 100%;
	// height: 100%;
	flex: 1;
	overflow: hidden;
	color: white;
}
</style>