export interface IGMStorageChangeDetail<T> {
	key: string;
	oldValue: T;
	newValue: T;
	remote: boolean;
}

/**
 * 油猴存储
 */
export class GmStorage<T extends unknown> {
	protected listenerId: number = 0;
	
	constructor(
		protected readonly key: string,
		protected readonly defaultValue?: T,
	) {
		this.key = key;
		this.defaultValue = defaultValue;
	}
	
	/**
	 * 获取当前存储的值
	 *
	 * @alias get()
	 */
	get value(): T {
		return this.get();
	}
	
	/**
	 * 获取当前存储的值
	 */
	get(): T {
		return GM_getValue( this.key, this.defaultValue );
	}
	
	/**
	 * 给当前存储设置一个新值
	 */
	set( value: T ) {
		return GM_setValue( this.key, value );
	}
	
	/**
	 * 移除当前键
	 */
	remove() {
		GM_deleteValue( this.key );
	}
	
	/**
	 * 监听元素更新, 同时只能存在 1 个监听器
	 */
	updateListener( callback: ( changeDetail: IGMStorageChangeDetail<T> ) => void ) {
		this.removeListener();
		this.listenerId = GM_addValueChangeListener( this.key, ( key, oldValue, newValue, remote ) => {
			callback( {
				key,
				oldValue,
				newValue,
				remote,
			} );
		} );
	}
	
	/**
	 * 移除元素更新回调
	 */
	removeListener() {
		GM_removeValueChangeListener( this.listenerId );
	}
}
