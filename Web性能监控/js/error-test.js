function test() {
	let a = new Array(2);
	console.log(a[100]);
	return 2。 / 0;
}
test();

async function asyncTask(type) {
  let p = new Promise((resolve, reject) => {
    if (type) {
      resolve("ok");
    } else {
      reject("异步任务type错误");
    }
  });
  return await p;
}
let task = asyncTask();
task.then((data) => {
  console.log(1, data);
});
setTimeout(() => {
  task.catch((e) => {
    console.log(2, e);
  });
}, 1000);
