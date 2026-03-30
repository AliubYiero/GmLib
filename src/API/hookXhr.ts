import { parseResponseText } from './util/parseResponseText.ts';

// 保存原始方法，只初始化一次
const originalXhrOpen = XMLHttpRequest.prototype.open;
let isHooked = false;

/** Hook 管理器，存储所有注册的 hook */
const hookRegistry: Array<{
    matcher: (url: string) => boolean;
    callback: (response: any, requestUrl: string) => void | string;
}> = [];

/**
 * 劫持 xhr 的返回数据
 */
export const hookXhr = <T extends string | Record<string, any> | Document>(
    hookUrl: (url: string) => boolean,
    callback: (response: T, requestUrl: string) => void | string,
) => {
    // 注册 hook
    hookRegistry.push({ matcher: hookUrl, callback });

    // 只 hook 一次
    if (isHooked) {
        return;
    }
    isHooked = true;

    XMLHttpRequest.prototype.open = function () {
        const requestUrl = arguments[1] as string; // 提前保存 URL

        // 查找匹配的 hook
        const matchedHook = hookRegistry.find((h) => h.matcher(requestUrl));
        if (matchedHook) {
            const getter = Object.getOwnPropertyDescriptor(
                XMLHttpRequest.prototype,
                'responseText',
            )!.get as Function;

            Object.defineProperty(this, 'responseText', {
                get: () => {
                    const responseText: string = getter.call(this);
                    // 使用闭包中的 requestUrl
                    return (
                        matchedHook.callback(
                            parseResponseText(responseText),
                            requestUrl,
                        ) || responseText
                    );
                },
            });
        }
        // @ts-expect-error
        return originalXhrOpen.apply(this, arguments);
    };
};
