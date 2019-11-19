
 export class DataForAnItemContainingOtherItems {
    id: number;
    
	itemNumber: string;
	basicItemNumber: string;
	quantity: number;
	constructor(arg?: DataForAnItemContainingOtherItems) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
