
 export class Timetable {
    id: number;
    
	tableTumber: string;
	activityNumber: string;
	beginningDays: Date;
	activityDuration: string;
	constructor(arg?: Timetable) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
