
 export class PeriodOfWorkForThePharmacy {
    id: number;
    
	day: Date;
	from: Date;
	to: Date;
	employeeCode: string;
	employeeName: string;
	notes: string;
	constructor(arg?: PeriodOfWorkForThePharmacy) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
