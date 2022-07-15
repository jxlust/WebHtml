import Benchmark from "benchmark";
// import { assemblyFunc } from '../build/release.js'
function fibonacciJs(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacciJs(n - 1) + fibonacciJs(n - 2);
}
function fibonacciDp(n) {
  if (n <= 0) {
    return 0;
  }
  let p1 = 0,
    p2 = 1,
    cur = 1;
  for (let i = 2; i <= n; i++) {
    cur = p1 + p2;
    p1 = p2;
    p2 = cur;
  }
  return cur;
}
const suite = new Benchmark.Suite();
const startNumber = 2;
const stopNumber = 40;

suite
  .add("js func", function () {
    for (let i = startNumber; i < stopNumber; i++) {
      fibonacciJs(i);
    }
  })
  .add("dp func", function () {
    for (let i = startNumber; i < stopNumber; i++) {
      fibonacciDp(i);
    }
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    const fastest = this.filter("fastest");
    const slowest = this.filter("slowest");
    const difference =
      ((fastest.map("hz") - slowest.map("hz")) / slowest.map("hz")) * 100;
    console.log(`${fastest.map("name")} is ~${difference.toFixed(1)}% faster.`);
  })
  .run();
