import { ipcMain } from 'electron';
import { join } from 'upath';
import { EventEmitter } from 'node:events';
const { exec } = require('child_process');
// const express = require("express");
// const expressWs = require("express-ws");
const pty = require('node-pty');
const os = require('os');

// import { IPty } from 'node-pty';
import type {IPty, IWindowsPtyForkOptions, spawn as npSpawn} from 'node-pty';
import CorePage from './index';

// const shell = os.platform() === 'win32' ? 'powershell.exe' : 'zsh';

// const shell = CorePage.isMac ? 'zsh' : 'powershell.exe';

// let spawn: typeof npSpawn;

export default class TerminalSource extends EventEmitter {
	public static get isMac() {
		return process.platform === 'darwin';
	}

	get uuid() {
		return this.view.uuid;
	}

	static termMap = new Map();

	term: IPty;
	pid: number;

	private isKill = false;

	constructor(public readonly view: CorePage) {
		super();

		const { session } = view;


		const workerPath = session.path;
		// const BASE_PATH = view.WorkFile.replace(/^([a-zA-z]+?:\/\/[^\/]+)?\/?/, '');



		// console.log('TerminalSource', process.env.HOME, process.env);

		const termOptions: IWindowsPtyForkOptions = {
			name: 'xterm-color',
			cols: 300,
			rows: 48,
			cwd: join(workerPath),
			env: process.env,

			useConpty: !TerminalSource.isMac,
		};

		//绑定当前系统 node 环境
		const term = TerminalSource.isMac ? pty.spawn('zsh', ['-l'], termOptions) : pty.spawn('cmd.exe', [''], termOptions);

		
		this.pid = term.pid;
		this.term = term;

		term.onData(this.send.bind(this));

		const view_terminal_send = this.write.bind(this);
		const view_terminal_close = this.close.bind(this);
		const view_terminal_resize = this.resize.bind(this);

		ipcMain.on(`view-terminal-send:${this.uuid}`, view_terminal_send);
		ipcMain.on(`view-terminal-close:${this.uuid}`, view_terminal_close);
		ipcMain.on(`view-terminal-resize:${this.uuid}`, view_terminal_resize);

		this.once('close', () => {
			ipcMain.off(`view-terminal-send:${this.uuid}`, view_terminal_send);
			ipcMain.off(`view-terminal-close:${this.uuid}`, view_terminal_close);
			ipcMain.off(`view-terminal-resize:${this.uuid}`, view_terminal_resize);
		});


		// setTimeout(() => {
		// 	// this.term.write('ls\n');
		// 	this.term.write(`${aria2c} --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all\n`);
		// }, 100);
	}


	resize(event: any, data: { cols: number; rows: number; }) {
		try {
			if (this.isKill) throw new Error('进程已关闭');
			this.term.resize(data.cols, data.rows);
		} catch (error: any) {
			console.error(`term:${this.term.pid} resize err`, error.message);
		}
	}


	/**
	 * 写入数据
	 * @param event 
	 * @param data 
	 */
	write(event: any, data: string) {
		try {
			if (this.isKill) throw new Error('进程已关闭');
			this.term.write(data);
		} catch (error: any) {
			console.error(`term:${this.term.pid} write err`, error.message);
		}
	}


	/**
	 * 发送数据
	 * @param data 
	 */
	send(data) {
		try {
			if (this.isKill) throw new Error('进程已关闭');
			if (this.view?.webContents?.isDestroyed()) return;
			this.view?.webContents?.send(`view-terminal-message:${this.uuid}`, data);
		} catch (error) {
			console.error('TerminalSource', 'send', error);
		}
	}

	/**
	 * SIGINT
	 * 产生方式: 键盘Ctrl+C
	 * 产生结果: 只对当前前台进程,和他的所在的进程组的每个进程都发送SIGINT信号,之后这些进程会执行信号处理程序再终止.
	 * SIGTERM
	 * 产生方式: 和任何控制字符无关,用kill函数发送
	 * 本质: 相当于shell> kill不加-9时 pid.
	 * 产生结果: 当前进程会收到信号,而其子进程不会收到.如果当前进程被kill(即收到SIGTERM),则其子进程的父进程将为init,即pid为1的进程.
	 * 与SIGKILL的不同: SIGTERM可以被阻塞,忽略,捕获,也就是说可以进行信号处理程序,那么这样就可以让进程很好的终止,允许清理和关闭文件.
	 * SIGKILL
	 * 产生方式: 和任何控制字符无关,用kill函数发送
	 * 本质: 相当于shell> kill -9 pid.
	 * 产生结果: 当前进程收到该信号,注意该信号时无法被捕获的,也就是说进程无法执行信号处理程序,会直接发送默认行为,也就是直接退出.这也就是为何kill -9 pid一定能杀死程序的原因. 故这也造成了进程被结束前无法清理或者关闭资源等行为,这样时不好的.
	 */
	close() {
		// this.dispatchEvent(new CustomEvent('close'));

		try {
			this.isKill = true;
			this.emit('close');

			if (TerminalSource.isMac) {
				this.term.kill();
				// this.term.kill('SIGKILL');
				TerminalSource.termMap.delete(this.pid);
			} else {
				// this.term.write('\u0003');// 模拟 Ctrl + C 退出

				// setTimeout(() => {
				// 	process.kill(this.term.pid, 'SIGKILL');
				// }, 1000);

				this.term.kill();												// 退出当前进程 将使用 SIGHUP(终端线路挂断) 信号,但windows不支持
				// this.term.kill('SIGINT');
				// this.term.kill('SIGTERM');
				// this.term.kill('SIGKILL');

				TerminalSource.termMap.delete(this.pid);
			}




		} catch (error: any) {
			console.error(`term:${this.term.pid} kill`, error.message);
		}
	}
}
