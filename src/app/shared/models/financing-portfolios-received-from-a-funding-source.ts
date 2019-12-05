
 export class FinancingPortfoliosReceivedFromAFundingSource {
    id: number;
    
	budgetYear: string;
	fundingSourceNumber: number;
	fundingSourceName: string;
	clipboardSerial: string;
	clipboardNumber: string;
	financingClipboardDate: Date;
	clipboardAmount: string;
	constructor(arg?: FinancingPortfoliosReceivedFromAFundingSource) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
