import * as parser from '@babel/parser'
import _traverse from '@babel/traverse'
import { generate } from '@babel/generator'
import t from '@babel/types'

// 处理traverse的导入兼容性
const traverse = _traverse.default || _traverse

// 工具函数
function stringIntValue(v) {
  const num = parseInt(v, 10)
  return isNaN(num) ? 0 : num
}

function stringDoubleValue(v) {
  const num = parseFloat(v)
  return isNaN(num) ? 0.0 : num
}

// 压缩代码：将多行代码压缩为一行
function compressCode(code) {
  if (!code) return code

  return (
    code
      // 移除块注释
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // 移除行注释
      .replace(/\/\/.*/g, '')
      // 将多个换行和空格合并为一个空格
      .replace(/\s+/g, ' ')
      // 移除语句前后的空格
      .replace(/\s*([=+\-*\/%&|^~!<>?:;{}()[\],])\s*/g, '$1')
      // 特殊情况：保留字符串内的空格
      .trim()
  )
}

class ExpressionParser {
  constructor(data, customFunction) {
    this.dataSource = data
    this.customFunction = customFunction || {}
  }

  valueForKey(key) {
    console.log(`[查询] key: "${key}"`)

    if (this.dataSource.hasOwnProperty(key)) {
      const value = this.dataSource[key]
      console.log(`[结果] 找到值: "${value}"`)
      return value
    }
    console.log(`[结果] 未找到键 "${key}"，返回空字符串`)
    // throw new Error('[结果] 未找到键 "${key}"，返回空字符串')
    return ''
    // 特殊逻辑处理
  }

  safeLength(value) {
    // console.log('xx:val', value)
    if (typeof value === 'string') {
      return value.length
    } else if (value === null || value === undefined) {
      console.warn('[警告] 尝试获取null或undefined的length属性')
      return 0
    } else {
      console.warn(`[警告] 尝试获取非字符串类型的length属性，类型: ${typeof value}`)
      // 尝试转换为字符串
      return String(value).length
    }
  }

  // 执行jsmethod内部的代码
  executeJsmethod(codeString) {
    console.log(`[jsmethod] 执行代码: ${codeString.substring(0, 50)}...`)

    try {
      // 创建jsmethod的执行环境
      const context = {
        valueForKey: (key) => this.valueForKey(key),
        // 可以限制可用的全局对象
      }

      // 使用Function构造函数执行代码
      // 注意：codeString已经是一个完整的函数定义和调用
      const func = new Function(
        'valueForKey',
        `
        ${codeString}
      `,
      )

      // 执行函数并获取结果
      const result = func(context.valueForKey)
      console.log(`[jsmethod] 执行结果: ${result}`)
      return result
    } catch (error) {
      console.error(`[jsmethod] 执行错误: ${error.message}`)
      return null
    }
  }
  // 执行jsmethod代码
  executeJsmethodSandbox(codeString) {
    console.log(`[jsmethod] 开始执行，代码长度: ${codeString.length}`)
    // 先压缩代码字符串
    // const compressedCode = compressCode(codeString)
    // console.log(`[jsmethod] 压缩后代码: ${compressedCode.substring(0, 100)}...`)

    try {
      // 创建安全的执行环境
      const safeContext = {
        valueForKey: (key) => this.valueForKey(key),
        intValue: stringIntValue,
        doubleValue: stringDoubleValue,
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
        has: (target, prop) => {
          if (prop in target) {
            return true // 允许访问全局白名单对象
          }
          if (!target.hasOwnProperty(prop)) {
            throw new Error(`Invalid expression - ${prop}! You can not do that!`)
          }
          return true
        },
        // has: () => true,
        // get: (target, prop) => {
        //   if (prop in target) return target[prop]
        //   throw new Error(`禁止访问: ${prop}`)
        // },
      }
      const sandbox = new Proxy(safeContext, handler)

      const executeCode = `
      with(sandbox) {
        return (function() {
          ${codeString}
        })();
      }
    `

      const func = new Function('sandbox', executeCode)
      const result = func(sandbox)
      console.log(`[jsmethod] 执行结果: ${result}`)
      return result
    } catch (error) {
      console.error(`[jsmethod] 执行错误: ${error.message}`)
      return null
    }
  }

  // 解析表达式
  parse(expression) {
    try {
      console.log(`\n原始表达式: ${expression}`)

      // 使用 parser.parse 解析完整表达式，而非 parseExpression
      const ast = parser.parse(`(${expression})`)

      // 转换AST
      this.transformAST(ast)

      // 生成代码
      const { code } = generate(ast)
      console.log(`转换后代码: ${code}`)

      // 执行表达式
      const result = this.evaluate(code)
      console.log(`执行结果: ${result} (类型: ${typeof result})`)
      return result
    } catch (error) {
      console.error(error)
      console.error(`解析错误: ${error.message}`, error.stack)
      return null
    }
  }

