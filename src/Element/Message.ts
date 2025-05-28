// 全局消息容器
let messageContainer: HTMLElement | null = null;

// 消息类型配置
const messageTypes = {
	success: {
		backgroundColor: '#f0f9eb',
		borderColor: '#e1f3d8',
		textColor: '#67c23a',
		icon: '✓',
	},
	warning: {
		backgroundColor: '#fdf6ec',
		borderColor: '#faecd8',
		textColor: '#e6a23c',
		icon: '⚠',
	},
	error: {
		backgroundColor: '#fef0f0',
		borderColor: '#fde2e2',
		textColor: '#f56c6c',
		icon: '✕',
	},
	info: {
		backgroundColor: '#edf2fc',
		borderColor: '#e4e7ed',
		textColor: '#909399',
		icon: 'i',
	},
};

// 消息位置配置
const messagePositions = {
	'top': { top: '20px' },
	'top-left': { top: '20px', left: '20px' },
	'top-right': { top: '20px', right: '20px' },
	'left': { left: '20px' },
	'right': { right: '20px' },
	'bottom': { bottom: '20px' },
	'bottom-left': { bottom: '20px', left: '20px' },
	'bottom-right': { bottom: '20px', right: '20px' },
};

// 创建消息容器
function createMessageContainer() {
	if ( !messageContainer ) {
		messageContainer = document.createElement( 'div' ) as unknown as HTMLElement;
		messageContainer.setAttribute( 'style', `
                    position: fixed;
                    z-index: 9999999999;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100vw;
                ` );
		document.body.appendChild( messageContainer );
	}
	return messageContainer;
}

interface MessageDetail {
	message: string;
	type: 'success' | 'warning' | 'error' | 'info';
	duration: number;
	position: 'top' | 'top-left' | 'top-right' | 'left' | 'right' | 'bottom' | 'bottom-left' | 'bottom-right';
}

// 主消息函数
function Message( options: string | MessageDetail ) {
	// 参数归一
	const detail: MessageDetail = {
		type: 'info',
		duration: 3000,
		position: 'top',
		message: '',
	};
	// 处理不同调用方式
	if ( typeof options === 'string' ) {
		detail.message = options;
	}
	else {
		Object.assign( detail, options );
	}
	
	// 确保容器存在
	messageContainer = createMessageContainer() as HTMLElement;
	
	// 创建消息元素
	const messageEl: HTMLElement = document.createElement( 'div' );
	
	// 获取消息类型配置
	const typeConfig = messageTypes[ detail.type ] || messageTypes.info;
	
	// 设置消息元素样式
	messageEl.setAttribute( 'style', `
                position: absolute;
                min-width: 300px;
                max-width: 500px;
                padding: 15px 20px;
                border-radius: 8px;
                transform: translateY(-20px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                background-color: ${ typeConfig.backgroundColor };
                border: 1px solid ${ typeConfig.borderColor };
                color: ${ typeConfig.textColor };
                display: flex;
                align-items: center;
                transition: all 0.3s ease;
                opacity: 0;
                pointer-events: auto;
                cursor: pointer;
                ${ Object.entries( messagePositions[ detail.position || 'top' ] )
		.map( ( [ k, v ] ) => `${ k }: ${ v };` ).join( ' ' )
	}
            ` );
	
	// 添加图标
	const iconEl: HTMLElement = document.createElement( 'span' );
	iconEl.setAttribute( 'style', `
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                margin-right: 12px;
                font-size: 16px;
                font-weight: bold;
            ` );
	iconEl.textContent = typeConfig.icon;
	messageEl.appendChild( iconEl );
	
	// 添加消息内容
	const contentEl: HTMLElement = document.createElement( 'span' );
	contentEl.setAttribute( 'style', `
                flex: 1;
                font-size: 14px;
                line-height: 1.5;
            ` );
	contentEl.textContent = detail.message;
	messageEl.appendChild( contentEl );
	
	// 添加到容器
	messageContainer.appendChild( messageEl );
	
	// 触发动画
	setTimeout( () => {
		messageEl.style.opacity = '1';
		messageEl.style.transform = 'translateY(0)';
	}, 10 );
	
	// 自动关闭
	let timer = setTimeout( () => {
		closeMessage( messageEl );
	}, detail.duration );
	
	// 点击关闭
	messageEl.addEventListener( 'click', () => {
		clearTimeout( timer );
		closeMessage( messageEl );
	} );
}

// 关闭消息函数
function closeMessage( element: HTMLElement ) {
	element.style.opacity = '0';
	element.style.transform = 'translateY(-20px)';
	
	setTimeout( () => {
		if ( element.parentNode ) {
			element.parentNode.removeChild( element );
		}
	}, 300 );
}

// 添加快捷方法
Message.success = ( message: string, options: Omit<MessageDetail, 'type' | 'message'> ) => Message( {
	...options,
	message,
	type: 'success',
} );
Message.warning = ( message: string, options: Omit<MessageDetail, 'type' | 'message'> ) => Message( {
	...options,
	message,
	type: 'warning',
} );
Message.error = ( message: string, options: Omit<MessageDetail, 'type' | 'message'> ) => Message( {
	...options,
	message,
	type: 'error',
} );
Message.info = ( message: string, options: Omit<MessageDetail, 'type' | 'message'> ) => Message( {
	...options,
	message,
	type: 'info',
} );

export {
	Message,
};
