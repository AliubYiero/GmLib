# 更新日志

### 0.1.5 - update

- 拓展函数功能:
  `getCookie`, 现在可以传入网页中的普通 Cookie 文本 (即通过
  `document.cookie` 获取的文本), 获取到其中具体的某一项 Cookie 的值了.
- 给打包文件添加上顶部注释信息.

### 0.1.4 - update

- 支持函数:
  `gmRequest`, 简化
  `GM_xmlhttpRequest` 请求, 并通过 Promise 返回. 需要授权函数
  `GM_xmlhttpRequest`.
- 优化文档超链接跳转, 让其可以在 Github / Npm 中正确跳转.

### 0.1.3 - update

- 支持函数: `environmentTest`, 用于输出脚本安装的环境, 需要授权函数 `GM_info`. 
- `getCookie` 函数会先执行一遍安装环境判断, 相应的也需要授权函数 `GM_info`. 

### 0.1.2 - update

- 支持函数: `isIframe`, 用于判断当前脚本载入的页面是否为 iframe 页面. 
- 更改了部分代码的目录结构. 
- 优化了文档的函数说明. 

### 0.1.1 - update

- 支持函数: `getCookie`, 用于获取对应网站的 Cookie. 只能在 `ScriptCat` 环境中使用. 
- 修复 `index.d.ts` 没有正确声明, 导致 ts 引入报错, 以及没有类型提示的问题.
- 删除 github-action , 不想折腾了. 

### 0.1.0 - feat

- 试发布库.
- 支持函数: `ElementWaiter`, 用于等待元素载入.  
