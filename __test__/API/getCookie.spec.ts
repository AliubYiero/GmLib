import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getCookie } from '../../src';

describe( 'getCookie', () => {
	beforeEach( () => {
		const GM_infoMock = {
			scriptWillUpdate: true,
			scriptHandler: 'ScriptCat', // 确保此属性存在且值正确
			scriptUpdateURL: '',
			scriptMetaStr: '...', // 简化的 meta 字符串
			version: '0.16.6',
			script: {
				name: 'New Userscript',
				grant: [ 'GM_info' ],
			},
		};
		
		const GM_cookieMock = vi.fn().mockImplementation( (
			action: 'list' | 'get' | 'set' | 'delete',
			_details: any,
			callback ) => {
			if ( action === 'list' ) {
				callback( [
					{
						domain: '.bilibili.com',
						name: 'DedeUserID',
						value: '123123123', // 修正为字符串类型
						// 其他字段...
					},
					// 其他 cookie 数据...
				] );
			}
		} );
		
		vi.stubGlobal( 'GM_info', GM_infoMock );
		vi.stubGlobal( 'GM_cookie', GM_cookieMock );
		vi.stubGlobal( 'document', {
			cookie: 'DedeUserID=123123123;',
		} );
	} );
	
	it( '非脚本猫环境报错', async () => {
		vi.stubGlobal( 'GM_info', {
			...GM_info,
			scriptHandler: 'Tampermonkey',
		} );
		await expect( getCookie( '.bilibili.com' ) ).rejects.toThrowError();
	} );
	
	it( '测试重载 1, 获取 .bilibili.com 下的所有字段', async () => {
		const cookieList = await getCookie( '.bilibili.com' );
		
		expect( cookieList ).toBeInstanceOf( Array );
		expect( cookieList.length ).toBeGreaterThan( 0 );
		cookieList.forEach( cookie => {
			expect( cookie.domain ).toBe( '.bilibili.com' );
			expect( typeof cookie.name ).toBe( 'string' );
			expect( cookie.value ).toBeDefined();
		} );
	} );
	
	it( '测试重载 2, 获取 .bilibili.com 下的 DedeUserID 字段', async () => {
		await expect( getCookie( '.bilibili.com', 'DedeUserID' ) )
			.resolves.toBe( '123123123' ); // 值类型改为字符串
	} );
	
	it( '测试重载 3, 解析 document.cookie 下的 cookie', async () => {
		await expect( getCookie( document.cookie, 'DedeUserID' ) )
			.resolves.toBe( '123123123' );
	} );
	
	afterEach( () => {
		vi.unstubAllGlobals();
	} );
} );
