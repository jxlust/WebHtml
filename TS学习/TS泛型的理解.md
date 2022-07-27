## TS 泛型的理解

### 1. 泛型

- T：代表 Type，定义泛型时通常用作第一个类型变量名称
- K：代表 Key，表示对象中的键类型；
- V：代表 Value，表示对象中的值类型；
- E：代表 Element，表示的元素类型；
- ...

```js
function transfArray<T>(data: T): T[] {
  let result = [];
  for (let i = 1; i < 3; i++) {
    result.push(data);
  }
  return result;
}
// console.log(transfArray<string>("sss"));
// console.log(transfArray(100));
// console.log(transfArray({ age: 100, name: "xxx" }));
function getInfo<T, U>(name: T, age: U): { name: T, age: U } {
  const result = { name, age };
  return result;
}
```

### 2. 泛型接口 interface

```js
interface A<T> {
  data: T;
  (data: T): T;
}

const myA: A<string> = (data) => {
  return `data:${data}`;
};
myA.data = "str";
```

### 3. 接口里的泛型方法

使用的时候是泛型类型，使用 myB 的时候才能确定类型

```js
interface B {
  <T>(data: T): T;
}

const myB: B = <T>(s: T): T => {
  return s;
};
console.log(myB("s"));
```

### 4. 泛型类

```js
class StackArray<T> {
  private arr: T[] = [];
  constructor() {
    this.arr = [];
  }

  add(v: T) {
    this.arr.push(v);
  }

  top(): T | null {
    if (this.arr.length) {
      return this.arr[this.arr.length - 1];
    } else {
      return null;
    }
  }
}
let myArray = new StackArray<number>();
myArray.add(100);
myArray.add(99);
// myArray.add('str');//error
console.log(myArray.top());

```

### 5. 泛型类型别名 type

```js
type User<T> = {
  name?: T,
  age?: T,
};

const u1: User<string> = {
  name: "xiaozi",
};
const u2: User<number> = {
  age: 12,
};
```

### 6.泛型的默认参数

```js
const buildArray = <T = string>(data: T): T[] => {
  let result: T[] = [];
  for (let i = 0; i < 3; i++) {
    result.push(data);
  }
  return result;
};
buildArray(a);
```

### 7.关键字和工具类型的使用

1. **extends**: 检验是否拥有其属性 在这里

```js
interface PropsLen {
  length: number;
}
const calcArray = <T extends PropsLen>(data: T): number => {
  return data.length;
};
calcArray('str')
calcArray([])
calcArray(1)//erro

//条件类型
//  T extends U ? X : Y;

```

2. **typeof**: 利用来推出类型

```js
let data = {
  name: "小李",
  age: 11,
  sex: true,
};
type DataProps = typeof data;
// 推出来了类型：
// {name:string,age:number,sex:boolean}
```

3. **keyof** 关键字: 可以获取一个对象接口的所有 key 值,可以检查对象上的键是否存在

```js

type base = keyof any;//string | number |symbol

interface UserProps {
  name: string;
  age: number;
  sex: boolean;
}
type up = keyof UserProps;//"name" | "age" | "sex"
const n:up = 'name';
const n2:up = 'name1';//not exist name1
```

泛型中使用：

```js
function getValueByKey<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}
const obj = {
  name: "xxx",
  age: 12,
};
console.log(getValueByKey(obj, "age"));
console.log(getValueByKey(obj, "name"));
```

4. **索引访问操作符**：通过 [] 操作符可进行索引访问,可以访问其中一个属性

```js
interface UserProps {
    name: string;
    age: number;
    sex: boolean;
}
type n = UserProps['sex']; //boolean
```

5. **in**：映射类型, 用来映射遍历枚举类型

```js
type Name = "name" | "age" | "sex"; //字面量
type NameType = string | number | boolean;
type NameProps = {
  [k in Name]: NameType;
};
// {name: any,age: any,sex: any}
```

6. **infer**：可以是使用为条件语句，可以用 infer 声明一个类型变量并且对它进行使用。

