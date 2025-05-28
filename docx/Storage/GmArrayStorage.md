# `GmArrayStorage` 类

> **专为数组设计的油猴存储管理工具**

## 概述

`GmArrayStorage` 类继承自 `GmStorage`，专门用于处理数组类型的数据存储。它提供了一系列数组操作方法（如 `push`、`pop`、`map`、`filter` 等），并确保存储的值始终是数组类型。该类适用于需要管理列表型数据的用户脚本。

## 用户脚本声明

```ts
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
```

## 语法

```ts
class GmArrayStorage<T> extends GmStorage<Array<T>> {
  constructor(key: string, defaultValue: Array<T> = []);
  
  // 属性
  get length(): number;
  get lastItem(): T | undefined;
  
  // 方法
  set(value: Array<T>): void;
  modify(value: T, index: number): void;
  reset(): void;
  delete(index: number): void;
  push(value: T): void;
  pop(): void;
  unshift(value: T): void;
  shift(): void;
  forEach(callback: (value: T, index: number, array: T[]) => void): void;
  map(callback: (value: T, index: number, array: T[]) => T): void;
  filter(callback: (value: T, index: number, array: T[]) => boolean): void;
}
```

## 构造函数

### `new GmArrayStorage<T>(key, defaultValue)`

创建数组存储实例

#### 参数

| 参数           | 类型       | 必须 | 默认值 | 描述                       |
| :------------- | :--------- | :--- | :----- | :------------------------- |
| `key`          | `string`   | √    | -      | 存储项的键名               |
| `defaultValue` | `Array<T>` |      | `[]`   | 当键不存在时返回的默认数组 |

#### 要求

- `defaultValue` 必须是数组类型

#### 示例

```ts
// 创建待办事项存储
const todoStorage = new GmArrayStorage<{task: string, done: boolean}>(
  'todo_list', 
  [{task: '示例任务', done: false}]
);

// 创建历史记录存储
const historyStorage = new GmArrayStorage<string>('search_history');
```

## 属性

### `length`

- **类型**: `number`
- **描述**: 获取当前数组的长度
- **只读**

#### 示例

```ts
console.log(`待办事项数量: ${todoStorage.length}`);
```

### `lastItem`

- **类型**: `T | undefined`
- **描述**: 获取数组的最后一个元素（如果数组为空则返回 `undefined`）
- **只读**

#### 示例

```ts
const lastSearch = historyStorage.lastItem;
if (lastSearch) {
  console.log(`最近的搜索: ${lastSearch}`);
}
```

## 方法

### `set(value)`

设置存储的新数组值

#### 参数

| 参数    | 类型       | 必须 | 描述         |
| :------ | :--------- | :--- | :----------- |
| `value` | `Array<T>` | √    | 要存储的数组 |

#### 错误

- 如果值不是数组类型，抛出 `TypeError`

#### 示例

```ts
// 完全替换数组内容
todoStorage.set([
  {task: '新任务1', done: false},
  {task: '新任务2', done: true}
]);
```

### `modify(value, index)`

修改数组中指定索引的元素

#### 参数

| 参数    | 类型     | 必须 | 描述             |
| :------ | :------- | :--- | :--------------- |
| `value` | `T`      | √    | 新的元素值       |
| `index` | `number` | √    | 要修改的索引位置 |

#### 示例

```ts
// 将第一个任务标记为完成
todoStorage.modify({task: '新任务1', done: true}, 0);
```

### `reset()`

重置存储为默认数组值

#### 示例

```ts
// 清空自定义设置
historyStorage.reset();
```

### `delete(index)`

删除数组中指定索引的元素

#### 参数

| 参数    | 类型     | 必须 | 描述             |
| :------ | :------- | :--- | :--------------- |
| `index` | `number` | √    | 要删除的索引位置 |

#### 示例

```ts
// 删除第二个搜索记录
historyStorage.delete(1);
```

### `push(value)`

向数组末尾添加新元素

#### 参数

