const debounce = (fn, wait) => {
  let timeout = null;
  return function () {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  }
}
const TEST = Symbol('test')
let obj = {
  [TEST]() {
    console.log(123);
    console.log(arguments);
  }
}

const throttle1 = function(fn,delay){
  let prev = Date.now();

  return function(){
    let content = this;
    let args = arguments;
    let now = Date.now();
    if(now - prev >= delay){
      //执行
      fn.call(content,args);
      prev = now;
      
    }
  }
}

const throttle2 = function(fn,delay){
  let timer  = null;

  return function(){
    let content = this;
    let args = arguments;
    if(!timer){
      timer = setTimeout(() => {
        fn.call(content,args)
        timer = null;
      }, delay);
    }
  
  }
}

const throttle = function(fn,delay){
  let timer = null;
  let startTime = Date.now();
  return function(){
    let curTime = Date.now();
    let remaining = delay - (curTime - startTime);
    let content = this;
    let args = arguments;
    timer && clearTimeout(timer);
    if(remaining <= 0){
      //立即执行
      fn.call(content,args);
      startTime = Date.now();
    }else{
      timer = setTimeout(fn,remaining);
    }
  }
}


const main = function () {
  document.querySelector('#scrollId').addEventListener('scroll', debounce(obj[TEST],1000))
  document.querySelector('#scrollId2').addEventListener('scroll', throttle(obj[TEST],1000))
}

main();