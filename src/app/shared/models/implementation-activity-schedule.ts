
 export class ImplementationActivitySchedule {
    id: number;
    
	scheduleCode: string;
	activity: string;
	daysStart: string;
	activityDuration: string;
	constructor(arg?: ImplementationActivitySchedule) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
