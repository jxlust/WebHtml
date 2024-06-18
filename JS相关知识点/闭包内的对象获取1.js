const obj = (function () {
    const data = {
        name: '张三',
        age: 18,
    }
    return {
        get(key) {
            return data[key]
        }
    }
})();
console.log(obj.get('name')) // 张三

// console.log(obj.get('valueOf')()) // 报错 因为valueOf是执行的当前上下文this

Object.defineProperty(Object.prototype, 'momo', {
    get() {
        console.log('prototype get mono')
        return this
    }
})



const dataObj = obj.get('momo');
// 模拟攻击，添加一些属性或者清空
dataObj.xxxxxxx = 999
dataObj.name = null;
dataObj.age = null;
console.log(dataObj)
console.log(obj.get('xxxxxxx'), obj.get('name'), obj.get('age'))

const testObj = {
    a: 1
}
// valueOf() 返回的是当前对象本身
console.log(testObj.valueOf())

// 原型链
// testObj.constructor.prototype


