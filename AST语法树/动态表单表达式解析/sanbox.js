const safeContext = {
    console: { log: (msg) => console.log('Sandbox:', msg) },
    Date: Date,
    Math: Math,
    parseInt: parseInt,
    parseFloat: parseFloat,
    isNaN: isNaN,
    String: String,
    Number: Number,
}
// 使用Proxy限制访问
const handler = {
    has: () => true,
    get: (target, prop) => {
        console.log(1, target, prop)
        if (prop in target) return target[prop]
        throw new Error(`禁止访问: ${prop}`)
    },
}

// const sandbox = new Proxy(safeContext, handler)
// const codeString = `console.log('abc');Math.random();`
// const executeCode = `with(sandbox) {return (function() {${codeString}})();}`
// const func = new Function('sandbox', executeCode)
// const result = func(sandbox)
// console.log(`[jsmethod] 执行结果: ${result}`)

// 创建沙箱代理
const sandboxProxy = new Proxy(safeContext, {
    has: (target, prop) => {
        console.log(target, prop)
        // if (access_white_list.includes(prop)) {
        if (prop in target) {
            return true // 允许访问全局白名单对象
        }
        if (!target.hasOwnProperty(prop)) {
            throw new Error(`Invalid expression - ${prop}! You can not do that!`)
        }
        return true
    },
})

// 执行代码时绑定代理
function safeExecute(code) {
    const withedCode = `with(globalObj) { ${code} }`
    const fn = new Function('globalObj', withedCode)
    //   const res = fn.call(sandboxProxy, sandboxProxy)
    const res = fn(sandboxProxy)
    console.log(`[jsmethod] 执行结果: ${res}`)
    return res
}
safeExecute(`console.log('abc'); return Math.random();`)