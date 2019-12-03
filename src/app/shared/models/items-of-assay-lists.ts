
 export class ItemsOfAssayLists {
    id: number;
    
	assayNumber: string;
	processingType: number;
	offeringMethod: number;
	listNumber: string;
	itemNo: string;
	itemQuantity: string;
	estimatedValue: string;
	constructor(arg?: ItemsOfAssayLists) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
