const path = require("path");
const fs = require("fs-extra");

const test1 = path.join(__dirname, "../packages");
const test2 = path.join(__dirname, '../dist');
const test3 = path.resolve('dist');
const packagesDir = path.resolve("packages");
console.log('dir', packagesDir)
// console.log('dir', __dirname)
console.log(1, test1);
console.log(2, test2);
console.log(3, test3)
async function testTask() {
    fs.removeSync("dist");
    fs.mkdirSync(path.resolve('dist', 'A1'), {
        recursive: true
    });
    fs.mkdirSync(path.resolve('dist', 'A2'), {
        recursive: true
    });
    const sourceDir = path.join(packagesDir, 'A1', 'dist');
    console.log("sourceDir:", sourceDir);
}
testTask();

