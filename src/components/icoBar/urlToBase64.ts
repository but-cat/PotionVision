const CacheMap = new Map<string, string>();

const defaultOptions = {
    width: 0,
    height: 0,
    type: 'image/png',
    quality: 1,
};



interface Options {
    width?: number;
    height?: number;
    type?: string;
    quality?: number;
}

export function url2Base64(url, option: Options = defaultOptions): Promise<string> {
    if (CacheMap.has(url)) {
        return Promise.resolve(CacheMap.get(url)!);
    }
    
	return new Promise((resolve, reject) => {
		const img = new Image();
		const canvas = document.createElement('canvas');
		img.crossOrigin = '*';
		img.onload = function () {
			const width = option.width || img.width,
				height = option.height || img.height;
			canvas.width = width;
			canvas.height = height;

			const ctx = canvas.getContext('2d')!;
			ctx.fillStyle = 'white';
			// ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, width, height);
			const base64 = canvas.toDataURL(option.type ?? defaultOptions.type);

            CacheMap.set(url, base64);
			resolve(base64);
		};
		img.onerror = function () {
			reject(new Error('message'));
		};
		img.src = url;
	});
}
