
 export class EmployeeCardDefinition {
    id: number;
    
	employeeCode: string;
	branchCode: number;
	jobTitle: string;
	employeeStatus: number;
	receiptWorkDate: Date;
	cardIssuing: number;
	cardCode: number;
	constructor(arg?: EmployeeCardDefinition) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
