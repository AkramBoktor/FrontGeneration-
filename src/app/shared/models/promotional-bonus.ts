
 export class PromotionalBonus {
    id: number;
    
	employeeCode: string;
	year: Date;
	financialDegree: number;
	employmentSalary: string;
	bonus: number;
	amount: string;
	ratio: string;
	decisionNumber: string;
	decisionDate: Date;
	dueDate: Date;
	employmentSalaryWithBonus: string;
	constructor(arg?: PromotionalBonus) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
