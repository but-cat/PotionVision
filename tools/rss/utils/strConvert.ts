/**
 * 短横线转驼峰
 * @param { string } str 输入字符串
 * @returns { string } 输出字符串
 */
 export function toCamel(str: string): string {
	//  console.log(str);
	 
	return str.replace(/([^-])(?:-+([^-]))/g, function ($0, $1, $2) {
		return $1 + $2.toUpperCase();
	});
}

/**
 * 驼峰式转短横线
 * @param { string } str 输入字符串
 * @returns { string } 输出字符串
 */
 export function toLowerLine(str: string): string {
	var temp = str.replace(/[A-Z]/g, function (match) {	
		return "-" + match.toLowerCase();
	});
	if(temp.slice(0,1) === '-') temp = temp.slice(1); //如果首字母是大写，执行replace时会多一个_，这里需要去掉
	return temp;
}

export function colorRgb(color: string) {
	if (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color)) {									// 检测是否符合16进制颜色值的规则
		if(color.length === 4) color = [...color].reduce((str, item) => str += item+item);	// 如果只有三位的值，需补齐为六位，如：#fff => #ffffff

		var colorChange = [];																// 处理六位的颜色值，转为RGB
		for (let i = 1; i < 7; i += 2) {
			colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
		}
		return colorChange.map(num => num/255);
	} else {
		throw "错误的参数";
	}
}


export function getUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}