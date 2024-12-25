/**
 * ElementWaiter.js
 * @file 示例 (无法直接运行)
 * */
import { elementWaiter } from '@yiero/gmlib';

/**
 * 监听元素 `#app` 载入.
 * 请确保 `<body>` 元素已载入, 即 `run-at` 不能是 `document-start`, 否则请手动指定监听容器.
 */
elementWaiter( '#app' ).then( ( element ) => {
	console.log( element );
} );

/**
 * 手动指定父容器 `.content-container`, 监听元素 `.content-item` 载入
 */
elementWaiter( '.content-item', {
	parent: document.querySelector( '.content-container' ),
} ).then( ( element ) => {
	console.log( element );
} );

/**
 * 取消超时时间, 取消延时
 */
elementWaiter( '#app', {
	timeoutPerSecond: 0,
	delayPerSecond: 0,
} ).then( ( element ) => {
	console.log( element );
} );
