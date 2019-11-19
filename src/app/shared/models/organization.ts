
 export class Organization {
    id: number;
    
	organizationNumber: string;
	organizationName: string;
	sector: number;
	constructor(arg?: Organization) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
