import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';
import { onKeydown } from '../../src/Element/onKeydown';

describe('onKeydown', () => {
    let container: HTMLDivElement;
    let input: HTMLInputElement;

    beforeEach(() => {
        container = document.createElement('div');
        input = document.createElement('input');
        input.type = 'text';
        container.appendChild(input);
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    describe('basic functionality', () => {
        it('should listen to keydown events on window by default', () => {
            const keys: string[] = [];
            const callback = (e: KeyboardEvent) => {
                keys.push(e.key);
            };

            onKeydown(callback);

            // 模拟 window 上的 keydown 事件
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));

            expect(keys).toEqual(['a', 'b']);
        });

        it('should listen to keydown events on specified target', () => {
            const keys: string[] = [];
            const callback = (e: KeyboardEvent) => {
                keys.push(e.key);
            };

            onKeydown(callback, { target: input });

            // 在 input 上触发事件
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'x' }));
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'y' }));

            expect(keys).toEqual(['x', 'y']);
        });

        it('should not receive events from other elements', () => {
            const keys: string[] = [];
            const callback = (e: KeyboardEvent) => {
                keys.push(e.key);
            };

            onKeydown(callback, { target: input });

            // 在其他元素上触发事件
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
            container.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));

            expect(keys).toEqual([]);
        });
    });

    describe('unsubscribe', () => {
        it('should return an unsubscribe function', () => {
            const callback = () => {};
            const off = onKeydown(callback);

            expect(typeof off).toBe('function');
        });

        it('should stop listening after unsubscribe', () => {
            const keys: string[] = [];
            const callback = (e: KeyboardEvent) => {
                keys.push(e.key);
            };

            const off = onKeydown(callback, { target: input });

            // 触发一次事件
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
            expect(keys).toEqual(['a']);

            // 取消监听
            off();

            // 再次触发事件，不应再被监听
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
            expect(keys).toEqual(['a']); // 还是只有 'a'
        });

        it('should work with window target', () => {
            const keys: string[] = [];
            const callback = (e: KeyboardEvent) => {
                keys.push(e.key);
            };

            const off = onKeydown(callback);

            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
            expect(keys).toEqual(['a']);

            off();

            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
            expect(keys).toEqual(['a']);
        });
    });

    describe('once option', () => {
        it('should only listen once when once is true', () => {
            const keys: string[] = [];
            const callback = (e: KeyboardEvent) => {
                keys.push(e.key);
            };

            onKeydown(callback, { target: input, once: true });

            // 触发多次事件
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }));

            // 只有第一次被监听
            expect(keys).toEqual(['a']);
        });
    });

    describe('capture option', () => {
        it('should use capture phase when capture is true', () => {
            const eventOrder: string[] = [];

            // 容器上的捕获阶段监听
            onKeydown(
                () => eventOrder.push('container-capture'),
                { target: container, capture: true }
            );

            // 容器上的冒泡阶段监听
            onKeydown(
                () => eventOrder.push('container-bubble'),
                { target: container, capture: false }
            );

            // input 上的冒泡阶段监听
            onKeydown(
                () => eventOrder.push('input-bubble'),
                { target: input, capture: false }
            );

            // 在 input 上触发事件
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));

            // 捕获阶段先于冒泡阶段
            expect(eventOrder).toEqual([
                'container-capture',
                'input-bubble',
                'container-bubble',
            ]);
        });
    });

    describe('passive option', () => {
        it('should accept passive option', () => {
            const callback = () => {};

            //  passive 选项不会抛出错误
            expect(() => {
                onKeydown(callback, { target: input, passive: true });
            }).not.toThrow();
        });
    });

    describe('event properties', () => {
        it('should receive KeyboardEvent with correct properties', () => {
            let receivedEvent: KeyboardEvent | null = null;
            const callback = (e: KeyboardEvent) => {
                receivedEvent = e;
            };

            onKeydown(callback, { target: input });

            input.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key: 'Enter',
                    code: 'Enter',
                    ctrlKey: true,
                    shiftKey: false,
                })
            );

            expect(receivedEvent).not.toBeNull();
            expect(receivedEvent!.key).toBe('Enter');
            expect(receivedEvent!.code).toBe('Enter');
            expect(receivedEvent!.ctrlKey).toBe(true);
            expect(receivedEvent!.shiftKey).toBe(false);
        });
    });

    describe('document target', () => {
        it('should work with document as target', () => {
            const keys: string[] = [];
            const callback = (e: KeyboardEvent) => {
                keys.push(e.key);
            };

            onKeydown(callback, { target: document });

            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'x' }));

            expect(keys).toEqual(['x']);
        });
    });

    describe('multiple listeners', () => {
        it('should support multiple independent listeners', () => {
            const keys1: string[] = [];
            const keys2: string[] = [];

            const callback1 = (e: KeyboardEvent) => keys1.push(e.key);
            const callback2 = (e: KeyboardEvent) => keys2.push(e.key);

            onKeydown(callback1, { target: input });
            onKeydown(callback2, { target: input });

            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

            expect(keys1).toEqual(['a']);
            expect(keys2).toEqual(['a']);
        });

        it('should allow unsubscribing one listener without affecting others', () => {
            const keys1: string[] = [];
            const keys2: string[] = [];

            const callback1 = (e: KeyboardEvent) => keys1.push(e.key);
            const callback2 = (e: KeyboardEvent) => keys2.push(e.key);

            const off1 = onKeydown(callback1, { target: input });
            onKeydown(callback2, { target: input });

            // 触发事件
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
            expect(keys1).toEqual(['a']);
            expect(keys2).toEqual(['a']);

            // 取消第一个监听
            off1();

            // 再次触发事件
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
            expect(keys1).toEqual(['a']); // 不再更新
            expect(keys2).toEqual(['a', 'b']);
        });
    });
});
