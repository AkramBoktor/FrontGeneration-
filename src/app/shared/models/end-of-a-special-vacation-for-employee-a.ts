
 export class EndOfASpecialVacationForEmployeeA {
    id: number;
    
	employeeCode: string;
	membershipCode: string;
	employeeStatus: number;
	subscriptionStatus: number;
	administrationCode: number;
	subscriptionDate: Date;
	vacationBeginning: Date;
	vacationEnd: Date;
	vacationSubscriptionAmount: number;
	terminationType: number;
	endDate: Date;
	paymentType: number;
	receiptNumber: number;
	paymentNumber: number;
	valueAmount: number;
	constructor(arg?: EndOfASpecialVacationForEmployeeA) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
