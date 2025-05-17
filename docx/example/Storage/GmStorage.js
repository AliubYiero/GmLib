/**
 * GmStorage.js
 * created by 2025/1/23
 * @file 示例
 * */

import { GmStorage } from '@yiero/gmlib';

/**
 * 声明一个日期存储类 (时间戳)
 *
 * 储存键名为 'date', 默认值为脚本加载时的时间 ( `Date.now()` ).
 */
const dateStorage = new GmStorage( 'date', Date.now() );

/** 获取存储值 */
console.info( dateStorage.get() );
// or
console.info( dateStorage.value );

/** 重新设置储存值 */
dateStorage.set( Date.now() + 5 * 24 * 60 * 1000 );

/** 删除当前存储 */
dateStorage.remove();

/**
 * 监听其他脚本的 'date' 存储值变更
 * @warn 一个实例只能设置一个监听器, 后续设置的监听器会覆盖前面的监听器
 * */
dateStorage.updateListener( ( { key, oldValue, newValue, remote } ) => {
	console.info( 'key', key );             // 为 'date'
	console.info( 'oldValue', oldValue );   // 更改前的值
	console.info( 'newValue', newValue );   // 更改后的值
	console.info( 'remote', remote ? 'update from other userscript' : 'update from this userscript' );
} );
/** 删除上面的监听器 */
dateStorage.removeListener();
