
 export class Disclaimer {
    id: number;
    
	employeeCode: string;
	disclaimerDate: Date;
	employeeName: string;
	constructor(arg?: Disclaimer) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
