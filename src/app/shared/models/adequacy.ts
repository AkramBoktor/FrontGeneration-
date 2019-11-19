
 export class Adequacy {
    id: number;
    
	employeeCode: string;
	adequacyYear: Date;
	overallAppreciation: number;
	degree: string;
	employeeName: string;
	constructor(arg?: Adequacy) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
