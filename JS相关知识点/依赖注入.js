const createFunc = (obj) => {
  let app = Object.assign(obj, {
    abc: 1,
    print: () => {
      console.log("print.");
    },
  });
  return {
    intance: app,
    out() {
      app.print();
      app.abc = 999;
      console.log(1, app);
    },
  };
};

const { intance, out } = createFunc({
  applyOut() {
    out();
  },
});

intance.applyOut();
