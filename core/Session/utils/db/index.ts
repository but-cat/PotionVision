import { Level } from 'level'


export default class LowDB extends Level {


	constructor(public readonly path: string) {
		super(path);
	}


}