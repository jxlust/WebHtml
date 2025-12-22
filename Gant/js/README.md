## 替换 X 源码方式

1. 下载源码文件，格式化
2. dhtmlx.com 相关代码替换掉，或者移除掉
3. 命名空间全局替换 `--dhx-` -> `--jm-`
4. 替换一些文案类：

```js
n.i18n.setLocale("cn"),
// scales: [{ unit: "day", step: 1, date: "%d %M" }],
scales: [{ unit: "day", step: 1, date: "%M %d" }],
// task_date: "%d %F %Y",
task_date: "%Y年 %F %d日",

new_task: "新任务",

```
