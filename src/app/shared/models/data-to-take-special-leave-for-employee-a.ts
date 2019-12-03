
 export class DataToTakeSpecialLeaveForEmployeeA {
    id: number;
    
	employeeCode: string;
	employeeStatus: number;
	administrationCode: number;
	subscriptionStatus: number;
	subscriptionDate: Date;
	membershipNumber: number;
	vacationType: number;
	vacationStartDate: Date;
	vacationEndDate: Date;
	benefitsAmount: number;
	expenseAmount: number;
	executiveOrderNumber: number;
	executiveOrderDate: Date;
	receiptNumber: string;
	receiptDate: Date;
	delayPenalty: number;
	totalAmount: number;
	durationFrom: Date;
	durationTo: Date;
	salary: number;
	bonuses: number;
	requiredAmount: number;
	constructor(arg?: DataToTakeSpecialLeaveForEmployeeA) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
