declare const elementWaiter: <T extends HTMLElement>(
	selector: string,
	options?: Partial<IElementWaiterOption>,
) => Promise<T>;

declare interface IElementWaiterOption {
	parent: HTMLElement;
	timeoutPerSecond: number;
	delayPerSecond: number;
}
