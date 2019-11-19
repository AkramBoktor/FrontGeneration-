
 export class DataItem {
    id: number;
    
	itemNumber: string;
	numberType: number;
	productName: string;
	productType: number;
	itemCondition: number;
	unit: number;
	unitpPrice: number;
	selectOrder: string;
	minimum: string;
	assumedLifetime: string;
	constructor(arg?: DataItem) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
