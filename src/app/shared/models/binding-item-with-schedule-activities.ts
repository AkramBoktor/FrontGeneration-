
 export class BindingItemWithScheduleActivities {
    id: number;
    
	itemCode: number;
	activityCode: string;
	constructor(arg?: BindingItemWithScheduleActivities) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
