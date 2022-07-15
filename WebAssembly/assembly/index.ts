// The entry file of your WebAssembly module.
function add(a: i32, b: i32): i32 {
  return a + b;
}

function fibonacci(n: i32): i32 {
  if (n < 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
function testAbort(n: i32): i32 {
  if (n === 100) {
    abort();
  }
  return n;
}

export { add, fibonacci, testAbort };
