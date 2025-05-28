# 更新日志

### 0.1.18 - pref

- 修改 Env / Storage / UI 文档
- 修改 README 文档结构, 添加一个函数用于自动维护 README 文档

运行指令, 更新 README 文档
```bat
npm run update:readme-docx
```

### 0.1.17 - pref

- 修改 Element 文档

### 0.1.16 - pref

- 重新修改函数的文件结构
- 将 `elementWaiter` 转移到了 `Element` 分组

### 0.1.15 - pref

- 修改 API 文档
- 添加函数测试 `gmRequest` / `getCookie`

### 0.1.14 - chore

- 重新搭建打包配置

### 0.1.13 - pref

- `GmArrayStorage` 函数支持属性: 
  - `length`: 查询数组长度
  - `lastItem`: 获取数组最后一项

### 0.1.12 - update

- 支持函数: 
  - `GmStorage`: 用于管理油猴存储. 
  - `GmArrayStorage`: 用于管理数组类油猴存储. 

### 0.1.11 - fix

- 修复 `elementWaiter` 无法正常使用的问题. 

### 0.1.10 - update

- 支持函数:
  - `scroll`: 用于滚动页面元素. 

### 0.1.9 - update

- 支持函数: 
  - `hookXhr`: 用于劫持 xhr 请求, 获取其返回内容, 并篡改返回内容. 

### 0.1.8 - update

- 支持函数:
    -
    `uiImporter`: 可以通过 html 文本和 css 文本, 直接将其解析并加载到页面中.
- 更新了
  `elementWaiter` 的类型和默认值.
  `config.parent` 的默认值现在是
  `document`
- 现在类型文件将自动编译
- 修改类型文件地址:
  `dist/index.d.ts` ->
  `dist/types/index.d.ts`

### 0.1.7 - fix

- 修复函数错误:
  -
  `elementWaiter`:
    - 修复在某些情况下不是使用
      `configs.parent` 指定的容器, 而是使用
      `document` 获取元素的问题.
    - 拓展类型提示, 现在的
      `configs.parent` 也支持类型
      `DocumentFragment` 了.

### 0.1.6 - fix

- 修复类型提示:
  -
  `gmRequest`: 修复只填1个参数时, 类型提示只会指向重载3而不是重载1的问题.

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
