# API

> **网络请求** 相关函数

## getCookie

获取指定域名网页的 **Cookie** . 

### 说明

> **[Warning] 只能在 `ScriptCat` 环境中使用.** 

### 类型

```ts
/**
 * 获取 输入域名 下的所有 cookie 列表
 *
 * @param domain 域名
 * @returns cookieList Cookie列表
 *
 * @warn 需要授权函数 `GM_cookie`
 * @warn 只能在 ScriptCat 环境中使用
 *
 * @example getCookie( '.bilibili.com' ) - 获取 bilibili 下的所有 cookie
 */
declare function getCookie( domain: string ): Promise<ICookie[]>;

/**
 * 获取 输入域名 下的某一项 cookie 内容
 *
 * @param domain 域名
 * @param key cookie 键名
 * @returns cookie cookie 值
 *
 * @warn 需要授权函数 `GM_cookie`
 * @warn 只能在 ScriptCat 环境中使用
 *
 * @example getCookie( '.bilibili.com', 'DedeUserID' ) - 获取 bilibili uid
 */
declare function getCookie( domain: string, key: string ): Promise<string>;

/**
 * 传入网站 Cookie 文本内容, 解析出对应的 key 的值
 *
 * @param documentCookieContent 网站 Cookie 文本, 通常为 document.cookie
 * @param key cookie 键名
 *
 * @warn 需要授权函数 `GM_cookie`
 * @warn 只能在 ScriptCat 环境中使用
 *
 * @example getCookie( document.cookie, 'DedeUserID' ) - 获取 bilibili uid
 */
declare function getCookie( documentCookieContent: string, key: string ): Promise<string>;

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

### 参数

**重载1** - 通过域名获取 Cookie

| 参数     | 类型     | 内容                 | 必须 | 默认值 | 备注                                     |
| -------- | -------- | -------------------- | ---- | ------ | ---------------------------------------- |
| `domain` | `string` | 需要获取网站的域名   | √    |        |                                          |
| `key`    | `string` | 需要获取 Cookie 的键 |      |        | 如果为空, 返回一个包含所有 Cookie 的数组 |

**重载2** - 通过网页 Cookie 获取Cookie

| 参数             | 类型     | 内容                 | 必须 | 默认值 | 备注                                   |
| ---------------- | -------- | -------------------- | ---- | ------ | -------------------------------------- |
| `documentCookie` | `string` | 网站 Cookie 文本内容 | √    |        | 正常情况下通过 `document.cookie` 拿到. |
| `key`            | `string` | 需要获取 Cookie 的键 | √    |        | 如果为空, 报错                         |

### 使用

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

>> **脚本加载在 bilibili.com 上使用该函数时**
>
>获取 Bilibili Uid
>
>*只能获取普通Cookie,如果想获取特殊Cookie (如 http-only ),还是需要用上面的通过域名获取Cookio重载*

```js
getCookie( document.cookie, 'DedeUserID' )
	.then( uid => {
		console.log( uid );
	} )
	.catch( err => {
		console.error( err );
	} );
```

## gmRequest

通过 `GM_xmlhttpRequest` 发送网络请求 (Promise).

### 说明

>**[Warning]需要授权函数`GM_xmlhttpRequest` .**

### 类型

```ts
/**
 * 通过 GM_xmlhttpRequest, 发送 GET 请求
 *
 * @see https://www.tampermonkey.net/documentation.php?ext=dhdg#api:GM_xmlhttpRequest
 */
declare function gmRequest<T extends string | Record<string, any> | Document>(
	url: string,
	method: 'GET',
	param?: Record<string, string>,
	GMXmlHttpRequestConfig?: Partial<Tampermonkey.Request>,
): Promise<T>;

/**
 * 通过 GM_xmlhttpRequest, 发送 POST 请求
 *
 * @see https://www.tampermonkey.net/documentation.php?ext=dhdg#api:GM_xmlhttpRequest
 */
declare function gmRequest<T extends string | Record<string, any> | Document, K extends any>(
	url: string,
	method: 'POST',
	data?: Record<string, K>,
	GMXmlHttpRequestConfig?: Partial<Tampermonkey.Request>,
): Promise<T>;

/**
 * 调用油猴API配置参数, 进行网络请求
 *
 * @see https://www.tampermonkey.net/documentation.php?ext=dhdg#api:GM_xmlhttpRequest
 */
