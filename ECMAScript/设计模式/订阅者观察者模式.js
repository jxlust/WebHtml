/**
 * @author jxl
 * @description 设计订阅-发布模式重写监听路由变化 
 * 参考网上实现
 * */
class Dep {
  constructor() {
    this.id = new Date().getTime();
    this.subs = []; //订阅者集合
  }
  defined() { // 添加订阅者
    Dep.watch.add(this)
  }
  notify() {
    this.subs.forEach(e => {
      if (typeof e.update === 'function') {
        try {
          e.update.apply(e,arguments) //触发更新函数
        } catch (error) {
          throw new Error(error);
        }
      } else {
        throw new TypeError('This is not a function!')
      }
    })
  }
}

Dep.watch = null;

//观察者（发布者）
class Watch {
  constructor(name, fn) {
    //订阅消息的名称
    this.name = name;
    this.id = new Date().getTime();
    //订阅消息发送改变时->订阅者执行的回调函数
    this.callback = fn;
  }
  add(dep) {
    //将订阅者放入dep订阅集合
    dep.subs.push(this);
  }
  update() {
    let cb = this.callback;
    cb(this.name,arguments);
  }
}

//例子
function test(){
  const depInstance = new Dep();
  const watchObj = new Watch('hit', function (name,arg) {
    console.log(`I hit ${name}`);
    let arr = [...arg];
    console.log(arr[0]);
  })
  Dep.watch = watchObj;
  depInstance.defined();//添加一个订阅者
  Dep.watch = null;//添加完成置空
  setTimeout(() => {
    depInstance.notify('newValue','newv2');
  }, 1000);
}
test();




