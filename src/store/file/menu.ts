import store from '../index';

import FileState from "./state";

export default {
	label: '文件',
	submenu: [
		// ...list,
		{
			label: '打开xml',
			click() {
				const input = document.createElement('input');
				input.type = 'file';
				input.accept = '.xml';
				// input.setAttribute('multiple', 'multiple');
				input.addEventListener('change', function (event: any) {
					const file = event.target.files[0];
					// const reader = new FileReader();
					// reader.onload = (e) => store.c;
					// reader.readAsText(file);
					store.commit('file/addFile', file);
				});
				input.click();
			},
		},


		{
			label: '打开项目',
			click() {
				// const editor = window.editor;
				const input = document.createElement('input');
				input.type = 'file';
				input.setAttribute('multiple', 'multiple');
				input.setAttribute('webkitdirectory', 'webkitdirectory'); // allow
				input.setAttribute('directory', 'directory'); // allow
				input.addEventListener('change', async function (event: any) {
					const fileList = Array.from(event.target.files as FileList).map(file => [file.webkitRelativePath as string, file]);
					console.log('打开项目: ', new Map(fileList as [string, File][]));
					store.commit('file/readFileList', new Map(fileList as [string, File][]));
				});
				input.click();
			},
		},

		{ type: 'separator' },
		{
			label: "新增文件",
			click() {
				const bucket = (store as any).state.file.bucket;
				bucket.dispatchEvent("create-file");
			}
		},
		{
			label: "删除",
			click() {
				// const editor = window.editor;
				// const object = editor.selected;

				// if (object !== null && object.parent !== null) editor.execute(new RemoveObjectCommand(editor, object));
			}
		},

		{ type: 'separator' },

		{
			label: '导出',
			click() {
				
			},
		},


		{ type: 'separator' },
		{
			label: '新建',
			click() {
				// const editor = window.editor;
				if (confirm('这将会丢弃您现在的所有进度!')) location.reload();
			},
		},
	],
};

const link = document.createElement('a');
function save(blob: Blob, filename: string) {
	if (link.href) URL.revokeObjectURL(link.href);

	link.href = URL.createObjectURL(blob);
	link.download = filename || 'data.json';
	link.dispatchEvent(new MouseEvent('click'));
}

function saveArrayBuffer(buffer: ArrayBuffer, filename: string) {
	save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}

function saveString(text: string, filename: string) {
	save(new Blob([text], { type: 'text/plain' }), filename);
}