
 export class ActivityType {
    id: number;
    
	workType: number;
	code: string;
	name: string;
	constructor(arg?: ActivityType) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
