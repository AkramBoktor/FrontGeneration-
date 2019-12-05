
 export class InsertNewExpensesForRegionalFinancialPortfolios {
    id: number;
    
	areaCode: string;
	areaName: string;
	budgetYear: Date;
	fundingSourceNumber: string;
	fundingSourceName: string;
	originalClipboardSerial: string;
	serialClipboardArea: string;
	financingClipboardDate: Date;
	balanceProvince: string;
	oldClipboardAmount: string;
	newClipboardAmount: string;
	settlementAmount: string;
	remainingFromPreviousSubmission: string;
	constructor(arg?: InsertNewExpensesForRegionalFinancialPortfolios) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
