# Message 全局消息通知系统

## 概述

`Message` 是一个轻量级、可定制的全局消息通知系统，用于在网页中显示临时通知消息。支持四种消息类型（成功、警告、错误、信息）和八种显示位置，提供平滑的动画效果和交互控制。

## 语法

```ts
// 主函数
function Message(options: string | MessageDetail): void;

// 快捷方法
Message.success(message: string, options?: Omit<MessageDetail, 'type' | 'message'>): void;
Message.warning(message: string, options?: Omit<MessageDetail, 'type' | 'message'>): void;
Message.error(message: string, options?: Omit<MessageDetail, 'type' | 'message'>): void;
Message.info(message: string, options?: Omit<MessageDetail, 'type' | 'message'>): void;
```

## 参数

### 主函数参数

`Message` 函数可以接受一个字符串或一个配置对象作为参数。

#### 字符串参数

当传入字符串时，该字符串将作为消息内容，其他选项使用默认值。

#### 配置对象

当传入对象时，可以配置以下选项：

| 参数名     | 类型                                                         | 默认值   | 描述                                     |
| :--------- | :----------------------------------------------------------- | :------- | :--------------------------------------- |
| `message`  | `string`                                                     | (必需)   | 要显示的消息内容                         |
| `type`     | `'success'` | `'info'` | `'warning'` | `'error'`             | `'info'` | 消息类型，决定消息的样式和图标           |
| `duration` | `number`                                                     | `3000`   | 消息显示的持续时间（毫秒），之后自动关闭 |
| `position` | `'top-left'` | `'top'` | `'top-right'`<br />``'left'`` | `right`<br />`bottom-left` | `bottom` | `bottom-right` | `'top'`  | 消息在页面上的显示位置                   |

### 快捷方法参数

快捷方法（`success`, `warning`, `error`, `info`）接受两个参数：

1. `message: string`：要显示的消息内容
2. `options?: {duration: number; position: string}`：可选的配置对象

## 使用示例

### 基本用法

```ts
import { Message } from '@yiero/gmlib';

// 显示简单消息
Message('这是一条普通信息');

// 显示成功消息
Message.success('操作成功完成！');

// 显示带配置的警告消息
Message.warning('系统将在5分钟后维护', {
  duration: 5000,
  position: 'top-right'
});

// 使用配置对象
Message({
  message: '文件保存失败',
  type: 'error',
  duration: 4000,
  position: 'bottom-right'
});
```