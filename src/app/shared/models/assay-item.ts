
 export class AssayItem {
    id: number;
    
	workType: number;
	activityType: string;
	subActivityType: string;
	itemCode: string;
	unitCode: number;
	arabicItemName: string;
	englishItemName: string;
	constructor(arg?: AssayItem) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
