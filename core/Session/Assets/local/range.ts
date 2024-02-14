import fs from 'fs';
import path from 'upath';

import { fileTypeFromBuffer, fileTypeFromFile, fileTypeFromStream } from 'file-type';
import mime from 'mime';

export function parseByteRange(req: Request, stat: fs.Stats) {
	const byteRange = {
		from: 0,
		to: 0,
		valid: false,
	};

    
    let rangeHeader: string | string[] = req.headers.get('range')!;
	const flavor = 'bytes=';

    console.log('parseByteRange', rangeHeader);

	if (rangeHeader) {
		if (rangeHeader.startsWith(flavor) && !rangeHeader.includes(',')) {
			/* 解析 */
			rangeHeader = rangeHeader.substr(flavor.length).split('-');
			byteRange.from = parseInt(rangeHeader[0]);
			byteRange.to = parseInt(rangeHeader[1]);

			/* 用绝对值替换差分请求的空字段 */
			if (isNaN(byteRange.from) && !isNaN(byteRange.to)) {
				byteRange.from = stat.size - byteRange.to;
				byteRange.to = stat.size ? stat.size - 1 : 0;
			} else if (!isNaN(byteRange.from) && isNaN(byteRange.to)) {
				byteRange.to = stat.size ? stat.size - 1 : 0;
			}

			/* 常规字节范围验证 */
			if (!isNaN(byteRange.from) && !isNaN(byteRange.to) && 0 <= byteRange.from && byteRange.from <= byteRange.to) {
				byteRange.valid = true;
			} else {
				console.warn('Request contains invalid range header: ', rangeHeader);
			}
		} else {
			console.warn('Request contains unsupported range header: ', rangeHeader);
		}
	}
	return byteRange;
}

export async function createResponse(req: Request, filePath: string) {
	const stat = await fs.promises.stat(filePath);

	const mtime = Date.parse(String(stat.mtime)),
		headers = {},
		byteRange = parseByteRange(req, stat);

	let status = 200,
        startByte = 0,
		length = stat.size;

	/* 处理字节范围 */
	if (byteRange.valid) {
		if (byteRange.to < length) {
			// Note: HTTP Range param is inclusive
			startByte = byteRange.from;
			length = byteRange.to - byteRange.from + 1;
			status = 206;

			// 设置内容范围响应标头（我们在此处公布服务器上的初始资源大小（stat.size））
			headers['Content-Range'] = 'bytes ' + byteRange.from + '-' + byteRange.to + '/' + stat.size;
		} else {
			byteRange.valid = false;
			console.warn('Range request exceeds file boundaries, goes until byte no', byteRange.to, 'against file size of', length, 'bytes');
		}
	}

	/* 检查未处理的字节范围标头 */
	if (!byteRange.valid && req.headers.get('range')) {
		console.error(new Error('Range request present but invalid, might serve whole file instead'));
	}

	const [_extension, extension] = filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ?? [];

    const stream = fs.createReadStream(filePath, {
		flags: 'r',
		mode: 0o666,
		start: startByte,
		end: startByte + (length ? length - 1 : 0),
	});

	const fileType = await fileTypeFromFile(filePath);
	const mimeValue = fileType ? fileType.mime : mime.getType(extension) ?? 'application/octet-stream';

	headers['content-type'] = mimeValue;

    headers['Etag'] = JSON.stringify([stat.ino, stat.size, mtime].join('-'));
    headers['Date'] = new Date().toUTCString();
    headers['Last-Modified'] = new Date(stat.mtime).toUTCString();
    headers['Content-Length'] = length;

	return new Response(stream as unknown as ReadableStream, {
		status,
		headers,
	});
}