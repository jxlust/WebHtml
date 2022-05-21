### 1. 前期准备
1. node
2. npm
3. python
4. 最好有vpn代理（科学上网）

### 2. 方案
业界主流的私有npm仓库搭建的主流方案有如下几种：
1. 付费购买
2. 使用 git+ssh 这种方式直接引用到 GitHub 项目地址
3. 使用 verdaccio
4. 使用 npmjs.org

### 3. 服务端搭建

1. 安装verdaccio
```
npm install --global verdaccio
```

2. 运行
```
verdaccio
```
浏览器输入 http://localhost:4873/ 访问服务

3. config说明
```shell
#
# #号后面是注释

# 这是默认的配置文件。
# 它允许所有用户做任何事，所以不要在生产系统上使用它。
#
# 这里有更多配置文件的例子:
# https://github.com/verdaccio/verdaccio/tree/master/conf
#

# 所有包的缓存目录
storage: /Users/chenzimin/.local/share/verdaccio/storage
# 插件目录
plugins: ./plugins


#开启web 服务,能够通过web 访问
web:
  title: Verdaccio
  # 注释掉以禁用gravatar支持
  # gravatar: false
  # 默认情况下，包是orderer ascendant (asc|desc)
  # sort_packages: asc
  # 将你的UI转换成黑暗模式
  # darkMode: true
  # logo: http://somedomain/somelogo.png
  # 网站图标(favicon): http://somedomain/favicon.ico | /path/favicon.ico
  # rateLimit:
  #   windowMs: 1000
  #   max: 10000


#验证信息
auth:
  htpasswd:
    # 用户信息存储目录
    file: ./htpasswd
    # 允许注册的最大用户数，默认为“+inf”。
    # 您可以将此设置为-1以禁用注册。
    # max_users: 1000

# 可以联系的其他已知存储库列表
#公有仓库配置
uplinks:
  npmjs:
    url: https://registry.npmjs.org/

packages:
  '@*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    
    #代理 表示没有的仓库会去这个npmjs 里面去找 ,
    #npmjs 又指向  https://registry.npmjs.org/ ,就是上面的 uplinks 配置
    proxy: npmjs

  '**':
    # 权限配置说明：
    # 允许所有用户(包括未经身份验证的用户)读取和发布所有包
    #
    # 你也可以指定用户名/组名配置访问权限，根据你的auth插件或者使用以下关键字配置权限：
    # "$all"， "$anonymous"， "$authenticated"
    access: $all

    # 发布package 的权限
    publish: $authenticated
    unpublish: $authenticated

    # 如果package 不存在,就向代理的上游服务发起请求
    proxy: npmjs

# You can specify HTTP/1.1 server keep alive timeout in seconds for incoming connections.
# A value of 0 makes the http server behave similarly to Node.js versions prior to 8.0.0, which did not have a keep-alive timeout.
# WORKAROUND: Through given configuration you can workaround following issue https://github.com/verdaccio/verdaccio/issues/301. Set to 0 in case 60 is not enough.
server:
  keepAliveTimeout: 60

middlewares:
  audit:
    enabled: true

# 监听的端口 ,重点, 不配置这个,只能本机能访问
listen: 0.0.0.0:4873
# http_proxy: http://代理服务器ip:8080
# https_proxy: http://代理服务器ip:8080
# no_proxy: localhost,127.0.0.1  #不适用代理的iP

# log settings
logs: { type: stdout, format: pretty, level: http }

```
4. config配置常用说明
+ $all 表示所有人(已注册、未注册)都可以执行对应的操作
+ $authenticated 表示只有通过验证的人(已注册)可以执行对应操作，注意，任何人都可以去注册账户。
+ $anonymous 表示只有匿名者可以进行对应操作（通常无用）
+ 或者也可以指定对应于之前我们配置的用户表 htpasswd 中的一个或多个用户，这样就明确地指定哪些用户可以执行匹配的操作
+ 监听端口和主机名。
localhost:4873 　　　　#默认
0.0.0.0:4873　　　　　#表示在所有网卡监听
```shell
# 修改配置后执行
verdaccio -c config.yml
```

### 4.账号的注册和管理

1. 方法一命令行方式：

```shell
npm adduser --registry http://localhost:4873/
# npm adduser --registry http://xxxxx:4873/
```

2. 把加密后的账户密码添加到htpasswd文件中

>htpasswd在线生成器：[http://www.ab173.com/enc/htpasswd.php](http://www.ab173.com/enc/htpasswd.php)，加密算法选择 SHA-1 加密方式。

### 5. npm包管理和发布
1. 命令方式
```shell
# 检查npm镜像
npm config get registry

# 如果是淘宝镜像【http://registry.npm.taobao.org】，则切换镜像
# 切换为原始镜像
npm config set registry http://registry.npmjs.org

# 初始化
npm init
# 登录
npm login
# 发布
npm publish

```
2. 同样你也可以通过发布目录下配置.npmrc文件重新指定registry
```
registry=http://localhost:4873/
```

### 6. 访问私有服务器
1. 其实同样也可以通过设置registry访问
2. npm资源管理器nrm
```shell
# 安装
npm install -g nrm
# 展示所有的通用资源
nrm ls 
nrm add company http://+你的主机内网ip
#别名
nrm use company
#就能下载你服务上的package，要切换回去，可以nrm use npm 或其他资源。
npm i package

```
