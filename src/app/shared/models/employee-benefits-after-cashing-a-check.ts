
 export class EmployeeBenefitsAfterCashingACheck {
    id: number;
    
	checkNumber: string;
	checkDate: Date;
	checkAmount: number;
	employeeCode: string;
	subsidyType: number;
	subsidyAmount: number;
	exchangeDate: Date;
	constructor(arg?: EmployeeBenefitsAfterCashingACheck) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