  // 转换AST
  transformAST(ast) {
    traverse(ast, {
      // 处理 MemberExpression 节点（如 .length, .intValue）
      MemberExpression(path) {
        const { node } = path
        // 安全地检查属性名，确保 property 是 Identifier 类型
        if (t.isIdentifier(node.property)) {
          const propertyName = node.property.name

          if (propertyName === 'length') {
            // 检查对象是否为 valueForKey 调用
            if (t.isCallExpression(node.object) && t.isIdentifier(node.object.callee, { name: 'valueForKey' })) {
              // 替换为 safeLength 函数调用
              path.replaceWith(t.callExpression(t.identifier('safeLength'), [node.object]))
            }
            // 注意：这里没有处理字符串字面量直接调用 .length 的情况
            // 例如 'abc'.length，因为它在JS中可直接求值
          } else if (propertyName === 'intValue' || propertyName === 'doubleValue') {
            // 处理 .intValue 和 .doubleValue
            // 确定要调用的函数名
            // const handlerName = 'intValue'// intValue  doubleValue
            // 将 obj.property 替换为 handlerName(obj)
            path.replaceWith(t.callExpression(t.identifier(propertyName), [node.object]))
          }
        }
      },
      // 处理 jsmethod 调用
      // CallExpression(path) {
      //   const { node } = path
      //   // 检查是否为 jsmethod 调用
      //   if (
      //     t.isIdentifier(node.callee, { name: 'jsmethod' }) &&
      //     node.arguments.length === 1 &&
      //     t.isStringLiteral(node.arguments[0])
      //   ) {
      //     console.log('[AST] 找到jsmethod调用')

      //     // 提取jsmethod的参数（字符串内容）
      //     const jsmethodCode = node.arguments[0].value

      //     // 将 jsmethod(...) 替换为 executeJsmethod(...)
      //     path.replaceWith(t.callExpression(t.identifier('executeJsmethod'), [t.stringLiteral(jsmethodCode)]))
      //   }
      // },
    })
  }

  // 执行代码
  evaluate(code) {
    try {
      // 创建安全上下文
      const context = {
        valueForKey: (key) => this.valueForKey(key),
        safeLength: (value) => this.safeLength(value),
        intValue: stringIntValue, // 直接使用顶部定义的函数
        doubleValue: stringDoubleValue, // 直接使用顶部定义的函数
        getAccid: () => '工号',
        jsmethod: (codeStr) => this.executeJsmethodSandbox(codeStr),
        ...this.customFunction,
      }

      // 提取表达式部分（可能被括号包裹）
      let expressionCode = code.trim()
      if (expressionCode.startsWith('(') && expressionCode.endsWith(')')) {
        expressionCode = expressionCode.substring(1, expressionCode.length - 1)
      }

      // 使用 Function 创建执行环境
      const func = new Function(...Object.keys(context), `return ${expressionCode};`)

      // 执行函数
      return func(...Object.values(context))
    } catch (error) {
      console.error(`执行错误: ${error.message}`)
      return null
    }
  }
}

// 使用示例
const parserInstance = new ExpressionParser(
  {
    'product.description': '这是一个很长的产品描述',
    a: '就行了',
    n: 10,
    v1: '1',
    'order.id': '12345',
    day: '2025-12-08',
  },
  {
    methodA: (str) => {
      return str.repeat(2)
    },
  },
)

console.log('=== 测试表达式 ===\n')

// 测试字符串直接调用 .intValue - 现在应该能正确输出 123
const v1 = parserInstance.parse("'123.233'.intValue")
console.log('v1:', v1, v1 === 123)
// 其他测试用例也可以正常运行
const v2 = parserInstance.parse("valueForKey('product.description').length")
console.log('v2:', v2, v2 === 11)
const v3 = parserInstance.parse("'1.1'.doubleValue")
console.log('v3:', v3, v3 === 1.1)

const v4 = parserInstance.parse("'abcdeft'.length")
console.log('v4:', v4, v4 === 7)

const v5 = parserInstance.parse("valueForKey('a')")
console.log('v5:', v5, v5 === '就行了')

const v6 = parserInstance.parse(`valueForKey('n')>0 && 1>2 || (5>1 && 1>0)`)
console.log('v6:', v6, v6 === true)

const v7 = parserInstance.parse(`String(123)`)
console.log('v7:', v7, v7 === '123')

const v8 = parserInstance.parse(`String(123).length`)
console.log('v8:', v8, v8 === 3)

const v9 = parserInstance.parse(`getAccid()`)
console.log('v9:', v9, v9 === '工号')

// jsmethod
const jsMethod1 = `jsmethod(\"function someFunc(v) { var r = ''; if (v == '1') { r = 100 } else { r = 88 } return r; } return someFunc(valueForKey('v1'));\")`
// str.match(
//     /jsmethod\("([^"]+)"\)/,
//   )
const v10 = parserInstance.parse(jsMethod1)
console.log('v10:', v10)

const v11 = parserInstance.parse(`methodA('abc')`)
console.log('v11:', v11)

// v.intValue()
const jsMethod2 = `jsmethod(\"function calculate(v) {
  var base = parseInt(v);
  var tax = base * 0.1;
  return base + tax;
}
return calculate(valueForKey('order.id'));\")`
const v12 = parserInstance.parse(compressCode(jsMethod2))
console.log('v12:', v12)

const jsMethod3 = `jsmethod("
function getNextDay(time) {
  var day;
  var time = new Date(time);
  time = +time - 1000 * 60 * 60 * 24;
  time = new Date(time);
  var oneDay = time.getDate();
  if (oneDay < 10) {
    day = '0' + oneDay
  } else {
    day = oneDay
  }
  return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + day
}
return getNextDay(valueForKey('day'));")`
// 对于jsmethod先进行压缩一下
const v13 = parserInstance.parse(compressCode(jsMethod3))
console.log('v13:', v13 === '2025-12-07')