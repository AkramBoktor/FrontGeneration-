
 export class TerminationOfTheParticipationOfAnEmployeeInTheFundG {
    id: number;
    
	terminationType: number;
	deductionReason: number;
	beneficiaryCode: number;
	checkAmount: number;
	membershipCode: number;
	bankCode: number;
	bankStatement: string;
	checkNumber: number;
	employeeStatus: number;
	employeeCode: string;
	checkDate: Date;
	deductedAmountsWithFeature: number;
	endDate: Date;
	subscriptionStatus: number;
	administrationCode: number;
	subscriptionFeeInsteadSalary: number;
	subscriptionAmounts: number;
	employeeDeservedAmount: number;
	beneficiaryName: string;
	constructor(arg?: TerminationOfTheParticipationOfAnEmployeeInTheFundG) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
