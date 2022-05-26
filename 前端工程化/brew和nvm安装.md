## Mac上安装brew

1. 配置github hosts 解决443连接报错
```shell
sudo vim /etc/hosts 
#添加如下host
140.82.114.3    github.com
```
2. brew 国内镜像安装
```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```
3. 安装wget
```shell
brew install wget
```
4. 安装nvm
```shell
wget -O- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
5. 将以下内容写入到~/.bash_profile文件中
```
vim ~/.bash_profile
```
```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

```
6. 配置生效
```shell
source ~/.bash_profile
```
7. 命令测试
```shell
nvm  
nvm --version
```