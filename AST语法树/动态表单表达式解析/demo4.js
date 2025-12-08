// 完整执行代码
const expression = `jsmethod(\"function getFxbsdyValue(v) { var r = ''; if (v == '1') { r = 100 } else { r = 88 } return r; } return getFxbsdyValue(valueForKey('a'));\")`;

// 解析并提取函数调用
function parseAndExecute(expr) {
  // 提取 jsmethod 的参数
  const match = expr.match(/jsmethod\("([^"]+)"\)/);
  if (!match) {
    console.error('表达式格式错误');
    return;
  }
  
  const codeString = match[1];
  console.log('提取的代码:', codeString);
  
  // 数据存储
  const dataStore = {
    'a': '1',
    'b': '2',
    'c': '3',
    'user': 'john',
    'status': 'active'
  };
  
  // 自定义 valueForKey
  function valueForKey(key, options = {}) {
    console.log(`查询键: ${key}`);
    
    // 自定义逻辑示例
    const customRules = {
      'a': () => '1',  // 硬编码值
      'b': () => '2',
      'user': () => dataStore.user,
      'status': () => dataStore.status,
      'calculated': () => {
        // 计算值
        return Math.random() > 0.5 ? 'high' : 'low';
      },
      'env': () => {
        // 环境变量
        return process.env.NODE_ENV || 'development';
      }
    };
    
    if (customRules[key]) {
      return customRules[key]();
    }
    
    // 默认返回
    return dataStore[key] || null;
  }
  
  // 创建执行环境
  const sandbox = {
    valueForKey: valueForKey,
    console: console
  };
  
  // 创建执行函数
  const executeCode = new Function('valueForKey', `
    // 执行传入的代码
    ${codeString}
  `);
  
  try {
    const result = executeCode(valueForKey);
    console.log('最终结果:', result);
    return result;
  } catch (error) {
    console.error('执行失败:', error);
    return null;
  }
}

// 执行
console.log('=== 执行表达式 ===');
const result = parseAndExecute(expression);
console.log('返回结果:', result);