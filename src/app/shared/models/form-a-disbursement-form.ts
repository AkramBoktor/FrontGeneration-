
 export class FormADisbursementForm {
    id: number;
    
	billNumber: string;
	invoicePagesNumber: string;
	invoiceDate: Date;
	bidNumber: string;
	offeringType: number;
	companyName: string;
	constructor(arg?: FormADisbursementForm) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
