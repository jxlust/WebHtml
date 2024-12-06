function test(strings) {
    let k = 1000;
    let str = ''
    console.log('strings:', strings, arguments)
    str += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
        console.log(2, arguments[i])
        str += Math.round(arguments[i] * k) / k + strings[i];
    }
    console.log(1, str)
}

test`a${1}b${2}c`;


let digits = 3;
function limitDigits(strings) {
    let d = Math.floor(digits);
    const k = 10 ** d;
    let str = ''
    str += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
        str += Math.round(arguments[i] * k) / k + strings[i];
    }
    return str;
}
console.log(limitDigits`a${1.22342}b${2.3242424}c`);

