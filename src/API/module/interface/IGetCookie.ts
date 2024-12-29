/**
 * 获取 输入域名 下的所有 cookie 列表
 *
 * @param domain 域名
 * @returns cookieList Cookie列表
 *
 * @warn 需要授权函数 `GM_cookie`
 * @warn 只能在 ScriptCat 环境中使用
 *
 * @example getCookie( '.bilibili.com' ) - 获取 bilibili 下的所有 cookie
 */
declare function getCookie( domain: string ): Promise<ICookie[]>;

/**
 * 获取 输入域名 下的某一项 cookie 内容
 *
 * @param domain 域名
 * @param key cookie 键名
 * @returns cookie cookie 值
 *
 * @warn 需要授权函数 `GM_cookie`
 * @warn 只能在 ScriptCat 环境中使用
 *
 * @example getCookie( '.bilibili.com', 'DedeUserID' ) - 获取 bilibili uid
 */
declare function getCookie( domain: string, key: string ): Promise<string>;

/**
 * 传入网站 Cookie 文本内容, 解析出对应的 key 的值
 *
 * @param documentCookieContent 网站 Cookie 文本, 通常为 document.cookie
 * @param key cookie 键名
 *
 * @warn 需要授权函数 `GM_cookie`
 * @warn 只能在 ScriptCat 环境中使用
 *
 * @example getCookie( document.cookie, 'DedeUserID' ) - 获取 bilibili uid
 */
declare function getCookie( documentCookieContent: string, key: string ): Promise<string>;
