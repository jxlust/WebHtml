function sum() {
  return 100;
}
const num = 999;
const cb = new Function("a", "b", "return a+b;");
console.log("sum:", cb(1, 2)); // 3

const cb2 = new Function("console.log('t:',this); return this.print()");
const obj = {
  a: 888,
  print() {
    return this.a;
  },
};
console.log(obj.print()); // 888

// 通过方法传递上下文,比如call,apply
console.log(cb2.call(obj)); // 888
// cb2.apply(obj)

//eval 是不安全的， eval执行访问的变量可能是局部的

function autofunc() {
  const a = 1;
  const fn = new Function("return a;");
  return fn();
}

// console.log(autofunc()); // error a is not defined

function autofunc2() {
  const a = 1;
  return eval("a;");
}
console.log("autofunc2:", autofunc2());

let a = 1;
let fn = function () {
  let a = 2;
  let result1 = new Function("console.log(a)"); // error a is not defined
  let result2 = eval("console.log(a);100;"); //打印出2
  //   result1();
  console.log("result2:", result2); // 100
};
fn();
