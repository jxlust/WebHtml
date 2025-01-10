# mac 上使用

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

# 简单命令 nginx 启动

1. 启动 nginx：sudo nginx
2. 关闭 nginx：sudo nginx -s stop
3. 重启 nginx：sudo nginx -s reload

# 简单配置示例

```conf

user root admin;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       8080;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            # add_header $http_host;
            root /Users/xunliangjiang/nginx-html/react-demo;
            # 项目服务访问地址
            try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
        location /dingtalk{
            root /
            try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
        location /b{
            proxy_pass http://www.baidu.com/;
        }
        location /j{
            proxy_pass http://127.0.0.1:5173/;
            proxy_set_header  Host $http_host;
        }
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    include servers/*;
}

```
