
 export class DeductionOfAmountToAnEmployeeOfTheFund {
    id: number;
    
	boxCode: number;
	employeeCode: string;
	administrationCode: number;
	employeeStatus: number;
	subscriptionStatus: string;
	membershipCode: string;
	basicSalary: string;
	subscriptionAmounts: string;
	deductingAmountReason: string;
	beneficiaryCode: string;
	beneficiaryName: string;
	checkAmount: string;
	bankCode: number;
	bankStatement: string;
	checkNumber: string;
	checkDate: Date;
	constructor(arg?: DeductionOfAmountToAnEmployeeOfTheFund) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
