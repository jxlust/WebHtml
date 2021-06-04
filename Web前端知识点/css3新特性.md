https://markdowner.net/article/168459834260611072

多年来，CSS已经超越了背景颜色、边框、文本样式、边距和盒模型。现代CSS能够提供一系列的功能，而在过去，您需要JavaScript或变通方法来实现这些功能。

为了庆祝它在2021年取得的成就，在这篇文章中，我们想看看一些你可能不知道的令人惊叹的CSS新特性。我们将强调web设计人员和开发人员可以用现代CSS做的很酷的事情，讨论用例，浏览器支持，并给你一个快速的例子。

CSS的新功能：现代CSS可以做什么
这是CSS如今具备的一些令人惊奇的功能

自定义属性/变量

自定义属性基本上允许你在一个集中的地方定义CSS属性的替身，以用于你的设计。要理解为什么这很有用，最好的方法就是去看一个例子。

通常，在构建一个主题时，你会选择一个配色方案，然后每次都要声明这些颜色。

a {
    color: #cd2653;
}

.social-icons a {
    background: #cd2653;
}

.wp-block-button.is-style-outline {
    color: #cd2653;
}
这种方法的问题是，如果你想对其中一种颜色进行更改，你必须更改它的每一个实例。虽然代码编辑器可以通过搜索和替换轻松做到这一点，但这仍然很烦人。特别是当你只是想做一个快速的测试，而又要把所有的东西反过来的时候。

有更好的解决方案

自定义属性可以解决这个问题。在它们的帮助下，你可以将有关颜色指定给一个变量一次，然后每次使用时只需将该变量作为CSS属性输入即可，就像这样：

:root {
    --global--color-primary: #28303d;
}

a {
    color: var(--global--color-primary);
}

.social-icons a {
    background: var(--global--color-primary);
}
这样，当您要进行更改时，只需要在一个地方进行更改即可。酷吧？过去，你需要采用SASS这样的预处理程序来使用变量，现在它是CSS的一个原生功能。

正如您在上面看到的，自定义属性也非常易于使用。在文档开头的 :root 选择器下定义你的变量（注意双连字符 -- 在变量前面，这就是将它们定义为自定义属性的原因，而且它们是区分大小写的！）。之后，你可以通过 var() 函数在整个文档中使用它们。

如果你想改变一个变量，只需改变 :root 下的声明就可以了。

至于此CSS功能的采用程度如何，浏览器支持非常好：



@supports
接下来，我们有一个类似于媒体查询的CSS规则。然而，@supports 并不是让CSS规则以屏幕大小或手机类型为条件，而是允许你根据用户浏览器支持的CSS属性和值来做同样的事情。

这有什么用？

正如你将在这篇文章中看到的那样，并非所有的浏览器和设备都支持所有的CSS功能。虽然你通常可以使用回退声明来处理这个问题，但在某些情况下，如果你不特别包含对旧技术的支持，就会严重破坏你的网站。

此外，你还可以使用 @supports 为更现代的浏览器添加额外的功能或样式，以便处理它们（这就是为什么使用 @supports 的查询也被称为“功能查询”）。

如何使用功能查询

如果你熟悉媒体查询，使用支持检查将非常容易。下面是如何使用它：

@supports (display: grid) {
    .site-content {
        display: grid;
    }
}
正如你所看到的，它只是简单的规则，后面的括号里是你要检查的属性或属性值对。之后就是通常的CSS声明，如果满足条件，要应用什么规则。

上面的例子指出，如果浏览器支持CSS grid（稍后会有更多的说明），它应该将 display: grid; 应用到带有 .site-content 类的元素上。

还需要注意的是，@supports 理解操作符not、and、和 or（也可以组合）来创建更具体的规则，比如为不支持该特定功能的浏览器提供回退。

@supports not (display: grid) {
    .site-content {
        float: left;
    }
}
为了正确地使用@supports，你需要知道哪些浏览器支持它，好消息是所有现代浏览器都支持。



但是，由于这些查询的目标是启用或禁用旧浏览器无法处理的特性，所以请确保正确地构造它们。这意味着，如果要使用特性查询，请为支持特性查询的浏览器创建它。

Flexbox Gaps
Flexbox是我们之前详细讨论过的另一个CSS布局模块。长期以来，它的一个弱点就是flexbox间隙，也就是可以定义行和列之间的中断。

值得庆幸的是，浏览器对这个CSS功能的支持正在改善。现在您可以开始使用 gap、row-gap 和 column-gap 在使用Grid、Flexbox和Multi-Column Layouts创建的布局中创建空间。

这是一个简短的示例，说明在flexbox中的外观：

.flex-gap-test {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 16px;
}

<div class="flex-gap-test">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
</div>
这是在页面上：



虽然可以通过页边距来实现同样的布局，但它需要更多的标记和变通方法，而不是简单地声明间隙大小。

