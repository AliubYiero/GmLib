# `gmDownload()` 函数

> **基于 Tampermonkey API 的增强型文件下载工具**

## 概述

`gmDownload()` 函数封装了 Tampermonkey/ScriptCat 的 `GM_download` API，提供 Promise 化的文件下载能力，并增强了进度监控和错误处理功能。该函数适用于需要可靠文件下载的用户脚本场景。

## 语法

```ts
declare gmDownload(
  url: string,
  filename: string,
  details?: DownloadRequest
): Promise<boolean>
```

## 参数

### `url` (必需)

- **类型**: `string`
- **描述**: 要下载的文件 URL
- **示例**: `'https://example.com/file.zip'`

### `filename` (必需)

- **类型**: `string`
- **描述**: 下载后保存的文件名
- **示例**: `'report.pdf'`

### `details` (可选)

- **类型**: `DownloadRequest`
- **描述**: 下载配置选项（扩展自 `Tampermonkey.DownloadRequest`）

```ts
type DownloadRequest = 
  Omit<Tampermonkey.DownloadRequest, 'url' | 'name' | 'onerror' | 'onprogress'> & {
    onerror?: (error: Tampermonkey.DownloadErrorResponse) => void;
    onprogress?: (
      response: Tampermonkey.DownloadProgressResponse,
      abortHandle: Tampermonkey.AbortHandle<boolean>
    ) => void;
}
```

#### 配置选项说明

| 属性             | 类型                                                         | 描述                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `url`            | `String`                                                     | **必需**。下载目标资源（URL 或二进制对象）                   |
| `name`           | `String`                                                     | **必需**。带扩展名的文件名（需在 Tampermonkey 白名单中）     |
| `headers`        | `Object`                                                     | 包含 HTTP 请求头的对象（参考 `GM_xmlhttpRequest`）           |
| `saveAs`         | `Boolean`                                                    | 是否显示"另存为"对话框（仅 browser API 模式有效）            |
| `conflictAction` | `String`                                                     | 文件名冲突时的处理策略（仅 browser API 模式有效） 可选值：`uniquify`（自动重命名）、`overwrite`（覆盖）、`prompt`（询问用户） |
| `onload`         | `() => void`                                                 | 下载成功时触发的回调函数                                     |
| `onerror`        | `(error: Tampermonkey.DownloadErrorResponse) => void`        | 下载失败时触发的回调函数，参数为包含以下属性的对象： - `error`：错误原因（`not_enabled`，`not_whitelisted`，`not_permitted`，`not_supported`，`not_succeeded`） - `details`：错误详细信息 |
| `onprogress`     | `Function`                                                   | 下载进度变化的回调函数                                       |
| `ontimeout`      | `(response: Tampermonkey.DownloadProgressResponse, abortHandle: Tampermonkey.AbortHandle<boolean>) => void` | 下载超时时触发的回调函数                                     |

## 返回值

| 类型               | 解析值 | 拒绝值                  | 描述               |
| :----------------- | :----- | :---------------------- | :----------------- |
| `Promise<boolean>` | `true` | 错误信息或 `'time_out'` | 表示下载成功或失败 |

### 错误处理

函数可能返回的错误类型：

| 错误来源    | 错误类型        | 描述             |
| :---------- | :-------------- | :--------------- |
| `onerror`   | `DownloadError` | 包含错误详情对象 |
| `ontimeout` | `'time_out'`    | 自定义超时标识   |
| 其他异常    | `Error`         | 未捕获的异常     |

## 示例

### 基本下载

```ts
// 下载图片
gmDownload(
  'https://example.com/image.jpg',
  'nature.jpg'
)
    .then(() => console.log('下载成功'))
    .catch(err => console.error('下载失败:', err));
```

### 带进度监控的下载

```ts
gmDownload(
  'https://example.com/large-file.zip',
  'downloads/data.zip',
  {
    onprogress: (progress, abort) => {
      const percent = Math.round(
        (progress.loaded / progress.total) * 100
      );
      console.log(`下载进度: ${percent}%`);
    }
  }
);
```

### 带自定义设置的下载

```ts
gmDownload(
  'https://api.example.com/report',
  'q3.pdf',
  {
    saveAs: true,
    timeout: 30000,
    onload: () => console.log('文件保存成功'),
    onerror: (err) => console.error('错误代码:', err.details),
    ontimeout: () => console.warn('下载超时')
  }
);
```

### 批量下载管理

```ts
const downloadQueue = [
  { url: 'file1.pdf', name: 'doc1.pdf' },
  { url: 'file2.pdf', name: 'doc2.pdf' },
  { url: 'file3.pdf', name: 'doc3.pdf' }
];

async function processDownloads() {
  for (const file of downloadQueue) {
    try {
      await gmDownload(file.url, file.name);
      console.log(`已下载: ${file.name}`);
    } catch (error) {
      console.error(`${file.name} 下载失败:`, error);
    }
  }
}
```

## 高级用法

### 可中止下载

```ts
let abortController = null;

function startDownload() {
  const downloadPromise = gmDownload(
    'https://example.com/video.mp4',
    'tutorial.mp4',
    {
      onprogress: (progress, abortHandle) => {
        abortController = abortHandle;
        
        if (progress.loaded > 10000000) {
          console.log('文件过大，中止下载');
          abortController.abort();
        }
      }
    }
  );
  
  downloadPromise.catch(err => {
    if (err === 'abort') {
      console.log('下载已中止');
    }
  });
}

function cancelDownload() {
  if (abortController) {
    abortController.abort();
  }
}
```

### 带重试机制的下载

```ts
async function downloadWithRetry(url, filename, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await gmDownload(url, filename, {
        timeout: 10000
      });
      return true;
    } catch (error) {
      console.log(`下载失败 (尝试 ${attempt}/${retries})`);
      
      if (attempt === retries) {
        throw error;
      }
      
      // 等待指数退避时间
      await new Promise(res => 
        setTimeout(res, 1000 * Math.pow(2, attempt))
      );
    }
  }
}
```