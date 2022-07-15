import assert from "assert";
const fibonacciDp = (n) => {
  if (n < 0) {
    return -1;
  }
  if (n < 2) {
    return 1;
  }
  let dp = new Array(n + 1);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
const fibonacciDp2 = (n) => {
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
};
// console.log(fibonacciDp(1))
//0 1 1 2 3 5 8 13 21 34 55
assert.strictEqual(fibonacciDp2(0), 0);
assert.strictEqual(fibonacciDp2(1), 1);
assert.strictEqual(fibonacciDp2(6), 8);
assert.strictEqual(fibonacciDp2(10), 55);

console.log("测试通过！");
