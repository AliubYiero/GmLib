import { beforeEach, describe, expect, it } from '@rstest/core';
import { GmArrayStorage } from '../../src/Storage/GmArrayStorage';
import { gmApiMock, setupGlobalGmApi } from '../__mocks__/gmApi';

describe('GmArrayStorage', () => {
    let storage: GmArrayStorage<number>;

    beforeEach(() => {
        gmApiMock.reset();
        setupGlobalGmApi();
        storage = new GmArrayStorage('test-array', [1, 2, 3]);
    });

    describe('Constructor', () => {
        it('should throw TypeError when default value is not array', () => {
            expect(() => {
                new GmArrayStorage('test-key', 'not-array' as any);
            }).toThrow(TypeError);
            expect(() => {
                new GmArrayStorage('test-key', 'not-array' as any);
            }).toThrow('Init Default Value Cannot Be NonArray');
        });

        it('should use empty array as default', () => {
            const emptyStorage = new GmArrayStorage('empty-array');
            expect(emptyStorage.get()).toEqual([]);
            expect(emptyStorage.length).toBe(0);
        });
    });

    describe('Properties', () => {
        it('should return array length', () => {
            expect(storage.length).toBe(3);
        });

        it('should return last item', () => {
            expect(storage.lastItem).toBe(3);
        });

        it('should return undefined when array is empty', () => {
            const emptyStorage = new GmArrayStorage('empty-array');
            expect(emptyStorage.lastItem).toBeUndefined();
        });
    });

    describe('Array operations', () => {
        it('should push item', () => {
            storage.push(4);
            expect(storage.get()).toEqual([1, 2, 3, 4]);
            expect(storage.length).toBe(4);
        });

        it('should pop item', () => {
            storage.pop();
            expect(storage.get()).toEqual([1, 2]);
            expect(storage.length).toBe(2);
        });

        it('should unshift item', () => {
            storage.unshift(0);
            expect(storage.get()).toEqual([0, 1, 2, 3]);
            expect(storage.length).toBe(4);
        });

        it('should shift item', () => {
            storage.shift();
            expect(storage.get()).toEqual([2, 3]);
            expect(storage.length).toBe(2);
        });
    });

    describe('Array methods', () => {
        it('should modify item by index', () => {
            storage.modify(99, 1);
            expect(storage.get()).toEqual([1, 99, 3]);
        });

        it('should delete item by index', () => {
            storage.delete(1);
            expect(storage.get()).toEqual([1, 3]);
        });

        it('should reset to default', () => {
            // 先设置一个初始值（创建存储中的副本）
            storage.set([1, 2, 3]);
            storage.push(4);
            storage.push(5);
            expect(storage.get()).toEqual([1, 2, 3, 4, 5]);

            storage.reset();
            expect(storage.get()).toEqual([1, 2, 3]);
        });
    });

    describe('Iteration', () => {
        it('should forEach iterate all items', () => {
            const items: number[] = [];
            storage.forEach((item) => {
                items.push(item);
            });
            expect(items).toEqual([1, 2, 3]);
        });

        it('should map transform items', () => {
            storage.map((item) => item * 2);
            expect(storage.get()).toEqual([2, 4, 6]);
        });

        it('should filter items', () => {
            storage.filter((item) => item > 1);
            expect(storage.get()).toEqual([2, 3]);
        });
    });
});
