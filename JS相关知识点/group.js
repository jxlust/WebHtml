const list = [
  {
    tag: "A",
    id: 1,
  },
  {
    tag: "B",
    id: 1223,
  },
  {
    tag: "A",
    id: 10,
  },
  {
    tag: "C",
    id: 12,
  },
];

const obj = list.reduce((prev, cur, index) => {
  if (!prev[cur["tag"]]) {
    prev[cur["tag"]] = [];
  }
  prev[cur["tag"]].push(cur);
  return prev;
}, {});

console.log(1, obj);
