function p1(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${data}-p1-success`)
    }, 5000);
  })
}
async function p2(data) {
  // let ret = await `${data}-p2-success`;
  let ret = await Promise.resolve(`${data}-p2-success`)

  return ret;
}
function p3(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${data}-p3-success`)
    }, 6000);
  })
}
async function get() {
  let promises = [p1('xiaomi'), p2('iphone'),p3('opop')];
  let ret = [];
  for (let p of promises) {
    console.log(1);
    let r = await p;
    console.log(1,r);
    ret.push(r);
  }
  console.log(ret);
  return ret;
}
async function get2() {
  let promises = [p1('xiaomi'), p2('iphone'),p3('opop')];
  let ret = await Promise.all(promises);
  console.log('ret:',ret);
}
// get().then(ret => {
//   console.log('回调：', ret);
// })
get2()
