let obj1 = {
  a: 1,
  b: [1, 2],
  c: {
    d: 1,
    f: 2
  }
}
let obj2 = {
  a: 2,
  b: [9],
  c: {
    d: 99,
    z: 99
  }
}

const mergeCopyObj = function (obj, newObj) {
  const isObject = function (ot) {
    return Object.prototype.toString.call(ot) === '[object Object]'
  }
  const merge = (obj, nobj) => {
    if (typeof obj !== 'object' || obj === null) {
      return nobj;
    }
    if (Array.isArray(nobj)) {
      obj = [...nobj]
      return obj;
    }
    if (typeof nobj !== 'object' || nobj === null) {
      obj = nobj;
    }
    for (let key in nobj) {
      if (typeof obj[key] === 'object' && obj[key] != null) {
        obj[key] = merge(obj[key], nobj[key]);
      } else {
        obj[key] = nobj[key];
      }
    }
    return obj;
  }
  merge(obj, newObj)

}

// mergeCopyObj(obj1,obj2)
// console.log(obj1);

const IS_PLAIN_OBJECT = Symbol('is_plain_object');
class JxlMergeObj {
  constructor() {

    }
    [IS_PLAIN_OBJECT](val) {
      const toString = Object.prototype.toString
      return toString.call(val) === '[object Object]'
    }
  deepMerge(...objs) {
    const result = Object.create(null);
    //使用foreach 保证遍历的都是对象的自身属性 Object.prototype.hasOwnProperty
    objs.forEach(obj => {
      if (obj) {
        let keys = Object.keys(obj);
        keys.forEach(key => {
          let val = obj[key];
          if (this[IS_PLAIN_OBJECT](val)) {
            //递归
            if (this[IS_PLAIN_OBJECT](result[key])) {
              result[key] = this.deepMerge(result[key], val)
            } else {
              result[key] = this.deepMerge(val)
            }
          } else {
            if (Array.isArray(val)) {
              result[key] = [...val]
            } else {
              result[key] = val
            }
          }
        })
      }
    })
    return result;
  }

}

const mg = new JxlMergeObj();
let obj3 = mg.deepMerge(obj1, obj2,1,[9,88])
console.log(obj1, '——', obj2); //{ a: 1, b: [ 1, 2 ], c: { d: 1, f: 2 } } —— { a: 2, b: [ 9 ], c: { d: 99, z: 99 } }
console.log(obj3);
// [Object: null prototype] {
//   '0': 9,
//   '1': 88,
//   a: 2,
//   b: [ 9 ],
//   c: [Object: null prototype] { d: 99, f: 2, z: 99 }
// }
