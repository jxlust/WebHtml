### 断点调试

- add breakpoint
- step over next function
- step into next function
- step out current function
- step

### 选择和检查 DOM 元素

- \$0 - \$4 命令可以用来显示在 Elements 面板中检查的最后五个 DOM 元素，\$0 返回最近一次选择的元素，\$1 返回最近一次之前选择的元素，以此类推。

- \$(selector) 返回带有指定的 CSS 选择器的第一个 DOM 元素的引用。这个命令就等同于 document.querySelector() 函数。\$\$(selector)等同于 document.querySelectorAll() 函数

### 复制数据

- 复制 CSS 样式：Copy rule
- 复制 HTML 内容，右键点击要复制的元素 -> Copy，点击要复制的内容类型即可
- 复制请求数据：Network -> Preview -> 右键，复制对应内容

### 发送 XHR 请求

- Chrome DevTools 支持重新发送 XHR 请求。在和后端进行接口联调时，如果想要重新发送请求，并且参数保持不变，可以直接右键点击要重新发送的 XHR 请求，点击 Replay XHR 即可重新发送该请求

- 对于一个请求，有时需要修改请求参数并重新发送，可以直接在控制台发送请求。只需要先右键点击需要重新发送的 XHR 请求，选择 Copy -> Copy as fetch

- 在 Console 面板中粘贴已经复制的请求内容，修改所需参数，按下回车发送请求即可

### 颜色选择器

- 色调控制；
- 使用吸管从页面元素中选择颜色；点击吸管操作
- 切换调色板；
- 可以在当前颜色的 RGBA、HSLA 和十六进制表示之间切换；
- 不透明度控制。

### 监听事件

- 可以在 Chrome Devtools 的 Console 面板中输入 monitorEvents() 来监听指定目标事件的信息。该方法有两个参数，第一个参数是要监听的对象。如果未提供第二个参数，所有事件都会返回。要指定要监听的事件，传递一个字符串或字符串数组作为第二个参数。

```js
monitorEvents(document.body, 'mouseover');
```

- 可以调用 unmonitorEvents() 方法来停止监听事件，需要传递一个停止监视对象的参数。例如，停止监听 body 对象上的事件

```js
unmonitorEvents(document.body);
```

### 检查未使用的 CSS

- 在 Coverage 面板中检查页面中没有使用的 CSS 和 JavaScript 代码， 通过最右边三个点 -> More tools 打开 Coverage 面板
- 点击刷新按钮开始重新加载页面，以测试页面的代码覆盖率
- 检查页面的资源使用情况，点击可以查看哪些代码是没有使用的，可以通过删除那些未使用的代码来最小化 CSS 文件的大小

### 引用 HTML 元素

在 Chrome DevTools 的 Elements 面板中右键点击要引用的 HTML 元素，选择 Store as global variable 即可将其保存为一个变量，其变量名会在 Console 面板中打印出来

### 日志点

Logpoints （日志点）是一种向控制台提供调试信息的方式，而无需使用 console.log()，这在线上应用调试时会很有用。可以通过右键单击 DevTools 中的 Source 选项卡中的任何行并指定要记录的表达式来添加新的 Logpoint。执行该行时，就会在控制台中获得它的值

### 动态表达式

实时表达式是一种在表达式更改时显示其值的功能。这有助于追踪代价高昂的表达式（如动画中使用的表达式）或变化很大的表达式（例如，如果正在遍历数组）的问题。它会将 Console 面板里的表达式置顶，并且能随着用户点击的变化，而动态刷新该置顶的表达式。

只需点击下图中眼睛图标，输入一个想要置顶的 JavaScript 表达式即可：

### 调试动画

- Chrome DevTools 提供了检查和修改动画的功能。它可以帮助我们播放动画、修改动画时间并分析特定时间范围内的视图。
- 只需在 More tools -> Animations 中打开动画面板进行调试

- Controls (控件) ：从此处可以清除所有当前捕获的动画组，或更改当前选定动画组的速度。
- Overview (概述) ：在此处选择一个动画组以在详细窗格中检查和修改它。
- Timeline (时间轴) ：暂停并从此处开始播放动画，或跳到动画中的特定点。
- Details (详细) ：检查并修改当前选定的动画组。

### Test Html

```Html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      div,
      li {
        outline: none;
      }
      .box1 {
        font-size: 12px;
        color: skyblue;
        background-color: red;
      }
      .box2 {
        font-size: 14px;
        color: red;
        background-color: skyblue;
      }

      .box-wrap {
        display: grid;
        row-gap: 30px;
        grid-template-columns: 100px;
      }

      .box-animate1 {
        animation: move-ani 1000ms ease-in-out;
        /* 保持结束状态 */
        animation-fill-mode: forwards;
      }
      .box-animate2 {
        animation: move-ani 1000ms ease-in-out;
        /* 保持开始状态 */
        animation-fill-mode: backwards;
      }

      .box-animate3 {
        animation: move-ani 1000ms ease-in-out;
        animation-iteration-count: 2;
        animation-direction: normal;
        animation-fill-mode: backwards;
      }

      .box-animate4 {
        animation: move-ani 1000ms ease-in-out;
        animation-iteration-count: 2;
        animation-direction: alternate;
        animation-fill-mode: backwards;
      }

      .box-animate5 {
        animation: move-ani 1000ms ease-in-out;
        animation-iteration-count: 2;
        animation-direction: normal;
        animation-fill-mode: both;
      }

      .box-animate6 {
        animation: move-ani 1000ms ease-in-out;
        animation-iteration-count: 3;
        /* 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放 */
        animation-direction: alternate;
        animation-fill-mode: both;
      }

      .box-animate7 {
        animation: move-ani 1000ms ease-in-out;
        animation-iteration-count: 3;
        /* 反向播放 */
        animation-direction: reverse;
        animation-fill-mode: both;
      }

      .box4 {
        position: relative;
        /* width: 100px; */
        height: 100px;
        background-color: skyblue;
      }

      @keyframes move-ani {
        from {
          left: 0;
          opacity: 1;
        }
        to {
          left: 300px;
          opacity: 0.5;
        }
      }
    </style>
  </head>
  <body>
    <div class="box3">box3</div>
    <div class="box1" id="box1Id">box1</div>

    <div class="box-wrap">
      <div class="box4 box-animate1"></div>
      <div class="box4 box-animate2"></div>
      <div class="box4 box-animate3"></div>
      <div class="box4 box-animate4"></div>
      <div class="box4 box-animate5"></div>
      <div class="box4 box-animate6"></div>
      <div class="box4 box-animate7"></div>
    </div>
  </body>

  <script>
    let count = 0;
    const box1Id = document.getElementById('box1Id');
    box1Id.addEventListener('click', () => {
      box1Id.style.color = 'yellow';
      count++;
    });
  </script>
</html>

```
