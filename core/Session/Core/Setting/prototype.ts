import { Applet, useRouter, useGet, get, usePost } from '../../../Session/utils/router/index';
import Context, { Authority } from '../../../Session/utils/context/index';
import packageConfig from '@root/package.json';
import SettingRouter from './index';
import Apps from '../../../apps';
import yaml from "js-yaml";

import fs from 'node:fs/promises';
import { join } from 'upath';

// @useRouter
export default class extends Applet {
	public get route() {
		return super.router as unknown as SettingRouter;
	}

    public get Apps() {
        return this.context.session.Apps as Apps;
    }

    async fetch(url: string, option?: {
        method?: string,
        body?: any,

        headers?: {
            [key: string]: string,
        },

        bypassCustomProtocolHandlers?: boolean
    }) {
        const { session, domain, scheme } = this.context;
        return session.session.fetch(url, option);
    }
}