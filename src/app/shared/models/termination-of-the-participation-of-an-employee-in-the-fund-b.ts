
 export class TerminationOfTheParticipationOfAnEmployeeInTheFundB {
    id: number;
    
	employeeCode: string;
	employeeStatus: number;
	checkDate: Date;
	checkNumber: number;
	bankStatement: string;
	bankCode: number;
	membershipCode: number;
	checkAmount: number;
	beneficiaryCode: number;
	deductionReason: number;
	deductedAmountsWithFeature: number;
	employeeDeservedAmount: number;
	subscriptionAmounts: number;
	subscriptionFeeInsteadSalary: number;
	terminationType: number;
	administrationCode: number;
	subscriptionStatus: number;
	beneficiaryName: string;
	endDate: Date;
	constructor(arg?: TerminationOfTheParticipationOfAnEmployeeInTheFundB) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
