/**
 * gmRequest.js
 * created by 2024/12/29
 * @file 示例
 * */
import { gmRequest } from '@yiero/gmlib';

/**
 * 基础 GET 网络请求.
 * 发送 GET 请求获取网页数据.
 *
 * 函数会自动将 html 文本内容解析为文档对象模型, 即 Document
 */
gmRequest( 'https://baidu.com' ).then( document => {
	console.log( document.body );
} );

/**
 * 基础 GET 网络请求.
 * 发送 GET 请求获取接口数据 (JSON).
 *
 * @returns {Promise<{
 * code: number;
 * message: string;
 * ttl: string;
 * data: {now: number}
 * }>}
 *
 * @see [Bilibili-API-获取当前时间戳](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/time_stamp.md)
 */
// 获取当前时间戳
gmRequest( 'https://api.bilibili.com/x/report/click/now' ).then( response => {
	console.log( '响应码: ', response.code );
	console.log( '时间戳: ', response.data.now );
} );

/**
 * GET 网络请求.
 * 携带网页参数, 发送 GET 请求获取接口数据 (JSON).
 *
 * @see [Bilibili-API-获取视频快照](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/video/snapshot.md#%E8%8E%B7%E5%8F%96%E8%A7%86%E9%A2%91%E5%BF%AB%E7%85%A7web%E7%AB%AF)
 */
gmRequest( 'https://api.bilibili.com/x/player/videoshot?aid=999' );
// or
gmRequest( 'https://api.bilibili.com/x/player/videoshot', 'GET', {
	aid: 999,
} ).then( response => {
	console.log( response );
} );

/**
 * POST 网络请求.
 * 携带请求体参数
 *
 * @see [reqres.in](https://reqres.in/)
 */
gmRequest( 'https://reqres.in/api/users', 'POST', {
	name: 'paul rudd',
	movies: [ 'I Love You Man', 'Role Models' ],
} ).then( response => console.log( response ) );
// or
gmRequest( {
	url: 'https://reqres.in/api/users',
	method: 'POST',
	name: 'paul rudd',
	movies: [ 'I Love You Man', 'Role Models' ],
	headers: {
		'Content-Type': 'application/json',
	},
} ).then( response => console.log( response ) );
