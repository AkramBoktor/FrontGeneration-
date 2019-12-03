
 export class SubscriptionAmountUnderChecksB {
    id: number;
    
	administrationCode: number;
	employeeCode: string;
	employeeStatus: number;
	membershipNumber: number;
	periodStartDate: Date;
	issuer: number;
	amountValue: number;
	checkDate: Date;
	checkNumber: number;
	periodEndDate: Date;
	membershipDate: Date;
	constructor(arg?: SubscriptionAmountUnderChecksB) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
