# 油猴辅助函数库

> 一系列辅助油猴脚本开发的函数.

## 函数库

- **API**
	- [`getCookie`](docx/API/getCookie.md): 获取对应网站 Cookie
	- [`gmDownload`](docx/API/gmDownload.md): 下载文件到本地
	- [`gmRequest`](docx/API/gmRequest.md): 通过 `GM_xmlhttpRequest` 发送网络请求 (Promise).
	- [`hookXhr`](docx/API/hookXhr.md): 用于劫持 xhr 请求, 获取其返回内容, 并篡改返回内容
- **Element**
	- [`elementWaiter`](docx/Element/elementWaiter.md): 等待元素加载完成
	- [`gmMenuCommand`](docx/Element/gmMenuCommand.md): 
	- [`Message`](docx/Element/Message.md): 消息通知
	- [`scroll`](docx/Element/scroll.md): 页面滚动到指定位置
- **Env**
	- [`environmentTest`](docx/Env/environmentTest.md): 输出当前脚本的安装环境 (`ScriptCat` / `TamperMonkey`)
	- [`isIframe`](docx/Env/isIframe.md): 判断当前页面是否在 iframe 中
- **Storage**
	- [`GmArrayStorage`](docx/Storage/GmArrayStorage.md): 管理油猴数组存储, `GmStorage` 的子类
	- [`GmStorage`](docx/Storage/GmStorage.md): 管理油猴存储
- **UI**
	- [`uiImporter`](docx/UI/uiImporter.md): 传入 `html` 文本和 `css` 文本, 自动解析并载入页面