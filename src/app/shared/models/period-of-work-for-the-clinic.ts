
 export class PeriodOfWorkForTheClinic {
    id: number;
    
	day: Date;
	from: Date;
	to: Date;
	employeeCode: string;
	notes: string;
	employeeName: string;
	constructor(arg?: PeriodOfWorkForTheClinic) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
