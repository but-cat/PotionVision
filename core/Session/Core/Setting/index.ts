import { Router, Applet, useRouter, useGet } from '@/Session/utils/router/index';
import packageConfig from '@root/package.json';
import Prototype, { on, once } from '@/Session/utils/prototype';
import Session from '@/Session/index';

import upath from 'upath';
import { join } from 'path';
import History from './history';

export default class Setting extends Prototype {



	get projectDB() {
		const projectPath = this.session.path;
		return upath.join(projectPath, `.${packageConfig.name}/download_db.json`);
	}

	constructor(public readonly session: Session) {
		super(session, [History]);
	}
}

