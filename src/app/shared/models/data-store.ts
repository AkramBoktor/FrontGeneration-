
 export class DataStore {
    id: number;
    
	storeNumber: string;
	storeName: string;
	storekeeper: string;
	storeAddress: string;
	constructor(arg?: DataStore) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
