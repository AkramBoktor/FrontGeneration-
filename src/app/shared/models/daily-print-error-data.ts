
 export class DailyPrintErrorData {
    id: number;
    
	todayDate: Date;
	employeeCode: string;
	entryTime1: Date;
	entryTime2: Date;
	exitTime1: Date;
	exitTime2: Date;
	constructor(arg?: DailyPrintErrorData) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
