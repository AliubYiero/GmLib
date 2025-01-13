import { parseResponseText } from './util/parseResponseText.ts';

/**
 * 劫持 xhr 的返回数据
 */
export const hookXhr = <T extends string | Record<string, any> | Document>(
	hookUrl: ( url: string ) => boolean,
	callback: ( response: T, requestUrl: string ) => void | string,
) => {
	const xhrOpen = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function () {
		// 这里保存了this到xhr变量，为了提高代码的可读性
		const xhr = this;
		if ( hookUrl( arguments[ 1 ] ) ) {
			// 获取response的操作符，
			// 如果想要劫持responseText就需要改为responseText
			// getOwnPropertyDescriptor获取的是一个对象上属性的相关的描述符
			// 可以拿到get，set，enumerable，configurable等。
			const getter = Object.getOwnPropertyDescriptor(
				XMLHttpRequest.prototype,
				'responseText',
			)!.get as Function;
			// 这里对xhr的response属性做了一个defineProperty
			// 当触发xhr.response的时候会访问对应的get
			// 而get调用我们之前获取的getter函数，需要注意修改this指向
			// 获取原返回内容，进行一定的修改，返回新的修改内容
			Object.defineProperty( xhr, 'responseText', {
				get: () => {
					const responseText: string = getter.call( xhr );
					// 如果回调存在返回值, 返回用户修改的内容
					return callback( parseResponseText( responseText ), arguments[ 1 ] ) || responseText;
				},
			} );
		}
		// @ts-ignore
		return xhrOpen.apply( xhr, arguments );
	};
};
