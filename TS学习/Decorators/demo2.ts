require("reflect-metadata");

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
  return (Reflect as any).metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return (Reflect as any).getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter {
  @format("Hello, %s")
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    let formatString = getFormat(this, "greeting");
    console.log("formatString:", formatString);
    return formatString.replace("%s", this.greeting);
  }
}

const gt = new Greeter("msg");
console.log(gt.greet());

// 上述示例中当@format("Hello, %s")被调用时，会添加一条这个属性的元数据，
// 通过reflect-metadata库里的Reflect.metadata函数，当getFormat被调用时，会读取格式的元数据。
