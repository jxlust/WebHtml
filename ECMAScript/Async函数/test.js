async function is(flag) {
    let rt = await new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (flag) {
                resolve(true);
            } else {
                reject(false);
            }
        }, 1000);
    })
    console.log('rt:',rt);
    return rt + '--';
}
console.log('1', is(true));
is(1).then(function (data) {
    console.log(1,data);
}).catch(function (e) {
    console.log(2,e);
});
// if () {
//     console.log(111);
// } else {
//     console.log(222);
// }

// function is(flag) {
    
// }