# 油猴辅助函数库

> 一系列辅助油猴脚本开发的函数. 

## 函数库

### Page

> 页面 **载入 / 刷新** 相关

| 函数                                       | 作用         | 示例              | 需要授权函数 |
| ------------------------------------------ | ------------ | ----------------- | ------------ |
| [`elementWaiter`](docx/Page#elementWaiter) | 等待元素载入 | [elementWaiter.js](./docx/example/Page/elementWaiter.js) | -            |

### API

> **网络请求** 相关


| 函数                              | 作用                | 示例                                            | 需要授权函数               |
| --------------------------------- | ------------------- | ----------------------------------------------- | -------------------------- |
| [`getCookie`](docx/API#getCookie) | 获取对应网站 Cookie | [getCookie.js](./docx/example/API/getCookie.js) | `GM_cookie`<br />`GM_info` |

### Env

> **脚本环境** 相关


| 函数                                          | 作用                                                  | 示例                                                        | 需要授权函数 |
| --------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------- | ------------ |
| [`isIframe`](docx/Env#isIframe)               | 判断脚本载入页面是否为 Iframe 页面                    | [isIframe.js](./docx/example/Env/isIframe.js)               | -            |
| [`environmentTest`](docx/Env#environmentTest) | 输出当前脚本的安装环境 (`ScriptCat` / `TamperMonkey`) | [environmentTest.js](./docx/example/Env/environmentTest.js) | `GM_info`    |
