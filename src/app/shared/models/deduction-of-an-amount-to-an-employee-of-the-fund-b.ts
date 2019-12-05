
 export class DeductionOfAnAmountToAnEmployeeOfTheFundB {
    id: number;
    
	employeeStatus: number;
	beneficiaryCode: number;
	amountDeductingReason: string;
	subscriptionAmounts: number;
	basicSalary: number;
	membershipCode: number;
	subscriptionStatus: number;
	administrationCode: number;
	employeeCode: string;
	boxCode: number;
	beneficiaryName: string;
	checkAmount: number;
	bankCode: number;
	bankStatement: string;
	checkDate: Date;
	checkNumber: number;
	constructor(arg?: DeductionOfAnAmountToAnEmployeeOfTheFundB) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
