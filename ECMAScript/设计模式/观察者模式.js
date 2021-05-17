// 目标者
class Subject {
  constructor() {
    this.observers = []; // 观察者列表
  }

  // 添加订阅者
  add(observer) {
    this.observers.push(observer);
  }

  // 删除...
  remove(observer) {
    let idx = this.observers.findIndex(item => item === observer);
    idx > -1 && this.observers.splice(idx, 1);
  }

  // 通知
  notify() {
    for (let o of this.observers) {
      o.update();
    }
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }

  // 目标对象更新时触发的回调，即收到更新通知后的回调
  update() {
    console.log(`目标者通知我更新了，我是：${this.name}`);
  }
}

// 实例化目标者
let subject = new Subject();

// 实例化两个观察者
let obs1 = new Observer('前端');
let obs2 = new Observer('后端');

// 向目标者添加观察者
subject.add(obs1);
subject.add(obs2);

subject.notify();

// 优缺点：
// 　　优点明显：降低耦合，两者都专注于自身功能；
// 　　缺点也很明显：所有观察者都能收到通知，无法过滤筛选；
