import packageConfig from '@root/package.json';
import { app, dialog, session } from "electron";
import path, { resolve, join } from "path";
import upath from "upath";

// const scheme = packageConfig.name;

const scheme = 'apps';
const partition = `persist:${scheme}`;
// const AppAssetsPath = upath.normalize(app.isPackaged ? join(app.getAppPath().replace(/\/[^\/]+$/, "/"), scheme) : resolve(app.getAppPath(), scheme));
// const AppAssetsPath = upath.normalize(app.isPackaged ? join(app.getPath('appData'), app.name, scheme) : resolve(app.getAppPath(), scheme));
const AppAssetsPath = upath.normalize(join(app.getPath('appData'), app.name, scheme));

export {
	scheme,
	partition,
	AppAssetsPath,
}