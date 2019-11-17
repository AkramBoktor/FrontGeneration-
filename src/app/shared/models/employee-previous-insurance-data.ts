
 export class EmployeePreviousInsuranceData {
    id: number;
    
	employeeCode: string;
	sector: number;
	organization: number;
	fromDate: Date;
	toDate: Date;
	constructor(arg?: EmployeePreviousInsuranceData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
