import { describe, expect, it, beforeEach, afterEach } from '@rstest/core';
import { elementWaiter } from '../../src/Element/elementWaiter';

describe('elementWaiter', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('should resolve immediately when element exists', async () => {
        // 预先创建元素
        const element = document.createElement('div');
        element.id = 'existing';
        container.appendChild(element);

        // 使用短延迟以加快测试
        const result = await elementWaiter('#existing', { delayPerSecond: 0.01 });

        expect(result.id).toBe('existing');
    });

    it('should wait for element to appear', async () => {
        const promise = elementWaiter('#delayed', { timeoutPerSecond: 1, delayPerSecond: 0.01 });

        // 延迟添加元素
        setTimeout(() => {
            const element = document.createElement('div');
            element.id = 'delayed';
            container.appendChild(element);
        }, 100);

        const result = await promise;
        expect(result.id).toBe('delayed');
    });

    it('should reject when element not found within timeout', async () => {
        // 使用非常短的超时时间 (0.1 秒)
        const promise = elementWaiter('#not-exist', { timeoutPerSecond: 0.1, delayPerSecond: 0.01 });

        await expect(promise).rejects.toThrow('Element "#not-exist" not found within 0.1 seconds');
    });

    it('should search within custom parent', async () => {
        // 创建自定义父容器
        const customParent = document.createElement('div');
        customParent.id = 'custom-parent';
        container.appendChild(customParent);

        // 在自定义父容器中创建元素
        const element = document.createElement('span');
        element.className = 'child-element';
        customParent.appendChild(element);

        // 使用自定义 parent 搜索
        const result = await elementWaiter('.child-element', {
            parent: customParent,
            delayPerSecond: 0.01,
        });

        expect(result.className).toBe('child-element');
    });
});
