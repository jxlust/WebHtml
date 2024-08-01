// import { A } from "./src/tools";
import { injectable, createInstance } from "./src/ioc";

function add(a: string, b: string) {
  return a + b;
}

const v = add("1", "2");
console.log("v:", v);
// A();
@injectable
class B {
  constructor(public e: E) {
    // console.log("B:", this);
  }
}
@injectable
class C {
  constructor() {
    console.log("C:");
  }
}
@injectable
class D {
  constructor() {}
}

@injectable
class E {
  constructor() {}
}

@injectable
class A {
  constructor(public b: B, public c: C, public d: D) {
    console.log("A:");
  }
}

const a = createInstance(A);
