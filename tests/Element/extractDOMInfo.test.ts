import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';
import { extractDOMInfo } from '../../src/Element/extractDOMInfo';

describe('extractDOMInfo', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    describe('基础文本提取', () => {
        it('应提取元素的 textContent', () => {
            container.innerHTML = '<span id="test">Hello World</span>';

            const result = extractDOMInfo('#test', { key: 'text' });

            expect(result).toEqual({ text: 'Hello World' });
        });

        it('应自动 trim 文本内容', () => {
            container.innerHTML = '<span id="test">  Hello World  </span>';

            const result = extractDOMInfo('#test', { key: 'text' });

            expect(result).toEqual({ text: 'Hello World' });
        });
    });

    describe('元素不存在处理', () => {
        it('元素不存在时应返回 null', () => {
            const result = extractDOMInfo('#non-existent', { key: 'text' });

            expect(result).toEqual({ text: null });
        });

        it('元素不存在时应返回 defaultValue', () => {
            const result = extractDOMInfo('#non-existent', {
                key: 'text',
                defaultValue: '默认值',
            });

            expect(result).toEqual({ text: '默认值' });
        });
    });

    describe('type: number', () => {
        it('应将文本转换为数字', () => {
            container.innerHTML = '<span id="test">42</span>';

            const result = extractDOMInfo('#test', {
                key: 'count',
                type: 'number',
            });

            expect(result).toEqual({ count: 42 });
        });

        it('空字符串应返回 null', () => {
            container.innerHTML = '<span id="test"></span>';

            const result = extractDOMInfo('#test', {
                key: 'count',
                type: 'number',
            });

            expect(result).toEqual({ count: null });
        });

        it('非数字应返回 null', () => {
            container.innerHTML = '<span id="test">abc</span>';

            const result = extractDOMInfo('#test', {
                key: 'count',
                type: 'number',
            });

            expect(result).toEqual({ count: null });
        });

        it('非数字时应返回 defaultValue', () => {
            container.innerHTML = '<span id="test">abc</span>';

            const result = extractDOMInfo('#test', {
                key: 'count',
                type: 'number',
                defaultValue: 0,
            });

            expect(result).toEqual({ count: 0 });
        });
    });

    describe('type: boolean', () => {
        it('"true" 字符串应返回 true', () => {
            container.innerHTML = '<span id="test">true</span>';

            const result = extractDOMInfo('#test', {
                key: 'flag',
                type: 'boolean',
            });

            expect(result).toEqual({ flag: true });
        });

        it('"false" 字符串应返回 false', () => {
            container.innerHTML = '<span id="test">false</span>';

            const result = extractDOMInfo('#test', {
                key: 'flag',
                type: 'boolean',
            });

            expect(result).toEqual({ flag: false });
        });

        it('checkbox 应返回 checked 状态', () => {
            container.innerHTML = '<input type="checkbox" id="test" checked>';

            const result = extractDOMInfo('#test', {
                key: 'flag',
                type: 'boolean',
            });

            expect(result).toEqual({ flag: true });
        });

        it('未选中 checkbox 应返回 false', () => {
            container.innerHTML = '<input type="checkbox" id="test">';

            const result = extractDOMInfo('#test', {
                key: 'flag',
                type: 'boolean',
            });

            expect(result).toEqual({ flag: false });
        });
    });

    describe('type: url', () => {
        it('应从 a 标签提取 href', () => {
            container.innerHTML =
                '<a id="test" href="https://example.com/">Link</a>';

            const result = extractDOMInfo('#test', {
                key: 'url',
                type: 'url',
            });

            expect(result).toEqual({ url: 'https://example.com/' });
        });

        it('a 标签无 href 时应返回 textContent', () => {
            container.innerHTML = '<a id="test">Link</a>';

            const result = extractDOMInfo('#test', {
                key: 'url',
                type: 'url',
            });

            expect(result).toEqual({ url: 'Link' });
        });
    });

    describe('type: element', () => {
        it('应返回原生 DOM 元素', () => {
            container.innerHTML = '<span id="test">Element</span>';

            const result = extractDOMInfo('#test', {
                key: 'element',
                type: 'element',
            });

            expect(result.element).toBeInstanceOf(HTMLElement);
            expect((result.element as HTMLElement).id).toBe('test');
        });
    });
});
