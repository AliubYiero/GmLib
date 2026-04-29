# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

GmLib 是一个为 Tampermonkey/ScriptCat 脚本提供辅助函数的 TypeScript 库，封装了常用的油猴 API。

## 开发命令

```bash
pnpm dev          # 监听模式构建 (rslib build --watch)
pnpm build        # 生产构建
pnpm check        # 代码检查并自动修复 (biome check --write)
pnpm format       # 代码格式化 (biome format --write)
pnpm test         # 运行测试 (rstest)
pnpm test:watch   # 监听模式运行测试
pnpm pack         # 打包为 npm 包
```

## 技术栈

- **构建工具**: rslib (Rust-based bundler)
- **测试框架**: rstest (基于 Rust 的测试框架，使用 `@rstest/adapter-rslib` 适配)
- **代码检查/格式化**: Biome
- **类型检查**: TypeScript (strict 模式)

## 代码架构

```
src/
├── index.ts              # 统一导出入口
├── API/                  # 网络请求封装
│   ├── getCookie.ts      # 获取 Cookie
│   ├── gmDownload.ts     # 文件下载
│   ├── gmRequest.ts      # GM_xmlhttpRequest Promise 封装
│   ├── hookXhr.ts         # XHR 请求劫持
│   └── util/
│       └── parseResponseText.ts
├── DOM/                  # DOM 操作
│   ├── elementWaiter.ts  # 等待元素出现
│   ├── extractDOMInfo.ts # 批量提取 DOM 数据
│   ├── scroll.ts         # 页面滚动
│   ├── setValue.ts       # 设置输入框值
│   ├── simulateClick.ts  # 模拟鼠标点击
│   ├── simulateKeyboard.ts
│   └── types/
├── Env/                  # 环境检测
│   ├── environmentTest.ts # 检测运行环境
│   └── isIframe.ts
├── Storage/              # 存储管理
│   ├── GmStorage.ts      # 基类
│   ├── GmArrayStorage.ts # 数组存储
│   ├── GmObjectStorage.ts
│   ├── createUserConfigStorage.ts
│   └── types/
├── UI/                   # 界面工具
│   └── uiImporter.ts     # 解析并载入 HTML/CSS
└── UserInteraction/      # 用户交互
    ├── Message.ts        # 消息通知组件
    ├── gmMenuCommand.ts  # 菜单命令
    ├── onKeydown.ts      # 键盘事件
    ├── onKeyup.ts
    ├── onRouteChange.ts  # 路由变化监听
    └── types/
```

## 测试模式

测试使用 rstest 框架，GM API 通过 `tests/__mocks__/gmApi.ts` 进行 mock。

```
// 测试文件结构
tests/
├── __mocks__/
│   └── gmApi.ts          # GM API mock (GM_getValue, GM_xmlhttpRequest 等)
├── API/
├── DOM/
├── Env/
├── Storage/
├── UI/
└── UserInteraction/
```

运行单个测试文件: `pnpm test -- <file>`

## 代码规范

- 缩进: 4 空格
- 引号: 单引号
- TypeScript: strict 模式
- 类型定义文件放在 `types/` 目录
