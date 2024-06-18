async function asyncApi() {

    const response = await fetch('http://127.0.0.1:5502/JS%E7%9B%B8%E5%85%B3%E7%9F%A5%E8%AF%86%E7%82%B9/test.json')
    const data = await response.json()
    return data;
}

async function func1() {
    // TODO some...
    const res = await asyncApi();
}

async function func2() {
    // TODO some...
    await func1();
    // TODO some...
}

// 怎么样可以消除异步的影响，只用存函数获取到api里面返回的值

// 将所有的函数改造成同步函数。然后，自定义一个fetch，将报错拦截再继续调用自身异步函数，如果返回正确值则就触发其包含的下一步实现。

function api() {
    return fetch('http://127.0.0.1:5502/JS%E7%9B%B8%E5%85%B3%E7%9F%A5%E8%AF%86%E7%82%B9/test.json')
}


function task() {
    return api();
}

function main() {
    const t = task();
    console.log('task reuslt', t);
}

// main()

function runTask(func) {
    console.log('run start...')
    // 缓存需要存储的数据对象结构
    // { status:'', data:'', error:'' }
    const cacheList = [];
    let cIndex = 0;

    const _orginFect = window.fetch;

    window.fetch = (...args) => {
        // 存在缓存
        const cacheInfo = cacheList[cIndex];
        if (cacheInfo) {
            if (cacheInfo.status === 'fulfilled') {
                // ok
                return cacheInfo.data;
            } else if (cacheInfo.status === 'rejected') {
                return cacheInfo.error;
            }

        }
        const result = {
            status: 'pending',
            data: null,
            error: null
        }
        cacheList[cIndex++] = result;
        const promise = _orginFect(...args).then((res) => res.json()).then(data => {
            result.data = data;
            result.status = 'fulfilled'
        }).catch(e => {
            result.error = e;
            result.status = 'rejected'
        });
        // 由于传递的执行函数func，通过return没法获取到请求的promise, 可以通过throw promise来获取;
        throw promise;
    }

    try {
        // 里面的fetch会拦截到自定义的fetch，然后返回缓存中的数据，如果没有缓存数据就会报错
        func();
    } catch (error) {
        console.log(error)
        if (error instanceof Promise) {
            const reRun = () => {
                cIndex = 0;
                func();
            }
            error.then(reRun).catch(reRun)
        }
    }

}

runTask(main)