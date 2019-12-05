
 export class TypicalItemsOfAssayLists {
    id: number;
    
	estimatedValue: string;
	itemQuantity: string;
	listNumber: string;
	offeringMethod: number;
	processingType: number;
	assayNumber: string;
	itemNo: string;
	constructor(arg?: TypicalItemsOfAssayLists) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
