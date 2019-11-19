
 export class EmployeeInsuranceNumber {
    id: number;
    
	employeeCode: number;
	insuranceNumber: number;
	constructor(arg?: EmployeeInsuranceNumber) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
