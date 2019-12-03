
 export class AssayItemsPrice {
    id: number;
    
	workType: number;
	activityType: number;
	pricingYear: string;
	itemCode: string;
	itemName: string;
	unitCode: number;
	unitPrice: string;
	constructor(arg?: AssayItemsPrice) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
