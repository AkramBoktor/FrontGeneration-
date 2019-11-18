
 export class CompleteTheDataOfSupervisorEngineer {
    id: number;
    
	employeeCode: string;
	phoneNumber1: string;
	phoneNumber2: string;
	phoneNumber3: string;
	constructor(arg?: CompleteTheDataOfSupervisorEngineer) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
