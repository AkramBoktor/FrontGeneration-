
 export class TypicalAssayLists {
    id: number;
    
	estimatedValue: string;
	requiredQuantity: number;
	listName: string;
	listNumber: string;
	offeringMethod: number;
	processingType: number;
	assayNumber: string;
	constructor(arg?: TypicalAssayLists) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
