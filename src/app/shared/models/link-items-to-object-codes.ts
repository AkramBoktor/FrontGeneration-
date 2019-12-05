
 export class LinkItemsToObjectCodes {
    id: number;
    
	itemCode: number;
	elementCode: number;
	constructor(arg?: LinkItemsToObjectCodes) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
