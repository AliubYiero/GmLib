import { afterEach, beforeEach, describe, expect, it, rs } from '@rstest/core';
import { Message } from '../../src/UserInteraction/Message';

describe('Message', () => {
    beforeEach(() => {
        // 清空消息容器内的内容，而不是移除容器本身
        // 因为 messageContainer 是模块级变量，清空 body 后它仍指向游离元素
        const container = document.querySelector(
            'div[style*="position: fixed"][style*="pointer-events: none"]',
        );
        if (container) {
            container.innerHTML = '';
        }
    });

    afterEach(() => {
        // 清空消息容器内的内容
        const container = document.querySelector(
            'div[style*="position: fixed"][style*="pointer-events: none"]',
        );
        if (container) {
            container.innerHTML = '';
        }
        rs.useRealTimers();
    });

    describe('basic functionality', () => {
        it('should create message element with string', () => {
            Message('test message');

            // 检查消息容器是否存在
            const container = document.querySelector(
                'div[style*="position: fixed"]',
            );
            expect(container).toBeTruthy();

            // 检查消息元素是否存在
            const messageEl = container?.querySelector('div');
            expect(messageEl).toBeTruthy();

            // 检查消息内容
            expect(messageEl?.textContent).toContain('test message');
        });

        it('should create message with options', () => {
            Message({ message: 'success message', type: 'success' });

            const container = document.querySelector(
                'div[style*="position: fixed"]',
            );
            const messageEl = container?.querySelector('div');

            expect(messageEl).toBeTruthy();
            expect(messageEl?.textContent).toContain('success message');
            // success 类型应该有 ✓ 图标
            expect(messageEl?.textContent).toContain('✓');
        });

        it('should auto close after duration', () => {
            rs.useFakeTimers();

            Message({ message: 'auto close', type: 'info', duration: 1000 });

            const container = document.querySelector(
                'div[style*="position: fixed"]',
            );
            let messageEl = container?.querySelector('div');
            expect(messageEl).toBeTruthy();

            // 推进时间: 1000ms (duration) + 400ms (关闭动画)
            rs.advanceTimersByTime(1500);

            // 消息元素应该被移除
            messageEl = container?.querySelector('div');
            expect(messageEl).toBeFalsy();
        });

        it('should close on click', () => {
            rs.useFakeTimers();

            Message({
                message: 'click to close',
                type: 'info',
                duration: 10000,
            });

            const container = document.querySelector(
                'div[style*="position: fixed"]',
            );
            const messageEl = container?.querySelector('div') as HTMLElement;
            expect(messageEl).toBeTruthy();

            // 模拟点击
            messageEl.click();

            // 推进时间让关闭动画完成
            rs.advanceTimersByTime(400);

            // 消息元素应该被移除
            const removedEl = container?.querySelector('div');
            expect(removedEl).toBeFalsy();
        });
    });

    describe('static methods', () => {
        it('should create success message', () => {
            Message.success('success message');

            const container = document.querySelector(
                'div[style*="position: fixed"]',
            );
            const messageEl = container?.querySelector('div');

            expect(messageEl).toBeTruthy();
            expect(messageEl?.textContent).toContain('success message');
            expect(messageEl?.textContent).toContain('✓');
        });

        it('should create warning message', () => {
            Message.warning('warning message');

            const container = document.querySelector(
                'div[style*="position: fixed"]',
            );
            const messageEl = container?.querySelector('div');

            expect(messageEl).toBeTruthy();
            expect(messageEl?.textContent).toContain('warning message');
            expect(messageEl?.textContent).toContain('⚠');
        });

        it('should create error message', () => {
            Message.error('error message');

            const container = document.querySelector(
                'div[style*="position: fixed"]',
            );
            const messageEl = container?.querySelector('div');

            expect(messageEl).toBeTruthy();
            expect(messageEl?.textContent).toContain('error message');
            expect(messageEl?.textContent).toContain('✕');
        });

        it('should create info message', () => {
            Message.info('info message');

            const container = document.querySelector(
                'div[style*="position: fixed"]',
            );
            const messageEl = container?.querySelector('div');

            expect(messageEl).toBeTruthy();
            expect(messageEl?.textContent).toContain('info message');
            expect(messageEl?.textContent).toContain('i');
        });
    });

    describe('MessageInstance API', () => {
        it('should return MessageInstance with close method', () => {
            const instance = Message('test message');
            expect(instance).toHaveProperty('close');
            expect(typeof instance.close).toBe('function');
            expect(instance).toHaveProperty('element');
        });

        it('should manually close message via instance.close()', () => {
            rs.useFakeTimers();

            const instance = Message({
                message: 'manual close',
                duration: 10000,
            });

            const container = document.querySelector(
                'div[style*="position: fixed"]',
            );
            let messageEl = container?.querySelector('div');
            expect(messageEl).toBeTruthy();

            // 手动关闭
            instance.close();

            // 等待关闭动画
            rs.advanceTimersByTime(400);

            messageEl = container?.querySelector('div');
            expect(messageEl).toBeFalsy();
        });

        it('should access message element via instance.element', () => {
            const instance = Message('element access test');
            expect(instance.element).toBeTruthy();
            expect(instance.element.textContent).toContain(
                'element access test',
            );
        });
    });

    describe('animation direction', () => {
        it('should animate top position downward (negative offset)', () => {
            const instance = Message({
                message: 'top message',
                position: 'top',
            });
            const transform = instance.element.style.transform;
            expect(transform).toMatch(/translateY\(-\d+px\)/);
        });

        it('should animate bottom position upward (positive offset)', () => {
            const instance = Message({
                message: 'bottom message',
                position: 'bottom',
            });
            const transform = instance.element.style.transform;
            expect(transform).toMatch(/translateY\(\d+px\)/);
        });

        it('should animate top-left position downward', () => {
            const instance = Message({
                message: 'top-left message',
                position: 'top-left',
            });
            const transform = instance.element.style.transform;
            expect(transform).toMatch(/translateY\(-\d+px\)/);
        });

        it('should animate bottom-right position upward', () => {
            const instance = Message({
                message: 'bottom-right message',
                position: 'bottom-right',
            });
            const transform = instance.element.style.transform;
            expect(transform).toMatch(/translateY\(\d+px\)/);
        });
    });

    describe('error handling', () => {
        it('should throw error for empty message', () => {
            expect(() => Message('')).toThrow('message 参数');
        });

        it('should throw error for invalid duration (< 100)', () => {
            expect(() => Message({ message: 'test', duration: 50 })).toThrow(
                'duration',
            );
        });

        it('should throw error for invalid type', () => {
            expect(() =>
                Message({ message: 'test', type: 'invalid' as any }),
            ).toThrow('type');
        });

        it('should throw error for invalid position', () => {
            expect(() =>
                Message({ message: 'test', position: 'invalid' as any }),
            ).toThrow('position');
        });

        it('should accept valid duration (>= 100)', () => {
            expect(() =>
                Message({ message: 'test', duration: 100 }),
            ).not.toThrow();
        });
    });

    describe('accessibility', () => {
        it('should have role="alert"', () => {
            const instance = Message('test message');
            expect(instance.element.getAttribute('role')).toBe('alert');
        });

        it('should have aria-live="polite"', () => {
            const instance = Message('test message');
            expect(instance.element.getAttribute('aria-live')).toBe('polite');
        });

        it('should have aria-atomic="true"', () => {
            const instance = Message('test message');
            expect(instance.element.getAttribute('aria-atomic')).toBe('true');
        });

        it('should have tabindex="0" for focus', () => {
            const instance = Message('test message');
            expect(instance.element.getAttribute('tabindex')).toBe('0');
        });

        it('should close on Escape key', () => {
            rs.useFakeTimers();

            const instance = Message({
                message: 'escape test',
                duration: 10000,
            });

            // 模拟 Escape 键
            const event = new KeyboardEvent('keydown', { key: 'Escape' });
            instance.element.dispatchEvent(event);

            rs.advanceTimersByTime(400);

            const container = document.querySelector(
                'div[style*="position: fixed"]',
            );
            const messageEl = container?.querySelector('div');
            expect(messageEl).toBeFalsy();
        });
    });
});
