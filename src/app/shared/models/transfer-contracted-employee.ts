
 export class TransferContractedEmployee {
    id: number;
    
	employeeCode: string;
	periodNumber: string;
	periodStartDate: Date;
	periodEndDate: Date;
	jobTitle: number;
	hiringDate: Date;
	fromCentralAdministration: number;
	fromSubAdministration: number;
	transferDate: Date;
	toCentralAdministration: number;
	toSubAdministration: number;
	executionOrderDate: Date;
	executionOrderNumber: string;
	constructor(arg?: TransferContractedEmployee) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
