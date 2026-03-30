import { parseResponseText } from './util/parseResponseText.ts';

// 保存原始方法，只初始化一次
const originalXhrOpen = XMLHttpRequest.prototype.open;
let isHooked = false;

/** Hook 管理器，存储所有注册的 hook */
const hookRegistry: Array<{
	matcher: ( url: string ) => boolean;
	callback: ( response: any, requestUrl: string ) => void | string;
}> = [];

/**
 * 劫持 xhr 的返回数据
 */
export const hookXhr = <T extends string | Record<string, any> | Document>(
	hookUrl: ( url: string ) => boolean,
	callback: ( response: T, requestUrl: string ) => void | string,
) => {
	// 注册 hook
	hookRegistry.push( { matcher: hookUrl, callback } );
	
	// 只 hook 一次
	if ( isHooked ) {
		return;
	}
	isHooked = true;
	
	XMLHttpRequest.prototype.open = function () {
		const xhr = this;
		const requestUrl = arguments[ 1 ] as string;  // 提前保存 URL
		
		// 查找匹配的 hook
		const matchedHook = hookRegistry.find( h => h.matcher( requestUrl ) );
		if ( matchedHook ) {
			const getter = Object.getOwnPropertyDescriptor(
				XMLHttpRequest.prototype,
				'responseText',
			)!.get as Function;
			
			Object.defineProperty( xhr, 'responseText', {
				get: () => {
					const responseText: string = getter.call( xhr );
					// 使用闭包中的 requestUrl
					return matchedHook.callback( parseResponseText( responseText ), requestUrl ) || responseText;
				},
			} );
		}
		// @ts-ignore
		return originalXhrOpen.apply( xhr, arguments );
	};
};