content-visibility
content-visibility 是一个非常酷的新CSS功能，可以提高网站性能。它的工作原理基本上就像懒惰加载一样，只是不针对图片，而是针对任何HTML元素。您可以使用它来阻止网站的任何部分加载，直到其可见为止。

使用也超级简单，只需将其应用到你所选择的元素上，就像这样：

.content-below-fold {
    content-visibility: auto;
}
content-visibility 有三个值。默认情况下，它被设置为可见，在这种情况下，元素会像往常一样加载。另外，你也可以将其设置为hidden，在这种情况下，无论元素是否可见，都不会被渲染。另一方面，当设置为 auto 时，可见区域外的元素将被跳过，一旦出现在屏幕上，就会被渲染。

很酷的东西，对不对？

在这种情况下，有一点可能也很重要，那就是 contain-intrinsic-size。由于设置为 content-visibility: hidden; 的元素实际上大小为零，这让你可以为隐藏的元素应用一个理论上的高度和宽度，以便浏览器可以从一开始就考虑到它，而不是在元素渲染时才考虑。这样，您可以避免在滚动过程中布局突然改变。

浏览器对 content-visibility 的支持还有点不完善，但也在不断完善中。同样的，对于contain-intrinsic-size的支持也是如此。



一旦被更广泛地采用，我预测它将成为加快渲染过程的最有效工具之一。

Transitions, Transforms, Animations
在以前，如果你想让东西在你的网站上移动，你通常不得不求助于JavaScript（或动画GIF，对于那些属于MySpace一代的人）。然而，你可能不知道的是，多年来CSS也有能力让东西动起来。实现这类事情的三大工具是：

过渡 Transitions——允许你使一个属性值到另一个属性值的变化（如悬停效果）平滑而不是突然。
转换 Transformations——使您可以在2D和3D空间中移动，旋转和缩放元素。
动画 Animations——在CSS中设置简单或复杂的动画，并配置它们的运行方式和时间。
自然，我们没有篇幅在这里详细介绍这三个方面的内容。然而，让我们为每个人做一些速成的例子，让你对可能的事情有一个印象。

CSS过渡

这是CSS过渡的快速示例：

div {
    width: 100px;
    height: 100px;
    transition: height 3s;
}

div:hover {
    height: 500px;
}
当有人悬停在元素上时，上面的标记将使 div 高度的增加速度减慢到3秒。

CSS转换

以下是CSS转换的示例。当有人将鼠标悬停在元素上方时，它将使元素顺时针旋转30度：

div:hover {
    transform: rotate(30deg);
}
CSS动画

最后，是展示CSS动画的简短代码段：

@keyframes color-change {
    from {background-color: blue;}
    to {background-color: yellow;}
}

div:hover {
    animation-name: color-change;
    animation-duration: 3s;
}
注意如何使用 @keyframes 命名动画并定义其功能，然后使用 animation-name 将其应用于元素。animation-duration 控制完成的时间，还有其他类似的属性。

如果你想尝试所有这些，好消息是，浏览器的支持非常好，因此，没有任何障碍可以让您随意旋转CSS过渡，转换和动画。

滚动捕捉
Scroll snapping让你可以选择将用户的视口锁定在你网站的某个部分或元素上。它对创建酷炫的过渡非常有用，并帮助用户在向下滚动页面时关注最重要的页面元素。

这种效果在移动应用程序中很多可见，但是，通过滚动捕捉，您也可以将其带到网站上。

在最基本的层面上，使用也相对简单。你只需将滚动捕捉的类型应用到一个容器上，并定义它的子代应该捕捉到哪里。

.container {
    scroll-snap-type: y mandatory;
}

.container div {
    scroll-snap-align: start;
}
浏览器的兼容性还算不错。



然而，请注意，所有可用的滚动捕捉属性的支持有点不均衡。因此，请务必检查您的特定用例。

:is 和 :where
在我们的新CSS特性列表中，你可能不知道的最后一个条目是 :is 和 :where 伪类。它们允许你通过缩短CSS选择器的列表来减少CSS标记的重复。

例如，比较一下：

.main a:hover,
.sidebar a:hover,
.site-footer a:hover {
    /* markup goes here */
}
对此：

:is(.main, .sidebar, .site-footer) a:hover {
    /* markup goes here */
}
相同的东西适用于 :where：

:where(.main, .sidebar, .site-footer) a:hover {
    /* markup goes here */
}
如果标记是一样的，有什么区别呢？不同的是 :is 更具体。它取括号中最特殊的元素的特殊性程度。相比之下，:where 的特异性永远是零。因此，再往下覆盖就容易多了。

浏览器的应用还有点不稳定，但慢慢就会有了。所以，请随意开始尝试。


>:where() 伪类及其任何参数都不对选择器的特殊性有所帮助，它的特殊性始终为零。

```css
/* sanitize.css where不会增加样式的权重值 */
svg:where(:not([fill])) {
  fill: currentColor;
}


/* author stylesheet */
.share-icon {
  fill: blue; /* 由于特殊性较高，适用 */
}
```