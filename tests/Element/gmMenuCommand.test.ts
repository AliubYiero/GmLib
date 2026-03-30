import { describe, it, expect, beforeEach } from '@rstest/core';
import { gmMenuCommand } from '../../src/Element/gmMenuCommand';
import { gmApiMock, setupGlobalGmApi } from '../__mocks__/gmApi';

describe('gmMenuCommand', () => {
	beforeEach(() => {
		gmApiMock.reset();
		setupGlobalGmApi();
		gmMenuCommand.list = [];
	});

	describe('create', () => {
		it('should create menu command', () => {
			const onClick = () => {};

			gmMenuCommand.create('Test Menu', onClick, true);

			expect(gmMenuCommand.list.length).toBe(1);
			expect(gmMenuCommand.list[0].title).toBe('Test Menu');
			expect(gmMenuCommand.list[0].isActive).toBe(true);
		});

		it('should throw when creating duplicate menu', () => {
			gmMenuCommand.create('Test Menu', () => {}, true);

			expect(() => {
				gmMenuCommand.create('Test Menu', () => {}, true);
			}).toThrow('菜单按钮已存在');
		});
	});

	describe('remove', () => {
		it('should remove menu command', () => {
			gmMenuCommand.create('Test Menu', () => {}, true);

			gmMenuCommand.remove('Test Menu');

			expect(gmMenuCommand.list.length).toBe(0);
		});
	});

	describe('get', () => {
		it('should return menu command by title', () => {
			const onClick = () => {};
			gmMenuCommand.create('Test Menu', onClick, true);

			const command = gmMenuCommand.get('Test Menu');

			expect(command.title).toBe('Test Menu');
			expect(command.onClick).toBe(onClick);
		});

		it('should throw when menu not found', () => {
			expect(() => {
				gmMenuCommand.get('Non-existent Menu');
			}).toThrow('菜单按钮不存在');
		});
	});

	describe('modify', () => {
		it('should modify menu command onClick', () => {
			gmMenuCommand.create('Test Menu', () => {}, true);
			const newOnClick = () => console.log('new click');

			gmMenuCommand.modify('Test Menu', { onClick: newOnClick });

			const command = gmMenuCommand.get('Test Menu');
			expect(command.onClick).toBe(newOnClick);
		});
	});

	describe('createToggle', () => {
		it('should create toggle menu commands', () => {
			gmMenuCommand.createToggle({
				active: {
					title: 'Enable',
					onClick: () => {},
				},
				inactive: {
					title: 'Disable',
					onClick: () => {},
				},
			});

			expect(gmMenuCommand.list.length).toBe(2);
			expect(gmMenuCommand.list[0].title).toBe('Enable');
			expect(gmMenuCommand.list[0].isActive).toBe(true);
			expect(gmMenuCommand.list[1].title).toBe('Disable');
			expect(gmMenuCommand.list[1].isActive).toBe(false);
		});
	});

	describe('toggleActive', () => {
		it('should toggle menu active state', () => {
			gmMenuCommand.create('Test Menu', () => {}, true);
			expect(gmMenuCommand.list[0].isActive).toBe(true);

			gmMenuCommand.toggleActive('Test Menu');

			expect(gmMenuCommand.list[0].isActive).toBe(false);

			gmMenuCommand.toggleActive('Test Menu');

			expect(gmMenuCommand.list[0].isActive).toBe(true);
		});
	});

	describe('render', () => {
		it('should register active menus', () => {
			gmMenuCommand.create('Active Menu', () => {}, true);
			gmMenuCommand.create('Inactive Menu', () => {}, false);

			gmMenuCommand.render();

			expect(gmApiMock.GM_registerMenuCommand).toHaveBeenCalledTimes(1);
			expect(gmApiMock.GM_unregisterMenuCommand).toHaveBeenCalledTimes(2);
		});
	});
});
