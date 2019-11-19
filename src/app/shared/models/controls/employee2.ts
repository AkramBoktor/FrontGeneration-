export class Employee {

    id?: number;

    name?: string;

    phone?: string;

    country?: string;

    city?: string;

    street?: string;

    position?: number;

    level?: number;

    // path: string;

}

export class Employee2 {
    
	employeeCode: string;
	employeeName: string;
	authority: number;
	department: number;
	regularPreviousVacations: string;
	regularBalance: string;
	casualBalance: string;
	fromDate: Date;
	toDate: Date;
	vacationsType: number;
	permission: string;
	decisionNumber: number;
	decisionDate: Date;
	specialVacationType: number;
	implementationDuration: string;
	
	constructor(arg?: Employee2) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }