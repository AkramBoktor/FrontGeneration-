
 export class AssayLists {
    id: number;
    
	assayNumber: string;
	processingType: number;
	offeringMethod: number;
	listNumber: string;
	listName: string;
	requiredQuantity: number;
	estimatedValue: string;
	constructor(arg?: AssayLists) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
