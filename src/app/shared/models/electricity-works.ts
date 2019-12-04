
 export class ElectricityWorks {
    id: number;
    
	menuType: number;
	employmentType: number;
	activityType: string;
	pricingYear: Date;
	itemCode: number;
	itemName: string;
	unit: number;
	unitPrice: string;
	constructor(arg?: ElectricityWorks) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
