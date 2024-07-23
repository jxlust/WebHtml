
const nodePath = require('path');
const fs = require('fs');
// const fse = require('fs-extra');

const mdRegex = new RegExp(/.+(.md)/);
const dirRegex = /^[^.]*$/

function deleteFolder(folderPath) {
    // try {
    //     fse.removeSync(folderPath);
    //     console.log('文件夹删除成功！');
    // } catch (err) {
    //     console.error('删除文件夹出错：', err);
    // }
}

function compareFileName(name1, name2) {
    const n1 = name1.split("、")[0];
    const n2 = name2.split("、")[0];
    const number1 = n1.replace(/\./gi, "");
    const number2 = n2.replace(/\./gi, "");
    // console.log(number1, number2);
    return parseInt(number1) - parseInt(number2);
}

function compareFileNameByCode(name1, name2) {
    return name1.localeCompare(name2)
}

function writeToJsonFile(apiSidebar) {
    const apiSidebarPath = nodePath.resolve(__dirname, 'api-sidebar.json');
    fs.writeFileSync(apiSidebarPath, JSON.stringify(apiSidebar));
}


function startTaskFunc(sourceDir, targetDir) {
    // 删除旧文件夹
    deleteFolder(targetDir);

    // 重新创建文件夹
    fs.mkdirSync(targetDir);

    const newRoot = {
        items: []
    }
    const baseName = nodePath.basename(sourceDir);
    newRoot.text = baseName.replace(/\.md$/, '');
    // newRoot.level = '0';

    const stack = [[sourceDir, newRoot, '0']];
    while (stack.length) {
        const [curDir, curNode, curlevel] = stack.pop();

        let readDirs = [];
        try {
            // 这里可以过滤一些无用文件
            readDirs = fs.readdirSync(curDir).filter(item => item !== '.DS_Store');
        } catch (error) {
            console.error('读取目录失败：', error)
        }
        const items = readDirs.sort((v1, v2) => compareFileNameByCode(v1, v2));
        for (let index = 0, len = items.length; index < len; index++) {
            const newLevel = `${curlevel}.${index + 1}`;
            const item = items[index];
            const curPath = nodePath.join(curDir, item);
            const isDir = fs.lstatSync(curPath).isDirectory();

            if (isDir) {
                // 文件夹
                const paths = newLevel.split('.').slice(1);
                // 目标目录需要创建文件夹目录
                const targetPath = nodePath.join(targetDir, ...paths);
                fs.mkdirSync(targetPath);
                const newNode = {
                    text: item.replace(/\.md$/, ''),
                    // level: newLevel
                }
                if (!curNode.items) {
                    curNode.items = []
                }
                curNode.items.push(newNode)

                stack.push([curPath, newNode, newLevel])

            } else if (mdRegex.test(item)) {
                // 是.md结尾的文件 
                const paths = newLevel.split('.').slice(1);
                const linkStr = paths.join('/');

                let top = paths.pop();
                top = top + '.md';
                const targetPath = nodePath.join(targetDir, ...paths, top);
                fs.copyFileSync(curPath, targetPath);

                if (!curNode.items) {
                    curNode.items = []
                }
                curNode.items.push({
                    text: item.replace(/\.md$/, ''),
                    // level: newLevel,
                    link: linkStr
                })

            }
        }
    }
    // console.log('newRoot:%o', newRoot)
    // 写入json文件
    writeToJsonFile(newRoot);
    return newRoot;
}


const sourcePath = nodePath.resolve(__dirname, "./apis")
const targetPath = nodePath.resolve(__dirname, './gn-docs');
// 开启任务
startTaskFunc(sourcePath, targetPath);