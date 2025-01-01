/**
 * 通过 GM_xmlhttpRequest, 发送 GET 请求
 *
 * @example gmRequest( 'https://baidu.com' ) - 请求网页内容
 * @example gmRequest( 'https://api.bilibili.com/x/report/click/now' ) - 请求接口 JSON 内容
 * @example gmRequest( 'https://api.bilibili.com/x/player/videoshot', 'GET', {aid: 999} - 携带网页参数请求
 *
 * @see https://www.tampermonkey.net/documentation.php?ext=dhdg#api:GM_xmlhttpRequest
 */
declare function gmRequest<T extends string | Record<string, any> | Document>(
	url: string,
	method?: 'GET',
	param?: Record<string, string>,
	GMXmlHttpRequestConfig?: Partial<Tampermonkey.Request>,
): Promise<T>;

/**
 * 通过 GM_xmlhttpRequest, 发送 POST 请求
 *
 * @example gmRequest( 'https://reqres.in/api/users', 'POST', {name: 'paul rudd',movies: [ 'I Love You Man', 'Role Models' ]} ) - 发送 POST 请求, 并携带数据
 *
 * @see https://www.tampermonkey.net/documentation.php?ext=dhdg#api:GM_xmlhttpRequest
 */
declare function gmRequest<T extends string | Record<string, any> | Document, K extends any>(
	url: string,
	method: 'POST',
	data?: Record<string, K>,
	GMXmlHttpRequestConfig?: Partial<Tampermonkey.Request>,
): Promise<T>;

/**
 * 调用油猴API配置参数, 进行网络请求
 *
 * @example gmRequest( {url: 'https://reqres.in/api/users',method: 'POST',name: 'paul rudd',movies: [ 'I Love You Man', 'Role Models' ],headers: {'Content-Type': 'application/json',}} ) - 发送 POST 请求
 *
 * @see https://www.tampermonkey.net/documentation.php?ext=dhdg#api:GM_xmlhttpRequest
 */
declare function gmRequest<T extends string | Record<string, any> | Document>(
	GMXmlHttpRequestConfig: Tampermonkey.Request,
): Promise<T>
