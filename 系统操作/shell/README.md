## 查看系统 shells

```shell
cat /etc/shells
```

## 执行

```shell
bash xx.sh
```

## Shell 变量

1. 使用

```shell
name="jxl"
# echo $name
echo ${name}
```

2. 删除 unset name

## 参数

通过$n 获取

```shell
bash test.sh 1 2 3 4
# $0 为 test.sh
# $1 为 1
# ...
```

## Shell 数组

[test2.sh](./test2.sh)

## 基本运算符

[test2.sh](./test2.sh)

## echo 命令

[test3.sh](./test3.sh)

## 条件
数值测试： -eq 等于则为真 -ne 不等于则为真 -gt 大于则为真 -ge 大于等于则为真 -lt 小于则为真 -le 小于等于则为真

= 等于则为真
!= 不相等则为真
-z 字符串 字符串的长度为零则为真
-n 字符串 字符串的长度不为零则为真

## 遍历

# 一般格式
for var in a1 a2 ... aN
do
    命令1
    命令2
    ...
    命令N
done
