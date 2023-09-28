import { foo } from "./a.js";
console.log("b.mjs");
console.log(foo());
function bar() {
  return "bar";
}
export { bar };
