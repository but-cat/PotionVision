// const express = require("express");
// const expressWs = require("express-ws");
const pty = require('node-pty');
const os = require('os');

import { IPty } from "node-pty";

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

export default class TerminalSource extends EventTarget {

	static termMap = new Map();

	term: IPty;
	pid: number;

	constructor() {
		super();
		
		//绑定当前系统 node 环境
		const term = pty.spawn(shell, ['--login'], {
			name: 'xterm-color',
			cols: 80,
			rows: 24,
			cwd: process.env.HOME,
			env: process.env,
		});
		TerminalSource.termMap.set(term.pid, term);
		this.pid = term.pid;
		this.term = term;

		
		term.onData((data) => {
			// ws.send(data);
			this.dispatchEvent(new CustomEvent('message', { detail: data }));
		});

	}
	send(data) {
		// this.dispatchEvent(new CustomEvent('message', { detail: data }));
		console.log(typeof data === 'string');
		this.term.write(data);
	}
	close() {
		this.term.kill();
		TerminalSource.termMap.delete(this.pid);
		this.dispatchEvent(new CustomEvent('close'));
	}

};

addEventListener('beforeunload', event => {
	// 取消事件
	event.preventDefault();
	// Chrome 63 及早版本需要 returnValue
	event.returnValue = '';
	// console.log('beforeunload');
	close();
});
