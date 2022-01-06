### 1.缓存类型

1. 强制缓存
2. 协商缓存

### 2.缓存机制

1. http请求,如果没有缓存，直接获取服务器资源，返回200，设置缓存信息，存入浏览器；

2. http请求发起，查看存在缓存，先判断是否有强制缓存（Expires或者Cache-Control）；
> 其中Expires设置的是过期时间，统一时间GMT（格林尼治时间），Cache-Control设置参数主要有：no-cache（使用缓存，但是转为协商缓存判断）、no-sore（都不使用缓存）、max-age:xxxx（多少秒过期）、private、public等等。***Cache-Control优先级 > Expires优先级***

3. 强制缓存满足条件，读取浏览器的缓存
> 存储缓存的方式有：浏览器内存缓存（from memory cache）和硬盘缓存（from disk cache）
> MC，内存缓存特点，内存缓存的特点 快(读取快) 时效性(进程死，他也死)， 浏览器主要是去存储一些当前获取到的资源，比如img；大型js css文件都是直接disk cache

4. 不满足，进行协商缓存（Last-Modified / If-Modified-Since 和 Etag / If-None-Match），这里会发送请求到服务器判断了，如果满足，返回304,告诉浏览器去读取缓存，否则200，更新数据和缓存标识
> ***Etag/If-None-Match 优先级 > Last-Modified / If-Modified-Since 优先级***。Last-Modified存储的是上次从服务器获取资源时候的资源更新时间（GMT时间），进行请求的时候请求头带上If-Modified-Since:Last-Modified的GMT时间，然后服务器进行判断；Etag存储的是上次从服务器拉取资源的唯一标识（通过特定算法类似md5哈希算法生成？），请求头携带If-None-Match:Etag值，服务器通过If-None-Match获取Etag，跟该资源在服务器的Etag值做对比，一致则返回304，重定向到读取缓存。

5. web缓存到此结束！


### 三级缓存原理
1. 先去内存看，如果有，直接加载
2. 如果内存没有，择取硬盘获取，如果有直接加载
3. 如果硬盘也没有，那么就进行网络请求
4. 加载到的资源缓存到硬盘和内存所以我们可以来解释这个现象图片为例：访问-> 200 -> 退出浏览器再进来-> 200(from disk cache) -> 刷新 -> 200(from memory cache)
### http header
max-ageweb中的文件被用户访问(请求)后的存活时间,是个相对的值,相对Request_time(请求时间)ExpiresExpires指定的时间根据服务器配置可能有两种：
1. 文件最后访问时间
2. 文件绝对修改时间如果max-age和Expires同时存在，则被Cache-Control的max-age覆盖last-modifiedWEB 服务器认为对象的最后修改时间，比如文件的最后修改时间，动态页面的最后产生时间ETag对象（比如URL）的标志值，就一个对象而言，文件被修改，Etag也会修改Cache-Control简单理解，强缓存
