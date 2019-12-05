
 export class Bonus57 {
    id: number;
    
	employeeCode: string;
	year: string;
	financialDegree: number;
	employmentSalary: string;
	ratio: string;
	periodBonus: string;
	employmentSalaryWithBonus: string;
	constructor(arg?: Bonus57) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
