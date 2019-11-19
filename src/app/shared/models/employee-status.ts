
 export class EmployeeStatus {
    id: number;
    
	employeeCode: string;
	statusStartDate: Date;
	status: number;
	constructor(arg?: EmployeeStatus) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
