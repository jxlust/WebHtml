[参考网站](https://www.cnblogs.com/phyger/p/14190241.html)
## 一、节点打Tag,动态节点打tag
```html
静态节点
<span>value</span>
```

```html
动态节点
<span>{{value}}</span>
patchFlag
```
 
vue3.0底层，会自动识别某个节点是否是动态的，如果是动态的会自动生成标识（不同的动态会有不同的标识对应，如内容文本的动态，或者id的动态），从而在每次更新dom时，直接跳过哪些静态的节点，直接定位到动态的节点，大大节省效率。

## 二、事件开缓存
```
createBlock('div',{
	onClick: _cache[1] || _cache[1] = $evnet => (....a+b)
})
```

一般为一个节点设置了监听时间，每次页面进行更新，就会重新生成新的监听函数，启用了cacheHandlers，就会在第一次更新的时候进行自动识别是否可以缓存，如果可以就进行缓存，这样页面更新就不需要重新生成，尤其是在组件上，极大地减少了子组件的不必要刷新和资源消耗。

## 三、响应式Proxy
[Proxy学习参考](https://es6.ruanyifeng.com/#docs/proxy)

Proxy(vue3.0) vs Object.defineProperty (vue2.0)

Vue2.0响应式原理

响应化过程需要遍历data，props等，消耗较大

不支持Set/Map、class、数组等类型

新加或删除属性无法监听

数组响应化需要额外实现

对应的修改语法有限制

Vue3.0响应式原理：使用ES6的Proxy来解决这些问题。

通过Proxy代理，来拦截对data的一系列的操作。

## 四、Composition API
不要为了Composition而Composition

## 五、Teleport（传送门）
Modal、Dialog、Select、Dropdown…

## 六、Fragments
template中不需要用一个div包裹即没必要只有一个根节点，可以多个标签（节点）并列

## 七、Custom Renderer API ( createRenderer )
NativeScript Vue integration underway by @rigor789
Users already experimenting w/ WebGL custom renderer that can be used alongside a normal Vue application(Vugel)
WEEX、Vue Native、小程序…

## 九、Suspense
Wait on nested async dependencies in a nested tree
Works with async setup()
Works with Aysnc Components
​ 可以实现异步加载组件，整个DOM会事先在内存中进行虚拟的渲染，此时会等待异步的组件渲染，等所有的组件渲染完成之后，才会渲染到界面DOM上去。

## 十、Better TypeScript Support
Codebase written in TS w/ auto-generated type definitions
API is the same in JS and TS
In fact, code will alse be largely the same
TSX support
Class component is still supported

## 十、踩坑整理
事件

默认自动挂载根节点、废弃xxx.native事件

inheritAttrs: false (class, style, events, css scope)

设置不默认挂载到根节点，不过这会导致class等都不会挂载到根节点上

props

组件中设置一下事件属性声明。

新增emits配置

插槽

