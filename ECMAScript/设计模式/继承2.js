//原型链 构造函数组合继承
const Parent = function (name) {
    this.name = name;
    this.colors = ['red', 'yellow', 'blue'];
}

Parent.prototype.getName = function () {
    return this.name;
}
Parent.prototype.getColors = function () {
    return this.colors;
}

const Children = function (age,name) {
    this.age = age;
    Parent.call(this,name);
}
Children.prototype = new Parent();
// Children.prototype.constructor = Children;
Children.prototype.getAge = function () {
    return this.age;
}
console.log(Children.prototype.constructor);

let cd = new Children(111,'lili');
console.log(cd.getName());
cd.colors.push('black');
console.log(cd.colors);
let cd2 = new Children(13,'zz');
console.log(cd2.colors);

console.log((cd2 instanceof Parent));