declare function gmRequest<T extends string | Record<string, any> | Document>(
	GMXmlHttpRequestConfig: Tampermonkey.Request,
): Promise<T>
```

### 参数

**重载1**

| 参数     | 类型                     | 内容     | 必须 | 默认值  | 备注 |
| -------- | ------------------------ | -------- | ---- | ------- | ---- |
| `url`    | `string`                 | 请求地址 | √    |         |      |
| `method` | `string`                 | "GET"    |      | `"GET"` |      |
| `param`  | `Record<string, string>` | 网页参数 |      |         |      |

**重载2**

> 如果一个 **POST请求** 中, 既有网页参数, 也有 data 参数, 网页参数只能直接写入请求地址, 不支持通过 Object 对象写入网页参数.

| 参数     | 类型                  | 内容           | 必须 | 默认值  | 备注                                |
| -------- | --------------------- | -------------- | ---- | ------- | ----------------------------------- |
| `url`    | `string`              | 请求地址       | √    |         |                                     |
| `method` | `string`              | "POST"         |      | `"GET"` | `method` 参数为空, 默认为 **重载1** |
| `data`   | `Record<string, any>` | 请求体携带数据 |      |         |                                     |

**重载3**

| 参数                     | 类型                   | 内容             | 必须 | 默认值 | 备注                                                         |
| ------------------------ | ---------------------- | ---------------- | ---- | ------ | ------------------------------------------------------------ |
| `GMXmlHttpRequestConfig` | `Tampermonkey.Request` | 油猴网络请求参数 | √    |        | 见文档 [GM_xmlhttpRequest](https://www.tampermonkey.net/documentation.php?ext=dhdg#api:GM_xmlhttpRequest) |

### 使用

> 引入

```js
import {
	getCookie
} from '@yiero/gmlib';
```

> 基础 GET 网络请求, 请求 **网页** 内容.

```js
/**
 * 基础 GET 网络请求.
 * 发送 GET 请求获取网页数据.
 *
 * 函数会自动将 html 文本内容解析为文档对象模型, 即 Document
 */
gmRequest( 'https://baidu.com' ).then( document => {
	console.log( document.body );
} );
```

> 基础 GET 网络请求, 请求接口 **JSON** 内容.

@See [Bilibili-API-获取当前时间戳](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/time_stamp.md)

```js
/**
 * 基础 GET 网络请求.
 * 发送 GET 请求获取接口数据 (JSON).
 *
 * 函数会自动将 JSON 文本内容解析为 Object 对象.
 */
gmRequest( 'https://api.bilibili.com/x/report/click/now' ).then( response => {
	console.log( '响应码: ', response.code );
	console.log( '时间戳: ', response.data.now );
} );
```

> 发送 GET 网络请求, 并携带网页参数.
>
>@See [Bilibili-API-获取视频快照](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/video/snapshot.md#%E8%8E%B7%E5%8F%96%E8%A7%86%E9%A2%91%E5%BF%AB%E7%85%A7web%E7%AB%AF)

```js
// 直接在请求地址中写入网页参数
gmRequest( 'https://api.bilibili.com/x/player/videoshot?aid=999' );
// or 通过 param 参数写入网页参数
gmRequest( 'https://api.bilibili.com/x/player/videoshot', 'GET', {
	aid: 999,
} ).then( response => {
	console.log( response );
} );
```

> 发送 POST 网络请求, 并携带数据.
>
>@See [reqres.in](https://reqres.in/)

```js
gmRequest( 'https://reqres.in/api/users', 'POST', {
	name: 'paul rudd',
	movies: [ 'I Love You Man', 'Role Models' ],
} ).then( response => console.log( response ) );
// or 使用重载3写在一个对象中
gmRequest( {
	url: 'https://reqres.in/api/users',
	method: 'POST',
	name: 'paul rudd',
	movies: [ 'I Love You Man', 'Role Models' ],
	headers: {
		'Content-Type': 'application/json',
	},
} ).then( response => console.log( response ) );
```

## hookXhr

用于劫持 xhr 请求, 获取其返回内容, 并篡改返回内容

### 类型

```ts
export declare const hookXhr: <T extends string | Record<string, any> | Document>(
    hookUrl: (str: string) => boolean, 
    callback: (response: T, requestUrl: string) => void | string
) => void;
```

### 参数

| 参数       | 类型                                                 | 内容                                                         | 必须 | 备注 |
| ---------- | ---------------------------------------------------- | ------------------------------------------------------------ | ---- | ---- |
| `hookUrl`  | `(url: string) => boolean`                           | 回调函数, 用于判断哪些请求是需要劫持的请求. <br />返回 `true` 时, 对应的接口将触发 `callback` 回调. | √    |      |
| `callback` | `(response: T, requestUrl: string) => void | string` | 回调函数, 劫持到请求时触发.                                  | √    |      |

#### callback

##### 参数

- `response`: 返回的响应数据. 
  响应数据文本将自动解析, 如果是对象则返回对象, 如果是文档模型对象(即 html ), 也会自动解析为 Dom 结构. 否则才会返回文本. 
- `requestUrl`: 该条请求对应的请求地址. 

##### 返回值类型

- `void`: 如果回调函数返回空值, 则无事发生, 该条请求仍然会返回原数据. 
- `string`: 如果回调函数自定义了返回值, 那么该条请求的返回数据将被**篡改**, 变成回调函数返回的内容. 

### 使用

> 修改B站动态主页, 正在直播的关注列表 - 添加用户黑名单

```js
hookXhr(
	( url ) => [ 'https://api.bilibili.com/x/polymer/web-dynamic/v1/portal', '//api.bilibili.com/x/polymer/web-dynamic/v1/portal' ].includes( url ),
	( response, url ) => {
		console.log( 'response', response, url );
		// 黑名单 uid 列表
		const bankUpUidList = [ 1, 2 ];
		let liveList = response.data.live_users.items;
		// 更改获取到的直播用户列表
		response.data.live_users.items = liveList.filter( item => !bankUpUidList.includes( item.mid ) );
		// 修改直播用户列表的长度
		response.data.live_users.count = response.data.live_users.items.length;
		console.log( 'HookResponse', response, url );
		return JSON.stringify( response );
	},
);
```

