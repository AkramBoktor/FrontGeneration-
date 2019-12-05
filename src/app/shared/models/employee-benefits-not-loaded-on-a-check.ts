
 export class EmployeeBenefitsNotLoadedOnACheck {
    id: number;
    
	employeeName: string;
	affiliateManagement: number;
	subsidyType: number;
	subsidyNoandName: string;
	subsidyAmount: string;
	exchangeDate: Date;
	receipt: string;
	constructor(arg?: EmployeeBenefitsNotLoadedOnACheck) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
