import { environmentTest } from '../../Env';

/**
 * 获取 cookie 内容
 * @param domain 域名
 * @returns cookieList Cookie列表
 */
export function getCookie( domain: string ): Promise<ICookie[]>;
/**
 * 获取 cookie 内容
 * @param domain 域名
 * @param key cookie 键名
 * @returns cookie cookie 值
 */
export function getCookie( domain: string, key: string ): Promise<string>;

/**
 * 传入网站 Cookie 文本内容, 解析出对应的 key 的值
 *
 * @param documentCookieContent 网站 Cookie 文本, 通常为 document.cookie
 * @param key cookie 键名
 */
export function getCookie( documentCookieContent: string, key: string ): Promise<string>;

export function getCookie( content: string, key?: string ): Promise<string | ICookie[]> {
	// 判断: 传入的第一个参数是 domain 域名 还是 Cookie 文本内容
	// 如果是 Cookie 文本内容, 解析 Cookie 内容, 返回对应的键值
	if ( ( [ /^\w+=[^=;]+$/, /^\w+=[^=;]+;/ ] ).some( reg => reg.test( content ) ) ) {
		if ( !key ) {
			return Promise.reject( new Error( `请输入需要获取的具体 Cookie 的键名.` ) );
		}
		
		const cookieList: [ string, string ][] = content.split( /;\s?/ ).map( cookie => cookie.split( '=' ) as [ string, string ] );
		const cookieMap = new Map<string, string>( cookieList );
		const cookieValue = cookieMap.get( key );
		if ( !cookieValue ) {
			return Promise.reject( new Error( '获取 Cookie 失败, key 不存在.' ) );
		}
		return Promise.resolve( cookieValue );
	}
	
	// 传入的第一个参数是 domain 域名, 通过 GM_cookie 获取内容
	return new Promise( ( resolve, reject ) => {
		const env = environmentTest();
		if ( env !== 'ScriptCat' ) {
			reject( `当前脚本不支持 ${ env } 环境, 仅支持 ScriptCat .` );
		}
		
		// @ts-ignore
		GM_cookie( 'list', {
			domain: content,
		}, ( cookieList: ICookie[] ) => {
			// 如果没有 cookie , 报错
			if ( !cookieList ) {
				reject( new Error( '获取 Cookie 失败, 该域名下没有 cookie. ' ) );
				return;
			}
			
			// 判断是否输入 key, 如果没输入, 直接返回 cookieList
			if ( !key ) {
				resolve( cookieList );
			}
			
			// 搜索对应的 key
			const userIdCookie = cookieList.find(
				cookie => cookie.name === key,
			);
			
			// 如果没有找到对应的 key, 报错
			if ( !userIdCookie ) {
				reject( new Error( '获取 Cookie 失败, key 不存在. ' ) );
				return;
			}
			
			// 返回 key 对应的 cookie 值
			resolve( userIdCookie.value );
		} );
	} );
}
