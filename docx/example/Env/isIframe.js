/**
 * isIframe.js
 * created by 2024/12/28
 * @file 示例
 * */
import { isIframe } from '@yiero/gmlib';

/**
 * [在脚本顶层作用域使用]
 *
 * 如果当前页面是 iframe 页面, 不再继续执行脚本
 */
if ( isIframe ) {
	return;
}
