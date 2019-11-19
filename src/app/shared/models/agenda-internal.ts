
 export class AgendaInternal {
    id: number;
    
	employeeCode: string;
	job: number;
	entity: number;
	phoneNumber: string;
	email: string;
	employeeName: string;
	constructor(arg?: AgendaInternal) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
