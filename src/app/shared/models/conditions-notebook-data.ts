
 export class ConditionsNotebookData {
    id: number;
    
	offeringType: number;
	bidNumber: number;
	project: string;
	supplier: number;
	brochureValue: number;
	brochureNo: number;
	brochurePurchaseDate: Date;
	constructor(arg?: ConditionsNotebookData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
