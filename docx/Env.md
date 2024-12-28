## Env

> **脚本安装环境** 相关函数

### isIframe

判断脚本载入页面是否为 Iframe 页面. 

#### 说明

> 在脚本比较大, 并且载入页面存在多个**可以被 match** 到, 但是并**不需要载入脚本**的 iframe 页面时使用, 可以有效提高页面的运行效率. 

#### 类型

```ts
declare const isIframe: () => boolean;
```

#### 使用

> 引入

```js
import { isIframe } from '@yiero/gmlib';
```

> **[在脚本顶层作用域使用]**
>
> 如果当前页面是 iframe 页面, 不再继续执行脚本

```js
if ( isIframe ) {
	return;
}
```

