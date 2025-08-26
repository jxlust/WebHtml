## Jest 单元测试（基于 TS）

1. 依赖安装

```shell
pnpm add -D jest typescript @types/jest ts-jest
pnpm add -D @types/node
```

> @types/jest jest 最好一致

2. ts-jest 初始化配置
   jest 初始化

```shell
#配置script
#这里不用这个，我们用ts-jest配置
jest --init
```

```shell
ts-jest config:init
```

3. collectCoverage(收集覆盖范围) 测试收集报告

```json
{
  "collectCoverage": true,
  "coverageDirectory": "coverage",
  "coverageProvider": "v8"
}
```

ok,简单环境差不多搞定了

4. jest 编写测试用例

- test 文件夹，默认是 test 文件夹跑测试用例
- 建立一个 test suites，add.test.ts
- 编写测试用例

```js
import { add, reduceOne } from "../src/add";
describe("add func", () => {
  //测试用例
  it("1+1", () => {
    expect(add(1, 1)).toEqual(2);
  });
  it("0+0", () => {
    expect(add(0, 0)).toEqual(0);
  });
});

describe("reduceOne func", () => {
  //测试用例
  it("- 1", () => {
    expect(reduceOne(1)).toEqual(0);
  });
  it("- 0", () => {
    expect(reduceOne(0)).toEqual(-1);
  });
});
```

5. 执行测试用例

```shell
npm run test
```

脚本

```json
  "scripts": {
    "init-tsjest": "ts-jest config:init",
    "test": "jest",
    "init-jest": "jest --init"
  }
```

6. 异步方法测试用例

```js
const fetchData = (type: number) => {
  return (
    new Promise() <
    number >
    ((resolve, reject) => {
      setTimeout(() => {
        if (type < 10) {
          resolve(99);
        } else {
          reject("error");
        }
      }, 1000);
    })
  );
};
```

```js
import { fetchData } from "../src/asyncFunc";
test("fetch data", async () => {
  expect.assertions(1);
  try {
    const result = await fetchData(91);
    expect(result).toBe(99);
  } catch (error) {
    expect(error).toMatch("error1");
  }
});

test("fetch data2", async () => {
  expect.assertions(2);
  await expect(fetchData(9)).resolves.toBe(99);
  await expect(fetchData(11)).rejects.toMatch("error");
});
```

7. vscode jest 插件单独跑测试用例
   Jest Runner 安装


>参考链接：
>*官方文档: https://jestjs.io/docs/getting-started*