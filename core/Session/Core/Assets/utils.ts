

export function sortLikeWin(fieldName = 'name', v1, v2) {
    if(!v1.isDirectory && v2.isDirectory) return 1;
    if(v1.isDirectory && !v2.isDirectory) return -1;

    let a = v1[fieldName];
    let b = v2[fieldName];
    let reg = /[0-9]+/g;
    let lista = a.match(reg);
    let listb = b.match(reg);
    if (!lista || !listb) return a.localeCompare(b);


    
    for (let i = 0, minLen = Math.min(lista.length, listb.length); i < minLen; i++) {
        //数字所在位置序号
        let indexa = a.indexOf(lista[i]);
        let indexb = b.indexOf(listb[i]);
        //数字前面的前缀
        let prefixa = a.substring(0, indexa);
        let prefixb = b.substring(0, indexb);
        //数字的string
        let stra = lista[i];
        let strb = listb[i];
        //数字的值
        let numa = parseInt(stra);
        let numb = parseInt(strb);
        //如果数字的序号不等或前缀不等，属于前缀不同的情况，直接比较
        if (indexa != indexb || prefixa != prefixb) {
            return a.localeCompare(b);
        } else {
            //数字的string全等
            if (stra === strb) {
                //如果是最后一个数字，比较数字的后缀
                if (i == minLen - 1) {
                    return a.substring(indexa).localeCompare(b.substring(indexb));
                }
                //如果不是最后一个数字，则循环跳转到下一个数字，并去掉前面相同的部分
                else {
                    a = a.substring(indexa + stra.length);
                    b = b.substring(indexa + stra.length);
                }
            }
            //如果数字的string不全等，但值相等
            else if (numa == numb) {
                //直接比较数字前缀0的个数，多的更小
                return strb.lastIndexOf(numb + '') - stra.lastIndexOf(numa + '');
            } else {
                //如果数字不等，直接比较数字大小
                return numa - numb;
            }
        }
    }
}