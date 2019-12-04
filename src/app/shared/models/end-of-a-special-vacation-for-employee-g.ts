
 export class EndOfASpecialVacationForEmployeeG {
    id: number;
    
	vacationBeginning: Date;
	vacationEnd: Date;
	vacationSubscriptionAmount: number;
	terminationType: number;
	endDate: Date;
	paymentType: number;
	receiptNumber: number;
	paymentNumber: number;
	valueAmount: number;
	membershipCode: string;
	employeeCode: string;
	subscriptionDate: Date;
	administrationCode: number;
	subscriptionStatus: number;
	employeeStatus: number;
	constructor(arg?: EndOfASpecialVacationForEmployeeG) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
