/**
 * 通过 GM_xmlhttpRequest, 发送 GET 请求
 */
export function gmRequest<T extends string | Record<string, any> | Document>(
	url: string,
	method?: 'GET',
	param?: Record<string, string>,
	GMXmlHttpRequestConfig?: Partial<Tampermonkey.Request>,
): Promise<T>;

/**
 * 通过 GM_xmlhttpRequest, 发送 POST 请求
 */
export function gmRequest<T extends string | Record<string, any> | Document, K extends any>(
	url: string,
	method: 'POST',
	data?: Record<string, K>,
	GMXmlHttpRequestConfig?: Partial<Tampermonkey.Request>,
): Promise<T>;

/**
 * 调用油猴API配置参数, 进行网络请求
 */
export function gmRequest<T extends string | Record<string, any> | Document>(
	GMXmlHttpRequestConfig: Tampermonkey.Request,
): Promise<T>

/**
 * 通过 GM_xmlhttpRequest 进行网络请求
 */
export function gmRequest<T extends string | Record<string, any> | Document, K extends any>(
	param1: string | Tampermonkey.Request,
	method?: 'POST' | 'GET',
	body?: Record<string, K>,
	GMXmlHttpRequestConfig?: Partial<Tampermonkey.Request>,
): Promise<T> {
	/**
	 * 统一参数
	 */
	const unifiedParameters = () => {
		// 重载3
		if ( typeof param1 !== 'string' ) {
			return {
				url: param1.url,
				method: param1.method || 'GET',
				param: param1.method === 'POST' ? param1.data : void 0,
				GMXmlHttpRequestConfig: param1,
			};
		}
		
		// 重载1 / 重载2
		return {
			url: param1,
			method: method || 'GET',
			param: body,
			GMXmlHttpRequestConfig: GMXmlHttpRequestConfig || {},
		};
	};
	
	// 获取统一参数
	const params = unifiedParameters();
	
	/**
	 * 请求体携带参数处理
	 * */
	// 判断: 如果是 GET 请求, 写入网址中
	if ( params.method === 'GET' && params.param && typeof params.param === 'object' ) {
		params.url = `${ params.url }?${ new URLSearchParams( params.param as Record<string, string> ).toString() }`;
	}
	// 判断: 如果是 POST 请求, 写入请求体中
	if ( params.method === 'POST' && params.param ) {
		params.GMXmlHttpRequestConfig.data = JSON.stringify( params.param );
	}
	
	// 发送网络请求 (通过 Promise)
	return new Promise( ( resolve, reject ) => {
		// 写入配置
		const newGMXmlHttpRequestConfig: Tampermonkey.Request = {
			// 默认20s的超时等待
			timeout: 20_000,
			
			// 请求地址, 请求方法和请求返回
			url: params.url,
			method: params.method,
			onload( response: Tampermonkey.ResponseBase ) {
				try {
					// 响应体是 Object
					const res = JSON.parse( response.response ) as T;
					resolve( res );
				}
				catch ( e ) {
					try {
						// 响应体是文档对象
						const domParser = new DOMParser();
						const document = domParser.parseFromString( response.response as string, 'text/html' );
						resolve( document as T );
					}
					catch ( e ) {
						// 响应体是文本 (无法解析为 Object / Document)
						resolve( response.response as T );
					}
				}
			},
			onerror( error: any ) {
				reject( error );
			},
			ontimeout() {
				reject( new Error( 'Request timed out' ) );
			},
			headers: {
				'Content-Type': 'application/json',
			},
			
			// 用户自定义的油猴配置项
			...( params.GMXmlHttpRequestConfig ),
		};
		
		// 发送请求
		GM_xmlhttpRequest( newGMXmlHttpRequestConfig );
	} );
}
