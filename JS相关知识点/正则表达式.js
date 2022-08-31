//  RegExp
//1. test
const reg1 = new RegExp(/\d{5}/); //匹配五个数字
console.log(reg1.test("abcd12345")); //true

//2. exec
// exec 方法受参数 g 的影响。若指定了 g，则下次调用 exec 时，会从上个匹配的 lastIndex 开始查找。

const reg2 = new RegExp("abc"); // /abc/
//[ 'abc', index: 1, input: '2abc7,safdabc8', groups: undefined ]
console.log(reg2.exec("2abc7,safdabc8"));

const reg3 = /(\d{4})[-](\d{2})[-](\d{2})/;
let reg3Array = reg3.exec("2021-02-22");
// console.log(RegExp.$1); //2021 弃用$1
// ['2021-02-22','2021','02','22',index: 0,input: '2021-02-22',groups: undefined]
console.log(reg3Array);

let str4 = "1a1b1c";
var reg4 = new RegExp("1.", "g");//匹配1和后面单字符
console.log(reg4.exec(str4)[0]);//1a
console.log(reg4.exec(str4)[0]);//1b


//3.字符串match
// match是字符串的方法，查找并返回当前的匹配结果，并以数组的形式返回
// match的非全局模式跟exec的方法返回值是一样的

const match1 = "2020-01-29".match(/(\d{4})[-](\d{2})[-](\d{2})/);
console.log(match1); //等同exec
const match2Reg = /\d/gi;
const match2 = "2468".match(match2Reg);
console.log(match2); //[2,4,6,8]
console.log(match2Reg.exec("2468")); //[2]
console.log(/(\d)/gi.exec("2468")); //

//4.字符串replace
let repStr1 = "abcd123".replace(/\d/gi, (match) => "\\" + match);
console.log(repStr1); // abcd \1\2\3

let repStr2 = "Aa123".replace(/(\D)/gi, "<span>$1</span>");
console.log(repStr2); //<span>A</span><span>a</span>123
