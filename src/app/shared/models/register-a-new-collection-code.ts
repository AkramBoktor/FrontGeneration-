
 export class RegisterANewCollectionCode {
    id: number;
    
	collectionCode: string;
	collectionAmount: number;
	collectionName: string;
	constructor(arg?: RegisterANewCollectionCode) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
