const apis = []
const times = [1, 3, 1, 2, 3, 1, 1, 2, 2, 1, 1]
for (let i = 0, len = times.length; i < len; i++) {
    apis.push({
        requestId: i + 1,
        url: '/api' + (i + 1),
        time: times[i]
    })
}


function apiFunc(options) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${options.requestId}: api${options.url} 请求成功 耗时 ${options.time} 秒`);
        }, options.time * 1000);
    })
}


// 控制最大并发数量

const runResults = []
function limitQueueRun(max = 6) {
    const queue = [];
    // 当前执行的数量
    let current = 0;

    const exeQueue = () => {
        while (current < max && queue.length) {
            current++;
            const promise = queue.shift();
            promise.then((res) => {
                console.log(`当前并发数 ${current}`, `结果：${res}`);
            }).catch(e => {
                console.log(e)
            }).finally(() => {
                current--;
                exeQueue();
            });
        }
    }
    return (promiseFactory) => {
        queue.push(promiseFactory);
        exeQueue();
    }
}

async function run2() {
    console.time('run2');
    const taskQueueFunc = limitQueueRun();
    for (let i = 0, len = apis.length; i < len; i++) {
        taskQueueFunc(apiFunc(apis[i]));
    }

    console.timeEnd('run2');
}

run2();
