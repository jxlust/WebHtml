const code = `console.log('执行方法'.substring(1,)); console.log("a:", a); return say('jx');`

const func = new Function('say', 'a', `console.log('执行方法'); console.log("a:", a); return say('jx');`);
const a = 100;
const obj = {
    a: 88,
    say: (str) => `hello ${str}`
}
// global.a = 100;
// global.say = () => 'hello'
// const v = func(() => 'xxx', 'anc')
// console.log(v)


function executeCode(code, context) {
    const keys = Object.keys(context)
    // const values = Object.values(context)
    const values = keys.map(key => context[key])
    const func = new Function(...keys, code)
    return func(...values)
}

function executeCodeWith(code, context) {
    const funcStr = `
    with(this){${code}}
    `
    const func = new Function(funcStr)
    return func.call(context)
}
console.log('executeCode:', executeCode(code, obj))
console.log("executeCodeWith:", executeCodeWith(code, obj))



// console.log(executeCode(`console.log('执行方法'); console.log("a:", a); return say('jx');`, {
//     a: 88,
//     say: (str) => `hello ${str}`
// }))



