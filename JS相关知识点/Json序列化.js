const obj = {
  a: {
    nnn: "00",
  },
  b: {
    c: "hhh",
    d: "xxxx",
    e: {
      f: 100,
    },
    a: "xxxxxxx",
  },
  uu: "888",
};

const objStr = JSON.stringify(obj);

function filtersSomeKey(str) {
  let newObj = JSON.parse(str, (k, v) => {
    console.log("reviver:", k, v);
    if (["f", "c"].includes(k)) {
      return undefined;
    } else {
      return v;
    }
  });
  console.log(newObj);
}

filtersSomeKey(objStr);
