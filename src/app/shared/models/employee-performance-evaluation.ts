
 export class EmployeePerformanceEvaluation {
    id: number;
    
	directManagerNumber: number;
	seniorManagerNumber: number;
	employeeCode: string;
	yearOfReport: Date;
	reportPeriod: number;
	from: Date;
	to: Date;
	performanceType: number;
	description: string;
	constructor(arg?: EmployeePerformanceEvaluation) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
