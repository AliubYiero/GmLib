declare interface ICookie {
	domain: string;
	name: string;
	value: string;
	expirationDate: number;
	hostOnly: boolean;
	httpOnly: boolean;
	path: string;
	sameSite: string;
	secure: boolean;
	session: boolean;
	storeId: string;
}
