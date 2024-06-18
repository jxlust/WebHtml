const obj = (function () {
    const data = {
        name: '张三',
        age: 18,
    }
    // 针对上面的原型攻击 闭包内的对象
    // 方法1:创建一个没有原型依赖的对象
    // const data = Object.create(null);
    // data.name = '张三';
    return {
        get(key) {
            // 方法2 判断key是否在data中 
            if (data.hasOwnProperty(key) === false) {
                throw new Error('没有这个属性')
            }
            return data[key]
        }
    }
})();

Object.defineProperty(Object.prototype, 'attack', {
    get() {
        return this;
    }
})

console.log(obj.attack.get('name'))
console.log(obj.get('attack'))
// const proxyObj = new Proxy(obj.get, {
//     get(target, key) {
//         console.log(target, key)
//         return target[key]
//     }
// })

