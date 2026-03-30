import { describe, it, expect, beforeEach } from '@rstest/core';
import { gmApiMock, setupGlobalGmApi } from '../__mocks__/gmApi';
import { environmentTest } from '../../src/Env/environmentTest';

describe('environmentTest', () => {
	beforeEach(() => {
		gmApiMock.reset();
		setupGlobalGmApi();
	});

	it('should return ScriptCat environment', () => {
		gmApiMock.GM_info.scriptHandler = 'ScriptCat';

		const result = environmentTest();

		expect(result).toBe('ScriptCat');
	});

	it('should return Tampermonkey environment', () => {
		gmApiMock.GM_info.scriptHandler = 'Tampermonkey';

		const result = environmentTest();

		expect(result).toBe('Tampermonkey');
	});
});
