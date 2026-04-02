# `onKeydown()`

> 监听键盘按下事件的快捷方法

> `addEventListener('keydown')` 的包装函数，简化键盘事件监听，支持自定义监听容器和事件选项。

## 类型声明

```ts
export interface IKeydownOptions {
    target?: HTMLElement | Window | Document;
    once?: boolean;
    capture?: boolean;
    passive?: boolean;
}

export type Unsubscribe = () => void;

export type KeydownCallback = (event: KeyboardEvent) => void;

declare function onKeydown(
    callback: KeydownCallback,
    options?: IKeydownOptions
): Unsubscribe;
```

## 参数

| 参数       | 类型                | 说明                 | 必须 | 默认值  | 备注                              |
| :--------- | :------------------ | :------------------- | :--- | :------ | :-------------------------------- |
| `callback` | `KeydownCallback`   | 按键按下时的回调函数 | √    | -       | 接收 KeyboardEvent 参数           |
| `options`  | `IKeydownOptions`   | 监听选项配置         |      | -       | 详见下方选项说明                  |

### IKeydownOptions 选项

| 属性       | 类型                                | 说明               | 必须 | 默认值    | 备注                                   |
| :--------- | :---------------------------------- | :----------------- | :--- | :-------- | :------------------------------------- |
| `target`   | `HTMLElement \| Window \| Document` | 监听目标容器       |      | `window`  | 监听键盘事件的元素或对象               |
| `once`     | `boolean`                           | 是否只监听一次     |      | `false`   | 为 true 时，触发一次后自动移除监听     |
| `capture`  | `boolean`                           | 是否在捕获阶段处理 |      | `false`   | 为 true 时在捕获阶段处理事件           |
| `passive`  | `boolean`                           | 是否为被动监听器   |      | `false`   | 为 true 时不会调用 preventDefault      |

### 返回值

返回 `Unsubscribe` 函数，调用该函数可移除事件监听。

------

## 使用示例

### 示例1：基本用法

```ts
import { onKeydown } from '@yiero/gmlib';

// 监听全局按键，按 Escape 关闭弹窗
onKeydown((e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
```

### 示例2：指定监听容器

```ts
// 只在特定输入框上监听
const searchInput = document.querySelector('#search-input');

onKeydown((e) => {
    // 按下 Ctrl+Enter 执行搜索
    if (e.ctrlKey && e.key === 'Enter') {
        performSearch();
    }
}, { target: searchInput });
```

### 示例3：只监听一次

```ts
// 只监听用户的第一次按键
onKeydown((e) => {
    console.log(`用户按下了 ${e.key} 键，开始引导...`);
    startUserGuidance();
}, { once: true });
```

### 示例4：取消监听

```ts
// 添加监听
const off = onKeydown((e) => {
    handleShortcut(e);
});

// 某些条件满足后，取消监听
if (shouldStopListening) {
    off();  // 移除事件监听
}
```

### 示例5：组合快捷键

```ts
// 在文档上监听全局快捷键
onKeydown((e) => {
    // Ctrl+S 保存
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();  // 阻止浏览器默认保存行为
        saveDocument();
    }

    // Ctrl+Shift+N 新建
    if (e.ctrlKey && e.shiftKey && e.key === 'N') {
        e.preventDefault();
        createNewItem();
    }

    // F1 帮助
    if (e.key === 'F1') {
        e.preventDefault();
        showHelp();
    }
}, { target: document });
```

### 示例6：表单输入监听

```ts
const form = document.querySelector('#my-form');

// 监听表单内的键盘导航
onKeydown((e) => {
    if (e.key === 'ArrowDown') {
        // 向下导航到下一个字段
        focusNextField();
    } else if (e.key === 'ArrowUp') {
        // 向上导航到上一个字段
        focusPreviousField();
    } else if (e.key === 'Tab' && e.shiftKey) {
        // Shift+Tab 反向导航
        handleReverseTab();
    }
}, { target: form });
```

### 示例7：游戏控制

```ts
// WASD 游戏控制
onKeydown((e) => {
    switch (e.key.toLowerCase()) {
        case 'w':
            player.moveUp();
            break;
        case 'a':
            player.moveLeft();
            break;
        case 's':
            player.moveDown();
            break;
        case 'd':
            player.moveRight();
            break;
        case ' ':
            player.jump();
            break;
    }
});
```

## 注意事项

1. **默认目标**：如果不指定 `target`，默认监听 `window` 对象上的键盘事件

2. **取消默认行为**：在回调函数中调用 `e.preventDefault()` 可以阻止浏览器的默认行为（如 F5 刷新、Ctrl+S 保存等）

3. **内存管理**：建议在组件卸载或不需要时调用返回的取消函数，避免内存泄漏

4. **事件冒泡**：子元素上的键盘事件会冒泡到父元素，可以通过 `e.stopPropagation()` 阻止冒泡

5. **捕获阶段**：设置 `capture: true` 可以在事件捕获阶段处理，先于冒泡阶段
