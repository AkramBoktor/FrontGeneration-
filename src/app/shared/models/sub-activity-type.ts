
 export class SubActivityType {
    id: number;
    
	workType: number;
	activityType: string;
	code: string;
	name: string;
	constructor(arg?: SubActivityType) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
