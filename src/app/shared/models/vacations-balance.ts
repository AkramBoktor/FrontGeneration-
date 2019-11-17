
 export class VacationsBalance {
    id: number;
    
	employeeCode: string;
	employeeBalance: number;
	fromDate: Date;
	toDate: Date;
	creditType: number;
	appointmentType: number;
	constructor(arg?: VacationsBalance) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
