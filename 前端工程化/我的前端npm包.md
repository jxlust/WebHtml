### 一、打包工具选择
+ Webpack
+ Parcel
+ Rollup
>在深入对比Webpack、Parcel、Rollup打包工具中，我们总结了，rollup相比于webpack更适合打包一些第三方的类库

### 二、npm域级包
```
npm init --scope=username
```

### 三、package.json文件说明
1. 依赖
+ dependencies：表示生产环境下的依赖管理，--save 简写 -S；
+ devDependencies：表示开发环境下的依赖管理，--save-dev 简写 -D；
+ peerDependencies 宿主依赖

2. 许可证

3. 版本号

npm包的版本号也是有规范要求的，通用的就是遵循semver语义化版本规范，版本格式为：major.minor.patch，每个字母代表的含义如下：
+ 主版本号(major)：当你做了不兼容的API修改

+ 次版本号(minor)：当你做了向下兼容的功能性新增

+ 修订号(patch)：当你做了向下兼容的问题修正

先行版本号是加到修订号的后面，作为版本号的延伸；当要发行大版本或核心功能时，但不能保证这个版本完全正常，就要先发一个先行版本。

先行版本号的格式是在修订版本号后面加上一个连接号（-），再加上一连串以点（.）分割的标识符，标识符可以由英文、数字和连接号（[0-9A-Za-z-]）组成。例如：
```
1.0.0-alpha
1.0.0-alpha.1
1.0.0-0.3.7
```
常见的先行版本号有：

+ alpha：不稳定版本，一般而言，该版本的Bug较多，需要继续修改，是测试版本
+ beta：基本稳定，相对于Alpha版已经有了很大的进步，消除了严重错误
+ rc：和正式版基本相同，基本上不存在导致错误的Bug
+ release：最终版本

### 工具包开发
目录：
```
hello-npm
|-- lib/（存放打包后的文件）
|-- src/（源码）
|-- package.json
|-- rollup.config.base.js（rollup基础配置）
|-- rollup.config.dev.js（rollup开发配置）
|-- rollup.config.js（rollup正式配置）
|-- README.md
|-- tsconfig.json
```

### 其他
>参考链接：[https://blog.csdn.net/xgangzai/article/details/123059207](https://blog.csdn.net/xgangzai/article/details/123059207)