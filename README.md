# 油猴辅助函数库

> 一系列辅助油猴脚本开发的函数. 

## 函数库

### Page

> 页面 **载入 / 刷新** 相关

| 函数                                       | 作用         | 示例              | 需要授权函数 |
| ------------------------------------------ | ------------ | ----------------- | ------------ |
| [`elementWaiter`](docx/Page.md#elementWaiter) | 等待元素载入 | [elementWaiter.js](./docx/example/Page/elementWaiter.js) | -            |

### API

> **网络请求** 相关


| 函数                              | 作用                | 示例                                            | 需要授权函数                     |
| --------------------------------- | ------------------- | ----------------------------------------------- |----------------------------|
| [`getCookie`](docx/API.md#getCookie) | 获取对应网站 Cookie | [getCookie.js](./docx/example/API/getCookie.js) | `GM_cookie`<br />`GM_info` |
| [`gmRequest`](docx/API.md#gmRequest) | 通过 `GM_xmlhttpRequest` 发送网络请求 (Promise). | [gmRequest.js](./docx/example/API/gmRequest.js) | `GM_xmlhttpRequest`        |
| [`hookXhr`](docx/API.md#hookXhr) | 用于劫持 xhr 请求, 获取其返回内容, 并篡改返回内容 | [hookXhr.js](./docx/example/API/hookXhr.js) | -                          |

### Env

> **脚本环境** 相关


| 函数                                          | 作用                                                  | 示例                                                        | 需要授权函数 |
| --------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------- | ------------ |
| [`isIframe`](docx/Env.md#isIframe)               | 判断脚本载入页面是否为 Iframe 页面                    | [isIframe.js](./docx/example/Env/isIframe.js)               | -            |
| [`environmentTest`](docx/Env.md#environmentTest) | 输出当前脚本的安装环境 (`ScriptCat` / `TamperMonkey`) | [environmentTest.js](./docx/example/Env/environmentTest.js) | `GM_info`    |

### UI

> **UI** 相关

| 函数                                  | 作用                                              | 示例                                             | 需要授权函数  |
| ------------------------------------- | ------------------------------------------------- | ------------------------------------------------ | ------------- |
| [`uiImporter`](docx/UI.md#uiImporter) | 传入 `html` 文本和 `css` 文本, 自动解析并载入页面 | [uiImporter.js](./docx/example/UI/uiImporter.js) | `GM_addStyle` |