| 参数    | 类型 | 必须 | 描述         |
| :------ | :--- | :--- | :----------- |
| `value` | `T`  | √    | 要添加的元素 |

#### 示例

```ts
// 添加新任务
todoStorage.push({task: '新任务', done: false});
```

### `pop()`

删除并返回数组的最后一个元素（修改存储但不返回值）

#### 示例

```ts
// 移除最后一个任务
todoStorage.pop();
```

### `unshift(value)`

向数组开头添加新元素

#### 参数

| 参数    | 类型 | 必须 | 描述         |
| :------ | :--- | :--- | :----------- |
| `value` | `T`  | √    | 要添加的元素 |

#### 示例

```ts
// 添加高优先级任务
todoStorage.unshift({task: '紧急任务', done: false});
```

### `shift()`

删除并返回数组的第一个元素（修改存储但不返回值）

#### 示例

```ts
// 移除第一个任务
todoStorage.shift();
```

### `forEach(callback)`

遍历数组元素（不修改存储）

#### 参数

| 参数       | 类型                                            | 必须 | 描述         |
| :--------- | :---------------------------------------------- | :--- | :----------- |
| `callback` | `(value: T, index: number, array: T[]) => void` | √    | 遍历回调函数 |

#### 示例

```ts
// 打印所有任务
todoStorage.forEach((task, index) => {
  console.log(`${index + 1}. ${task.task} [${task.done ? '✓' : ' '}]`);
});
```

### `map(callback)`

对数组元素执行映射操作并更新存储

#### 参数

| 参数       | 类型                                         | 必须 | 描述     |
| :--------- | :------------------------------------------- | :--- | :------- |
| `callback` | `(value: T, index: number, array: T[]) => T` | √    | 映射函数 |

#### 示例

```ts
// 将所有任务标记为完成
todoStorage.map(task => ({...task, done: true}));
```

### `filter(callback)`

过滤数组元素并更新存储

#### 参数

| 参数       | 类型                                               | 必须 | 描述     |
| :--------- | :------------------------------------------------- | :--- | :------- |
| `callback` | `(value: T, index: number, array: T[]) => boolean` | √    | 过滤函数 |

#### 示例

```ts
// 移除已完成的任务
todoStorage.filter(task => !task.done);
```

## 继承方法

`GmArrayStorage` 继承了 `GmStorage` 的所有方法：

| 方法               | 描述                     |
| :----------------- | :----------------------- |
| `get()`            | 获取当前数组             |
| `value`            | 获取当前数组（属性形式） |
| `remove()`         | 删除存储项               |
| `updateListener()` | 添加变更监听器           |
| `removeListener()` | 移除变更监听器           |

## 完整示例

### 待办事项管理器

```ts
// 定义待办事项类型
type TodoItem = {
  id: string;
  task: string;
  done: boolean;
};

// 初始化存储
const todoStorage = new GmArrayStorage<TodoItem>('todos', []);

// 添加任务
function addTodo(task: string) {
  todoStorage.push({
    id: Date.now().toString(),
    task,
    done: false
  });
}

// 切换任务状态
function toggleTodo(id: string) {
  todoStorage.map(item => 
    item.id === id ? {...item, done: !item.done} : item
  );
}

// 删除任务
function removeTodo(id: string) {
  todoStorage.filter(item => item.id !== id);
}

// 清除已完成任务
function clearCompleted() {
  todoStorage.filter(item => !item.done);
}
```

### 搜索历史记录

```ts
const historyStorage = new GmArrayStorage<string>('search_history', []);

// 添加搜索记录
document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  
  if (query) {
    // 移除重复记录
    historyStorage.filter(item => item !== query);
    // 添加新记录
    historyStorage.unshift(query);
    // 最多保留10条
    if (historyStorage.length > 10) {
      historyStorage.pop();
    }
  }
});

// 显示历史记录
function renderHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  
  historyStorage.forEach((query, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${query}`;
    historyList.appendChild(li);
  });
}
```