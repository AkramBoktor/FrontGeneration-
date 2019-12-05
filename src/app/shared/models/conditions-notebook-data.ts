
 export class ConditionsNotebookData {
    id: number;
    
	offeringType: number;
	bidNumber: string;
	project: string;
	supplier: string;
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
