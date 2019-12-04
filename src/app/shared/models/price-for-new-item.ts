
 export class PriceForNewItem {
    id: number;
    
	buildingCode: string;
	requestSerial: string;
	constructionType: number;
	offeringType: number;
	planYear: string;
	bidNumber: string;
	workType: number;
	activityType: string;
	subActivity: string;
	itemCode: number;
	itemName: string;
	unit: number;
	price: string;
	constructor(arg?: PriceForNewItem) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
