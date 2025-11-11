
import remarkParse from "remark-parse";
import { unified } from "unified";
// remark 插件 把 markdown(mdast) 语法树转成 html（hast）语法树
// remark 处理mdast retype插件处理hast
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
// rehype-sanitize html消毒插件
//  @shikijs/rehype
import { visit } from 'unist-util-visit'
import * as v from 'valibot'

const mdString = `
# 文档标题

<think data-mode="deep">
  这是一个深度思考内容
  
  ## 思考子标题
  - 要点 1
  - 要点 2
  
  <div>嵌套 HTML</div>
</think>
后续内容
`;

// 1. 保存原始文本的 remark 插件
const remarkCaptureRaw = () => (_, file) => {
    console.log('raw file:', file.data)
    file.data = file.data || {};
    file.data.rawMarkdown = String(file);
};


const remarkThinkTag = () => {
    return (tree) => {
        const stack = []; // 使用栈来跟踪嵌套结构

        visit(tree, (node, index, parent) => {
            // 1. 处理开标签
            if (node.type === 'html' && /^<think(\s|>)/i.test(node.value)) {
                const html = node.value.trim();
                const isSelfClosing = /\/>$/.test(html);

                const thinkNode = {
                    type: 'think',
                    data: {
                        hName: 'think',
                        hProperties: {},
                    },
                    children: isSelfClosing ? [] : null, // 自闭合标签没有子节点
                    position: node.position,
                };

                // 移除开标签节点
                parent.children.splice(index, 1);

                if (isSelfClosing) {
                    // 自闭合标签直接插入
                    parent.children.splice(index, 0, thinkNode);
                    return index + 1; // 移动到下一个节点
                }

                // 非自闭合标签入栈
                stack.push({
                    node: thinkNode,
                    startIndex: index,
                    parent,
                });

                return index; // 继续处理当前索引位置
            }

            // 2. 处理闭标签
            if (node.type === 'html' && /^<\/think\s*>/i.test(node.value)) {
                if (stack.length === 0) {
                    // 没有匹配的开标签，直接移除闭标签
                    parent.children.splice(index, 1);
                    return index;
                }

                const current = stack.pop();
                const startIndex = current.startIndex;
                const contentNodes = parent.children.slice(startIndex, index);

                // 设置 think 节点的子节点
                current.node.children = contentNodes;

                // 替换内容区域：从开标签位置到闭标签位置
                parent.children.splice(
                    startIndex,
                    index - startIndex + 1,
                    current.node
                );

                return startIndex; // 返回到新插入节点的位置
            }
        });

        // 3. 处理未闭合标签（文档结束）
        while (stack.length > 0) {
            const current = stack.pop();
            const startIndex = current.startIndex;
            const contentNodes = parent.children.slice(startIndex);

            current.node.children = contentNodes;
            current.parent.children.splice(
                startIndex,
                contentNodes.length,
                current.node
            );
        }
    };
};

// 提取标签属性（优化版）
// const extractAttributes = (html) => {
//   try {
//     const parser = parse(html, { 
//       recognizeSelfClosing: true,
//       xmlMode: true 
//     });

//     const element = parser.root.children[0];
//     return element.attribs || {};
//   } catch (e) {
//     console.warn('解析标签属性失败:', html);
//     return {};
//   }
// };

const remarkThinkTag_old = () => {
    let inThinkTag = false;
    let thinkDepth = 0;
    let currentThinkNode = null;
    let thinkContentNodes = [];

    return (tree) => {
        visit(tree, (node, index, parent) => {
            // 1. 检测 HTML 节点
            console.log('node:', index)
            if (node.type === 'html') {
                const html = node.value.trim();

                // 检测 <think> 开标签
                if (/^<think(\s|>)/i.test(html)) {
                    if (!inThinkTag) {
                        // 创建新的 think 节点
                        currentThinkNode = {
                            type: 'think',
                            data: {
                                hName: 'think',
                                hProperties: {}
                                // hProperties: extractAttributes(html),
                            },
                            children: [],
                        };
                        inThinkTag = true;
                        thinkDepth = 1;
                        thinkContentNodes = [];
                    } else {
                        thinkDepth++; // 嵌套标签
                    }
                    return [visit.SKIP, index]; // 移除原始 HTML 节点
                }

                // 检测 </think> 闭标签
                if (/^<\/think\s*>/i.test(html)) {
                    if (inThinkTag) {
                        thinkDepth--;

                        if (thinkDepth === 0) {
                            // 结束标签处理
                            inThinkTag = false;

                            // 添加收集的内容
                            currentThinkNode.children = [...thinkContentNodes];

                            // 替换原始节点
                            const startIndex = parent.children.indexOf(thinkContentNodes[0]);
                            const endIndex = index;

                            parent.children.splice(
                                startIndex,
                                endIndex - startIndex + 1,
                                currentThinkNode
                            );

                            return [visit.SKIP, startIndex]; // 调整遍历位置
                        }
                    }
                    return [visit.SKIP, index]; // 移除原始 HTML 节点
                }
            }

            // 2. 收集 <think> 内部内容
            if (inThinkTag && node !== currentThinkNode) {
                thinkContentNodes.push(node);
                return [visit.SKIP, index]; // 暂时移除内容节点
            }
        });
    };
};

