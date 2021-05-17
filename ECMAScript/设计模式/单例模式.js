const setManager = function (name) {
    this.name = name;
}
setManager.prototype.getName = function () {
    return this.name;
}
const getSingleton = function (fn) {
    var instance = null;
    return function () {
        if (!instance) {
            instance = fn.apply(this, arguments);
        }
        return instance;
    }
}

const singleManager = getSingleton(function (name) {
    let m = new setManager(name);
    return m;
});
console.log(singleManager('lili').getName());
console.log(singleManager('11').getName());