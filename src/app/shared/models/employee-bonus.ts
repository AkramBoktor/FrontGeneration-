
 export class EmployeeBonus {
    id: number;
    
	employeeCode: string;
	bounceType: number;
	bounceAmount: string;
	constructor(arg?: EmployeeBonus) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
