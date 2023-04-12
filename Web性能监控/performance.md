## Performance

### 一、PerformanceNavigationTiming

```js
window.performance.getEntries();
```

这个会返回所有的 timing 对象

1. 获取 PerformanceNavigationTiming

   ```js
   window.performance.getEntriesByType("navigation");
   ```

2. 具体字段查看 mdn

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceNavigationTiming)
