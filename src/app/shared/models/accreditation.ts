
 export class Accreditation {
    id: number;
    
	accreditationCode: string;
	accreditationName: string;
	constructor(arg?: Accreditation) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
