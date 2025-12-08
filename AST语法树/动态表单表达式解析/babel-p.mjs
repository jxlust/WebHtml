import * as parser from '@babel/parser'
import traverse from '@babel/traverse'
import { generate } from '@babel/generator'
import t from '@babel/types'
function stringIntValue(v) {
  const num = parseInt(v, 10)
  return isNaN(num) ? 0 : num
}
function stringDoubleValue(v) {
  const num = parseFloat(v)
  return isNaN(num) ? 0.0 : num
}

class ExpressionParser {
  constructor(data) {
    // 数据源配置
    this.dataSource = data

    // 扩展String原型
    // this.extendStringPrototype()
  }

  // 扩展String原型，添加intValue和doubleValue方法
  extendStringPrototype() {
    if (!String.prototype.intValue) {
      String.prototype.intValue = function () {
        const num = parseInt(this, 10)
        return isNaN(num) ? 0 : num
      }
    }

    if (!String.prototype.doubleValue) {
      String.prototype.doubleValue = function () {
        const num = parseFloat(this)
        return isNaN(num) ? 0.0 : num
      }
    }
  }

  // 自定义valueForKey实现
  valueForKey(key) {
    console.log(`[查询] key: "${key}"`)

    // 模拟数据查询
    if (this.dataSource.hasOwnProperty(key)) {
      const value = this.dataSource[key]
      console.log(`[结果] 找到值: "${value}"`)
      return value
    }

    // 特殊逻辑处理
    switch (key) {
      case 'empty':
        return ''
      case 'null':
        return null
      case 'number':
        return '123'
      case 'float':
        return '3.14'
      case 'longText':
        return '这是一个非常长的字符串，用于测试长度属性'
      default:
        console.log(`[结果] 未找到键 "${key}"，返回空字符串`)
        return ''
    }
  }

  // 安全获取length属性
  safeLength(value) {
    console.log('xx:val', value)
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

  // 解析表达式
  parse(expression) {
    try {
      // 解析为AST
      // const ast = parser.parse(expression)
      const ast = parser.parseExpression(expression)
      console.log('ast:', ast)
      // 转换AST
      const transformedAst = this.transformAST(ast)
      // 生成代码
      const { code } = generate(transformedAst)

      console.log(`\n原始表达式: ${expression}`)
      console.log(`转换后代码: ${code}`)

      // 执行表达式
      const result = this.evaluate(code)
      console.log(`执行结果: ${result}`)
      console.log(`结果类型: ${typeof result}`)

      return result
    } catch (error) {
      console.error(error)
      console.error(`解析错误: ${error.message}`)
      return null
    }
  }

  // 转换AST
  transformAST(ast) {
    traverse.default(ast, {
      noScope: true,
      // 处理 .length 属性访问
      Identifier(path) {
        // console.log('iii:', path)
      },
      MemberExpression(path) {
        console.error('ppppp:', path)
        const { object, property } = path.node
        if (property.name === 'length') {
          // 检查object是否为valueForKey调用
          if (object.type === 'CallExpression' && object.callee.name === 'valueForKey') {
            // 替换为安全函数调用
            path.replaceWith(t.callExpression(t.identifier('safeLength'), [object]))
          }
        } else if (property.name === 'intValue' || property.name === 'doubleValue') {
          // 处理 .intValue 和 .doubleValue
          // 直接替换为函数调用
          const methodName = property.name
          path.replaceWith(t.callExpression(t.memberExpression(object, t.identifier(methodName)), []))
        }
      },
    })

    return ast
  }

  // 执行代码
  evaluate(code) {
    try {
      // 创建安全上下文
      const context = {
        valueForKey: (key) => this.valueForKey(key),
        safeLength: (value) => this.safeLength(value),
        // 注意：这里需要确保String原型已经扩展
        // 或者直接在context中提供方法
        intValue: function (str) {
          //   return String.prototype.intValue.call(str)
          return stringIntValue(str)
        },
        doubleValue: function (str) {
          //   return String.prototype.doubleValue.call(str)
          return stringDoubleValue(str)
        },
      }

      // 使用Function创建执行环境
      const func = new Function(...Object.keys(context), `return ${code};`)

      // 执行函数
      return func(...Object.values(context))
    } catch (error) {
      console.error(`执行错误: ${error.message}`)
      return null
    }
  }
}

// 使用示例
const parserInstance = new ExpressionParser({
  'user.name': '张三',
  'user.age': '30',
  'order.id': '12345',
  'order.amount': '1.1',
  'product.title': '智能手机',
  'product.description': '这是一个很长的产品描述，用于测试length属性',
})

console.log('=== 测试各种表达式 ===\n')

// 测试1: .length 表达式
// parserInstance.parse("valueForKey('product.description').length")

// 测试2: 字符串直接调用 .intValue
parserInstance.parse("'123'.length") // 输出：123

// // 测试3: valueForKey调用 .intValue
// parserInstance.parse("valueForKey('number').intValue")

// // 测试4: 字符串直接调用 .doubleValue
// parserInstance.parse("'1.1'.doubleValue")

// 测试5: valueForKey调用 .doubleValue
// parserInstance.parse("valueForKey('float').doubleValue")

// 测试6: 复杂表达式
// parserInstance.parse("valueForKey('order.id').intValue > 100")

// 测试7: 链式调用
// parserInstance.parse("valueForKey('product.description').length > 10")