const remarkCheckCodeEnding = () => (tree) => {
    // const raw = String(file); // 获取原始 Markdown 文本
    // console.log('file:', file)
    // console.log('tree:', tree)
    const raw = mdString;

    visit(tree, 'code', (node) => {
        // 确保位置信息存在
        if (!node.position || !node.position.end) return;

        const endIndex = node.position.end.offset;

        // 检查结束位置后是否有 \n
        const hasNewlineAfter =
            endIndex < raw.length &&
            raw[endIndex] === '\n';

        // 检查结束标识符 (``` 或 ~~~)
        const fenceType = raw[node.position.start.offset];
        console.log('fenceType:', fenceType)
        const fenceLength = 3; // 默认围栏长度
        const expectedEnd = fenceType.repeat(fenceLength);
        console.log('expectedEnd:', expectedEnd)
        // 提取实际结束标识符
        const actualEnd = raw.substring(
            node.position.end.offset - fenceLength,
            node.position.end.offset
        );

        // 验证结束标识
        const hasValidEnd = actualEnd === expectedEnd;

        // 输出验证结果（可改为自定义处理）
        if (!hasValidEnd || !hasNewlineAfter) {
            // file.message(
            //     `代码块未正确结束 (标识符: ${actualEnd}, 换行: ${hasNewlineAfter})`,
            //     node.position.end
            // );
            console.log('not end.')
            // 添加到节点数据（供后续处理使用）
            // node.data = node.data || {};
            node.properties.codeEndingValid = false;
        } else {
            console.log('end', node)
            // node.data = node.data || {};
            node.properties.codeEndingValid = true;
        }
    });
};

// 自定义remark插件：修改代码块语言
const remarkCustomCode = () => (tree) => {
    visit(tree, 'code', (node) => {
        console.log("node:", node)
        // if (node.lang === 'javascript') {
        //     node.lang = 'js'; // 替换语言标识
        // }
    });
};

const rehypeThinkPlugin = () => (tree) => {
    visit(tree, 'element', (node) => {
        console.log('node:', node)
        if (node.tagName === 'think') {

            console.log('think:', node)
        }


    });
};
// 自定义rehype 插件：给所有链接添加 target="_blank"
const rehypeCheckCodeEnd = () => (tree, file) => {
    const raw = mdString;
    console.log('file:', file)
    visit(tree, 'element', (node) => {
        // TODO: 优化判断条件
        if (node.tagName === 'code' && node.properties.className) {
            // 确保位置信息存在
            if (!node.position || !node.position.end) return;
            console.log('node:', node)
            const endIndex = node.position.end.offset;
            // 检查结束位置后是否有 \n
            const hasNewlineAfter =
                endIndex < raw.length &&
                raw[endIndex] === '\n';

            // 检查结束标识符 (``` 或 ~~~)
            const fenceType = raw[node.position.start.offset];
            console.log('fenceType:', fenceType)
            const fenceLength = 3; // 默认围栏长度
            const expectedEnd = fenceType.repeat(fenceLength);
            console.log('expectedEnd:', expectedEnd)
            // 提取实际结束标识符
            const actualEnd = raw.substring(
                node.position.end.offset - fenceLength,
                node.position.end.offset
            );

            // 验证结束标识
            const hasValidEnd = actualEnd === expectedEnd;

            // 输出验证结果（可改为自定义处理）
            if (!hasValidEnd || !hasNewlineAfter) {
                // file.message(
                //     `代码块未正确结束 (标识符: ${actualEnd}, 换行: ${hasNewlineAfter})`,
                //     node.position.end
                // );
                console.log('not end.')
                // 添加到节点数据（供后续处理使用）
                // node.data = node.data || {};
                node.properties.codeEndingValid = false;
            } else {
                console.log('end', node)
                // node.data = node.data || {};
                node.properties.codeEndingValid = true;
            }

        }
    });
};


// 自定义rehype 插件：给所有链接添加 target="_blank"
const rehypeExternalLinks = () => (tree) => {
    visit(tree, 'element', (node) => {
        if (node.tagName === 'a' &&
            node.properties?.href?.startsWith('http')) {
            node.properties.target = '_blank';
            node.properties.rel = 'noopener noreferrer';
        }
    });
};

async function testShikiJs() {
    const processor = unified().use(remarkParse)
        .use(remarkRehype)
        .use(rehypeShiki, {
            // or `theme` for a single theme
            themes: {
                light: 'vitesse-light',
                dark: 'vitesse-dark',
            }
        })
        .use(rehypeStringify)
    const v = await processor.run(processor.parse('# a'))
}
async function test() {

    // .use(rehypeFormat).use(rehypeStringify)
    const processor = unified()
        .use(remarkParse)
        // .use(remarkThinkTag) // 使用自定义插件
        // .use(remarkRehype)
        // .use(rehypeThinkPlugin)
        // .use(rehypeFormat)

    // \n ```\n ABC  \n```
    const v = await processor.run(processor.parse(mdString))
    console.log(JSON.stringify(v))
    // processor.run(processor.parse('# 123'))
}

test();

// const LoginSchema = v.object({
//     email: v.pipe(v.string(), v.minLength(2)),
//     psw: v.pipe(v.string(), v.minLength(8))
// })
// try {
//     const o1 = v.parse(LoginSchema, { email: '22', psw: '121232232322' })
//     console.log(o1)
// } catch (error) {
//     console.error(2, error)
// }

