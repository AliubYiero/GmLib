# API

> **网络请求** 相关函数

### getCookie

> **[Warning] 只能在 `ScriptCat` 环境中使用.** 

#### 类型

```ts
declare function getCookie( domain: string, key: string ): Promise<string>;
declare function getCookie( domain: string ): Promise<ICookie[]>;

declare interface ICookie {
	domain: string;
	name: string;
	value: string;
	expirationDate: number;
	hostOnly: boolean;
	httpOnly: boolean;
	path: string;
	sameSite: string;
	secure: boolean;
	session: boolean;
	storeId: string;
}
```

#### 参数

| 参数     | 类型     | 内容                 | 必须 | 默认值 | 备注                                     |
| -------- | -------- | -------------------- | ---- | ------ | ---------------------------------------- |
| `domain` | `string` | 需要获取网站的域名   | √    |        |                                          |
| `key`    | `string` | 需要获取 Cookie 的键 |      |        | 如果为空, 返回一个包含所有 Cookie 的数组 |

#### 使用

> 引入

```js
import { getCookie } from '@yiero/gmlib';
```

> 获取 Bilibili 下的所有 Cookie

```js
getCookie( 'bilibili.com' )
	.then( cookieList => {
		console.log( cookieList );
	} )
	.catch( err => {
		console.error( err );
	} );
```

> 获取 Bilibili Uid

```js
getCookie( 'bilibili.com', 'DedeUserID' )
	.then( uid => {
		console.log( uid );
	} )
	.catch( err => {
		console.error( err );
	} );
```

