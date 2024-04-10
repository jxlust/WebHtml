const fn = async () => {
  setTimeout(() => {
    console.log(1);
  }, 0);
  console.log(2);

  await new Promise((resolve) => {
    console.log(3);
    setTimeout(() => {
      console.log(4);
      Promise.resolve("2").then(() => {
        console.log(8);
      });
      resolve("ok");
      console.log(6);
      setTimeout(() => {
        console.log(7);
      }, 0);
    }, 0);
  });
  console.log(5);
  Promise.resolve("x").then(() => {
    console.log(9);
  });
};
fn();
