
 export class DeductionOfAnAmountToAnEmployeeOfTheFundG {
    id: number;
    
	checkNumber: number;
	checkDate: Date;
	bankStatement: string;
	bankCode: number;
	checkAmount: number;
	beneficiaryName: string;
	boxCode: number;
	employeeCode: string;
	administrationCode: number;
	subscriptionStatus: number;
	membershipCode: number;
	basicSalary: number;
	subscriptionAmounts: number;
	amountDeductingReason: string;
	beneficiaryCode: number;
	employeeStatus: number;
	constructor(arg?: DeductionOfAnAmountToAnEmployeeOfTheFundG) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
