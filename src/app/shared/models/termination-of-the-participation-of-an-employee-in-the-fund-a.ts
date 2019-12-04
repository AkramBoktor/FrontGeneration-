
 export class TerminationOfTheParticipationOfAnEmployeeInTheFundA {
    id: number;
    
	employeeCode: string;
	membershipCode: number;
	employeeStatus: number;
	subscriptionStatus: number;
	administrationCode: number;
	terminationType: number;
	subscriptionFeeInsteadSalary: number;
	subscriptionAmounts: number;
	employeeDeservedAmount: number;
	deductedAmountsWithFeature: number;
	deductionReason: number;
	endDate: Date;
	beneficiaryCode: number;
	beneficiaryName: string;
	checkAmount: number;
	bankCode: number;
	bankStatement: string;
	checkNumber: number;
	checkDate: Date;
	constructor(arg?: TerminationOfTheParticipationOfAnEmployeeInTheFundA) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
