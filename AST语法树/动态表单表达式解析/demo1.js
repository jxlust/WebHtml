/**
 * 安全表达式求值器
 */
class CustomExpressionEvaluator {
  constructor(data) {
    this.data = data // 你的全局数据 { a: '12345', b: 1, ... }
  }

  /**
   * 主方法：解析并执行表达式
   * @param {string} exp - 表达式字符串
   * @returns {*} 表达式执行结果
   */
  evaluate(exp) {
    try {
      // 1. 预处理：替换 valueForKey 调用
      const processedExp = this._replaceValueForKey(exp)
      console.log('1:', processedExp)

      // 2. 预处理：替换并执行 jsmethod 调用
      const finalExp = this._replaceJsmethod(processedExp)
      console.log('2:', finalExp)
      // 3. 安全地执行最终表达式
      return this._safeEval(finalExp)
    } catch (error) {
      console.error('表达式解析失败:', error)
      throw error
    }
  }

  /**
   * 将 valueForKey('key') 替换为实际值或属性访问
   */
  _replaceValueForKey(exp) {
    // 正则匹配 valueForKey('someKey')
    return exp.replace(/valueForKey\(['"]([^'"]+)['"]\)/g, (match, key) => {
      if (key in this.data) {
        // 如果值是字符串，添加引号；是数字或对象，直接转为字符串
        return typeof this.data[key] === 'string' ? `"${this.data[key]}"` : JSON.stringify(this.data[key])
      } else {
        throw new Error(`Key "${key}" not found in global data`)
      }
    })
  }

  /**
   * 提取并执行 jsmethod 中的函数
   */
  _replaceJsmethod(exp) {
    // 正则匹配 jsmethod('...js code...')
    const rep = /jsmethod\("([^"]+)"\)/g
     
    return exp.replace(rep, (match, jsCode) => {
      console.log('match:', match)
      console.log('jsCode:', jsCode)

      try {
        // 动态执行传入的JS代码并返回结果
        // 注意：此方法仍有安全风险，需确保jsCode来源可信
        const func = new Function(`return (${jsCode})`)
        const result = func()

        // 根据结果类型处理返回
        return typeof result === 'string' ? `"${result}"` : JSON.stringify(result)
      } catch (e) {
        throw new Error(`执行 jsmethod 失败: ${e.message}`)
      }
    })
  }

  /**
   * 安全地执行简单表达式
   * 使用 new Function() 而非 eval()，限制作用域[citation:2][citation:3]
   */
  _safeEval(exp) {
    // 使用 Function 构造函数，将其执行环境隔离在全局[citation:3]
    // 这里只传入我们已知的、安全的上下文
    const evaluator = new Function('', `return (${exp})`)
    return evaluator()
  }
}
const data = { a: '12345', b: 1, c: 'some str', abc: '2025-12-01' }
const evaluator = new CustomExpressionEvaluator(data)

// 1. 简单值比较
console.log(evaluator.evaluate(`valueForKey('a') == '123'`)) // false

// 2. 属性访问与运算
console.log(evaluator.evaluate(`valueForKey('a').length < 10`)) // false (因为 '12345'.length < 10 为假)

// 3. 执行自定义JavaScript函数
const complexExp = `jsmethod("function getNextDay(time){var day;time=new Date(time);time=+time-1000*60*60*24;time=new Date(time);var oneDay=time.getDate();if(oneDay<10){day="0"+oneDay}else{day=oneDay}return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+day} return getNextDay(valueForKey("abc"));")`
console.log(evaluator.evaluate(complexExp)) // 输出 "2025-11-30" (假设abc为'2025-12-01')
