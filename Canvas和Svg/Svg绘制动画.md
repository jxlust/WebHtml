## SVG 动画

### 一、set

set 是最简单的动画,它不是连续动画,它是一瞬间就完成 A 到 B 的变化

### 二、animate

animation 表示有过度效果的动画

http://www.qiutianaimeili.com/html/page/2021/07/20500a5u54mp7v2.html

其中路径描述包含如下命令：

+ M = moveto 移动到某点。
+ L = lineto 画一条直线到某点。
+ H = horizontal lineto 画一条水平线到某点。
+ V = vertical lineto 画一条垂直线到某点。
+ Q = quadratic Bézier curveto 二次贝塞尔曲线
+ T = smooth quadratic Bézier curveto 平滑二次贝塞尔曲线
+ C = curveto 三次贝塞尔曲线
+ S = smooth curveto 平滑三次贝塞尔曲线
+ A = elliptical Arc 弧形
+ Z = closepath 从结束点到开始点画一条直线，形成一个闭合的区域。

**以上所有命令均允许小写字母：**

1. 大写表示绝对定位，绝对的参照点是 svg 最上角的那一点。
2. 小写表示相对定位，相对的参照点是上一个位置。
