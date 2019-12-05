
 export class EndOfASpecialVacationForEmployeeB {
    id: number;
    
	employeeCode: string;
	membershipCode: string;
	valueAmount: number;
	paymentNumber: number;
	receiptNumber: number;
	paymentType: number;
	endDate: Date;
	terminationType: number;
	vacationSubscriptionAmount: number;
	vacationEnd: Date;
	vacationBeginning: Date;
	subscriptionDate: Date;
	administrationCode: number;
	subscriptionStatus: number;
	employeeStatus: number;
	constructor(arg?: EndOfASpecialVacationForEmployeeB) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
