//复杂对象的深拷贝
/**
 * 比如Date,RegExp,Map,Set,Blob,FileList,ImageData,稀疏，类型化数组typedArray
 * 方案一：通过MessageChannels,结构化克隆算法
 * 方案二：history API,notification API
 * 方案三：自己定制
 */

class A {
    constructor() {
        this.name = 'jxl';
    }
    show(v) {
        console.log(v + this.name);
    }
}
let a = new A();
let b = new A;
a.show('h:') //h:jxl
let fshow = A.prototype.show.bind(new A());
fshow('hello:') //hello:jxl

//自己定制法

function deepCopy(obj) {
    if (obj == null || typeof obj != 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        // obj.constructor === Date
        return new Date(obj);
    }
    let newObj = new obj.constructor();

    // Object.keys(obj)
    for (let v in obj) {
        if (obj.hasOwnProperty(v)) {
            //arguments.callee 指向当前执行的函数。
            newObj[v] = (typeof obj[v] === 'object') ? arguments.callee(obj[v]) : obj[v];
        }
    }
    return newObj;
}


const deepCopyObj = function (obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    //   let newObj = {};
    let newObj = new obj.constructor();

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = (typeof obj[key] === "object") ? arguments.callee(obj[key]) : obj[key]
        }

    }
    return newObj;
};
const mergeCopyObj = function (obj, newObj) {

    const merge = (obj, nobj) => {
        if (typeof obj !== 'object' || obj === null) {
            return nobj;
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
let oldobj = {
    a: 1,
    b: {
        c: [1, 2],
        d: 5,
        f: null,
    },
};
let nobj = {
    a: 99,
    zz: 88,
    b: {
        g: 100,
        f: {
            u: 1
        },
        c: [{
            a: 1
        }, 2, 3]
    }
}
mergeCopyObj(oldobj, nobj)
console.log(JSON.stringify(oldobj));
nobj.b.c[1] = 9999;
console.log(JSON.stringify(oldobj));
// let nObj = deepCopyObj(oldobj);
// console.log("nobj:", nObj);
// nObj.b.c[0] = 999;
// console.log("nobj:", nObj);
// console.log("old:", oldobj);