import { describe, expect, it, beforeEach, afterEach, rs } from '@rstest/core';
import { Message } from '../../src/Element/Message';

describe('Message', () => {
    beforeEach(() => {
        // 清空消息容器内的内容，而不是移除容器本身
        // 因为 messageContainer 是模块级变量，清空 body 后它仍指向游离元素
        const container = document.querySelector('div[style*="position: fixed"][style*="pointer-events: none"]');
        if (container) {
            container.innerHTML = '';
        }
    });

    afterEach(() => {
        // 清空消息容器内的内容
        const container = document.querySelector('div[style*="position: fixed"][style*="pointer-events: none"]');
        if (container) {
            container.innerHTML = '';
        }
        rs.useRealTimers();
    });

    describe('basic functionality', () => {
        it('should create message element with string', () => {
            Message('test message');

            // 检查消息容器是否存在
            const container = document.querySelector('div[style*="position: fixed"]');
            expect(container).toBeTruthy();

            // 检查消息元素是否存在
            const messageEl = container?.querySelector('div');
            expect(messageEl).toBeTruthy();

            // 检查消息内容
            expect(messageEl?.textContent).toContain('test message');
        });

        it('should create message with options', () => {
            Message({ message: 'success message', type: 'success' });

            const container = document.querySelector('div[style*="position: fixed"]');
            const messageEl = container?.querySelector('div');

            expect(messageEl).toBeTruthy();
            expect(messageEl?.textContent).toContain('success message');
            // success 类型应该有 ✓ 图标
            expect(messageEl?.textContent).toContain('✓');
        });

        it('should auto close after duration', () => {
            rs.useFakeTimers();

            Message({ message: 'auto close', type: 'info', duration: 1000 });

            const container = document.querySelector('div[style*="position: fixed"]');
            let messageEl = container?.querySelector('div');
            expect(messageEl).toBeTruthy();

            // 推进时间: 10ms (初始动画) + 1000ms (duration) + 400ms (关闭动画)
            rs.advanceTimersByTime(1500);

            // 消息元素应该被移除
            messageEl = container?.querySelector('div');
            expect(messageEl).toBeFalsy();
        });

        it('should close on click', () => {
            rs.useFakeTimers();

            Message({ message: 'click to close', type: 'info', duration: 10000 });

            const container = document.querySelector('div[style*="position: fixed"]');
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

            const container = document.querySelector('div[style*="position: fixed"]');
            const messageEl = container?.querySelector('div');

            expect(messageEl).toBeTruthy();
            expect(messageEl?.textContent).toContain('success message');
            expect(messageEl?.textContent).toContain('✓');
        });

        it('should create warning message', () => {
            Message.warning('warning message');

            const container = document.querySelector('div[style*="position: fixed"]');
            const messageEl = container?.querySelector('div');

            expect(messageEl).toBeTruthy();
            expect(messageEl?.textContent).toContain('warning message');
            expect(messageEl?.textContent).toContain('⚠');
        });

        it('should create error message', () => {
            Message.error('error message');

            const container = document.querySelector('div[style*="position: fixed"]');
            const messageEl = container?.querySelector('div');

            expect(messageEl).toBeTruthy();
            expect(messageEl?.textContent).toContain('error message');
            expect(messageEl?.textContent).toContain('✕');
        });

        it('should create info message', () => {
            Message.info('info message');

            const container = document.querySelector('div[style*="position: fixed"]');
            const messageEl = container?.querySelector('div');

            expect(messageEl).toBeTruthy();
            expect(messageEl?.textContent).toContain('info message');
            expect(messageEl?.textContent).toContain('i');
        });
    });
});
