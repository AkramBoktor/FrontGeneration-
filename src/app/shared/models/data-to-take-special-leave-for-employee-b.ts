
 export class DataToTakeSpecialLeaveForEmployeeB {
    id: number;
    
	receiptDate: Date;
	receiptNumber: string;
	executiveOrderDate: Date;
	executiveOrderNumber: number;
	expenseAmount: number;
	benefitsAmount: number;
	vacationEndDate: Date;
	vacationStartDate: Date;
	vacationType: number;
	membershipNumber: number;
	subscriptionDate: Date;
	subscriptionStatus: number;
	administrationCode: number;
	employeeStatus: number;
	employeeCode: string;
	delayPenalty: number;
	totalAmount: number;
	durationFrom: Date;
	durationTo: Date;
	requiredAmount: number;
	bonuses: number;
	salary: number;
	constructor(arg?: DataToTakeSpecialLeaveForEmployeeB) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
