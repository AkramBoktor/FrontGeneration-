
 export class EmployeesPerformanceEvaluation {
    id: number;
    
	directManagerNumber: string;
	seniorManagerNumber: string;
	employeeCode: string;
	yearOfReport: Date;
	reportPeriod: number;
	from: Date;
	to: Date;
	performanceType: number;
	details: string;
	constructor(arg?: EmployeesPerformanceEvaluation) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
