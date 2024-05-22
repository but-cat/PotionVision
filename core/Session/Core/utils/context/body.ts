// import jsonParse from 'body/json';
// import formParse from 'body/form';

import { net } from "electron";
import _Request from './request';

import qs from 'qs';
import { Readable } from 'node:stream';

import parse from 'co-body';
import upath from 'upath';
import raw from 'raw-body';
import inflate from 'inflation';
import typeis from 'type-is';
// import { getStream } from 'get-stream';
// const getStream = require('get-stream');
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream';
// const {ReadableWebToNodeStream} = require('readable-web-to-node-stream');

import formidable, { errors as formidableErrors } from 'formidable'; // 用于解析表单数据（尤其是文件上传）的 Node.js 模块。

const strictJSONReg = /^[\x20\x09\x0a\x0d]*(\[|\{)/;

const jsonTypes = ['json', 'application/*+json', 'application/csp-report'];
const formTypes = ['urlencoded'];
const textTypes = ['text'];

const uploadDir = upath.join(process.cwd(), '/uploads/'); // 保存上传文件的目录, process.cwd()返回当前的工作目录

export default class Body {
	// static async json(request: Request) {
	// 	const type = request.headers.get('content-type');
	// 	if (type && type.includes('application/json')) {
	// 		return jsonParse(request);
	// 	}
	// 	return request;
	// }

	constructor(public readonly request: Request) {
		// console.log('Body', 'constructor', request);
		// console.log('Body', 'constructor', this.json());
		// (async () => {
		// 	console.log('Body', 'constructor', await this.json());
		// })();
	}

	async json(opts?: any) {
		try {
			const req = this.request;
			opts = clone(opts);

			// defaults
			const len = req.headers['content-length'];
			const encoding = req.headers['content-encoding'] || 'identity';
			if (len && encoding === 'identity') opts.length = ~~len;
			opts.encoding = opts.encoding || 'utf8';
			opts.limit = opts.limit || '1mb';
			const strict = opts.strict !== false;

			// const readableStream = this.request.body;
			// const steam = await getStream(readableStream);
			const readableWebStream = this.request.body;
			if (!readableWebStream) return {};
			const nodeStream = (await new ReadableWebToNodeStream(readableWebStream!)) as unknown as Readable;
			const str = await raw(inflate(nodeStream), opts);
			try {
				const parsed = parse(str);
				return opts.returnRawBody ? { parsed, raw: str } : parsed;
			} catch (err: any) {
				err.status = 400;
				err.body = str;
				throw err;
			}

			function parse(str) {
				if (!strict) return str ? JSON.parse(str) : str;
				// strict mode always return object
				if (!str) return {};
				// strict JSON test
				if (!strictJSONReg.test(str)) {
					throw new SyntaxError('invalid JSON, only supports object and array');
				}
				return JSON.parse(str);
			}
		} catch (error) {
			console.error('Body-parse', 'json: ', error);
		}
	}

	async form(opts?: any) {
		const req = this.request;
		opts = clone(opts);
		const queryString = opts.queryString || {};

		// keep compatibility with qs@4
		if (queryString.allowDots === undefined) queryString.allowDots = true;

		// const form = formidable({});
		// const [ fields, files ] = await form.parse(req);

		// defaults
		const len = req.headers['content-length'];
		const encoding = req.headers['content-encoding'] || 'identity';
		if (len && encoding === 'identity') opts.length = ~~len;
		opts.encoding = opts.encoding || 'utf8';
		opts.limit = opts.limit || '56kb';
		opts.qs = opts.qs || qs;

		const readableWebStream = this.request.body;
		const nodeStream = (await new ReadableWebToNodeStream(readableWebStream!)) as unknown as Readable;

		const str = await raw(inflate(nodeStream), opts);
		try {
			const parsed = opts.qs.parse(str, queryString);
			return opts.returnRawBody ? { parsed, raw: str } : parsed;
		} catch (err: any) {
			err.status = 400;
			err.body = str;
			throw err;
		}
	}

	async file(opts?: any) {
		const req = this.request;
		opts = clone(opts);
		const queryString = opts.queryString || {};

		net.fetch(`http://localhost:${9985}/`, {
			method: req.method,
			headers: req.headers,
			body: req.body,
		});
	}

	async text(opts?: any) {
		const req = this.request;
		opts = clone(opts);

		// defaults
		const len = req.headers['content-length'];
		const encoding = req.headers['content-encoding'] || 'identity';
		if (len && encoding === 'identity') opts.length = ~~len;
		opts.encoding = opts.encoding === undefined ? 'utf8' : opts.encoding;
		opts.limit = opts.limit || '1mb';

		const readableWebStream = this.request.body;
		if (!readableWebStream) return '';
		const nodeStream = (await new ReadableWebToNodeStream(readableWebStream!)) as unknown as Readable;

		const str = await raw(inflate(nodeStream), opts);
		// ensure return the same format with json / form
		return opts.returnRawBody ? { parsed: str, raw: str } : str;
	}

	async any(opts?: any) {
		const req = this.request;
		opts = clone(opts);

		// json
		const jsonType = opts.jsonTypes || jsonTypes;
		if (typeis(req, jsonType)) return this.json(opts);

		// form
		const formType = opts.formTypes || formTypes;
		if (typeis(req, formType)) return this.form(opts);

		// text
		const textType = opts.textTypes || textTypes;
		if (typeis(req, textType)) return this.text(opts);

		// invalid
		const type = req.headers['content-type'] || '';
		const message = type ? 'Unsupported content-type: ' + type : 'Missing content-type';
		const err = new Error(message);
		err.status = 415;
		throw err;
	}
}

function clone(opts) {
	const options = {};
	opts = opts || {};
	for (const key in opts) {
		options[key] = opts[key];
	}
	return options;
}
