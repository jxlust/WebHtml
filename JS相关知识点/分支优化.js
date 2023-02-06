function getNicknameByName(name) {
  let str = "";
  if (name.length > 3) {
    str = "姓名太长";
  } else if (name[0] === "李" && name !== "李老大") {
    str = "小李";
  } else if (name === "李老大") {
    str = "管理员";
  } else if (name[0] === "张") {
    str = "小张";
  } else {
    str = "神秘者";
  }
  return str;
}

const NickNameMap = [
  [(name) => name.length > 3, () => "名字太长"],
  [(name) => /^李.+/.test(name) && name !== "李老大", () => "小李"],
  [(name) => name === "李老大", () => "管理员"],
  [(name) => /^张.+/.test(name), () => "小张"],
];

function getNicknameByNameMap(name) {
  const findItem = NickNameMap.find(([condition]) => condition(name));
  if (findItem) {
    return findItem[1]();
  } else {
    return "神秘人";
  }
}

console.log(getNicknameByNameMap("jxl"));
console.log(getNicknameByNameMap("李大哥哥"));
console.log(getNicknameByNameMap("李老大"));
console.log(getNicknameByNameMap("李加拉"));
console.log(getNicknameByNameMap("张飞"));
console.log(getNicknameByNameMap("张"));
console.log(getNicknameByNameMap("小飞飞"));
