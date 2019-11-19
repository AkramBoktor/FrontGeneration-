
 export class PeopleAssemblyApproval {
    id: number;
    
	schoolNumber: number;
	theNumber: string;
	date: Date;
	constructor(arg?: PeopleAssemblyApproval) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
