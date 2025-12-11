import expEval from '@casbin/expression-eval'
import jsep from 'jsep'
import estraverse from 'estraverse'
import { generate } from 'astring'

// 处理traverse的导入兼容性
// AST转字符串函数
function astToString(node) {
    if (!node) return ''

    switch (node.type) {
        case 'Literal':
            return typeof node.value === 'string' ? `'${node.value.replace(/'/g, "\\'")}'` : String(node.value)

        case 'Identifier':
            return node.name

        case 'BinaryExpression':
            return `${astToString(node.left)} ${node.operator} ${astToString(node.right)}`

        case 'CallExpression':
            const args = node.arguments.map(astToString).join(', ')
            return `${astToString(node.callee)}(${args})`

        case 'MemberExpression':
            const objectStr = astToString(node.object)
            const propertyStr = node.computed ? `[${astToString(node.property)}]` : `.${node.property.name}`
            return objectStr + propertyStr

        case 'UnaryExpression':
            return `${node.operator}${astToString(node.argument)}`

        default:
            return `/* 未处理的节点类型: ${node.type} */`
    }
}
// 定义需要转换的自定义属性列表
const customProperties = ['intValue', 'doubleValue', 'length']

// 3. 使用 estraverse 进行转换的核心函数
function transformExpressionWithLib(ast) {
    // estraverse.replace 方法可以在遍历时直接替换节点[citation:7]
    return estraverse.replace(ast, {
        enter: function (node) {
            // 识别成员表达式，例如 '123.233'.intValue
            if (node.type === 'MemberExpression' && node.property.type === 'Identifier' && customProperties.has(node.property.name)) {
                // 构建一个新的函数调用节点
                return {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: node.property.name, // 函数名，如 intValue
                    },
                    arguments: [node.object], // 参数，如 '123.233'
                }
            }
            // 如果不是目标节点，原样返回
            return node
        },
    })
}
function transformAstExpression(astNode) {
    if (!astNode) return astNode
    if (astNode.type === 'MemberExpression' && !astNode.computed && astNode.property.type === 'Identifier') {
        const propertyName = astNode.property.name
        if (customProperties.includes(propertyName)) {
            return {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: propertyName,
                },
                arguments: [transformAstExpression(astNode.object)],
            }
        }
    }

    // 递归处理子节点
    for (const key in astNode) {
        if (astNode[key] && typeof astNode[key] === 'object') {
            astNode[key] = transformAstExpression(astNode[key])
        }
    }
    return astNode
}
// 主要转换函数：递归遍历AST并转换特定成员访问
function transformExpressionClone(ast) {
    if (!ast) return ast

    // 复制节点避免修改原始AST
    const node = JSON.parse(JSON.stringify(ast))

    // 处理成员访问表达式：如 '123.233'.intValue
    if (node.type === 'MemberExpression') {
        const propertyName = node.property.name

        // 检查是否为自定义属性
        if (customProperties.includes(propertyName)) {
            // 创建函数调用节点
            return {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: propertyName, // 函数名，如 intValue
                },
                arguments: [transformExpression(node.object)], // 参数，如 '123.233'
            }
        }
    }

    // 递归处理子节点
    if (node.object) node.object = transformExpression(node.object)
    if (node.left) node.left = transformExpression(node.left)
    if (node.right) node.right = transformExpression(node.right)
    if (node.arguments) {
        node.arguments = node.arguments.map((arg) => transformExpression(arg))
    }
    if (node.callee) node.callee = transformExpression(node.callee)
    if (node.test) node.test = transformExpression(node.test)
    if (node.consequent) node.consequent = transformExpression(node.consequent)
    if (node.alternate) node.alternate = transformExpression(node.alternate)
    if (node.elements) {
        node.elements = node.elements.map((el) => transformExpression(el))
    }

    return node
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
/**
 * 预处理一下jsmethod的脚本字符串
 * @param {*} str
 * @returns
 */
