//原型链
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

const Children = function (age) {
    this.age = age;
}
Children.prototype = new Parent('zz');
Children.prototype.getAge = function () {
    return this.age;
}

let cd = new Children(111);
console.log(cd.colors);
cd.colors.push('black');
console.log(cd.colors);
let cd2 = new Children(13);
console.log(cd2.colors);
