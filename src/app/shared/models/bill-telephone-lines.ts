
 export class BillTelephoneLines {
    id: number;
    
	employeeCode: string;
	administrationCode: number;
	employeeStatus: number;
	phoneNumber: string;
	invoiceValue: number;
	lineType: number;
	constructor(arg?: BillTelephoneLines) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