function preHandlerScriptStr(str) {
    if (str.startsWith('jsmethod(')) {
        // 处理一下
        return str.replace(/jsmethod\(["'](.*)["']\)/g, '(() => {$1})()')
    } else {
        return str
    }
}

// 工具函数
function stringIntValue(v) {
    const num = parseInt(v, 10)
    return isNaN(num) ? 0 : num
}

function valueForKey(key) {
    const data = {
        'product.description': '这是一个很长的产品描述',
        a: '就行了',
        n: 10,
        f1: '123.222333',
        v1: '1',
        'order.id': '12345',
        day: '2025-12-08',
    }
    return data[key] || ''
}
function stringDoubleValue(v) {
    const num = parseFloat(v)
    return isNaN(num) ? 0.0 : num
}
function executeJsmethod(codeString, context) {
    console.log(`[jsmethod] 开始执行，代码长度: ${codeString.length}`)

    try {
        // 创建jsmethod的执行环境
        const keys = Object.keys(context)
        // const values = Object.values(context)
        const values = keys.map((key) => context[key])
        const func = new Function(...keys, codeString)
        // 执行函数并获取结果
        const result = func(...values)
        console.log(`[jsmethod] 执行结果: ${result}`)
        return result
    } catch (error) {
        console.error(`[jsmethod] 执行错误: ${error.message}`)
        return null
    }
}
function executeJsmethodSandbox(codeString, context) {
    console.log(`[jsmethod] 开始执行，代码长度: ${codeString.length}`)
    // 先压缩代码字符串
    // const compressedCode = compressCode(codeString)
    // console.log(`[jsmethod] 压缩后代码: ${compressedCode.substring(0, 100)}...`)
    try {
        // 使用Proxy限制访问
        const handler = {
            has: (target, prop) => {
                if (prop in target) {
                    return true // 允许访问全局白名单对象
                }
                // if (!target.hasOwnProperty(prop)) {
                //   throw new Error(`Invalid expression - ${prop}! You can not do that!`)
                // }
                return true
            },
            // has: () => true,
            // get: (target, prop) => {
            //   if (prop in target) return target[prop]
            //   throw new Error(`禁止访问: ${prop}`)
            // },
        }
        console.log('[jsmethod] 执行code:', codeString)
        // 创建安全的执行环境
        const sandbox = new Proxy(context, handler)
        const executeCode = `with(sandbox) {return (function() {${codeString}})();}`
        const func = new Function('sandbox', executeCode)
        const result = func(sandbox)
        console.log(`[jsmethod] 执行结果: ${result}`)
        return result
    } catch (error) {
        console.error(`[jsmethod] 执行错误: ${error.message}`)
        return null
    }
}
function safeLength(value) {
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

class EcpScriptEval {
    // 1. 定义你的值转换逻辑
    valueConverters = {
        intValue: stringIntValue,
        doubleValue: stringDoubleValue,
        length: safeLength,
    }

    constructor(context) {
        this.customContext = Object.assign(
            {
                length: safeLength,
                intValue: stringIntValue,
                doubleValue: stringDoubleValue,
                Date: Date,
                Math: Math,
                parseInt: parseInt,
                parseFloat: parseFloat,
                isNaN: isNaN,
                String: String,
                Number: Number,
            },
            context,
        )
    }

    customEvaluate(node, context) {
        if (!node) {
            throw new Error('无效的AST节点')
        }

        // 根据节点类型分别处理
        switch (node.type) {
            // 字面量 (如 5, "hello", true)
            case 'Literal':
                return node.value

            // 标识符/变量 (如 x, valueForKey)
            case 'Identifier':
                if (context && context.hasOwnProperty(node.name)) {
                    return context[node.name]
                }
                // 如果上下文中没有，检查是否为全局对象（如Math）
                if (typeof window !== 'undefined' && window.hasOwnProperty(node.name)) {
                    return window[node.name]
                }
                throw new Error(`未定义的变量或函数: ${node.name}`)

            // 成员访问表达式 (如 obj.property, valueForKey('a').doubleValue)
            case 'MemberExpression':
                const objectValue = this.customEvaluate(node.object, context)

                // 获取属性名
                let propertyName
                if (node.computed) {
                    // 计算属性访问，如 obj[prop]
                    propertyName = this.customEvaluate(node.property, context)
                } else {
                    // 点号属性访问，如 obj.property
                    propertyName = node.property.name
                }

                // 检查是否为自定义转换器
                if (this.valueConverters.hasOwnProperty(propertyName)) {
                    return this.valueConverters[propertyName](objectValue)
                }

                // 默认的对象属性访问
                if (objectValue != null && objectValue.hasOwnProperty(propertyName)) {
                    return objectValue[propertyName]
                }

                // 处理原始值的属性访问（如字符串的length）
                if (objectValue != null && propertyName in objectValue) {
                    return objectValue[propertyName]
                }

                return undefined

            // 函数调用 (如 valueForKey('a'), Math.max(1, 2))
            case 'CallExpression':
                const calleeValue = this.customEvaluate(node.callee, context)

                if (typeof calleeValue !== 'function') {
                    throw new Error(`${node.callee.name || '表达式'} 不是一个函数`)
                }

                // 计算所有参数值
                const args = node.arguments.map((arg) => this.customEvaluate(arg, context))

                // 调用函数
                try {
                    return calleeValue.apply(null, args)
                } catch (error) {
                    throw new Error(`函数调用失败: ${error.message}`)
                }

            // 二元运算表达式 (如 a + b, x * y)
            case 'BinaryExpression':
                const leftVal = this.customEvaluate(node.left, context)
                const rightVal = this.customEvaluate(node.right, context)

                // 根据运算符计算结果
                switch (node.operator) {
                    case '+':
                        // JavaScript中+可用于数字相加或字符串连接
                        return leftVal + rightVal
                    case '-':
                        return leftVal - rightVal
                    case '*':
                        return leftVal * rightVal
                    case '/':
                        if (rightVal === 0) throw new Error('除以零错误')
                        return leftVal / rightVal
                    case '%':
                        return leftVal % rightVal
                    case '==':
                        return leftVal == rightVal
                    case '!=':
                        return leftVal != rightVal
                    case '===':
                        return leftVal === rightVal
                    case '!==':
                        return leftVal !== rightVal
                    case '<':
                        return leftVal < rightVal
                    case '<=':
                        return leftVal <= rightVal
                    case '>':
                        return leftVal > rightVal
                    case '>=':
                        return leftVal >= rightVal
                    case '&&':
                        return leftVal && rightVal
                    case '||':
                        return leftVal || rightVal
                    default:
                        throw new Error(`不支持的运算符: ${node.operator}`)
                }

            // 一元运算表达式 (如 -x, !flag)
            case 'UnaryExpression':
                const argumentVal = this.customEvaluate(node.argument, context)
                switch (node.operator) {
                    case '-':
                        return -argumentVal
                    case '+':
                        return +argumentVal
                    case '!':
                        return !argumentVal
                    case '~':
                        return ~argumentVal
                    default:
                        throw new Error(`不支持的一元运算符: ${node.operator}`)
                }

            // 条件表达式/三元运算符 (如 a > b ? x : y)
            case 'ConditionalExpression':
                const testVal = this.customEvaluate(node.test, context)
                const consequentVal = this.customEvaluate(node.consequent, context)
                const alternateVal = this.customEvaluate(node.alternate, context)
                return testVal ? consequentVal : alternateVal

            // 数组表达式 (如 [1, 2, 3])
            case 'ArrayExpression':
                return node.elements.map((element) => this.customEvaluate(element, context))

            // 对象表达式 (如 {x: 1, y: 2})
            case 'ObjectExpression':
                const obj = {}
                for (const prop of node.properties) {
                    const key = prop.key.name || prop.key.value
                    obj[key] = this.customEvaluate(prop.value, context)
                }
                return obj

            // 默认使用原始求值器处理其他节点类型
            default:
                try {
                    return expEval.eval(node, context)
                } catch (error) {
                    throw new Error(`不支持的表达式类型: ${node.type}`)
                }
        }
    }
    parse(code) {
        return jsep(code)
    }
    execute(ast) {
        return expEval.eval(ast, this.customContext)
    }
    jcompile(code) {
        const originalAst = jsep(code)
        // const transformedAst = transformExpression(originalAst)
        // const transformedAst = transformExpressionWithLib(originalAst)
        const transformedAst = transformAstExpression(originalAst)
        // console.log(transformedAst)
        // console.log('转换后：', generate(transformedAst))
        // babelTransformAST(originalAst)
        return expEval.eval(transformedAst, {
            ...this.customContext,
            //   jsmethod: (code) => executeJsmethodSandbox(code, this.customContext),
            jsmethod: (code) => executeJsmethod(code, this.customContext),
        })
    }
    customCompile(code) {
        const miniCode = compressCode(code)
        // console.log('minCode,', miniCode)
        const astNode = jsep(miniCode)
        // console.log('ast:', astNode)
        const result = this.customEvaluate(astNode, {
            ...this.customContext,
            //   jsmethod: (code) => executeJsmethodSandbox(code, this.customContext),
            jsmethod: (code) => executeJsmethod(code, this.customContext),
        })
        return result
    }
    async compileAsync(code) {
        const compileFunc = expEval.compileAsync(code)
        const result = await compileFunc(this.customContext)
        return result
    }
    compile(code) {
        const compileFunc = expEval.compile(code)
        return compileFunc(this.customContext)
    }
}

const ecpEval = new EcpScriptEval({
    valueForKey: (key) => {
        const data = {
            'product.description': '这是一个很长的产品描述',
            a: '就行了',
            n: 10,
            f1: '123.222333',
            v1: '1',
            'order.id': '12345',
            day: '2025-12-08',
        }
        return data[key] || ''
    },
})

function startTest() {
    let success = 0,
        failed = 0
    const testList = [
        { code: `'123.233'.intValue + 100`, result: 223 },
        { code: `valueForKey('product.description').length`, result: 11 },
        { code: `'123.233'.intValue`, result: 123 },
        { code: `'1.1'.doubleValue`, result: 1.1 },
        { code: `'abcdeft'.length`, result: 7 },
        { code: `'abcdef'.substring(1,3)`, result: 'bc' },
        {
            code: `jsmethod(\"function someFunc(v) { var r = ''; if (v == '1') { r = 100 } else { r = 88 } return r; } return someFunc(valueForKey('v1'));\")`,
            result: 100,
        },
        {
            code: `jsmethod("
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
return getNextDay(valueForKey('day'));")`,
            result: '2025-12-07',
        },
        {
            code: `jsmethod(\"function calculate(v) {
  var base = parseInt(v);
  var tax = base * 0.1;
  return base + tax;
}
return calculate(valueForKey('order.id'));\")`,
            result: 13579.5,
        },
        {
            code: `jsmethod(\"function calculate(v) {
  var base = parseInt(v);
  var tax = base * 0.1;
  return (base + tax + '').substring(1,);
}
return calculate(valueForKey('order.id'));\")`,
            result: '3579.5',
        },
    ]

    for (let item of testList) {
        try {
            const result = ecpEval.jcompile(item.code)
            if (result === item.result) {
                success++
            } else {
                failed++
                console.log(`失败: ${item.code}`)
            }
        } catch (error) {
            failed++
            console.log(`失败: ${item.code}`)
        }
    }
    console.log(`总用例${testList.length},成功${success},失败${failed}`)
}
startTest()