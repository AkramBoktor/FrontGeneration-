
 export class RecordTheClaimFormWithTheExchangeItem {
    id: number;
    
	registerationFormData: Date;
	requestingAreaNumber: number;
	formSerial: string;
	fundingSource: number;
	budgetItem: number;
	constructor(arg?: RecordTheClaimFormWithTheExchangeItem) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