```js

interface UserProps {
  name: string;
  age: number;
  sex: boolean;
}

type InferProps<T> = T extends { name: infer U; age: infer U } ? U : never;
type IProps = InferProps<UserProps>; //string | number
type IProps4 = InferProps<number>; //never

type InferProps2<T> = T extends (infer U)[] ? U : never;
type IProps2 = InferProps2<number[]>// number
type IProps3 = InferProps2<[number,string]>// number | string
```

7. **Partial** 、**Required** 、 **Readonly**

- Partial<T> 将所有属性变为?可选的;
- Required<T> 将所有属性变为必选的，与 Partial 相反;
- Readonly<T> 作用：将所有属性都加上 readonly 修饰符来实现。也就是说无法修改

```js
interface Props {
  name: string;
  age: number;
  sex?: boolean;
}

const info: Partial<Props> = {
  name: "xiaozi",
};

const info1: Required<Props> = {
  name: "xiaozi",
  age: 2,
  sex: true,
};

const info2: Readonly<UserProps> = {
  age: 100,
  name: "xiaofei",
  sex: true,
};
info2.age = 20; //error read only
```

8. **Record**: Record<K extends keyof any, T>
   作用：将 K 中所有的属性的值转化为 T 类型。
   K：string、number、symbol

```js
interface UserProps {
  name: string;
  age: number;
}
type NameProps = "Rust" | "Js" | "Python";

type KindTypes = Record<NameProps, UserProps>;
const KindData: KindTypes = {
  Rust: { name: "xiaoli", age: 100 },
  Js: { name: "xz", age: 102 },
  Python: { name: "ff", age: 101 },
};
```

9. **Pick**语法：Pick<T, K extends keyof T>
   作用：将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。

```js
interface UserProps {
  name: string;
  age: number;
  sex: boolean;
}

type PickUser = Pick<UserProps, "name" | "age">;
const PickData: PickUser = {
  name: "jxl",
  age: 10,
};
```

10. **Exclude** 语法：Exclude<T, U>
    作用：将 T 类型中的 U 类型剔除。

```js
//数字
type ExcludeNumber = Exclude<1 | 2 | 3, 1 | 2>; //3
type ExcludeNumber2 = Exclude<1 | 2, 1 | 2 | 9>; //never
type ExcludeNumber3 = Exclude<1 | 2, 9>; // 1 | 2
//字符串
type ExcStr = Exclude<"Js" | "Ts" | "Rust", "Js">; // TS | Rust
//function
type typeProps = Exclude<string | number | (() => void), Function>; // string | number
// 对象
type obj = { name: 1, sex: true };
type obj1 = { name: 1 };
type objProps = Exclude<obj, obj1>; // nerver
```

> 当 T 中有 U 就会剔除对应的属性，如果 U 中又的属性 T 中没有，或 T 和 U 刚好一样的情况都会返回 nerver，且对象永远返回 nerver

11. **Extract 语法**：Extract<T, U>
    作用：将 T 可分配给的类型中提取 U。与 Exclude 相反

```js
type typeProps = Extract<string | number | (() => void), Function>; // ()=>void
type ExtProps2 = Extract<1 | 2 | 3, 2 | 3>; //2 | 3
```

12. Omit 语法：Omit<T, U>
    作用：将已经声明的类型进行属性剔除获得新类型

```js
interface UserProps {
  name: string;
  age: number;
  sex: boolean;
}
// type ExcUser = Exclude<keyof UserProps, "sex">;//name|age
type OmiUser = Omit<UserProps, "sex">;
const data: OmiUser = {
  name: "x",
  age: 20,
};
```

> 与 Exclude 的区别：Omit 返回的是新的类型，原理上是在 Exclude 之上进行的，Exclude 是根据自类型返回的

13. **NonNullable**、**ReturnType** 、**Parameters**

- NonNullable 语法：NonNullable<T>
  作用：从 T 中排除 null 和 undefined
- ReturnType 语法：ReturnType<T>
  作用：用于获取 函数 T 的返回类型。
- Parameters：Parameters<T>
  作用：用于获取 获取函数类型的参数类型

```js
type NotNull = NonNullable<number | string | undefined | null | never>; // number | string


type FunType = () => number;
type FunReturn = ReturnType<FunType>; //number

type FunType2 = (v1: string, v2: number) => number;
type FunParam = Parameters<FunType2>; //[v1:string,v2:number]
const data: FunParam = ["1", 1];
```