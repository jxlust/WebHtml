
const nodePath = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const dirTree = require('directory-tree');

const sourceDir = nodePath.resolve(__dirname, "../apis")
const targetDir = nodePath.resolve(__dirname, '../gn-docs');

function deleteFolder(folderPath) {
    try {
        fse.removeSync(folderPath);
        console.log('文件夹删除成功！');
    } catch (err) {
        console.error('删除文件夹出错：', err);
    }
}



function startGenerateTree() {
    // 删除旧文件夹
    deleteFolder(targetDir);

    // nodePath.join(path1,path2)
    try {
        // 复制文件夹
        fse.copySync(sourceDir, targetDir);
        // console.log('Folder copied and renamed successfully.');

        const srcDir = dirTree(targetDir, {
            extensions: /\.md$/,
            normalizePath: true,
        });

        // 对根节点排序
        const sortedTree = sortTree(srcDir);
        // console.log('%o', sortedTree)
        const apiSidebar = generateApiSidebar(sortedTree);
        // console.log('%o', apiSidebar)
        // 写入文件
        const apiSidebarPath = nodePath.resolve(__dirname, 'api-sidebar.json');
        fs.writeFileSync(apiSidebarPath, JSON.stringify(apiSidebar));
        // return apiSidebar

        // 重命名
        renameDirAndFiles(targetDir, 0)

    } catch (error) {
        if (error) {
            console.error('An error occurred while copying the folder:', error);
            return;
        }
    }
}


function compareFileName(name1, name2) {
    const n1 = name1.split("、")[0];
    const n2 = name2.split("、")[0];
    const number1 = n1.replace(/\./gi, "");
    const number2 = n2.replace(/\./gi, "");
    // console.log(number1, number2);
    return parseInt(number1) - parseInt(number2);
}
// 递归排序函数
function sortTree(node) {
    if (node.children && node.children.length) {
        // 按文件名排序子节点
        node.children.sort((a, b) => {
            return compareFileName(a.name, b.name);
            // a.name.localeCompare(b.name)
        });
        // 递归排序每个子节点
        node.children.forEach(sortTree);
    }
    return node;
}



function generateApiSidebar(tree) {
    // console.log(tree.path)
    const newRoot = {
        items: []
    }
    const queue = [[tree, newRoot, 0]];
    // const level = 0;

    while (queue.length) {
        // 获取队列头元素
        const [curOld, curNew, curLevel] = queue.shift();
        const { path, name } = curOld
        curNew.text = name.replace(/\.md$/, '');
        curNew.level = curLevel + '';

        if (curOld.children) {
            curNew.collapsed = false
            curNew.items = []
            for (let index = 0, len = curOld.children?.length; index < len; index++) {
                const newLevel = `${curLevel}.${index + 1}`;
                const oldItem = curOld.children[index];
                const newItem = {
                    // text: oldItem.name.replace(/\.md$/, ''),
                    text: '',
                    // level: newLevel
                }
                curNew.items.push(newItem)
                queue.push([oldItem, newItem, newLevel])
            }
        } else {
            const linkPath = curLevel.split('.').slice(1)
            curNew.link = linkPath.join('/')
        }

    }


    return newRoot
}



function renameDirAndFiles(dir, level) {
    if (!fs.existsSync(dir)) {
        console.error('Directory does not exist:', dir);
        return;
    }
    const readDirs = fs.readdirSync(dir).filter(item => item !== '.DS_Store');
    const items = readDirs.sort((v1, v2) => compareFileName(v1, v2));


    for (let index = 0, len = items.length; index < len; index++) {
        const item = items[index];
        const oldPath = nodePath.join(dir, item);
        const isDir = fs.lstatSync(oldPath).isDirectory();
        if (isDir) {
            // 文件夹
            // 重命名目录
            const newPath = nodePath.join(dir, `${index + 1}`);
            fs.renameSync(oldPath, newPath);
            renameDirAndFiles(newPath, level + 1)
        } else {
            // 文件
            const newPath = nodePath.join(dir, `${index + 1}.md`);
            fs.renameSync(oldPath, newPath);
        }

    }
}

startGenerateTree();