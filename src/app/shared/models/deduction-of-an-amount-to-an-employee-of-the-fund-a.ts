
 export class DeductionOfAnAmountToAnEmployeeOfTheFundA {
    id: number;
    
	boxCode: number;
	employeeCode: string;
	administrationCode: number;
	employeeStatus: number;
	subscriptionStatus: number;
	membershipCode: number;
	basicSalary: number;
	subscriptionAmounts: number;
	amountDeductingReason: string;
	beneficiaryCode: number;
	beneficiaryName: string;
	checkAmount: number;
	bankCode: number;
	bankStatement: string;
	checkNumber: number;
	checkDate: Date;
	constructor(arg?: DeductionOfAnAmountToAnEmployeeOfTheFundA) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
