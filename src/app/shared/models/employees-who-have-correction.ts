
 export class EmployeesWhoHaveCorrection {
    id: number;
    
	entryType: number;
	incomingYearAndMonth: Date;
	employeeCode: string;
	employeeDate: string;
	constructor(arg?: EmployeesWhoHaveCorrection) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
