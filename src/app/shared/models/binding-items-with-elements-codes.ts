
 export class BindingItemsWithElementsCodes {
    id: number;
    
	itemCode: number;
	elementCode: number;
	constructor(arg?: BindingItemsWithElementsCodes) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
