
 export class IncentiveBonus {
    id: number;
    
	employeeCode: string;
	jobGroup: number;
	jobTitle: number;
	financialDegree: number;
	grantedYear: Date;
	decisionNumber: string;
	decisionDate: Date;
	committeeAcceptedDate: Date;
	constructor(arg?: IncentiveBonus) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
