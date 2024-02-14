/**
 * Defines icon packs that can be toggled.
 */
export enum IconPack {
	Angular = 'angular',
	Nest = 'nest',
	Ngrx = 'angular_ngrx',
	React = 'react',
	Redux = 'react_redux',
	Qwik = 'qwik',
	Vue = 'vue',
	Vuex = 'vue_vuex',
}

import { DefaultIcon } from '../defaultIcon';
import { FileIcon } from './index';

export type FileIcons = {
	/**
	 * Define the default icon for folders.
	 */
	defaultIcon: DefaultIcon;

	/**
	 * Defines all folder icons.
	 */
	icons: FileIcon[];
};
