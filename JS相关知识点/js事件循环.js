console.log(1);

setTimeout(() => {
    new Promise(resolve => {
        resolve()
    }).then(() => {
        console.log(8);
        return 22
    }).then((data) => {
        console.log(data);
    })
    console.log(2);
}, 0);

new Promise(resolve => {
    console.log(3);
    setTimeout(() => {
        resolve();
        console.log(999)
    }, 0);
    console.log(333);
}).then(res => {
    console.log(4);
})

console.log(6);

// console.log(1)

// setTimeout(() => {
//     console.log(2)
// }, 3000);

// setTimeout(() => {
//     console.log(3)
// }, 100);