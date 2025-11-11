import * as parser from "@babel/parser";
import traverse from "@babel/traverse";

import { generate } from "@babel/generator";
import t from '@babel/types'
// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-babel-parser

// path.traverse()
// 获取表达式依赖的所有变量
function getDependencies(node) {
    const dependencies = new Set();
    traverse.default(node, {
        noScope: true,
        Identifier(path) {
            if (!path.findParent(p => t.isMemberExpression(p.node))) {
                dependencies.add(path.node.name);
            }
        },
        MemberExpression(path) {
            let current = path.node;
            while (t.isMemberExpression(current)) {
                if (t.isIdentifier(current.object)) {
                    dependencies.add(current.object.name);
                    break;
                }
                current = current.object;
            }
        }
    });
    return Array.from(dependencies);
}

// 重构表达式AST
function refactorExpression(expr, env) {
    // 解析表达式为AST
    const ast = parser.parseExpression(expr);
    console.log(ast)
    // 递归重构节点
    function refactorNode(node) {
        if (!node) return null;

        // 处理逻辑表达式 (&&, ||)
        if (t.isLogicalExpression(node)) {
            const left = refactorNode(node.left);
            const right = refactorNode(node.right);

            if (left && right) {
                return t.logicalExpression(node.operator, left, right);
            }
            if (left) return left;
            if (right) return right;
            return null;
        }

        // 处理二元表达式 (比较运算符)
        if (t.isBinaryExpression(node)) {
            const left = refactorNode(node.left);
            const right = refactorNode(node.right);
            return (left && right) ? t.binaryExpression(node.operator, left, right) : null;
        }

        // 处理一元表达式 (!)
        if (t.isUnaryExpression(node)) {
            const argument = refactorNode(node.argument);
            return argument ? t.unaryExpression(node.operator, argument) : null;
        }

        // 处理调用表达式
        if (t.isCallExpression(node)) {
            // 重构参数
            const args = node.arguments.map(arg => refactorNode(arg)).filter(Boolean);
            if (args.length !== node.arguments.length) return null;

            // 检查所有依赖变量
            const deps = getDependencies(node);
            if (deps.every(dep => env.hasOwnProperty(dep))) {
                return t.callExpression(refactorNode(node.callee), args);
            }
            return null;
        }

        // // 处理成员表达式 (obj.property)
        if (t.isMemberExpression(node)) {
            console.log(JSON.stringify(node))
            const deps = getDependencies(node);

            return deps.every(dep => env.hasOwnProperty(dep)) ? node : null;
        }

        // 处理标识符
        if (t.isIdentifier(node)) {
            return env.hasOwnProperty(node.name) ? node : null;
        }

        // 处理括号表达式
        if (t.isParenthesizedExpression(node)) {
            const expression = refactorNode(node.expression);
            return expression ? t.parenthesizedExpression(expression) : null;
        }

        // 处理字面量 (直接保留)
        if (t.isLiteral(node)) {
            return node;
        }

        // 默认返回原始节点
        return node;
    }

    // 重构整个AST
    const newAst = refactorNode(ast);
    console.log(newAst)
    // 处理整个表达式被移除的情况
    if (!newAst) return 'true';

    // 生成重构后的代码
    return generate(newAst, { minified: true }).code;
}


function test() {
    // const expr = "!(age > 18 && (country == 'US' || city == 'NY') && containsText(shenqingrengonghao,723488)==true)||!(user.age <= 18 &&  country == 'CN')";
    const expr = "!(age > 18 && (country == 'US' || country == 'AB' || city == 'NY') && containsText(shenqingrengonghao,723488)==true) || !(user.age <= 18 &&  country == 'CN')"
    // 解析表达式为AST
    // const ast = parser.parseExpression(expr);
    // console.log('%o',ast)
    const ret = refactorExpression(expr, { age: 20, country: 'CN' })
    console.log('重构结果：', ret)
}
test();

function testTraverse() {
    const ast = { "type": "MemberExpression", "start": 31, "end": 39, "loc": { "start": { "line": 1, "column": 31, "index": 31 }, "end": { "line": 1, "column": 39, "index": 39 } }, "object": { "type": "Identifier", "start": 31, "end": 35, "loc": { "start": { "line": 1, "column": 31, "index": 31 }, "end": { "line": 1, "column": 35, "index": 35 }, "identifierName": "user" }, "name": "user" }, "computed": false, "property": { "type": "Identifier", "start": 36, "end": 39, "loc": { "start": { "line": 1, "column": 36, "index": 36 }, "end": { "line": 1, "column": 39, "index": 39 }, "identifierName": "age" }, "name": "age" } };
    // const code = `user.age > 18`;
    // const ast = parser.parseExpression(code);

    console.log(1, ast)
    const dependencies = new Set();
    traverse.default(ast, {
        noScope: true,
        Identifier(path) {
            if (!path.findParent(p => t.isMemberExpression(p.node))) {
                dependencies.add(path.node.name);
            }
        },
        MemberExpression(path) {
            let current = path.node;
            while (t.isMemberExpression(current)) {
                if (t.isIdentifier(current.object)) {
                    dependencies.add(current.object.name);
                    break;
                }
                current = current.object;
            }
        }
    });
    console.log(2, dependencies);

}
// testTraverse();

// 测试用例

// console.log('重构结果1:', refactorExpression(expr1, env1)); // !(age>18)

// const expr2 = "!(age > 18 && (country == 'US' || city == 'NY') && containsText(shenqingrengonghao,723488)==true)||!(user.age <= 18 &&  country == 'CN')";
// const env2 = { age: 20, country: 'CN' };
// console.log('重构结果2:', refactorExpression(expr2, env2)); // !(age>18&&country=="US")||!(country=="CN")

// const expr3 = "user && user.address && user.address.city === 'New York'";
// const env3 = { user: { address: {} } };
// console.log('重构结果3:', refactorExpression(expr3, env3)); // user.address

// const expr4 = "(a || b) && (c || d)";
// const env4 = { a: true, d: false };
// console.log('重构结果4:', refactorExpression(expr4, env4)); // a||d