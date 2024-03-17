import * as monaco from 'monaco-editor';

// monaco.languages.registerCompletionItemProvider('xml', {
// 	triggerCharacters: ['>'],
// 	provideCompletionItems: (model, position) => {
// 		const codePre = model.getValueInRange({
// 			startLineNumber: position.lineNumber,
// 			startColumn: 1,
// 			endLineNumber: position.lineNumber,
// 			endColumn: position.column,
// 		});

// 		const tag = codePre.match(/.*<(\w+)>$/)?.[1];

// 		if (!tag) {
// 			return;
// 		}

// 		const word = model.getWordUntilPosition(position);

//         console.log('word: ', word);

// 		return {
// 			suggestions: [
// 				{
// 					label: `</${tag}>`,                                                                 // 提示名称
// 					kind: monaco.languages.CompletionItemKind.EnumMember,
// 					insertText: `$1</${tag}>`,                                                          // 选择后展示到编辑器中的文字
//                     detail: '结束标签',                                                                 // 提示详情
// 					insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
// 					range: {
// 						startLineNumber: position.lineNumber,
// 						endLineNumber: position.lineNumber,
// 						startColumn: word.startColumn,
// 						endColumn: word.endColumn,
// 					},
// 				},

//                 {
// 					label: `</ITEMS>`,
// 					kind: monaco.languages.CompletionItemKind.EnumMember,
//                     detail: '结束标签',
// 					insertText: `$1</ITEMS>`,
// 					// insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
// 					// range: {
// 					// 	startLineNumber: position.lineNumber,
// 					// 	endLineNumber: position.lineNumber,
// 					// 	startColumn: word.startColumn,
// 					// 	endColumn: word.endColumn,
// 					// },
// 				},
// 			],
// 			//dispose() {
// 			//  const line = pos.lineNumber
// 			//  const column = pos.column
// 			//  if(model.getValueInRange(new monaco.Range(line, column - 1, line, column)) !== "/") {
// 			//    return
// 			//  }
// 			//  editor.executeEdits("", [
// 			//    {
// 			//      range: new monaco.Range(line, column - 1, line, column),
// 			//      text: null
// 			//    }
// 			//  ])
// 		};
// 	},
// });

monaco.languages.registerCompletionItemProvider('xml', {
	triggerCharacters: ['S'],
	provideCompletionItems(model, position) {
		return {
			suggestions: [
				{
					label: 'query("")',
					insertText: 'query("")',
                    detail: '结束标签',
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range: {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: 1,
                        endColumn: position.column,
                    },
				},
			],
		};
	},
});
