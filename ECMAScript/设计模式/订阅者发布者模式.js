// 发布订阅模式（Publisher && Subscriber）
class PubSub {
  constructor(name) {
    this.name = name;
    this.eventHandler = {}
    this.id = new Date().getTime();
  }
  /**
   * 订阅消息
   * @param {*} key 
   * @param {*} fn 
   */
  subscribe(key, fn) {
    if (typeof fn === 'function') {
      if (!this.eventHandler[key]) {
        this.eventHandler[key] = [];
      }
      this.eventHandler[key].push(fn)
    } else {
      throw new TypeError('This subscribe is not a function!')
    }
  }
  /**
   * 取消订阅
   * @param {*} key 
   * @param {*} fn 方法对象的引用
   */
  unSubscribe(key, fn) {
    if (!this.eventHandler[key]) {
      return false;
    }
    if (!fn) {
      //不指定取消的方法，清空key下所有
      this.eventHandler[key] = null;
    }else{
      this.eventHandler[key] = this.eventHandler[key].filter(cb => cb != fn)
    }
    
  }

  /**
   * 发布
   * @param {*} key 订阅消息对应的key
   * @param  {...any} arg 参数序列
   */
  publish(key, ...arg) {
    if (!!this.eventHandler[key]) {
      this.eventHandler[key].forEach(callback => {
        // callback(...arg)
        callback.call(this, ...arg)
      })
    }
  }

}

function test() {
  const pubsub = new PubSub('jxl');
  const eat1 = function (what) {
    console.log(`I eat ${what}`);
  }
  const eat2 = function () {
    console.log(`I eat myself foods`);
  }
  pubsub.subscribe('eat', eat1)
  pubsub.subscribe('eat', eat2)
  pubsub.subscribe('play', function (what, who) {
    console.log(`I play ${what} with ${who}`)
  })

  pubsub.publish('play', 'basketball', 'xiaoming');
  pubsub.publish('eat', 'fish')

  pubsub.unSubscribe('eat',eat1)
  // pubsub.unSubscribe('eat')
  console.log('------------ after 1000ms ---------');
  setTimeout(() => {
    pubsub.publish('eat', 'fish')
  }, 1000);
}
test();
