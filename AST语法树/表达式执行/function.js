const func = new Function(`console.log('执行方法');console.log("a:",this.a); return this.say('jx');`);
const a = 100;
const obj = {
    a: 88,
    say: (str) => `hello ${str}`
}
const v = func.apply(obj)
console.log(v)

