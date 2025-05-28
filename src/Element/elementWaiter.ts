/**
 * 元素等待器选项
 */
export interface IElementWaiterOption {
	/**
	 * 监听器容器
	 *
	 * @default document
	 */
	parent: HTMLElement | DocumentFragment | Document;
	
	/**
	 * 超时时间
	 *
	 * @default 20
	 */
	timeoutPerSecond: number;
	
	/**
	 * 监听到元素触发后, 延时获取元素的时间
	 *
	 * @default .5
	 */
	delayPerSecond: number;
}

/**
 * 兑现
 */
const returnElement = <T>(
	selector: string,
	options: IElementWaiterOption,
	resolve: ( value: ( T | PromiseLike<T> ) ) => void,
	reject: ( reason?: any ) => void,
) => {
	// 延时触发
	setTimeout( () => {
		const element = options.parent.querySelector<HTMLElement>( selector );
		// 空元素, 抛出异常
		if ( !element ) {
			reject( new Error( 'Void Element' ) );
			return;
		}
		
		resolve( element as T );
	}, options.delayPerSecond * 1000 );
};


/**
 * 通过计时器获取元素
 */
const getElementByTimer = <T>(
	selector: string,
	options: IElementWaiterOption,
	resolve: ( value: ( T | PromiseLike<T> ) ) => void,
	reject: ( reason?: any ) => void,
) => {
	const intervalDelay = 100;          // 间隔时间
	let intervalCounter = 0;    // 计数器
	const maxIntervalCounter = Math.ceil( ( ( options.timeoutPerSecond ) * 1000 ) / intervalDelay );
	
	const timer = window.setInterval( () => {
		// 定时器计数
		if ( ++intervalCounter > maxIntervalCounter ) {
			// 超时清除计数器
			clearInterval( timer );
			// reject访问
			returnElement( selector, options, resolve, reject );
			return;
		}
		
		// 尝试获取元素
		const element = options.parent.querySelector<HTMLElement>( selector );
		
		// 获取到元素时
		if ( element ) {
			clearInterval( timer );
			returnElement( selector, options, resolve, reject );
		}
	}, intervalDelay );
};


/**
 * 通过元素监听器获取元素
 */
const getElementByMutationObserver = <T>(
	selector: string,
	options: IElementWaiterOption,
	resolve: ( value: ( T | PromiseLike<T> ) ) => void,
	reject: ( reason?: any ) => void,
) => {
	// 声明定时器
	const timer: number = options.timeoutPerSecond && window.setTimeout( () => {
		// 关闭监听器
		observer.disconnect();
		
		// 返回元素 reject
		returnElement( selector, options, resolve, reject );
	}, ( options.timeoutPerSecond ) * 1000 );
	
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
					returnElement( selector, options, resolve, reject );
				}
			} );
		} );
	};
	
	// 声明监听器
	const observer = new MutationObserver( observeElementCallback );
	
	observer.observe( options.parent, {
		subtree: true,
		childList: true,
	} );
	return true;
};

/**
 * 等待元素载入
 *
 * @param selector CSS选择器
 * @param options 选项
 *
 * @example await elementWaiter( '#app' ) - 等待 `#app` 元素载入
 */
export function elementWaiter<T extends HTMLElement>(
	selector: string,
	options?: Partial<IElementWaiterOption>,
): Promise<T> {
	const elementWaiterOptions: IElementWaiterOption = {
		parent: document,
		
		timeoutPerSecond: 20,
		delayPerSecond: 0.5,
		...options,
	};
	
	return new Promise( ( resolve, reject ) => {
		// 分支1 - 元素已经载入, 直接获取到元素
		const targetElement = elementWaiterOptions.parent.querySelector<HTMLElement>( selector );
		if ( targetElement ) {
			returnElement( selector, elementWaiterOptions, resolve, reject );
			return;
		}
		
		// 分支2 - 元素未载入, 使用MutationObserver获取元素
		if ( MutationObserver ) {
			getElementByMutationObserver( selector, elementWaiterOptions, resolve, reject );
			return;
		}
		
		// 分支3 - 元素未载入, 浏览器无MutationObserver类, 使用定时器获取元素
		getElementByTimer( selector, elementWaiterOptions, resolve, reject );
	} );
}
