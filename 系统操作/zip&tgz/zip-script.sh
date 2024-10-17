#!/bin/bash
echo 'Hello World!'

# mkdir -p dist
# cp -r static-test ./dist
# zip -r dist.zip dist

# zip -r dist.zip *

# 如果你的tar文件是gzip压缩的（扩展名为.tar.gz 或 .tgz），可以使用：
# tar -zxvf file.tar.gz
# 解压 tar 包：
# tar -xvf file.tar

# 设置目标zip文件名
output_file="dist.zip"

# 检查输出文件是否存在，如果存在则删除
if [ -f "$output_file" ]; then
    rm "$output_file"
fi

# 查找当前目录下的所有文件夹，并逐个添加到zip文件中
for dir in */; do
    if [ -d "$dir" ]; then
        zip -r "$output_file" "$dir"
    fi
done

echo "打包完成，已生成文件：$output_file"
echo 'dist.zip created'
