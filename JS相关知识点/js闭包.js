// let a = 'xiaoxiao';
// function fn() {
//     let b = 1;
//     console.log(a)
// }
// // console.log(b);
// fn();

// 作用域链
let name = "xz111";
function fn1() {
  let name = "22222";
  function fn2() {
    let name = "333333";
    console.log(name);
  }
  fn2();
}
fn1();
function makeCounter() {
  let num = 0;
  function changeVal(val) {
    num += val;
  }
  return {
    add: () => {
      changeVal(1);
    },
    reduce: () => {
      changeVal(-1);
    },
    value: () => {
      return num;
    },
  };
}
let makeCounter1 = makeCounter();
let makeCounter2 = makeCounter();

makeCounter1.add();
makeCounter1.add();
makeCounter2.reduce();
console.log(makeCounter1.value());
console.log(makeCounter2.value());

