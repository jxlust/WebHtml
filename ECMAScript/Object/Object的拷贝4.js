//常规的深拷贝，可能对于其他的数据结构存在一定问题，比如Map,Set,function，Date等
//这里实行算是现在我见过最全的，最优的深拷贝代码了

//对于单个对象的拷贝,加入备忘录优化递归
const deepCopy = function (obj, map = new WeakMap()) {
  //判断是否是基本数据类型还是引用类型的技巧
  if (Object(obj) !== obj || typeof obj === 'function') {
    //基本数据类型 Number String Symbol Boolean Bigint null undefined。判断：Object(obj) !== obj
    //function的也直接拷贝return。判断方法：typeof obj === 'function' 或者 obj instanceof Function
    return obj;
  }
  if (map.has(obj)) return map.get(obj);

  //创建拷贝输出的对象
  let result = undefined;
  try {
    // 构造函数创建
     result = new obj.constructor();
  } catch (e) {
    // failed, 通过获取原型对象创建
    result = Object.create(Object.getPrototypeOf(obj))
  }

  //判断Map ,Set ,Date等类型，因为常规的Object 可以通过Object.keys去遍历key和value，这些不可以
  if (obj instanceof Date) {
    result = new Date();
    result.setTime(obj.getTime());
    return result;
  }
  if (obj instanceof Map) {
    Array.from(obj, ([key, v]) => {
      result.set(deepCopy(key, map), deepCopy(v, map))
    })
  }
  if (obj instanceof Set) {
    Array.from(obj, v => {
      result.add(deepCopy(v, map))
    })
  }
  //普通object
  Object.keys(obj).forEach(key => {
    // result[key] =  arguments.callee(obj[key])
    result[key] = deepCopy(obj[key], map)
  })
  map.set(obj, result)
  return result;
}
let set = new Set([1, 2, 4])
let map = new Map([
  ['name', {
    a: 9
  }],
  [{
    a: 1
  }, {
    b: 1
  }]
])
let obj1 = {
  b: function () {},
  a: 1,
  c: map,
  d: {
    z: true,
    p: set
  },
  date: new Date(),
  arr: [1, 3, 4]
}
let deepCopyObj = deepCopy(obj1)
obj1.c.get('name').a = 9999;
console.log(deepCopyObj);

const mergeDeepCopy = function (...objects) {
  return Object.assign(...objects.map(obj => {
    return deepCopy(obj)
  }))
}

const myAssign = function (target,...objects) {
  //以target的数据类型创建一个object类型
  let result = null;
  if(Object(target) != target){
    try {
       result = new target.constructor(target);  
    } catch (e) {
      result = Object.create(Object.getPrototypeOf(target))
    }
  }else{
    result = target;
  }

  const map = new WeakMap();
  const merge = function (...objs) {
    objs.forEach( obj => {
      if(obj){

      }
    })
  }
  return merge(objects)

}
