/**
 * 等待元素载入
 */
export function elementWaiter(
	selector: string,
	config: Partial<IElementWaiterOption> = {},
): Promise<HTMLElement> {
	// 默认值赋予
	const {
		parent = document.body,
		timeoutPerSecond = 20,
		delayPerSecond = 0.5,
	} = config;
	
	return new Promise( ( resolve, reject ) => {
		/**
		 * 工具函数: 延时返回目标元素函数
		 * 提供两种获取目标元素的方式:
		 * 1. 通过 Promise 返回值获取元素
		 * 2. 根据分发的事件 'ElementUpdate', 获取回调, 回调参数 e.detail 为目标元素
		 * */
		const returnElement = ( selector: string ) => {
			// 延时触发
			setTimeout( () => {
				const element = document.querySelector<HTMLElement>( selector );
				// 空元素, 抛出异常
				if ( !element ) {
					reject( new Error( 'Void Element' ) );
					return;
				}
				
				// 触发事件 (element = e.detail);
				window.dispatchEvent( new CustomEvent( 'ElementUpdate', { detail: element } ) );
				
				// 返回元素
				resolve( element );
			}, delayPerSecond * 1000 );
		};
		
		// 分支1 - 元素已经载入, 直接获取到元素
		const element = document.querySelector<HTMLElement>( selector );
		if ( element ) {
			returnElement( selector );
			return;
		}
		
		// 分支2 - 元素未载入, 使用MutationObserver获取元素
		if ( MutationObserver ) {
			// 声明定时器
			const timer: number = timeoutPerSecond && window.setTimeout( () => {
				// 关闭监听器
				observer.disconnect();
				
				// 返回元素 reject
				returnElement( selector );
			}, ( timeoutPerSecond ) * 1000 );
			
			const observeElementCallback = ( mutations: MutationRecord[] ) => {
				mutations.forEach( ( mutation ) => {
					mutation.addedNodes.forEach( ( addNode ) => {
						if ( addNode.nodeType !== Node.ELEMENT_NODE ) {
							return;
						}
						
						// 获取元素
						const addedElement = addNode as HTMLElement;
						const element = addedElement.matches( selector )
							? addedElement
							: addedElement.querySelector<HTMLElement>( selector );
						
						// 如果获取到元素
						if ( element ) {
							// 清空定时器
							timer && clearTimeout( timer );
							
							// 返回元素
							returnElement( selector );
						}
					} );
				} );
			};
			
			// 声明监听器
			const observer = new MutationObserver( observeElementCallback );
			
			observer.observe( <HTMLElement> parent, {
				subtree: true,
				childList: true,
			} );
			return;
		}
		
		// 分支3 - 元素未载入, 浏览器无MutationObserver类, 使用定时器获取元素
		const intervalDelay = 100;
		let intervalCounter = 0;
		const maxIntervalCounter = Math.ceil( ( ( timeoutPerSecond ) * 1000 ) / intervalDelay );
		
		const timer = window.setInterval( () => {
			// 定时器计数
			if ( ++intervalCounter > maxIntervalCounter ) {
				// 超时清除计数器
				clearInterval( timer );
				// reject访问
				returnElement( selector );
				return;
			}
			
			// 尝试获取元素
			const element = ( <HTMLElement> parent ).querySelector( selector ) as HTMLElement;
			
			// 获取到元素时
			if ( element ) {
				clearInterval( timer );
				returnElement( selector );
			}
		}, intervalDelay );
	} );
}
