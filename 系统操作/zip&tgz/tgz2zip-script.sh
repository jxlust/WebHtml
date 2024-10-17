#!/bin/bash

# 创建临时目录用于解压.tgz文件
# tempdir="tempdir"
echo 'Hello tgz-script!'
# 最终输出的压缩文件名
output="dist.zip"
mkdir -p dist

# 检查输出文件是否存在，如果存在则删除
if [ -f "$output" ]; then
    rm "$output"
fi

# 遍历当前目录下所有.tgz文件
for file in *.tgz; do
    # 获取不带扩展名的文件名，用作解压后的子目录名
    subdir="${file%.tgz}"
    # 在dist目录中创建子目录，避免文件冲突
    mkdir -p "dist/$subdir"
    # 解压.tgz文件到对应的子目录中
    tar -xzf "$file" -C "dist"
done

# 压缩临时目录内容到输出文件
# tar -czvf "$output" -C "$tempdir" .
zip -r "$output" dist

# 清理临时目录
rm -rf dist

echo "合并完成，已创建 $output"
