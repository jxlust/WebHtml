### 重叠上下文
[stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
#### 一、重叠水平
普通元素的层叠水平优先由层叠上下文决定，因此，层叠水平的比较只有在当前层叠上下文元素中才有意义。

### 二、重叠顺序
```
z-index负 < block < float < inline/inline-block <  z-index:auto <z-index正
```
当元素发生层叠的时候遵循下面2个规则：

值大在上：当具有明显的层叠水平标示的时候，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。
后来居上：当元素的层叠水平一致、层叠顺序相同的时候，在DOM流中处于后面的元素会覆盖前面的元素。
层叠上下文的层叠水平要比普通元素高
层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的层叠上下文。

### 三、形成重叠上下文属性
常用：
z-index（在设置position属性后生效）具体由值确定

opacity （opacity的值不是1的时候，是具有层叠上下文的，层叠顺序是z-index:auto级别）

transform

filter

will-change


#### 四、创建

1. 浏览器创建 Render Layer
满足层叠上下文条件的 Render Object 一定会为其创建新的 Render Layer，不过一些特殊的 Render Object 也会创建一个新的 Render Layer。

2. 创建 Render Layer 的原因如下：

NormalLayer
position 属性为 relative、fixed、sticky、absolute
透明的（opacity 小于 1）、滤镜（filter）、遮罩（mask）、混合模式（mix-blend-mode 不为 normal）
剪切路径（clip-path）
2D 或 3D 转换（transform 不为 none）
隐藏背面（backface-visibility: hidden）
倒影（box-reflect）
column-count（不为 auto）或者column-widthZ（不为 auto）
对不透明度（opacity）、变换（transform）、滤镜（filter）应用动画
OverflowClipLayer
剪切溢出内容（overflow: hidden）
另外以下 DOM 元素对应的 Render Object 也会创建单独的 Render Layer：
- Document
- HTML
- Canvas
- Video

如果是 NoLayer 类型，那它并不会创建 Render Layer，而是与其第一个拥有 Render Layer 的父节点共用一个。



层叠上下文大体上可分为三种创建方式
1. 页面根元素，称为根层叠上下文 
2. z-index 值为数值的定位元素的传统层叠上下文
3. 其他 CSS3 属性（详情可动手实验了解）

z-index值不为auto 的flex 项(父元素display:flex | inline-flex )
元素的 opacity 值不是 1
元素的 transform 值不是 none
元素的 filter 值不是 none
>注意：
1、z-index: auto 和 z-index: 0 在层叠等级上属于同一级。但是 z-index: 0 就是符合这一条“z-index 为数值”会使得元素升级为层叠上下文。
2、 IE6，7 有个不合常理的地方，就是当元素的 z-index 为 auto 的时候，该元素也升级为创建层叠上下文。这就是为什么在过去 IE6/IE7 的 z-index 一直是个老大难的原因。


### 五、优化
1. 