const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
console.log(view.byteLength); // 8

const view2 = new Int32Array(8);
console.log(view2.byteLength); // 4 * 8 = 32
view2[0] = 999;
console.log(view2);
// 结构化克隆
// structuredClone

const original = {
  a: 1,
  b: view2,
};

const clone = structuredClone(original, { transfer: [original.b.buffer] });
console.log(clone);
console.log("clone:", clone.b.byteLength); // 32
console.log("org:", original.b.byteLength); // 0
console.log("view2:", view2.byteLength);
