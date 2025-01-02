/**
 * 等待元素载入
 *
 * @example await elementWaiter( '#app' ) - 等待 `#app` 元素载入
 */
declare const elementWaiter: <T extends HTMLElement>(
	selector: string,
	options?: Partial<IElementWaiterOption>,
) => Promise<T>;

declare interface IElementWaiterOption {
	parent: HTMLElement | DocumentFragment;
	timeoutPerSecond: number;
	delayPerSecond: number;
}
