require("reflect-metadata");

// 示例中使用@required添加了元数据实体把参数标记为必须得，@validate装饰器包裹函数，在调用原先的函数前验证函数参数。

const requiredMetadataKey = Symbol("required");

function required(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  let existingRequiredParameters: number[] =
    (Reflect as any).getOwnMetadata(requiredMetadataKey, target, propertyKey) ||
    [];

  existingRequiredParameters.push(parameterIndex);

  (Reflect as any).defineMetadata(
    requiredMetadataKey,
    existingRequiredParameters,
    target,
    propertyKey
  );
}

function validate(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  let method = descriptor.value;

  descriptor.value = function () {
    let requiredParameters: number[] = (Reflect as any).getOwnMetadata(
      requiredMetadataKey,
      target,
      propertyName
    );

    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (
          parameterIndex >= arguments.length ||
          arguments[parameterIndex] === undefined
        ) {
          throw new Error("Missing required argument.");
        }
      }
    }

    return method?.apply(this, arguments);
  };
}

class Greeter2 {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  @validate
  greet(@required name: string) {
    return "Hello " + name + ", " + this.greeting;
  }
}

const g2 = new Greeter2("how are you");
console.log(g2.greet("jxl"));
