
 export class AssayData {
    id: number;
    
	assayNumber: string;
	processingType: number;
	supplyingDuration: string;
	offeringMethod: number;
	offeringTerms: number;
	constructor(arg?: AssayData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
