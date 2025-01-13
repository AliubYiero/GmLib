/**
 * scroll.js
 * created by 2025/1/13
 * @file 示例
 * */
import { scroll } from '@yiero/gmlib';

/**
 * 滚动页面到指定百分比位置
 */
// 滚动页面到 50% 的位置
scroll();
// 等同于
scroll( .5 );

// 滚动页面到顶部
scroll( 0 );
// 滚动页面到底部
scroll( 1 );

/**
 * 滚动指定元素到指定位置 (需要父容器是滚动容器)
 */
const targetContainer = document.querySelector( '.item' );
// 滚动 .item 元素到父容器的 50% 位置
scroll( targetContainer, targetContainer.parentElement, .5 );
