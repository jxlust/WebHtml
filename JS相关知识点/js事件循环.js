console.log(1);

setTimeout(() => {
    new Promise(resolve => {
        resolve()
    }).then(() => {
        console.log(8);
    })
    console.log(2);
}, 10);

new Promise(resolve => {
    console.log(3);
    resolve();
}).then(res => {
    console.log(4);
})

console.log(6);