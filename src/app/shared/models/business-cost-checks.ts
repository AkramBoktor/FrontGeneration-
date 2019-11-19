
 export class BusinessCostChecks {
    id: number;
    
	schoolNumber: number;
	checkNumber: string;
	checkDate: Date;
	checkValue: number;
	constructor(arg?: BusinessCostChecks) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
