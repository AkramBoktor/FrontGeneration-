
 export class SubscriberDataInFundA {
    id: number;
    
	employeeCode: string;
	employeeStatus: number;
	administrationCode: number;
	birthDate: Date;
	pensionDate: Date;
	hiringDate: Date;
	subscriptionDate: Date;
	subscriptionAmount: number;
	membershipNumber: number;
	beneficiaryCode: number;
	beneficiaryStatement: string;
	beneficiaryData: string;
	benefitRate: number;
	constructor(arg?: SubscriberDataInFundA) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
