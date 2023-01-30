## docker概念

1. Build, Ship and Run（搭建、运输、运行
2. Build once, Run anywhere（一次搭建，处处运行
3. Docker 本身并不是容器，它是创建容器的工具，是应用容器引擎
4. Docker 三大核心概念，分别是：镜像 Image，容器 Container、仓库 Repository
5. Docker 技术使用 Linux 内核和内核功能（例如 Cgroups 和 namespaces）来分隔进程，以便各进程相互独立运行
6. 由于 Namespace 和 Cgroups 功能仅在 Linux 上可用，因此容器无法在其他操作系统上运行。那么 Docker 如何在 macOS 或 Windows 上运行？ Docker 实际上使用了一个技巧，并在非 Linux 操作系统上安装 Linux 虚拟机，然后在虚拟机内运行容器。另外，搜索公众号python人工智能技术后台回复“名著”，获取一份惊喜礼包
7. 镜像是一个可执行包，其包含运行应用程序所需的代码、运行时、库、环境变量和配置文件，容器是镜像的运行时实例

## docker

1. 安装
[https://www.docker.com/get-started](https://www.docker.com/get-started)

2. 准备一个前端项目 docker-demo

3. 新建 Dockerfile
```shell
cd docker-demo && touch Dockerfile  
```

4. 准备 Nginx 镜像
```shell
docker pull nginx  
```
创建一个ng配置文件
```shell
touch default.conf  
```
写入配置：
```conf
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

5. 配置镜像
.dockerignore文件，可以在创建镜像复制文件时忽略复制某些文件
```conf
# .dockerignore
node_modules
```

Dockerfile写入，这里是多阶段构建配置
```shell
# dockerfile
# build stage
FROM node:lts-alpine as build-stage
# WORKDIR /xxx
COPY package*.json ./
RUN npm install pnpm -g
RUN pnpm install
COPY . .
RUN npm run build


# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage www/ /usr/share/nginx/html/

# FROM nginx  
# COPY www/ /usr/share/nginx/html/  
COPY default.conf /etc/nginx/conf.d/default.conf
```

6. 构建镜像(image)

```shell
docker build -t jxlnode-docker-demo .
```
> -t 参数给镜像命名 jartto-docker-demo
 . 是基于当前目录的 Dockerfile 来构建镜像

7. 常用命令

+ 查看镜像
```
docker image ls | grep xxxxx-name 
```

+ 运行容器
```
docker run -d -p 3000:80 --name docker-vue(container name) xxx-docker-demo(image name) 
```
>-d 设置容器在后台运行
-p 表示端口映射，把本机的 3000 端口映射到 container 的 80 端口（这样外网就能通过本机的 3000 端口访问了

+ 查看所有 name 以 docker 开头的 docker 容器，并只输出容器名
```
docker ps -a -f "name=^docker" --format="{{.Names}}"
```

+ 停止 name 为 xxxx-container 的容器
```
docker stop xxxx-container
```

+ 删除容器
```
docker rm xxxx-container
```


8. 更多操作参考官网文档[https://docs.docker.com/](https://docs.docker.com/)