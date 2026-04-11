import { beforeEach, describe, expect, it } from '@rstest/core';
import { createUserConfigStorage } from '../../src/Storage/createUserConfigStorage';
import type { ScriptCatUserConfig } from '../../src/Storage/types/ScriptCatUserConfig';
import { gmApiMock, setupGlobalGmApi } from '../__mocks__/gmApi';

describe('createUserConfigStorage', () => {
    beforeEach(() => {
        gmApiMock.reset();
        setupGlobalGmApi();
    });

    it('should create storage for single config item', () => {
        const config: ScriptCatUserConfig = {
            滚动配置: {
                scrollLength: {
                    title: '滚动距离',
                    description: '滚动距离',
                    type: 'number',
                    default: 100,
                },
            },
        };

        const storage = createUserConfigStorage(config);

        expect(storage.scrollLengthStore).toBeDefined();
        expect(storage.scrollLengthStore.get()).toBe(100);
    });

    it('should create storage for multiple config items in one group', () => {
        const config: ScriptCatUserConfig = {
            滚动配置: {
                scrollLength: {
                    title: '滚动距离',
                    description: '滚动距离',
                    type: 'number',
                    default: 100,
                },
                focusMode: {
                    title: '专注模式',
                    description: '专注模式',
                    type: 'checkbox',
                    default: false,
                },
            },
        };

        const storage = createUserConfigStorage(config);

        expect(storage.scrollLengthStore).toBeDefined();
        expect(storage.focusModeStore).toBeDefined();
        expect(storage.scrollLengthStore.get()).toBe(100);
        expect(storage.focusModeStore.get()).toBe(false);
    });

    it('should create storage for multiple groups', () => {
        const config: ScriptCatUserConfig = {
            滚动配置: {
                scrollLength: {
                    title: '滚动距离',
                    description: '滚动距离',
                    type: 'number',
                    default: 100,
                },
            },
            自动翻页配置: {
                turnPageDelay: {
                    title: '翻页延时',
                    description: '翻页延时',
                    type: 'select',
                    values: ['自适应', '固定值'],
                    default: '自适应',
                },
            },
        };

        const storage = createUserConfigStorage(config);

        expect(storage.scrollLengthStore).toBeDefined();
        expect(storage.turnPageDelayStore).toBeDefined();
        expect(storage.scrollLengthStore.get()).toBe(100);
        expect(storage.turnPageDelayStore.get()).toBe('自适应');
    });

    it('should handle config without default value', () => {
        const config: ScriptCatUserConfig = {
            测试配置: {
                noDefault: {
                    title: '无默认值',
                    description: '无默认值',
                    type: 'text',
                },
            },
        };

        const storage = createUserConfigStorage(config);

        expect(storage.noDefaultStore).toBeDefined();
        // text 类型无默认值时推断为空字符串
        expect(storage.noDefaultStore.get()).toBe('');
    });

    it('should generate correct storage key format', () => {
        const config: ScriptCatUserConfig = {
            滚动配置: {
                scrollLength: {
                    title: '滚动距离',
                    description: '滚动距离',
                    type: 'number',
                    default: 100,
                },
            },
        };

        const storage = createUserConfigStorage(config);

        // 设置一个新值来验证存储键
        storage.scrollLengthStore.set(200);

        // 验证存储被正确设置
        expect(storage.scrollLengthStore.get()).toBe(200);

        // 验证存储键格式为 "groupName.configKey"
        expect(gmApiMock.getStorage().has('滚动配置.scrollLength')).toBe(true);
    });

    it('should handle different default value types', () => {
        const config: ScriptCatUserConfig = {
            混合配置: {
                stringValue: {
                    title: '字符串',
                    description: '字符串',
                    type: 'text',
                    default: 'hello',
                },
                numberValue: {
                    title: '数字',
                    description: '数字',
                    type: 'number',
                    default: 42,
                },
                booleanValue: {
                    title: '布尔',
                    description: '布尔',
                    type: 'checkbox',
                    default: true,
                },
                arrayValue: {
                    title: '数组',
                    description: '数组',
                    type: 'mult-select',
                    default: ['a', 'b', 'c'],
                },
            },
        };

        const storage = createUserConfigStorage(config);

        expect(storage.stringValueStore.get()).toBe('hello');
        expect(storage.numberValueStore.get()).toBe(42);
        expect(storage.booleanValueStore.get()).toBe(true);
        expect(storage.arrayValueStore.get()).toEqual(['a', 'b', 'c']);
    });
});
