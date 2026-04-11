# GmLib 项目上下文

## 项目概述

GmLib (GM Lib) 是一个油猴脚本辅助函数库，为 Tampermonkey 和 ScriptCat 脚本开发提供实用工具函数。该库封装了常用的油猴 API，简化了脚本开发流程。

- **包名**: `@yiero/gmlib`
- **技术栈**: TypeScript + rslib 构建
- **代码风格**: Biome 格式化 + Lint
- **测试框架**: rstest
- **目标环境**: Tampermonkey / ScriptCat

## 项目结构

```
src/
├── index.ts              # 主入口，导出所有模块
├── API/                  # 网络请求相关
│   ├── getCookie.ts      # Cookie 获取
│   ├── gmRequest.ts      # GM_xmlhttpRequest 封装 (Promise)
│   ├── gmDownload.ts     # 文件下载
│   ├── hookXhr.ts        # XHR 劫持
│   └── util/
│       └── parseResponseText.ts  # 响应解析
├── DOM/                  # DOM 操作相关
│   ├── elementWaiter.ts  # 元素等待器
│   ├── extractDOMInfo.ts # DOM 信息提取
│   ├── scroll.ts         # 页面滚动
│   ├── simulateClick.ts  # 模拟鼠标点击
│   ├── simulateKeyboard.ts # 模拟键盘输入
│   └── types/
│       └── ExtractRule.ts    # DOM 提取规则类型
├── UserInteraction/      # 用户交互相关
│   ├── gmMenuCommand.ts  # 菜单命令管理
│   ├── Message.ts        # 消息通知
│   ├── onKeydown.ts      # 键盘按下事件监听
│   ├── onKeyup.ts        # 键盘释放事件监听
│   └── types/
│       └── KeyboardKey.ts    # 键盘按键类型
├── Env/                  # 环境检测
│   ├── environmentTest.ts # 脚本环境检测
│   └── isIframe.ts       # iframe 检测
├── Storage/              # 存储管理
│   ├── GmStorage.ts      # 基础存储类
│   └── GmArrayStorage.ts # 数组存储类
└── UI/                   # UI 工具
    └── uiImporter.ts     # HTML/CSS 导入器

types/
└── scriptcat.d.ts        # ScriptCat 类型定义

docs/                     # 文档目录
├── UpdateLog.md          # 更新日志
├── API/                  # API 文档
├── DOM/                  # DOM 文档
├── UserInteraction/      # UserInteraction 文档
├── Env/                  # 环境文档
├── Storage/              # 存储文档
└── UI/                   # UI 文档

tests/                    # 测试目录
├── __mocks__/            # Mock 文件
├── API/                  # API 测试
├── DOM/                  # DOM 测试
├── UserInteraction/      # UserInteraction 测试
├── Env/                  # Env 测试
├── Storage/              # Storage 测试
└── UI/                   # UI 测试
```

## 构建命令

```bash
# 开发模式 (监听文件变化)
pnpm dev

# 构建
pnpm build

# 代码检查 (自动修复)
pnpm check

# 代码格式化
pnpm format

# 运行测试
pnpm test

# 测试监听模式
pnpm test:watch

# 打包
pnpm pack
```

## 开发规范

### 代码风格

- **语言**: TypeScript (ES2022 target)
- **格式化工具**: Biome
  - 缩进: 4 空格
  - 引号: 单引号
  - 自动组织导入
- **Lint**: Biome (recommended rules)
- **注释**: 使用中文 JSDoc 注释
- **文档**: 每个公共函数需包含 JSDoc，含 `@param`、`@returns`、`@example`、`@see` 等标签
- **模块系统**: ESM 格式

### 函数设计模式

1. **函数重载**: 用于支持多种参数形式（参考 `gmRequest.ts`）
2. **类封装**: 存储相关功能使用类封装（参考 `GmStorage.ts`）
3. **Promise 封装**: 将回调式油猴 API 封装为 Promise

### 命名约定

- 文件名: camelCase (如 `elementWaiter.ts`)
- 类名: PascalCase (如 `GmStorage`)
- 函数名: camelCase (如 `gmRequest`)
- 接口名: `I` 前缀 (如 `IElementWaiterOption`)

### 依赖要求

部分函数需要油猴脚本授权 (`@grant`)，使用前需确认：

- `GM_xmlhttpRequest` - 网络请求
- `GM_setValue` / `GM_getValue` - 存储
- `GM_download` - 文件下载
- `GM_cookie` - Cookie 操作

## 测试

使用 rstest 测试框架，配置文件为 `rstest.config.ts`。

> Rstest 遵循该规范: https://rstest.rs/llms.txt

```bash
# 运行所有测试
pnpm test

# 监听模式
pnpm test:watch
```

## 发布配置

- **入口**: `./dist/index.js`
- **类型定义**: `./dist/index.d.ts`
- **输出格式**: ESM

## 相关链接

- 仓库: https://github.com/AliubYiero/GmLib
- Tampermonkey API: https://www.tampermonkey.net/documentation.php
