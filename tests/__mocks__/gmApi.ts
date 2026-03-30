import { rs } from '@rstest/core';

// 存储模拟器
const storage = new Map<string, unknown>();

// 监听器计数器
let listenerIdCounter = 0;
const listeners = new Map<number, { key: string; callback: Function }>();

// GM API Mock 函数
export const gmApiMock = {
    // Storage API
    GM_getValue: <T>(key: string, defaultValue?: T): T | undefined => {
        return storage.has(key) ? (storage.get(key) as T) : defaultValue;
    },

    GM_setValue: (key: string, value: unknown): void => {
        storage.set(key, value);
    },

    GM_deleteValue: (key: string): void => {
        storage.delete(key);
    },

    GM_addValueChangeListener: rs.fn((key: string, callback: Function) => {
        const id = ++listenerIdCounter;
        listeners.set(id, { key, callback });
        return id;
    }),

    GM_removeValueChangeListener: rs.fn((id: number) => {
        listeners.delete(id);
    }),

    // Request API
    GM_xmlhttpRequest: rs.fn(),

    // Download API
    GM_download: rs.fn(),

    // Menu API
    GM_registerMenuCommand: rs.fn(() => ++listenerIdCounter),

    GM_unregisterMenuCommand: rs.fn(),

    // Cookie API
    GM_cookie: rs.fn(),

    // Style API
    GM_addStyle: rs.fn(() => document.createElement('style')),

    // Info
    GM_info: {
        scriptHandler: 'ScriptCat' as 'ScriptCat' | 'Tampermonkey',
        script: {},
    },

    // 工具方法
    reset(): void {
        storage.clear();
        listeners.clear();
        listenerIdCounter = 0;
        this.GM_xmlhttpRequest.mockClear?.();
        this.GM_download.mockClear?.();
        this.GM_registerMenuCommand.mockClear?.();
        this.GM_unregisterMenuCommand.mockClear?.();
        this.GM_cookie.mockClear?.();
        this.GM_addStyle.mockClear?.();
    },

    getStorage(): Map<string, unknown> {
        return storage;
    },

    getListeners(): Map<number, { key: string; callback: Function }> {
        return listeners;
    },
};

/**
 * 将 mock 注入到全局对象
 */
export const setupGlobalGmApi = (): void => {
    (globalThis as any).GM_getValue = gmApiMock.GM_getValue;
    (globalThis as any).GM_setValue = gmApiMock.GM_setValue;
    (globalThis as any).GM_deleteValue = gmApiMock.GM_deleteValue;
    (globalThis as any).GM_addValueChangeListener =
        gmApiMock.GM_addValueChangeListener;
    (globalThis as any).GM_removeValueChangeListener =
        gmApiMock.GM_removeValueChangeListener;
    (globalThis as any).GM_xmlhttpRequest = gmApiMock.GM_xmlhttpRequest;
    (globalThis as any).GM_download = gmApiMock.GM_download;
    (globalThis as any).GM_registerMenuCommand =
        gmApiMock.GM_registerMenuCommand;
    (globalThis as any).GM_unregisterMenuCommand =
        gmApiMock.GM_unregisterMenuCommand;
    (globalThis as any).GM_cookie = gmApiMock.GM_cookie;
    (globalThis as any).GM_addStyle = gmApiMock.GM_addStyle;
    (globalThis as any).GM_info = gmApiMock.GM_info;
};

/**
 * 模拟 GM_xmlhttpRequest 成功响应
 */
export const mockRequestSuccess = (responseText: string): void => {
    gmApiMock.GM_xmlhttpRequest.mockImplementation((config: any) => {
        setTimeout(() => {
            config.onload?.({ responseText });
        }, 0);
    });
};

/**
 * 模拟 GM_xmlhttpRequest 错误响应
 */
export const mockRequestError = (error: any): void => {
    gmApiMock.GM_xmlhttpRequest.mockImplementation((config: any) => {
        setTimeout(() => {
            config.onerror?.(error);
        }, 0);
    });
};

/**
 * 模拟 GM_xmlhttpRequest 超时
 */
export const mockRequestTimeout = (): void => {
    gmApiMock.GM_xmlhttpRequest.mockImplementation((config: any) => {
        setTimeout(() => {
            config.ontimeout?.();
        }, 0);
    });
};
