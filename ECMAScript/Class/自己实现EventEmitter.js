class EventEmitter{
  constructor(){
    //存放所有事件委托的对象
    this.eventHandler = {}
    this.key = 'test'
  }
  on(name,handler){
    if(typeof handler !== 'function'){
      throw new TypeError('Event handler is not a function.')
    }
    if(!this.eventHandler[name]){
      this.eventHandler[name] = [];
    }
    this.eventHandler[name].push(handler)
    return this;
  }
  emit(name,...args){
    if(!!this.eventHandler[name]){
      this.eventHandler[name].forEach(handler => {
        if(typeof handler === 'function'){
          handler(...args)
        }
      })
    }
    // if(!!this.eventHandler['*']){

    // }
    return this;
  }
  show(){
    console.log(1,this.key);
  }
}
let event = new EventEmitter();
event.on('myevent',function (...data) {
  console.log('接受到了数据:',data);
})
console.log( event.emit('myevent','i','love','you'));


