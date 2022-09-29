## createVNode 和 render 函数

例子：灵活创建渲染个弹框

方法 1

```tsx
//对象组件
const Message1 = {
  setup(props) {
    const text = ref("1");
    const onInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      text.value = target.value;
      //这里会自动更新页面数据
    };
    return () => (
      <div>
        <span>{text.value}</span>
        <span>弹框1</span>
        <input type="text" onInput={onInput} />
      </div>
    );
  },
};

//use
export const openDialog1 = () => {
  const vm = createVNode(Message1);
  // 创建容器，也可以用已经存在的
  const container = document.createElement("div") as HTMLDivElement;
  //render通过patch 变成dom
  render(vm, container);
  // 弹窗挂到任何你想去的地方
  document.body.appendChild(container);
};
```

方法 2

```tsx
//函数组件
const text2 = ref("我是个function");
const Message2 = (props, content) => {
  console.log("message2 props:", props);
  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    text2.value = target.value;
    //函数内部定义变量，不会触发更新
    //把数据提升到全局就生效了
  };
  return (
    <div>
      <span>{text2.value}</span>
      <span>弹框2</span>
      <input type="text" onInput={onInput} />
    </div>
  );
};
//use
export const openDialog2 = () => {
  const vm = createVNode(<Message2 data="123" />);
  ...
};
```

方法 3

```tsx
//vue3 defineComponent
const Message3 = defineComponent({
  props: {
    title: String,
  },
  emits: ["change"],
  setup(props, { slots }) {
    const text = ref("3");
    const onInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      text.value = target.value;
      //这里居然不会触发更新
      //把数据提升到全局就生效了
    };
    return () => (
      <div>
        <span>title:{props.title}</span>
        <span>{text.value}</span>
        {slots.default?.()}
        <span>弹框3</span>
        <input type="text" onInput={onInput} />
      </div>
    );
  },
});

export const openDialog3 = () => {
  const vm = createVNode(<Message3 title="123">插槽内容</Message3>);
  ...
};
```

## tsx 的使用

根据条件渲染

```tsx
const Component1 = () => {
  return <div>组件1</div>;
};

const Component2 = () => {
  return <div>组件2</div>;
};

export const RenderByType = (props, context) => {
  return props.type === 1 ? <Component1>{context.slots.default?.()}</Component1> : <Component2></Component2>;
};

//app use
<RenderByType :type="type" />
```

多种不同的处理事件

```tsx
const Component1 = (props) => {
  return <span>{currentState.current === "1" && <span>❀</span>} 美美</span>;
};

const Component2 = (props) => {
  return <span>{currentState.current === "2" && <span>❀</span>} 校长</span>;
};

const Component3 = (props) => {
  return <span>{currentState.current === "3" && <span>❀</span>} 老师</span>;
};

const Component = (props, content) => {
  return (
    <span>
      {props.active && <span>❀</span>} {content.slots.default?.()}
    </span>
  );
};
const currentState = reactive({
  current: "1",
});
export const useMoreEventTools = () => {
  return [
    {
      title: "组件1",
      comp: <Component1></Component1>,
      onClick: () => {
        currentState.current = "1";
        console.log(1, currentState.current);
      },
    },
    {
      title: "组件2",
      comp: <Component2></Component2>,
      onClick: () => {
        currentState.current = "2";
        console.log(2, currentState.current);
      },
    },
    {
      title: "组件3",
      comp: <Component3></Component3>,
      onClick: () => {
        currentState.current = "3";
        console.log(3, currentState.current);
      },
    },
  ];
};
```

## component is 用法

例如 tab 切换渲染对应组件

```ts
//获取所有组件
const modules = import.meta.globEager("./*/index.(tsx|vue)");

const components: Record<string, DefineComponent> = {};

console.log(modules, "起航");

for (const path in modules) {
  const comp = modules[path].default;
  components[comp.name || path.split("/")[1]] = comp;
}
console.log("left-aside components:", components);

export default components;
```

```ts
//使用
const tabs = Object.entries(components)
  .map(([name, component]) => {
    const { label, icon, order } = component;
    return { label, icon, name, order, comp: component };
  })
  .sort((a, b) => a.order - b.order);

const activeName = ref(tabs[0].name);

// <component :is="tabItem.comp" v-bind="$attrs" />
```

## 依赖注入

依赖注入是设计模式控制反转中的一种，还有依赖查找 vue3 里面的 Provide/Inject 依赖注入

