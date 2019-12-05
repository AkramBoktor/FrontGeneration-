
 export class SubscriptionAmountUnderChecksG {
    id: number;
    
	administrationCode: number;
	employeeCode: string;
	employeeStatus: number;
	membershipNumber: number;
	periodStartDate: Date;
	membershipDate: Date;
	periodEndDate: Date;
	checkNumber: number;
	checkDate: Date;
	amountValue: number;
	issuer: number;
	constructor(arg?: SubscriptionAmountUnderChecksG) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
