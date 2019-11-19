
 export class ExtractionOfTemporaryCardCode {
    id: number;
    
	branchCode: number;
	temporaryCardNumber: number;
	temporaryNumberIssuing: number;
	cardCode: number;
	constructor(arg?: ExtractionOfTemporaryCardCode) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
