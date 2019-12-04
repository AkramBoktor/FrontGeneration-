
 export class CareerPrograms {
    id: number;
    
	region: number;
	jobCode: string;
	jobName: string;
	scheduledNumber: string;
	constructor(arg?: CareerPrograms) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
