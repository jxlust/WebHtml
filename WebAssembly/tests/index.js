import assert from "assert";
import { add, fibonacci } from "../build/debug.js";

const fobonacciByJs = (n) => {
  if (n < 2) return 1;
  return fobonacciByJs(n - 1) + fobonacciByJs(n - 2);
};

let nums = [5, 25, 30, 50];
for (let num of nums) {
  let jsTime = 0,
    wasmTime = 0;
  let time = 10;
  for (let i = 0; i < time; i++) {
    //js
    let start = performance.now();
    fobonacciByJs(num);
    jsTime += performance.now() - start;

    //wasm
    start = performance.now();
    fibonacci(num);
    wasmTime += performance.now() - start;
  }
  //平均时长
  console.log(`js 调用执行平均时长：${jsTime / 10}`);
  console.log(`wasm 调用执行平均时长: ${wasmTime / 10}`);
}

assert.strictEqual(add(1, 2), 3);
console.log("ok");
