
 export class Allowance {
    id: number;
    
	employeeCode: string;
	allowancesType: number;
	allowancesAmount: string;
	constructor(arg?: Allowance) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
