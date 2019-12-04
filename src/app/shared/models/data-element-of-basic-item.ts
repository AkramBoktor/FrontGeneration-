
 export class DataElementOfBasicItem {
    id: number;
    
	groupCode: number;
	itemStatment: string;
	pricingType: number;
	pricingYear: Date;
	measuringUnit: number;
	firstPrice: string;
	constructor(arg?: DataElementOfBasicItem) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
