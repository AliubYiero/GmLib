import { GmStorage } from './GmStorage.ts';

/**
 * 储存数组的油猴存储, 方便处理数组
 *
 * @class
 */
export class GmArrayStorage<T> extends GmStorage<Array<T>> {
	constructor(
		protected readonly key: string,
		protected readonly defaultValue: Array<T> = [],
	) {
		super( key, defaultValue );
		this.checkIsArray( defaultValue );
	}
	
	/**
	 * 获取数组长度
	 */
	get length(): number {
		return this.value.length;
	}
	
	/**
	 * 获取数组最后一个项
	 */
	get lastItem(): T | undefined {
		const list = this.value;
		if ( !list.length ) {
			list.push( ...this.defaultValue );
		}
		return list[ list.length - 1 ];
	}
	
	/**
	 * 设置值, 有类型检查
	 */
	set( value: Array<T> ) {
		this.checkIsArray( value );
		super.set( value );
	}
	
	/**
	 * 基于索引修改数组项
	 */
	modify( value: T, index: number ) {
		const list = this.value;
		list[ index ] = value;
		this.set( list );
	};
	
	/**
	 * 清空储存, 将其变更为默认值
	 */
	reset() {
		this.set( this.defaultValue );
	}
	
	/**
	 * 基于索引删除数组项
	 */
	delete( index: number ) {
		this.filter( ( _, i ) => i !== index );
	}
	
	/**
	 * 向数组的最后添加项
	 */
	push( value: T ) {
		const list = this.value;
		list.push( value );
		this.set( list );
	}
	
	/**
	 * 删除数组的最后一个元素
	 */
	pop() {
		const list = this.value;
		list.pop();
		this.set( list );
	}
	
	/**
	 * 向数组的最开始添加项
	 */
	unshift( value: T ) {
		const list = this.value;
		list.unshift( value );
		this.set( list );
	}
	
	/**
	 * 删除数组的第一个元素
	 */
	shift() {
		const list = this.value;
		list.shift();
		this.set( list );
	}
	
	/**
	 * 遍历数组
	 */
	forEach( callback: ( value: T, index: number, array: T[] ) => void ) {
		this.value.forEach( callback );
	}
	
	/**
	 * 覆盖数组
	 */
	map( callback: ( value: T, index: number, array: T[] ) => T ) {
		const list = this.value;
		const newList = list.map( callback );
		this.set( newList );
	}
	
	/**
	 * 过滤数组
	 */
	filter( callback: ( value: T, index: number, array: T[] ) => boolean ) {
		const list = this.value;
		const newList = list.filter( callback );
		this.set( newList );
	}
	
	/**
	 * 校验输入的值是否为数组
	 *
	 * @throws TypeError
	 */
	private checkIsArray( value: Array<T> ) {
		if ( !Array.isArray( value ) ) {
			throw new TypeError( 'Init Default Value Cannot Be NonArray' );
		}
	}
}
