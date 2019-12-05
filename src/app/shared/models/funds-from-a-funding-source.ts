
 export class FundsFromAFundingSource {
    id: number;
    
	budgetYear: string;
	fundingSourceNumber: number;
	clipboardSerial: string;
	fundClipboardNumber: string;
	fundingDate: Date;
	fundClipboardAmount: string;
	constructor(arg?: FundsFromAFundingSource) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
