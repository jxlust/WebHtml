import "reflect-metadata";

const classPool: Array<Function> = [];

export function injectable(_constructor: Function) {
  const name = Reflect.getMetadata("name", _constructor);
  console.log(1, _constructor);
  // 获取参数类型
  const paramsTypes = Reflect.getMetadata("design:paramtypes", _constructor);
  console.log("paramsTypes:", paramsTypes);
  if (classPool.indexOf(_constructor) !== -1) {
    // 已经存在
    return;
  }
  if (paramsTypes?.length) {
    // 存在参数,判断参数中依赖的类是否合法
    for (let i = 0; i < paramsTypes.length; i++) {
      const paramsItem = paramsTypes[i];
      if (paramsItem === _constructor) {
        throw new Error("不可以依赖自身");
      } else if (classPool.indexOf(paramsItem) === -1) {
        throw new Error(`依赖${i}${paramsItem.name}不存在`);
      }
    }
  }
  classPool.push(_constructor);
}

export function createInstance<T>(_constructor: {
  new (...args: any[]): T;
}): T {
  const paramsTypes = Reflect.getMetadata("design:paramtypes", _constructor);
  const parmasInstance = paramsTypes?.map((v: any, i: any) => {
    if (classPool.indexOf(v) === -1) {
      throw new Error(`依赖${i}${v.name}不存在`);
    } else if (v.length) {
      return createInstance(v);
    } else {
      return new v();
    }
  });
  return new _constructor(...parmasInstance);
}
