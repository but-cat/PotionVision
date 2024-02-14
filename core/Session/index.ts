import { app, session, dialog, CustomScheme, protocol } from 'electron';
import packageConfig from '@root/package.json';
import { EventEmitter } from 'node:events';
import fs from 'node:fs';

// import { join } from 'path';
import upath, { join } from 'upath';

import Apps from '@/apps';
// import DefaultSession from "./defaultSession";
import Assets from './Assets/index';
// import Model from "./Model/index";
// import Tools from './Tools/index';
import Core from './Core/index';
// import Download from './Download/index';

// import FileSystem from '../utils/fs/index';

// import FtpSystem from './utils/ftp/index';
import createUUID from '../utils/uuid';


import { hashString } from "./utils/hash";

export default class Session extends EventEmitter {
	// public app.getPath('userData')

	// static defaultSession: DefaultSession;

	public readonly session: Electron.Session;																							// 持久会话
	public readonly temporary: Electron.Session;																						// 临时会话
	public get tempPartition() {
		return `${hashString(this.sessionPath)}`;
	}


	public readonly uuid: string = createUUID();

	public readonly Assets: Assets;
	// public readonly Model: Model;
	// public readonly Tools: Tools;
	public readonly Core: Core;
	// public readonly Download: Download;

	// public readonly fs: FileSystem;

	// public readonly ftp: FtpSystem;

	get sessionPath() {
		return join(this.path, `.${packageConfig.name}`);
	}

	get sessionToolsPath() {
		return join(this.path, `.${packageConfig.name}/tools`);
	}

	get sessionToolsConfigPath() {
		return join(this.path, `.${packageConfig.name}/config`);
	}

	get bookmarkPath() {
		return join(this.path, `.${packageConfig.name}/bookmark`);
	}

	constructor(
		public readonly path: string,
		public readonly Apps: Apps,
	) {
		super();
		this.path = upath.normalize(path);

		// if (!this.path) return;

		// lasting: true, // 是否持久化
		this.session = session.fromPath(this.sessionPath, { cache: true });																// 持久会话
		this.temporary = session.fromPartition(`${hashString(this.sessionPath)}`, { cache: false });									// 临时会话
		// console.log('启用新会话分区 - constructor', this.sessionPath, this.tempPartition);
		
		this.Assets = new Assets(this);
		this.Core = new Core(this);
		this.init();
	}

	/**
	 * 初始化
	 */
	init() {
		// const sessionPath = join(this.path, `.${packageConfig.name}`);
		console.log('Session', 'init', this.path, this.sessionPath);

		try {
			fs.accessSync(this.sessionPath);
		} catch (error) {
			// fs.mkdirSync(this.sessionPath, { recursive: true });
			// fs.mkdirSync(this.sessionToolsPath, { recursive: true });
			// fs.mkdirSync(this.sessionToolsConfigPath, { recursive: true });
			// fs.mkdirSync(this.bookmarkPath, { recursive: true });
		}

		const dirList = [this.sessionPath, this.sessionToolsPath, this.sessionToolsConfigPath, this.bookmarkPath];

		dirList.forEach(path =>
			fs.promises.access(path).catch(() => {
				fs.promises.mkdir(path, { recursive: true });
			}),
		);
	}

	/**
	 * 保存cookie
	 * @param name  cookie名称
	 * @param value cookie值
	 */
	async loadExtension(name: string) {
		try {
			// await this.session.loadExtension(join('./extensions', name), { allowFileAccess: true });
			const extensionPath = join(this.path, './extensions', name); // "/Users/butcat/Desktop/session_test/extensions/jsonview"
			console.log(`安装${name}:`, extensionPath);

			await this.session.loadExtension(extensionPath, { allowFileAccess: true });
			// await this.session.loadExtension("/Users/butcat/Desktop/session_test/extensions/jsonview", { allowFileAccess: true });
		} catch (e: any) {
			console.error(`安装${name}:`, e.toString(), join(this.path, './extensions', name));
		}
	}
}

protocol.registerSchemesAsPrivileged(
	[Core, Assets].map(item => ({
		scheme: item.scheme,
		privileges: item.privileges,
	})) as CustomScheme[],
);
