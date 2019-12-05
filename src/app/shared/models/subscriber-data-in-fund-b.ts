
 export class SubscriberDataInFundB {
    id: number;
    
	birthDate: Date;
	pensionDate: Date;
	hiringDate: Date;
	subscriptionDate: Date;
	subscriptionAmount: number;
	membershipNumber: number;
	beneficiaryCode: number;
	beneficiaryStatement: string;
	employeeStatus: number;
	beneficiaryData: string;
	benefitRate: number;
	employeeCode: string;
	administrationCode: number;
	constructor(arg?: SubscriberDataInFundB) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
