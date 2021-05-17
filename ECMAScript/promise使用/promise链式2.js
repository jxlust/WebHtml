Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then(res => {
    console.log(res);
})
Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() => {
    console.log(6);
})

new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000);
}).then(res => {
    console.log(res);
}).then(res => {
    console.log(2,res);
}).then(() => {
    console.log(4);
})