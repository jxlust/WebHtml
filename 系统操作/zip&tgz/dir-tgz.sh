#!/bin/bash

# 脚本会遍历当前目录下的每个文件夹，并使用tar命令将它们分别压缩成.tgz文件。
# 每个压缩文件的名字都会与相应的文件夹名字相匹配。
# 如果压缩成功，它会输出一条成功信息；如果失败，则会输出失败信息

# 遍历当前目录下的所有文件夹
for dir in */; do
    # 去掉路径末尾的斜杠，获取纯文件夹名
    dirname="${dir%/}"
    # 如果dirname不为空（防止处理到根目录"/"的情况）
    if [ -n "$dirname" ]; then
        # 创建对应的.tgz压缩文件，使用tar命令的czvf选项（创建、gzip压缩、显示过程、指定文件名）
        tar czvf "${dirname}.tgz" "$dirname"
        # 检查tar命令是否执行成功
        if [ $? -eq 0 ]; then
            echo "文件夹 $dirname 已成功压缩为 ${dirname}.tgz"
        else
            echo "文件夹 $dirname 压缩失败"
        fi
    fi
done
