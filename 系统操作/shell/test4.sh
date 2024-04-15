#!/bin/bash
name1="xu"
name2="xu"
if test $name1 = $name2; then
    echo '两个字符串相等!'
else
    echo '两个字符串不相等!'
fi

str1="abcd"
str2=""
# -n xxx 不为零
if [ -z "$str2" ]; then
    echo "字符串长度为零"
else
    echo "okk"
fi
