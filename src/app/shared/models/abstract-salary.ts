
 export class AbstractSalary {
    id: number;
    
	employeeCode: string;
	year: Date;
	abstractSalary: string;
	constructor(arg?: AbstractSalary) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
