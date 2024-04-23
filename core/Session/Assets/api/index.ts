import { dialog } from 'electron';
import { Router, Applet, useRouter, useGet } from '../../../Session/utils/router/index';
import packageConfig from '@root/package.json';
import Prototype from '../../../Session/utils/prototype';
import Session from '../../../Session/index';

import upath from 'upath';
import { join } from 'path';
import History from './history';

import AssetsLocal from '../local/index';
import Assets from "../index";

// @useRouter
export default class Download extends Prototype {
	get projectDownloadDB() {
		const projectPath = this.session.path;
		return upath.join(projectPath, `.${packageConfig.name}/download_db.json`);
	}

	static hashCode(data: string) {
		let hash = 0;
		let i;
		let chr;

		if (data.length === 0) return hash;
		for (i = 0; i < data.length; i++) {
			chr = data.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return (hash <= 0 ? 'F' : '') + Math.abs(hash).toString(16);
	}
	

	constructor(public readonly session: Session, public readonly assets: Assets) {
		super(session, [History]);

		// session.session.on('will-download', this.willDownload.bind(this));
	}

	async addBasePath(_path: string) {

		const projectDirectory = await dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory', 'promptToCreate', 'dontAddToRecent'] });
		if (projectDirectory.canceled) return;
		const path = projectDirectory.filePaths[0];

		const hash = Download.hashCode(path);

		if([...this.assets.keys()].find((key) => key.toString() === new RegExp(`^assets:\/\/${hash}.local`).toString())) return;


		class MarkAssetsLocal extends AssetsLocal {
			static name = new RegExp(`^assets:\/\/${hash}.local`);
			readonly basePath = path;
			static readonly baseUrl = `assets://${hash}.local`;
		}

		this.assets.set(new RegExp(`^assets:\/\/${hash}.local`), MarkAssetsLocal);
	}
}
