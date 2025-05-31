export interface MenuCommand {
	title: string;
	onClick: () => void;
	isActive: boolean;
	id: number;
}

class gmMenuCommand {
	/**
	 * 菜单按钮列表
	 * */
	static list: MenuCommand[] = [];
	
	private constructor() {}
	
	/**
	 * 获取一个菜单按钮
	 */
	static get( title: string ) {
		const commandButton = this.list.find( commandButton =>
			commandButton.title === title );
		if ( !commandButton ) {
			throw new Error( '菜单按钮不存在' );
		}
		return commandButton;
	};
	
	/**
	 * 创建一个带有状态的菜单按钮
	 */
	static createToggle( details: {
		active: Omit<MenuCommand, 'id' | 'isActive'>,
		inactive: Omit<MenuCommand, 'id' | 'isActive'>
	} ) {
		this
			.create( details.active.title, () => {  // 创建激活状态的菜单按钮
				this.toggleActive( details.active.title );
				this.toggleActive( details.inactive.title );
				details.active.onClick();
				this.render();
			}, true )
			.create( details.inactive.title, () => {
				this.toggleActive( details.active.title );// 创建未激活状态的菜单按钮
				this.toggleActive( details.inactive.title );
				details.inactive.onClick();
				this.render();
			}, false );
		return gmMenuCommand;
	};
	
	/**
	 * 手动激活一个菜单按钮
	 */
	static click( title: string ) {
		const commandButton = this.get( title );
		commandButton.onClick();
		return gmMenuCommand;
	}
	
	/**
	 * 创建一个菜单按钮
	 */
	static create(
		title: string,
		onClick: () => void,
		isActive: boolean = true,
	) {
		if ( this.list.some( commandButton => commandButton.title === title ) ) {
			throw new Error( '菜单按钮已存在' );
		}
		
		this.list.push( { title, onClick: onClick, isActive, id: 0 } );
		return gmMenuCommand;
	}
	
	/**
	 * 删除一个菜单按钮
	 */
	static remove( title: string ) {
		this.list = this.list.filter( commandButton => commandButton.title !== title );
		return gmMenuCommand;
	}
	
	/**
	 * 修改两个菜单按钮的顺序
	 */
	static swap( title1: string, title2: string ) {
		const index1 = this.list.findIndex( commandButton =>
			commandButton.title === title1 );
		const index2 = this.list.findIndex( commandButton =>
			commandButton.title === title2 );
		if ( index1 === -1 || index2 === -1 ) {
			throw new Error( '菜单按钮不存在' );
		}
		
		[ this.list[ index1 ], this.list[ index2 ] ] = [ this.list[ index2 ], this.list[ index1 ] ];
		return gmMenuCommand;
	}
	
	/**
	 * 修改一个菜单按钮
	 */
	static modify( title: string, details: Partial<Omit<MenuCommand, 'title' | 'id'>> ) {
		const commandButton = this.get( title );
		
		details.onClick && ( commandButton.onClick = details.onClick );
		details.isActive && ( commandButton.isActive = details.isActive );
		return gmMenuCommand;
	}
	
	/**
	 * 切换菜单按钮激活状态
	 */
	static toggleActive( title: string ) {
		const commandButton = this.get( title );
		
		commandButton.isActive = !commandButton.isActive;
		return gmMenuCommand;
	}
	
	/**
	 * 渲染所有激活的菜单按钮
	 */
	static render() {
		this.list
			.forEach( commandButton => {
				// 清除原先的菜单按钮
				GM_unregisterMenuCommand( commandButton.id );
				// 重新注册激活状态的菜单按钮
				if ( commandButton.isActive ) {
					commandButton.id = GM_registerMenuCommand( commandButton.title, commandButton.onClick );
				}
			} );
	}
}

export {
	gmMenuCommand,
};
