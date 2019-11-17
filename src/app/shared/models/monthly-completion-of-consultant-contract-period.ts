
 export class MonthlyCompletionOfConsultantContractPeriod {
    id: number;
    
	employeeCode: string;
	attendeesNumber: string;
	periodNumber: string;
	centralAdministration: number;
	subAdministration: number;
	jobTitle: number;
	startDate: Date;
	contractAmount: string;
	endDate: Date;
	period: string;
	constructor(arg?: MonthlyCompletionOfConsultantContractPeriod) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
