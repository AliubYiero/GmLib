/**
 * 键盘监听选项接口
 */
export interface IKeydownOptions {
    /**
     * 监听目标容器
     * @default window
     */
    target?: HTMLElement | Window | Document;

    /**
     * 是否只监听一次
     * @default false
     */
    once?: boolean;

    /**
     * 是否在捕获阶段处理事件
     * @default false
     */
    capture?: boolean;

    /**
     * 是否为被动监听器（不调用 preventDefault）
     * @default false
     */
    passive?: boolean;
}

/**
 * 取消监听函数
 */
export type Unsubscribe = () => void;

/**
 * 键盘按下事件回调函数类型
 */
export type KeydownCallback = (event: KeyboardEvent) => void;

/**
 * 监听键盘按下事件
 *
 * `addEventListener('keydown')` 的快捷方法。
 * 可以指定监听容器，默认为 window。
 * 返回一个取消监听的函数。
 *
 * @param callback 键盘按下时的回调函数
 * @param options 监听选项配置
 * @returns 取消监听的函数
 *
 * @example
 * // 基本用法 - 监听全局按键
 * onKeydown((e) => {
 *   if (e.key === 'Escape') {
 *     closeModal();
 *   }
 * });
 *
 * @example
 * // 指定容器监听
 * onKeydown((e) => {
 *   if (e.ctrlKey && e.key === 'Enter') {
 *     submitForm();
 *   }
 * }, { target: document.body });
 *
 * @example
 * // 只监听一次
 * onKeydown((e) => {
 *   console.log('用户按下了任意键');
 * }, { once: true });
 *
 * @example
 * // 取消监听
 * const off = onKeydown((e) => handleKey(e));
 * off();  // 取消监听
 */
export function onKeydown(
    callback: KeydownCallback,
    options?: IKeydownOptions,
): Unsubscribe {
    const {
        target = window,
        once = false,
        capture = false,
        passive = false,
    } = options || {};

    const eventOptions: AddEventListenerOptions = {
        once,
        capture,
        passive,
    };

    // 添加事件监听
    target.addEventListener('keydown', callback as EventListener, eventOptions);

    // 返回取消监听函数
    return () => {
        target.removeEventListener(
            'keydown',
            callback as EventListener,
            eventOptions,
        );
    };
}
