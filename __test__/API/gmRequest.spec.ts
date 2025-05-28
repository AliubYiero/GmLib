import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { gmRequest } from '../../src';

describe( 'gmRequest', () => {
	beforeEach( () => {
		// const GM_xmlhttpRequestMock = vi.fn().mockImplementation( (
		// 	url: string,
		// 	method: string,
		// ))
		vi.stubGlobal( 'GM_xmlhttpRequest', () => {} );
	} );
	afterEach( () => {
		vi.unstubAllGlobals();
	} );
	
	it( '重载1, 发送 Get 请求', async () => {
		const res = gmRequest( 'https://api.test.com/login' );
		expect( res ).resolves.toBeTypeOf( 'object' );
	} );
} );
