# webpack 模块联邦微应用架构

1. 主入口

```js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  // ...其他配置
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        app1: "app1@http://localhost:3001/remoteEntry.js",
        app2: "app2@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^19.0.0", // 指定共享库的版本要求
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.0.0", // 指定共享库的版本要求
        },
      },
    }),
  ],
};
```

2. 子应用入口

```js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  // ...其他配置
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      exposes: {
        "./MyComponent": "./src/components/MyComponent",
        // ...其他暴露的模块
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^19.0.0", // 指定共享库的版本要求
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.0.0", // 指定共享库的版本要求
        },
      },
    }),
  ],
};
```

3. 消费远程组件

```js
import MyComponent from "app1/MyComponent";
// ...
```

```js
// container-app/src/App.js
import React, { lazy, Suspense } from 'react';
const MyWidget = lazy(() => import('remoteApp/MyWidget'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <MyWidget />
      </Suspense>
    </div>
  );
}

export default App;
```

# 总结

优势
+ 独立开发和部署：每个微应用可以独立开发、构建和部署，提高了开发效率和部署灵活性。
+ 按需加载：只有当某个模块真正被使用时，才会加载对应的远程代码，优化了首屏加载时间和整体性能。
+ 版本管理和隔离：每个微应用可以自由升级其依赖，避免了版本冲突问题。
+ 易于维护和扩展：模块联邦的松耦合特性使得添加或移除微应用变得简单快捷。




> [https://cloud.tencent.com/developer/article/2425974](https://cloud.tencent.com/developer/article/2425974)