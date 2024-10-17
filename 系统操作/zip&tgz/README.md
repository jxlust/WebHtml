# 新平台前端打包产物流水线部署

## 环境准备

### git-lfs

1. 安装 git-lfs。Git 提供了一种机制来提交对大文件的更改，而不会创建大量的历史记录，这通过使用 Git 的大文件存储机制（如 Git Large File Storage, LFS）或者 Git 的分割更改特性来实现。
2. mac 下安装 git-lfs 命令：`brew install git-lfs` 或者 [官网下载](https://git-lfs.com/),然后解压，执行 `./install.sh`
3. windows 下安装 git-lfs https://git-lfs.com/

### 项目使用

1. 安装 Git LFS:

```shell
 git lfs install
```

2. 新增 .gitattributes 文件

```shell
*.tgz filter=lfs diff=lfs merge=lfs -text
```

3. 使用 LFS 跟踪大文件：

```shell
git lfs track "*.tgz"
```

4. 添加大文件并进行提交：

```shell
git add xxx.tgz
git commit -m "Add large file"
```

5. 推送更改到远程仓库：

```shell
git push
```

## git 提交覆盖记录

```shell
git commit --amend -m "新的提交信息"
git push --force
```

## shell 命令

1. 压缩文件

```shell
 tar -czvf filename.tgz /path/to/your/files
```

2. 解压文件

```shell
# 如果你的tar文件是gzip压缩的（扩展名为.tar.gz 或 .tgz），可以使用：
tar -zxvf file.tar.gz
# 解压 tar 包：
tar -xvf file.tar
```

3. 脚本执行

```shell
chmod +x my-script.sh
./my-script.sh
```
