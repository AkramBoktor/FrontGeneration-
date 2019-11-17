
 export class FeedingHour {
    id: number;
    
	employeeCode: string;
	constructor(arg?: FeedingHour) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
