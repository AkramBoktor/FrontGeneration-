
 export class RecordTheValueOfTelephoneBill {
    id: number;
    
	debtMonth: Date;
	calculationPeriodFrom: Date;
	calculationPeriodTo: Date;
	phoneNumber: string;
	invoiceSerialMonth: Date;
	employeeCode: string;
	employeeName: string;
	managementCode: number;
	administrationName: string;
	employeeStatusCode: number;
	employeeStatus: string;
	invoiceValue: number;
	administrativeExpenses: number;
	totalInvoice: number;
	constructor(arg?: RecordTheValueOfTelephoneBill) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
