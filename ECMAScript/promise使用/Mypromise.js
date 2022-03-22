//实现一个promise
/**
new MyPromise((resolve,reject) => {
 setTimeout(() => {
  // resolve(2);
  // reject(1);
 }, 1000);
}).then(d => {

}).then(d => {

}).catch(e => {
  
})
 */
//1. Promise Handler参数是个Function
//2. Hander方法的两个形参也是两个Function,执行传入两个方法作为参数，执行的时候改变状态
//3. Then的实现

//https://www.jianshu.com/p/43de678e918a
//设计promise
function isFunction(fn) {
    return typeof fn === 'function'
}
const PENDING = 'Pending';
const FULFILLED = 'Fulfilled';
const REJECTED = 'Rejected';

const RESOLVE = Symbol('resolve')
const REJECT = Symbol('reject')
class MyPromise {

    constructor(handler) {
        if (!isFunction(handler)) {
            throw new TypeError('Handler is not a function!')
        }

        this._val = undefined;
        this._status = PENDING;

        this._fulfilledQueues = [];
        this._rejectedQueues = [];

        try {
            handler(this[RESOLVE].bind(this), this[REJECT].bind(this));
        } catch (error) {
            this[REJECT](error)
        }

    }
    //实例方法
    then(onFulfilled, onRejected) {
        const {
            _status,
            _val
        } = this;
        switch (_status) {
            case PENDING:
                this._fulfilledQueues.push(onFulfilled);
                this._rejectedQueues.push(onRejected);
                break;
            case FULFILLED:
                onFulfilled(_val);
                break;
            case REJECTED:
                onRejected(_val);
                break;
        }

        //返回一个MyPromise对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {

        })

    }
    //私有方法
    [RESOLVE](data) {
        this._val = data;
        this._status = FULFILLED;

        //执行队列里的函数
        let cb = this._fulfilledQueues.shift();
        cb(data)

    }
    //私有方法
    [REJECT](error) {
        this._val = error;
        this._status = REJECTED;

        //执行队列里的函数

    }

}

let my = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1000000)
    }, 1000);
})
my.then(data => {
    console.log('结果：', data);
})