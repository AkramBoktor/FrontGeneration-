
 export class SchoolsClosedToNature {
    id: number;
    
	governorateCode: number;
	iDNumber: string;
	closureType: number;
	reasonsforclosure: number;
	notes: string;
	constructor(arg?: SchoolsClosedToNature) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
