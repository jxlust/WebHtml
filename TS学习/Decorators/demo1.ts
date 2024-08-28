function sealed(constructor: Function) {
  console.log(1, constructor);
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function enumerable(value: boolean) {
  console.log("enumerable: init");
  // 三个参数
  // 1．对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
  // 2．成员的名字。
  // 3．成员的属性描述符。
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("enumerable: called", target, propertyKey, descriptor);
    descriptor.enumerable = value;
  };
}

function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value;
  };
}

// 类装饰器
@sealed
class Demo {
  #name: string;
  private _x = 10;
  constructor(v: string) {
    this.#name = v;
  }

  // ts不允许同时装饰一个成员的get和set访问器
  // 访问器装饰器
  @configurable(false)
  get name() {
    return this.#name;
  }

  // 访问器装饰器
  @configurable(false)
  get x() {
    return this._x;
  }

  // 方法装饰器
  @enumerable(false)
  fullName() {
    return this.name + "-get";
  }
}
const demo = new Demo("demo1");
console.log("name:", demo.name);
// Demo.prototype.name = "100";
