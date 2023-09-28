import { bar } from "./b.js";
console.log("a.mjs");
console.log(bar());
function foo() {
  return "foo";
}
// const foo = 100;
// function foo2() {
//   return "foo2";
// }
export { foo };
