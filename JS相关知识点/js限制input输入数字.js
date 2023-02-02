
function handleIntegerInput(text) {
  return ("" + text) // 第一步：转成字符串
    .replace(/[^\d]+/g, "") // 第二步：把不是数字，不是小数点的过滤掉
    .replace(/^0+(\d)/, "$1"); // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
}

function handleDecimalInput(text) {
  return (
    ("" + text) // 第一步：转成字符串
      .replace(/[^\d^\.]+/g, "") // 第二步：把不是数字，不是小数点的过滤掉
      .replace(/^0+(\d)/, "$1") // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
      .replace(/^\./, "0.") // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
      .match(/^\d*(\.?\d{0,2})/g)[0] || ""
  ); // 第五步：最终匹配得到结果 以数字开头，只有一个小数点，	而且小数点后面只能有0到2位小数
}

console.log(handleDecimalInput('100.232323')) 