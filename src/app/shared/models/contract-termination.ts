
 export class ContractTermination {
    id: number;
    
	employeeCode: string;
	periodNumber: string;
	periodStartDate: Date;
	contractAmount: string;
	centralAdministration: number;
	subAdministration: number;
	hiringDate: Date;
	terminationReason: string;
	terminationDate: Date;
	notes: string;
	periodEndDate: Date;
	constructor(arg?: ContractTermination) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
