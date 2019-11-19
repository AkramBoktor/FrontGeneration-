
 export class VacationEmployee {
    id: number;
    
	employeeCode: string;
	employeeName: string;
	centralAdministration: number;
	subAdministration: number;
	regularPreviousVacations: string;
	regularBalance: string;
	casualBalance: string;
	fromDate: Date;
	toDate: Date;
	vacationsType: number;
	permission: string;
	decisionNumber: string;
	decisionDate: Date;
	implementationDuration: string;
	constructor(arg?: VacationEmployee) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
