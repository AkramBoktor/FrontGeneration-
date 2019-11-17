
 export class Retirement {
    id: number;
    
	employeeCode: string;
	decisionCode: string;
	decisionDate: Date;
	terminationReason: number;
	terminationDate: Date;
	constructor(arg?: Retirement) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
