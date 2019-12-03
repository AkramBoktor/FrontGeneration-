
 export class SubscriptionAmountUnderChecksA {
    id: number;
    
	employeeCode: string;
	administrationCode: number;
	employeeStatus: number;
	membershipNumber: number;
	membershipDate: Date;
	periodStartDate: Date;
	periodEndDate: Date;
	checkNumber: number;
	checkDate: Date;
	amountValue: number;
	issuer: number;
	constructor(arg?: SubscriptionAmountUnderChecksA) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
