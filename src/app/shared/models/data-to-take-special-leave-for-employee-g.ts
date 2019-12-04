
 export class DataToTakeSpecialLeaveForEmployeeG {
    id: number;
    
	salary: number;
	bonuses: number;
	requiredAmount: number;
	durationTo: Date;
	durationFrom: Date;
	totalAmount: number;
	delayPenalty: number;
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
	constructor(arg?: DataToTakeSpecialLeaveForEmployeeG) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
