# mac上使用

1. 启动服务
```
sudo brew services start nginx
```
2. 重启服务
```
sudo brew services restart nginx
```
3. 关闭服务
```
sudo brew services stop nginx
```
4. 其他
在终端中输入
```
ps -ef|grep nginx
如果执行的结果是

501 15800 1 0 12:17上午 ?? 0:00.00 nginx: master process /usr/local/Cellar/nginx/1.8.0/bin/nginx -c /usr/local/etc/nginx/nginx.conf

501 15801 15800 0 12:17上午 ?? 0:00.00 nginx: worker process

501 15848 15716 0 12:21上午 ttys000 0:00.00 grep nginx

表示已启动成功，如果不是上图结果，在终端中执行

/usr/local/Cellar/nginx/1.17.0/bin/nginx -c /usr/local/etc/nginx/nginx.conf

命令即可启动nginx。
这时候如果成功访问localhost:8080，说明成功安装和启动好了。
```
# 简单命令nginx启动
1. 启动nginx：sudo nginx
2. 关闭nginx：sudo nginx -s  stop
3. 重启nginx：sudo nginx -s reload
