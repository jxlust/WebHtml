#!/bin/bash

# 创建临时目录用于解压.tgz文件
tempdir=$(mktemp -d)

# 最终输出的压缩文件名
output="dist.tgz"

# 遍历当前目录下所有.tgz文件
for file in *.tgz; do
    # 跳过输出文件，避免循环解压自己
    if [ "$file" == "$output" ]; then
        continue
    fi
    # 解压当前.tgz文件到临时目录
    tar -xzf "$file" -C "$tempdir"
done

# 压缩临时目录内容到输出文件
tar -czvf "$output" -C "$tempdir" .

# 清理临时目录
rm -rf "$tempdir"

echo "合并完成，已创建 $output"
