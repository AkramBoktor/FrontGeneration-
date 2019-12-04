
 export class PasswordForTheSupervisorEngineer {
    id: number;
    
	specializedEngineerNumber: string;
	password: string;
	constructor(arg?: PasswordForTheSupervisorEngineer) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
