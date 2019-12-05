
 export class TypicalFormADisbursementForm {
    id: number;
    
	companyName: string;
	offeringType: number;
	bidNumber: string;
	invoiceDate: Date;
	invoicePagesNumber: string;
	billNumber: string;
	constructor(arg?: TypicalFormADisbursementForm) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
