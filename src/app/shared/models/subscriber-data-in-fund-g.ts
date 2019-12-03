
 export class SubscriberDataInFundG {
    id: number;
    
	administrationCode: number;
	subscriptionDate: Date;
	subscriptionAmount: number;
	membershipNumber: number;
	beneficiaryCode: number;
	employeeStatus: number;
	beneficiaryData: string;
	benefitRate: number;
	employeeCode: string;
	beneficiaryStatement: string;
	hiringDate: Date;
	birthDate: Date;
	pensionDate: Date;
	constructor(arg?: SubscriberDataInFundG) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
