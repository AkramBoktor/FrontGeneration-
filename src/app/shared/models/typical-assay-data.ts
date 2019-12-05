
 export class TypicalAssayData {
    id: number;
    
	assayNumber: string;
	processingType: number;
	supplyingDuration: string;
	offeringTerms: number;
	offeringMethod: number;
	conditionCode: number;
	constructor(arg?: TypicalAssayData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
