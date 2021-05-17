async function  testCase() {
    //继发
    let foo = await getFoo();
    let bar = await getBar();
    //解释：需要getFoo执行返回后才能继续执行getBar,耗时

    //并发
    let fooPromise = getFoo();
    let barPromise = getBar();
    //拿结果
    let fooRt = await fooPromise;
    let barRt = await barPromise;

}

const postTest = function (time) {
    return new Promise((resolve,reject) => {
        if(time > 0){
            setTimeout(() => {
                resolve(`This time${time} is ok.`)
            }, time);
        }else{
            reject('Time Error!')
        }
    })
}

async function doPost() {
    let promises = [3000,1000,5000].map(time => {
        return postTest(time)
    })
    // console.log('p',promises);
    //上面并发了请求，然后对promises依次取值
    let result = [];
    for(let p of promises){
        let r = await p;
        // console.log(1,r);
        result.push(r)
    }
    //分析：第一个await会消耗三秒，当三秒后打印3000和1000的数据，1000的数据早获取到了，
    //然后卡住，继续等至第5秒，打印5000的数据，整个取值，总得只要花费最大请求时长5秒的时间。
    console.log(result);
    return result;
}
async function doPost2() {
  let promises = [3000,1000,5000].map( async time => {
      let ret =  await postTest(time)
      return ret;
  })
  // console.log('p',promises);
  //上面并发了请求，然后对promises依次取值
  let result = [];
  for(let p of promises){
      let r = await p;
      // console.log(1,r);
      result.push(r)
  }
  //分析：第一个await会消耗三秒，当三秒后打印3000和1000的数据，1000的数据早获取到了，
  //然后卡住，继续等至第5秒，打印5000的数据，整个取值，总得只要花费最大请求时长5秒的时间。
  console.log(result);
  return result;
}

console.log(doPost());


