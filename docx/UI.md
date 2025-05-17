# UI

> 页面 **UI** 类辅助函数

### uiImporter

传入
`html` 文本和
`css` 文本, 自动解析并载入页面.

#### 说明

> 在工程化框架中, 使用某些插件可以将
`.html` 文件和
`.css` 文件直接导入为纯文本. 这样通过该函数就可以直接在
`html` 文件中调试
`UI`, 不用再手动复制来复制去了.

#### 类型

```ts
export declare const uiImporter: ( htmlContent: string, cssContent?: string, options?: Partial<IUiImporterOption> ) => IUiImporterResult;

/**
 * 接口: uiImporter 选项
 */
export interface IUiImporterOption {
	isAppendCssToDocument: boolean;
	
	isAppendHtmlToDocument: boolean;
	appendHtmlContainer: HTMLElement;
	
	isFilterScriptNode: boolean;
}

/**
 * 接口: uiImporter 返回值
 */
export interface IUiImporterResult {
	styleNode?: HTMLStyleElement;
	appendNodeList: HTMLElement[];
}
```

#### 参数

| 参数                             | 类型          | 内容                             | 必须 | 默认值          | 备注                                                         |
| -------------------------------- | ------------- | -------------------------------- | ---- | --------------- | ------------------------------------------------------------ |
| `htmlContent`                    | `string`      | html 文本内容                    | √    |                 | 可以传入单独的只包含元素的 `innerHTML` 文本内容. <br />也可以传入一个完整的 `html` 内容 (包括 `html`, `head`, `body` 的文本内容), 该情况只会解析 `body` 里的元素. |
| `cssContent`                     | `string`      | css 文本内容                     |      |                 |                                                              |
| `options.isAppendCssToDocument`  | `boolean`     | 是否直接将 css 解析后载入页面    |      | `true`          | 将作为 `document.head` 的子元素.                             |
| `options.isAppendHtmlToDocument` | `boolean`     | 是否直接将 html 解析后, 载入页面 |      | `true`          |                                                              |
| `options.appendHtmlContainer`    | `HTMLElement` | 载入页面后, `html` 内容的父容器  |      | `document.body` |                                                              |
| `options.isFilterScriptNode`     | `boolean`     | 是否过滤 `script` 元素           |      | `true`          |                                                              |

#### 返回值

| 返回值                             | 类型                           | 内容                    |
| ---------------------------------- | ------------------------------ | ----------------------- |
| `IUiImporterResult.appendNodeList` | `HTMLElement[]`                | 添加到页面的元素列表    |
| `IUiImporterResult.styleNode`      | `HTMLStyleElement | undefined` | 添加到页面的 style 元素 |

#### 使用

> 引入

```js
import {
	uiImporter
} from '@yiero/gmlib';
```

> 直接通过文本解析 html 内容和 css 内容, 并导入页面.

```js
/* ./ui.html */
const htmlContent = `
<!doctype html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<title>Title</title>
	<link rel="stylesheet" href="./style.css">
</head>
<body>
<dialog open class="dialog-container">
	<span class="dialog-content">Show Command</span>
</dialog>
<script src="./script.js"></script>
</body>
</html>
`;
// 等同于
const htmlClearContent = `
<dialog open class="dialog-container">
	<span class="dialog-content">Show Command</span>
</dialog>
`;

/* ./style.css */
const cssContent = `
.dialog-container {
	background-color: #ccc;
	border-radius: 10px;
}

.dialog-content {
	color: #444;
}
`;
const {
	appendNodeList,
	styleNode
} = uiImporter( htmlContent, cssContent );
console.log( 'html元素列表:', appendNodeList );
console.log( 'css元素:', styleNode );
```

> 在
`Vite` 中, 使用插件
`vite-plugin-raw` 引入 html 文件 / css 文件的纯文本内容.
>
> > 还有很多类型的插件, 这里就不一一举例了, 看一看对应的文档就会了. 比如
`vite-raw-plugin` ,
`webpack` 的
`raw-loader` 等等.

```js
// @ts-ignore
import ui
	from './ui.html?raw';
// @ts-ignore
import css
	from './style.css?raw';

uiImporter( ui, css );
```
