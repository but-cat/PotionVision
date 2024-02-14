
<script lang="ts">
import { ref, h, computed, defineComponent, Plugin, watch } from 'vue';
import hljs from 'highlight.js/lib/core';
// import javascript from 'highlight.js/lib/languages/javascript';
// import glsl from 'highlight.js/lib/languages/glsl';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import json from 'highlight.js/lib/languages/json';
// import 'highlight.js/styles/github.css';
import "highlight.js/styles/codepen-embed.css";
import { escapeHtml } from './utils';

import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";

// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('glsl', glsl);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('json', json);

export default defineComponent({
	props: {
		code: {
			type: String,
			required: true,
		},
		language: {
			type: String,
			default: '',
		},
		autodetect: {
			type: Boolean,
			default: false,
		},
		ignoreIllegals: {
			type: Boolean,
			default: true,
		},
	},
	setup(props) {
		const language = ref(props.language);
		watch(() => props.language, (newLanguage) => {
			language.value = newLanguage;
		});

		// (window as any).hljs = hljs;

		const autodetect = computed(() => props.autodetect && !language.value);
		const cannotDetectLanguage = computed(() => !autodetect.value && !hljs.getLanguage(language.value));

		const className = computed((): string => {
			if (cannotDetectLanguage.value) return '';
			else return `hljs ${language.value}`;
		});


		const codeStr = ref("");
		watch(() => props.code, (code) => {
			console.log("code", code, language.value);
			
			switch (language.value) {
				case "xml":
				case "html":
					prettier.format(code, {
						parser: "html",
						plugins: [parserHtml],
						bracketSameLine: true,
						useTabs: true,
						tabWidth: 4,
						// printWidth: 960,
						printWidth: 80,
					}).then((formatted) => codeStr.value = formatted).catch((err) => codeStr.value = err);
					break;
			
				default:
					codeStr.value = code;
					break;
			}

			
		}, { immediate: true });

		const highlightedCode = computed((): string => {
			// console.log("formatted.code", codeStr.value);

			// No idea what language to use, return raw code
			if (cannotDetectLanguage.value) {
				console.warn(`The language "${language.value}" you specified could not be found.`);
				return escapeHtml(codeStr.value);
			}

			if (autodetect.value) {
				const result = hljs.highlightAuto(codeStr.value);
				language.value = result.language ?? '';
				return result.value;
			} else {
				const result = hljs.highlight(codeStr.value, {
					language: language.value,
					ignoreIllegals: props.ignoreIllegals,
				});
				return result.value;
			}
		});

		return {
			className,
			highlightedCode,
		};
	},
	render() {
		return h('pre', { style: { flex: 1, overflow: 'auto' }, class: "code-preview" }, [
			h('code', {
				class: this.className,
				innerHTML: this.highlightedCode,
				tabindex: '0',
				style: { minHeight: '100%', flex: 1 },
			}),
		]);
	},
});

</script>

<style lang="less" scoped>
.code-preview {
	// background-image:
	// 	linear-gradient(45deg, currentColor 25%, transparent 0, transparent 75%, currentColor 0),
	// 	linear-gradient(45deg, currentColor 25%, transparent 0, transparent 75%, currentColor 0);
	// background-position: 0 0, 10px 10px;
	// background-size: 20px 20px;


	:deep(.hljs) {
		background-color: transparent;
	}
}
</style>