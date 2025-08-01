export interface AutoInitClassConstructor {
	autoInit: () => void;
	new (...args: any[]): any;
}

export interface ISpaCollectionItem {
	key: string;
	fn: AutoInitClassConstructor;
	collection: string;
}
