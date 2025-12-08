const { parse, eval } = require('@casbin/expression-eval')

const value1 = `jsmethod(\"function getFxbsdyValue(v) { var r = ''; if (v == '1') { r = 100 } else { r = 88} return r; } getFxbsdyValue(valueForKey('a'));\")`
const ast = parse(value1)
console.log('ast:', ast)
const result = eval(ast, {
  jsmethod: (str) => {
    console.log('jsmethod:', str)
    const func = new Function(`return (${str})`)
    const result = func()
    return typeof result === 'string' ? `"${result}"` : JSON.stringify(result)
  },
  valueForKey: (str) => {
    console.log('get:', str)
    return '1'
  },
})
console.log('res:', result)


