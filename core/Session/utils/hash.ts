import bs58 from 'bs58';

// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/

/**
 * 根据字符串生成 hash
 * @param { string } str 
 * @returns 
 */
export function hashString(str: string): string {
	let hash = 0,
		i,
		chr;
	if (str.length === 0) return bs58.encode(Buffer.from(String(hash)));
	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	// return hash;
	return bs58.encode(Buffer.from(String(hash)));
}
