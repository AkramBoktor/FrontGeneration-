
 export class RegistrationForm50 {
    id: number;
    
	budgetYear: Date;
	area: number;
	formDate: Date;
	administration: number;
	formSerial: string;
	formAmount: number;
	formSource: number;
	employeeCode: string;
	statement: string;
	constructor(arg?: RegistrationForm50) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
