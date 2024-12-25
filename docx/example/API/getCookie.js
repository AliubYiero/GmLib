/**
 * getCookie.js
 * @file 示例
 * */
import { getCookie } from '@yiero/gmlib';

/**
 * 获取 Bilibili 下的所有 Cookie
 */
getCookie( 'bilibili.com' )
	.then( cookieList => {
		console.log( cookieList );
	} )
	.catch( err => {
		console.error( err );
	} );

/**
 * 获取 Bilibili Uid
 */
getCookie( 'bilibili.com', 'DedeUserID' )
	.then( uid => {
		console.log( uid );
	} )
	.catch( err => {
		console.error( err );
	} );
