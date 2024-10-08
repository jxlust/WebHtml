## 清理路径缓存：
```shell
hash -r

```
## shell配置
shell配置文件（如.bashrc、.bash_profile或.zshrc），看看是否有自定义的补全函数或别名导致了这个问题。如果有必要，你可以修改或删除这些配置，然后重新加载配置（例如，通过source ~/.bashrc或重新登录你的shell会话）。

## 查看系统的shells
cat /etc/shells

## 基本路径操作

1. 相对路径
``` 
cd /users/yang/Desktop
```
2. 绝对路径
```
cd Ddesktop
```
3. 注意
+ . 表示当前路径
+ .. 表示当前路径的上一层
+ … 表示当前路径的上2层
+ 没有…或者以上的

## 查看文件ls
1. ls 查看当前路径下的文件及文件夹的名字
2. ls /bin 表示：查看当前路径下的Documents文件夹下的所有东西
3. ls Documents 表示：查看当前路径下的Documents文件夹下的所有东西 
4. ls *：
+ *表示任意多个字符，也可以没有
+ ？：表示一个字符，一定有一个，不能没有
+ [xn]：表示中括号中的任意一个字符
+ [abcdefg]可以写成[a-g]：表示从a到g之间的任意一个字符
ls -a：隐藏文件
ls -l：列表风格显示
ls -h：配合-l，显示一个合理的大小单位

## 打开文件cd
1. cd desktop：进入到desktop这个文件夹
2. cd 文件夹名字
3. cd .. 跳转到当前路径的上一层
4. cd - 跳转到上一次所在的路径(类似遥控器的回看功能)
5. cd ~ 跳转到当前用户的家目录

## 显示文件路径

1. pwd：显示当前操作的路径(绝对路径)
2. clear：清屏,windows里面清屏是cls
3. tab键：自动补全
4. touch：创建一个文件，linux中没有后缀的说法，所有文件名自定义

## 重定向

1. ls > test.txt： 表示把本来显示在终端上的信息写入到test.txt文件中
>> 和 >的区别是：>>是源文件的末尾添加，而>先清空然后再添加
比如：
```
ls > text.txt
```
```
echo 'data:123' >> xxx.txt
```
2. gedit：用gedit编辑器打开文件

more 如果文件内容很多，使用more查看时可以分屏显示 
ls -alh | more 先把ls -alh显示的内容放到管道|中，然后再使用more从管道中取数据，然后分屏显示
创建文件夹

## 创建和删除
mkdir：创建文件夹 
mkdir a在当前路径下创建a文件夹
mkdir a/b/c 不能创建，需要添加-p
tree：以目录树的方式显示文件夹结构
删除文件/文件夹

rmdir：删除空文件夹
rm：删除一个普通文件夹，会有提示，要删除的东西是个文件夹
rm xxx -r：递归删除文件夹，不提示
链接文件

## 查看
ln -s 源文件 链接文件 ：软连接
ln 源文件 链接文件 ：硬链接，硬链接数量为一时，才会真正删除数据，否则不会。
查看文件

cat： 查看文件的内容
合并多个文件并查看 ：cat 1.txt 2.txt > 3.txt
查找文件内容

rename 修改文件名
1.  Ubuntu系统下
rename 's//.c//.h/'  ./*
2.  CentOS5.5系统下
rename .c  .h   *.c
把当前目录下的后缀名为.c的文件更改为.h的文件

grep：从指定的文件中搜索需要的内容 
-n：显示行号
-i：不区分大小写
-v：取反，即不包含需要的内容的行
查找文件

find 路径 -name ‘*.t?t’
注意通配符的使用
复制文件
## 拷贝、移动
-r 是遍历目录，即复制整个目录
-p 是保留原有属性
cp -rp a b 将a文件夹整体复制到b文件夹下
cp -rp a/* b 将a文件夹下的所有内容复制到b文件夹下
剪切文件

mv a b 将a文件夹整体移动(剪切)到b文件夹下
## 打包/压缩/解压缩/解包

tar -cvf xxx.tar * 打包命令
gzip xxx.tar 压缩
gzip -d xxx.tar.gz 解压缩
tar -xvf xxx.tar 解包
常见的压缩解压方式

tar -zcvf xxx.tar.gz *
tar -zxvf xxx.tar.gz
tar -jcvf xxx.tar.bz2 *
tar -jxvf xxx.tar.bz2
vi/vim的使用
模式切换

从命令模式->编辑模式：i，a，o，I，A，O
从编辑模式->命令模式：ESC
从命令模式->末行模式：输入一个冒号，即shift+；
模式内编辑

末行模式：

w保存，
q退出
！强制退出(切换进出)
命令模式：

hjkl控制上下移动
M中间位置
L当前屏幕的最后一行
yy：复制，8yy：表示从当前光标所在的行开始复制8行
p：黏贴
dd：剪切，8dd：表示从当前光标所在的行开始剪切8行
u：撤销
ctl+r：反撤销
G：跳到最后一行
15G：跳转到第15行
1G：跳转到第一行
gg：跳转到第一行
```