const { parse, eval } = require('@casbin/expression-eval')

// 你的表达式
const value1 = `jsmethod(\"function getFxbsdyValue(v) { var r = ''; if (v == '1') { r = 100 } else { r = 88 } return r; } return getFxbsdyValue(valueForKey('a'));\")`

// 解析为抽象语法树
const ast = parse(value1)
console.log('ast:', JSON.stringify(ast, null, 2)) // 格式化输出AST

function evalStr(str) {
  const ast = parse(str)
  console.log('evalStr:', JSON.stringify(ast, null, 2)) // 格式化输出AST
}

// 求值
const result = eval(ast, {
  // 关键：实现 jsmethod 函数
  jsmethod: (str) => {
    console.log('jsmethod 收到代码字符串:', str)
    try {
      evalStr(str)
    } catch (error) {
      console.error('执行 jsmethod 时出错:', error)
      return null
    }
  },
  valueForKey: (str) => {
    console.log('外层 valueForKey 被调用，key:', str)
    // 这里是外层的 valueForKey 逻辑，你可以连接到你的数据源
    // 例如: return data[str];
    return '1' // 示例返回值
  },
})

console.log('最终结果 res:', result)
