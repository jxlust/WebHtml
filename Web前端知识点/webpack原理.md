##

[https://segmentfault.com/a/1190000021494964?utm_source=tag-newest](https://segmentfault.com/a/1190000021494964?utm_source=tag-newest)

entry，从入口文件 entry 解析，解析成 AST 语法树对象，如果有模块依赖递归解析出来，

1. 定义 Compiler 类
2. 解析入口文件,获取 AST
3. 找出所有依赖模块
4. AST 转换为 code
   将 AST 语法树转换为浏览器可执行代码,我们这里使用@babel/core 和 @babel/preset-env。
5. 递归解析所有依赖项,生成依赖关系图
6. 重写 require 函数,输出 bundle
