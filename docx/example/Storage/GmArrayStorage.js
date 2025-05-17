/**
 * GmArrayStorage.js
 * created by 2025/1/23
 * @file 示例
 * */
import { GmArrayStorage } from '@yiero/gmlib';

/**
 * 声明一个信息数组存储类
 *
 * @warn 如果默认值不是数组, 会抛出类型错误
 */
const infoListStorage = new GmArrayStorage( 'infoList', [] );

/** 获取值 */
console.info( infoListStorage.get() );
// or
console.info( infoListStorage.value );

/**
 * 重新设置储存值
 *
 * @warn 如果默认值不是数组, 会抛出类型错误
 * */
infoListStorage.set( [ 'info#1' ] );

/**
 * 数组的相关方法
 */
/** 附加值 (数组结束) */
infoListStorage.push( 'info#2' );
/** 附加值 (数组开始) */
infoListStorage.unshift( 'info#0' );

/** 删除值 (数组结束) */
infoListStorage.pop();
/** 删除值 (数组开始) */
infoListStorage.shift();
/** 删除值 (指定索引) */
infoListStorage.delete( 1 );

/** 修改值 */
infoListStorage.modify( 'info#1', 0 );  // 将数组的第一个值, 修改为 'info#1'

/** 遍历数组 */
infoListStorage.forEach( item => console.info( item ) );
/** 批量修改数组 */
infoListStorage.map( item => `[#new] ${ item }` );
/** 过滤数组 */
infoListStorage.filter( item => item ); // 过滤空值

/** 清空当前存储, 变为默认值状态 (如果没有设置默认值, 则会重置为空数组 `[]`) */
infoListStorage.reset();
/** 删除当前存储 */
infoListStorage.remove();

/**
 * 监听其他脚本的 'infoList' 存储值变更
 * @warn 一个实例只能设置一个监听器, 后续设置的监听器会覆盖前面的监听器
 * */
infoListStorage.updateListener( ( { key, oldValue, newValue, remote } ) => {
	console.info( 'key', key );             // 为 'infoList'
	console.info( 'oldValue', oldValue );   // 更改前的值
	console.info( 'newValue', newValue );   // 更改后的值
	console.info( 'remote', remote ? 'update from other userscript' : 'update from this userscript' );
} );
/** 删除上面的监听器 */
infoListStorage.removeListener();
