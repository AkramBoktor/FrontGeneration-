
 export class FinancialDisclosureStatement {
    id: number;
    
	employeeCode: string;
	submissionReason: number;
	submissionDate: Date;
	fileDeliveryDate: Date;
	fileReceiptDate: Date;
	constructor(arg?: FinancialDisclosureStatement) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
