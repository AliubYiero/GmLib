# Page

>  页面 **载入 / 加载** 类辅助函数

### elementWaiter

等待元素载入. 

#### 说明

> 网站使用网页框架时, 页面完全载入时 (即 `load` 事件触发), 并非所有元素到载入到页面, 这时候就需要等待元素载入. 

#### 类型

```ts
declare const elementWaiter: <T extends HTMLElement>(
	selector: string,
	options?: IElementWaiterOption,
) => Promise<T>;

declare interface IElementWaiterOption {
	parent: HTMLElement;
	timeoutPerSecond: number;
	delayPerSecond: number;
}
```

#### 参数

| 参数                       | 类型     | 内容                                           | 必须 | 默认值         | 备注                                                         |
| -------------------------- | -------- | ---------------------------------------------- | ---- | -------------- | ------------------------------------------------------------ |
| `selector`                 | `string` | 目标元素选择器                                 | √    |                |                                                              |
| `options.parent`           | `string` | 监听的父容器                                   |      | `document` |                                                              |
| `options.timeoutPerSecond` | `number` | 监听超时时间(s)                                |      | `20`           | 如果设置为 `0`, 则不存在超时限制.                            |
| `options.delayPerSecond`   | `number` | 获取到目标元素之后, 会延时 n 秒后重新获取元素. |      | `0.5`          | 作用: 某些网站可能加载元素之后重新更新元素, 导致获取到的元素和页面中的元素已经不是一个元素. |

#### 使用

> 引入

```js
import { elementWaiter } from '@yiero/gmlib';
```

> 监听元素 `#app` 载入. 
> 请确保 `<body>` 元素已载入, 即 `run-at` 不能是 `document-start`, 否则请手动指定监听容器. 

```js
elementWaiter( '#app' ).then( ( element ) => {
	console.log( element );
} );
```

> 手动指定父容器, 监听元素 `.content` 载入

```js
elementWaiter( '.content-item', {
	parent: document.querySelector( '.content-container' ),
} ).then( ( element ) => {
	console.log( element );
} );
```

> 取消超时时间, 取消延时

```js
elementWaiter( '#app', {
	timeoutPerSecond: 0,
	delayPerSecond: 0,
} ).then( ( element ) => {
	console.log( element );
} );
```