这里可以去看 vant-use 源码里面的 useRelation 对 Provide/Inject 的使用 vueuse 里面源码也有很多依赖注入的思想

## Composition API 抽离通用逻辑

千万不要在 setup 里面再写出像传统选项式中的逻辑了阅读源码 vueuse 里面的方法抽离

## $attrs 的使用

myinput.vue:

```vue
<template>
  <input :value="text" @input="onInput" />
</template>

<script setup lang="ts">
  defineProps({
    text: String,
  });
  const emit = defineEmits(["change"]);

  const onInput = (e: Event) => {
    let v = (e.target as HTMLInputElement).value;
    emit("change", v);
  };
</script>
```

child.vue：

```vue
<template>
  <Myinput v-bind="$attrs" @change="handleChange"></Myinput>
</template>

<script setup lang="ts">
  import Myinput from "./myinput.vue";
  const emit = defineEmits(["change"]);
  const handleChange = (v) => {
    emit("change", `${v} px`);
  };
  let attrs = useAttrs();
  console.log("print root $attrs:", attrs);
</script>
```

root.vue

```vue
<template>
  <Child :value="textV" type="text" class="my-input" @change="handleChange"></Child>
</template>

<script setup lang="ts">
  import Child from "./child.vue";
  const textV = ref("");
  const handleChange = (v) => {
    textV.value = v;
  };
</script>
```

当然，在 tsx 里面，直接对 props 解构赋值即可 **{...props}**

## v-model 的用法

可以查看我的 github 里用法：[传送门](https://github.com/jxlust/JxlVueTpl/blob/main/src/package/vue-study/ModelUse.vue)

## 插槽用法

tsx 中使用插槽 [传送门](https://github.com/jxlust/JxlVueTpl/tree/main/src/package/tsx-test) vue 中使用插槽 [传送门](https://github.com/jxlust/JxlVueTpl/blob/main/src/package/my-test/SlotTest.vue)

## hooks 的抽离之 EventListener

<details>
   <summary>useEventListener:</summary>

```ts
//study eventlistener use
import { ComputedRef, Ref, watch, getCurrentScope, onScopeDispose } from "vue";

//some type...
export type MaybeRef<T> = T | Ref<T>;

export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

type Fn = () => void;
export const isClient = typeof window !== "undefined";

//清除副作用 clear effect
export const tryOnScopeDispose = (fn) => {
  console.log("current scope:", getCurrentScope());
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
};
//empty function
const noop = () => {};

export function useEventListener<EventType = Event>(
  target: MaybeComputedRef<EventTarget | null | undefined>,
  event: string,
  listener: any,
  options?: boolean | AddEventListenerOptions,
): Fn;

export function useEventListener(...args: any[]): Fn {
  let target: MaybeComputedRef<EventTarget> | undefined, type: string, listener: any, options: any;

  [target, type, listener, options] = args;
  if (typeof target === "string") {
    target = isClient ? window : undefined;
  }

  if (!target) {
    return noop;
  }
  let clearup = noop;
  const stopWatch = watch(
    () => unref(target),
    (el: HTMLElement) => {
      console.log("监听到event target el:", el);
      //clear preview event
      clearup();
      if (!el) {
        return;
      }

      el.addEventListener(type, listener, options);

      clearup = () => {
        //remove event listener
        el.removeEventListener(type, listener, options);
        clearup = noop;
      };
    },
    {
      immediate: true,
      flush: "post", // vue组件更新之后触发监听
    },
  );

  const stop = () => {
    stopWatch();
    clearup();
  };
  //scope dispose
  tryOnScopeDispose(stop);
  return stop;
}
```

</details>

<details>
   <summary>onClickOutSide:</summary>

```ts
import { Directive } from "vue";
import { useEventListener } from "./useEventlistener";

export const vOnClickOutside: Directive = {
  mounted(el, binding) {
    let capture = binding.modifiers.bubble;
    console.log(1, capture);
    const listener = (event: PointerEvent) => {
      // window.clearTimeout(fallback)
      // const el = unrefElement(target)
      console.log("path:", event.composedPath());

      if (!el || el === event.target || event.composedPath().includes(el)) {
        //event.target
        // use contains check
        // el.contains((event.target as HTMLElement))
        return;
      }
      binding.value(event);
    };

    el._stop_effect = useEventListener(window, "click", listener, {
      capture,
    });
  },
  unmounted(el) {
    el._stop_effect();
  },
};
```

</details>
