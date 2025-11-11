// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-babel-parser
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import { generate } from "@babel/generator";
import t from '@babel/types'

const code = `function square(n) {
  return n * n;
}`;
const ast = parser.parse(code, {
    // sourceType: "module",
});
console.log(JSON.stringify(ast))
let paramName;

traverse.default(ast, {
    noScope: true,
    // FunctionDeclaration(path) {
    //     const param = path.node.params[0];
    //     paramName = param.name;
    //     param.name = "x";
    // },
    // Identifier(path) {
    //     if (path.node.name === paramName) {
    //         path.node.name = "x";
    //     }
    // }
    // 
    enter(path) {
        if (t.isIdentifier(path.node, { name: "n" })) {
            path.node.name = "x";
        }
    }
},)
console.log(ast)
const newCode = generate(ast, {
    minified: true,
    sourceMaps: true,
    sourceRoot: '/'
    // retainLines: false,
    // compact: "auto",
    // concise: false,
    // quotes: "double",
}, code);
console.log(newCode);
console.log(newCode.decodedMap);