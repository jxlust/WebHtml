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
满足以下 12 个条件中任意一个的元素会创建一个层叠上下文(来自MDN)

+ **文档根元素（html）**；
+ **position 值为 absolute（绝对定位）或 relative（相对定位）且 z-index 值不为 auto 的元素**；
+ **position 值为 fixed（固定定位）或 sticky（粘滞定位）的元素（沾滞定位适配所有移动设备上的浏览器，但老的桌面浏览器不支持**；
+ **flex (flexbox) 容器的子元素，且 z-index 值不为 auto**；
+ grid (grid) 容器的子元素，且 z-index 值不为 auto；
+ **opacity 属性值小于 1 的元素**
+ mix-blend-mode 属性值不为 normal 的元素；
+ 以下任意属性值不为 none 的元素：
	+ **transform**
	+ **filter**
	+ **perspective**
	+ clip-path
	+ mask / mask-image / mask-border
+ isolation 属性值为 isolate 的元素；
+ **-webkit-overflow-scrolling 属性值为 touch 的元素**；
+ will-change 值设定了任一属性而该属性在 non-initial 值时会创建层叠上下文的元素
+ contain 属性值为 layout、paint 或包含它们其中之一的合成值（比如 contain: strict、contain: content）的元素。


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


### 五、判断
1.首先先看要比较的两个元素是否处于同一个层叠上下文中：       1.1如果是，谁的层叠等级大，谁在上面（怎么判断层叠等级大小呢？——看“层叠顺序”图）。       1.2如果两个元素不在统一层叠上下文中，请先比较他们所处的层叠上下文的层叠等级。
2.当两个元素层叠等级相同、层叠顺序相同时，在DOM结构中后面的元素层叠等级在前面元素之上。

### 六、注意
1. 简言之，如果一个元素不是通过「定位」(position: absolute or relative)实现了stacking context，它将会以z-index: 0（高于auto）被看待，因此无论如何更改非「定位」元素的z-index都是无效的。
虽然文档中只提到opacity less 1构成的stacking context被看做z-index: 0，但通过测试，可以发现其他非「定位」方式创建的stacking context拥有与opacity less 1一致的表现。

2. Fixed定位脱离Viewport的bug
对于声明transfrom值非none元素，其子元素中若存在position: fixed将以声明transform的最近祖先作为基准而定位，这是因为transfrom值非none的元素定义了一个局部坐标系统，导致postion: fixed以此坐标系统计算布局。
