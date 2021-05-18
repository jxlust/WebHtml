// var str = "hello 你好";
// console.log(str);

// function foo(x) {
//     var tmp = 3;
//     return function (y) {
//         console.log(x + y + (++tmp));
//     }
// }
// var bar = foo(2); // bar 现在是一个闭包
// bar(10);
// bar(10);


function checkForm(timer,url,callback) {
    var flag  = false;
    return function () {
        if(flag){
            return;
        }
        flag = true;
        console.log(222);
        setTimeout(() => {
            console.log(111111111);
            flag = false;
        }, 3000);
    }
}
var cf = checkForm();
cf();
cf();
cf();
cf();



