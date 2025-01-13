/**
 * hookXhr.js
 * created by 2025/1/13
 * @file 示例
 * */
import { hookXhr } from '@yiero/gmlib';

/**
 * 修改B站动态主页, 正在直播的关注列表
 *
 * 添加用户黑名单
 */
hookXhr(
	( url ) => [ 'https://api.bilibili.com/x/polymer/web-dynamic/v1/portal', '//api.bilibili.com/x/polymer/web-dynamic/v1/portal' ].includes( url ),
	( response, url ) => {
		console.log( 'response', response, url );
		// 黑名单 uid 列表
		const bankUpUidList = [ 1, 2 ];
		let liveList = response.data.live_users.items;
		// 更改获取到的直播用户列表
		response.data.live_users.items = liveList.filter( item => !bankUpUidList.includes( item.mid ) );
		// 修改直播用户列表的长度
		response.data.live_users.count = response.data.live_users.items.length;
		console.log( 'HookResponse', response, url );
		return JSON.stringify( response );
	},
);
