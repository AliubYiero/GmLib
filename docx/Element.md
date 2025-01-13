# Element

> **页面元素** 相关函数

## scroll

滚动页面/指定元素到指定位置. 

### 类型

```ts
export declare function scroll(targetElement: HTMLElement, container: HTMLElement | Window, scrollPercent?: number): void;

export declare function scroll(scrollPercent?: number): void;
```

### 使用

> 引入

```js
import { scroll } from '@yiero/gmlib';
```

> 滚动页面到指定百分比位置

```js
// 滚动页面到 50% 的位置
scroll();
// 等同于
scroll( .5 );

// 滚动页面到顶部
scroll( 0 );
// 滚动页面到底部
scroll( 1 );
```

> 滚动指定元素到指定位置 (需要父容器是滚动容器)

```js
const targetContainer = document.querySelector( '.item' );
// 滚动 .item 元素到父容器的 50% 位置
scroll( targetContainer, targetContainer.parentElement, .5 );
```
