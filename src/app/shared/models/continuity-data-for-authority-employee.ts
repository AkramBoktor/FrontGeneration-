
 export class ContinuityDataForAuthorityEmployee {
    id: number;
    
	centralAdministration: number;
	subAdministration: number;
	continueDay: Date;
	employeeCode: string;
	constructor(arg?: ContinuityDataForAuthorityEmployee) {
        if (arg) {
            for (const property in arg) {
                if (arg.hasOwnProperty(property)) { (this as any)[property] = (arg as any)[property]; }
            }
        }
    }
 }
