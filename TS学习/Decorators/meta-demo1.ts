import "reflect-metadata";

@Reflect.metadata("inClass", "A")
class Test {
  public hello() {
    return "hello jxl";
  }
}
console.log(Reflect.getMetadata("inClass", Test));
