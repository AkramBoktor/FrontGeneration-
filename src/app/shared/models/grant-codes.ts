
 export class GrantCodes {
    id: number;
    
	grantCode: string;
	grantName: string;
	entityCode: string;
	constructor(arg?: GrantCodes) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
