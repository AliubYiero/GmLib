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

### environmentTest

输出当前脚本的安装环境是 `ScriptCat` 还是 `TamperMonkey` .

#### 说明

> [Warn] 需要授权函数 `GM_info`

#### 类型

```ts
export const environmentTest: () => IEnvironment;

export type IEnvironment = 'ScriptCat' | 'Tampermonkey';
```

#### 使用

> 引入

```js
import { environmentTest } from '@yiero/gmlib';
```

> 判断脚本安装环境

```js
// 脚本猫 (ScriptCat) 环境
environmentTest();      // -> 'ScriptCat'
// 篡改猴 (TamperMonkey) 环境
environmentTest();      // -> 'TamperMonkey'
```

> 根据脚本安装环境调用对应函数

```js
/**
 * TamperMonkey 环境执行函数
 */
const handleForTampermonkey = () => {};
/**
 * ScriptCat 环境执行函数
 */
const handleForScriptcat = () => {};
/**
 * 环境判断映射
 */
const handleMapper = {
	'ScriptCat': handleForScriptcat,
	'TamperMonkey': handleForTampermonkey,
};
// 获取脚本安装环境
const environment = environmentTest();
// 运行对应函数
handleMapper[environment]();
```
