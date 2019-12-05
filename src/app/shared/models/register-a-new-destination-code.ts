
 export class RegisterANewDestinationCode {
    id: number;
    
	entityCode: number;
	entityAmount: number;
	entityName: string;
	constructor(arg?: RegisterANewDestinationCode) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
