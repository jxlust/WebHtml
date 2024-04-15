#!/bin/bash

# 修改指定目录下文件的扩展名 必入  jpg png xxxxdir
read -p "old extension:" oldext
read -p "new extension:" newext
read -p "The directory:" dir
cd $dir
for file in $(ls $dir | grep .$oldext); do
        name=$(ls $file | cut -d. -f1)
        mv $file ${name}.$newext
        echo "$name.$oldext ====> $name.$newext"
done
echo "all files has been modified."
