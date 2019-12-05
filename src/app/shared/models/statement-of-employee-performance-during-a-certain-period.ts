
 export class StatementOfEmployeePerformanceDuringACertainPeriod {
    id: number;
    
	directManagerCode: string;
	seniorManagerCode: string;
	employeeCode: string;
	estimationYear: Date;
	estimatePeriodFrom: Date;
	estimatePeriodTo: Date;
	performanceType: number;
	performanceCharacterization: string;
	constructor(arg?: StatementOfEmployeePerformanceDuringACertainPeriod) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
